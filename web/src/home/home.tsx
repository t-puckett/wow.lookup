import { CssBaseline } from "@mui/material"
import SearchBox from "../search/searchbox.tsx"
import { Container } from '@mui/system'


export default function Home() {
    return (
        <CssBaseline>
            <Container>
                <SearchBox/>
            </Container>
        </CssBaseline>)
}

