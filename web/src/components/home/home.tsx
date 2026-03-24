
import { Container } from "react-bootstrap"
import SearchBox from "../search/searchbox.tsx"
import NavMenuInitialize from '../navmenu/navmenuinitialize.tsx'


export default function Home() {
    return (
        <Container fluid>
            <NavMenuInitialize/>
            <SearchBox/>
        </Container>
    )
}

