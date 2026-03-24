import { Button, Container, Nav, Navbar } from "react-bootstrap"
import LoginButton from "../loginbutton/loginbutton";
import { useState } from "react";
import Axios from "axios";

export default function NavMenuInitialize() {
    const [change, setChange] = useState('Boo');

    async function Test (){
        try {
            const response = await Axios.get("http://localhost:8000/api/ping/");
            setChange(response.data);
        }catch(error){
            console.log(error);
        }
    }

    return (<>
    <Navbar id="nav-bar" className="bg-body-tertiary border-black border border-2 justify-content-between">
        <Container>
            <Nav>
            <Navbar.Brand href="#home">WoW Lookup</Navbar.Brand>
                <Nav.Link href="#character">Character</Nav.Link>
                    <Button onClick={Test} id="ping" className="border-black p-2 me-2" variant="primary">{change}</Button>
                    <LoginButton></LoginButton>
            </Nav>
        </Container>
    </Navbar>
    
    </>)
}

//add login button, character button, and info tabs based off what you've gathered already.
// So conditionals based off search and login. If logged in through blizzard, it'll pull all your data.