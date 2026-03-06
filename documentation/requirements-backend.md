# Node.js Backend Requirements

## Project Overview

**Project Name:** wow.lookup — Backend API
**Description:** A Django backend service that proxies and processes World of Warcraft player data from the Blizzard Battle.net API.
**Tech Stack:** Django
**Date:** 2026-03-06

---

## 1. Functional Requirements

### 1.1 Core Features

| ID   | Requirement | Priority |
|------|-------------|----------|
| F-01 | Authenticate with the Blizzard API via OAuth 2.0 client credentials | High |
| F-02 | Expose endpoints for fetching player profile data | High |
| F-03 | Expose endpoints for fetching dungeon data | High |
| F-04 | Expose endpoints for fetching gear data | High |
| F-03 | Cache Blizzard API responses to reduce redundant external calls | High |

### 1.2 User Stories

```
As a user, I want to call wow api, to retrieve information about players, gear, dungeon stats.
```

**Example stories for this project:**

- As an operator, I want failed external API calls to return clear error responses, so that the frontend can display meaningful messages.
- As an operator, I want rate limiting enforced on all public endpoints, so that the service is protected from abuse.

### 1.3 API Endpoints

| Method | Route | Description | Auth Required |
|--------|-------|-------------|---------------|
| GET | `/health` | Health check | No |
| GET | `/character/:realm/:name` | Fetch character profile | No |
| GET | `/character/:realm/:name/gear` | Fetch character gear/item level | No |
| GET | `/character/:realm/:name/raids` | Fetch character raid history | No |

> Routes are prefixed with `/api/v1` by default (e.g., `/api/v1/character/:realm/:name`).

---

## 2. Non-Functional Requirements

### 2.1 Performance

- API response time (p95) must be under **300ms** for cached responses.
- API response time (p95) must be under **1500ms** for uncached external calls.
- The server must handle at least **100 concurrent requests** without degradation.

### 2.2 Reliability

- The service must have **99.9% uptime** in production.
- External API failures must not crash the service; they must return a `502 Bad Gateway` with a descriptive message.
- Graceful shutdown must be implemented to drain in-flight requests before stopping.

### 2.3 Security

- API credentials (client ID, client secret) must only be stored in environment variables — never hardcoded.
- All incoming request parameters must be **validated and sanitized** before use.
- Rate limiting must be applied to all public-facing routes.
- CORS must be configured to allow only known origins.
- Helmet.js (or equivalent) must be used to set secure HTTP headers.

### 2.4 Scalability

- The application must be **stateless** — no in-process session state — to support horizontal scaling.
- Caching must use an external store (e.g., Redis) rather than in-memory, to support multiple instances.

---

## 3. Technical Requirements

### 3.1 Runtime & Framework

- **Node.js version:** 20 LTS+
- **Framework:** Django
- **Language:** Python
- **Package manager:** pip

### 3.2 Project Structure

```
src/
  routes/           # Route definitions
  controllers/      # Request handler logic
  services/         # Business logic and external API calls
  middleware/        # Auth, validation, rate limiting, error handling
  cache/            # Cache abstraction layer
  config/           # Environment config and constants
  utils/            # Helper functions
  types/            # TypeScript types/interfaces (if using TS)
tests/
  unit/
  integration/
```

### 3.3 External API Integration

- **External API:** Blizzard Battle.net API
- **Authentication:** OAuth 2.0 — Client Credentials flow
- **Token management:** Tokens must be fetched once, cached, and refreshed before expiry.
- **Base URL:** Configured via environment variable `BLIZZARD_API_BASE_URL`
- **Rate limiting:** Respect Blizzard API rate limits; implement exponential backoff on `429` responses.

### 3.4 Caching

- **Cache store:** [e.g., Redis / in-memory (dev only)]
- **Default TTL:** 300 seconds (5 minutes) for character data
- **Cache keys:** Namespaced by resource type, realm, and character name (e.g., `character:us:thrall`)
- Cache must be invalidatable per key for testing and manual overrides.

### 3.5 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Port the server listens on (default: `3000`) | No |
| `NODE_ENV` | Runtime environment (`development` / `production`) | Yes |
| `BLIZZARD_API_BASE_URL` | Blizzard API base URL | Yes |
| `BLIZZARD_CLIENT_ID` | OAuth client ID | Yes |
| `BLIZZARD_CLIENT_SECRET` | OAuth client secret | Yes |
| `REDIS_URL` | Redis connection string | Yes (prod) |
| `ALLOWED_ORIGINS` | Comma-separated list of allowed CORS origins | Yes |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window in milliseconds | No |
| `RATE_LIMIT_MAX` | Max requests per window per IP | No |

> **Note:** Never commit `.env` files. Provide `.env.example` as a reference.

---

## 4. Middleware Requirements

| Middleware | Purpose | Notes |
|------------|---------|-------|
| CORS | Restrict cross-origin access | Use `ALLOWED_ORIGINS` env var |
| Helmet | Secure HTTP headers | Enable all defaults |
| Rate limiter | Prevent abuse | Per-IP, configurable via env |
| Request logger | Log all incoming requests | Use structured JSON logging in prod |
| Input validator | Validate route params and query strings | Return `400` on invalid input |
| Error handler | Catch and format all unhandled errors | Must not leak stack traces in prod |

---

## 5. Error Handling

All error responses must follow a consistent JSON structure:

```json
{
  "status": 404,
  "error": "Not Found",
  "message": "Character 'thrall' on realm 'us' was not found."
}
```

| Scenario | HTTP Status |
|----------|-------------|
| Invalid request parameters | `400 Bad Request` |
| Resource not found | `404 Not Found` |
| Rate limit exceeded | `429 Too Many Requests` |
| External API failure | `502 Bad Gateway` |
| Unexpected server error | `500 Internal Server Error` |

Stack traces must **never** be exposed in production error responses.

---

## 6. Logging & Monitoring

- Use **structured JSON logging** in production (e.g., Pino / Winston).
- Log levels: `error`, `warn`, `info`, `debug` — controlled via `LOG_LEVEL` env var.
- Every request must be logged with: method, route, status code, and response time.
- Errors must include a correlation/request ID for traceability.
- Application metrics (e.g., request count, error rate, cache hit rate) must be exposed at `/metrics` [optional: Prometheus format].

---

## 7. Testing Requirements

| Type | Tool | Coverage Target |
|------|------|----------------|
| Unit tests | Jest / Vitest | 80%+ of service and utility logic |
| Integration tests | Supertest + Jest | All API endpoints |
| Contract tests | [e.g., Pact] | Blizzard API response shape |

- External HTTP calls must be **mocked** in all unit and integration tests.
- Tests must be runnable without real API credentials.
- A CI pipeline must run all tests on every pull request.

---

## 8. Build & Deployment

- **Build tool:** [e.g., `tsc` for TypeScript / `esbuild` / none for plain JS]
- **Containerization:** Docker (provide a `Dockerfile` and `.dockerignore`)
- **CI/CD:** [e.g., GitHub Actions]
- **Hosting:** [e.g., Railway / Fly.io / AWS ECS / Azure App Service]
- The production image must run as a **non-root user**.
- Health check endpoint (`/health`) must be used by the container orchestrator.

### Dockerfile Requirements

- Use an official `node:20-alpine` base image.
- Use multi-stage builds to keep the final image lean.
- Install only **production** dependencies in the final stage.

---

## 9. Open Questions / TBD

- [ ] Will the backend require user authentication (e.g., JWT for logged-in users)?
- [ ] Is TypeScript required, or is plain JavaScript acceptable?
- [ ] Which framework will be used (Express, Fastify, Hono)?
- [ ] What is the Redis hosting strategy in production?
- [ ] Are there webhook or real-time push requirements (WebSocket)?
- [ ] Should the API be versioned beyond `/v1`?

---

## 10. Out of Scope

- Frontend/React development (see `requirements.md`).
- Database persistence (no user accounts or stored data in v1).
- WebSocket / real-time data streaming (unless added in a future phase).
- Admin dashboard or internal tooling.

---

## Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 0.1 | 2026-03-06 | — | Initial draft |
