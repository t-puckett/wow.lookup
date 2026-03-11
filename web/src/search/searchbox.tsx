import {useState, type ChangeEvent } from "react"
import { Col, Form, Row, Button, Container} from "react-bootstrap";

export default function SearchBox() {
    const [region, setRegion] = useState('');
    const [realm, setRealm] = useState('');
    const [name, setName] = useState('');

    const REALM_LIST : string[] = ["Cenarius","Coilfang","Kil'Jaeden","Kilrogg","Lightbringer","Mok'Nathal","Moonrunner","Mug'thol","Proudmoore"]
    const REGION_LIST: string[] = [ "us", "eu", "kr", "tw" ]
    const handleRegionChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setRegion(event.target.value as string);
    }

    const handleRealmChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setRealm(event.target.value as string);
    }

    function submit() {
        setName(name)
        const player:playerInfo = {region,realm,name}
        console.log(player)
    }

    interface playerInfo {
        region: string;
        realm: string;
        name: string;
    }

    return ( 
        <Container className="d-flex justify-content-center">
            <Form >
                <Row className="d-flex align-items-center vh-100">
                    <Col xs="auto">
                        <Form.Select onChange={handleRegionChange} value={region} aria-label="Default">
                            {REGION_LIST.map((regions: string,index:number) => {
                                return <option key={index} value={regions}>{regions}</option>
                            })}
                        </Form.Select>
                    </Col>
                    <Col xs="auto">
                        <Form.Select aria-label="Default" onChange={handleRealmChange} value={realm}>
                            {REALM_LIST.map((realms: string, index: number) => {
                                return <option key={index} value={realms}>{realms}</option>
                            })}
                        </Form.Select>
                    </Col>
                    <Col xs="auto">
                        <Form.Control id="inlineFormName" type="text" placeholder="Character Name" onChange={event => { setName(event.target.value) }} value={name}></Form.Control>
                    </Col>
                    <Col>
                        <Button id="submitInfo" className="align-self-end" onClick={submit} type="submit">Search</Button>
                    </Col>
                </Row>
            </Form>
        </Container>             
    )
}