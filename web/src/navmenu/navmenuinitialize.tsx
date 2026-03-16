import { Button, Container, Nav, Navbar } from "react-bootstrap"
import axios from "axios";

export default function NavMenuInitialize() {

    async function login (){
        try {
            const response = await axios.get("/api/bnet_login");
            console.log(response)
        }
        catch (error)
        {
            console.error(error)
        }
    }


    return (<>
    <Navbar id="nav-bar" className="border border-2 border rounded border-light-subtle justify-content-between">
        <Container>
            <Nav>
            <Navbar.Brand href="#home">WoW Lookup</Navbar.Brand>
                <Nav.Link href="#character">Character</Nav.Link>
                    <Button onClick={login} id="battle-net" className="position-absolute border rounded border-2 end-0 p-2 mb-2" variant="primary">Battle.Net Login</Button>
            </Nav>
        </Container>
    </Navbar>
    
    </>)
}

//add login button, character button, and info tabs based off what you've gathered already.
// So conditionals based off search and login. If logged in through blizzard, it'll pull all your data.