import { Container, Nav, Navbar } from "react-bootstrap"

export default function NavMenuInitialize() {
    return (<>
    <Navbar bg="dark" data-bs-theme="dark">
        <Container>
            <Nav className="me-auto">
                <Nav.Link href="#character">Character</Nav.Link>
            </Nav>
        </Container>
    </Navbar>
    
    </>)
}

