import { Button } from "react-bootstrap"
// import axios from "axios";

export default function LoginButton() {

    async function Login() {
        window.location.href = "http://localhost:8000/api/auth/bnet/login/";
        
    }


    return (<>  
        <Button onClick={Login} id="battle-net" className="position-absolute border-black end-0 p-2 me-2" variant="primary">Battle.Net Login</Button>
    </>)
}