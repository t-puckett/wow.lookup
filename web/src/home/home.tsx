
import { Container } from "react-bootstrap"
import SearchBox from "../search/searchbox.tsx"
import NavMenuInitialize from '../nav-menu/NavMenuInitialize.tsx'


export default function Home() {
    return (
        <Container>
            <NavMenuInitialize/>
            <SearchBox/>
        </Container>
    )
}

