import {useState, type ChangeEvent } from "react"
import { Col, Form, Row, Button, Container, FloatingLabel} from "react-bootstrap";

export default function SearchBox() {
    const [region, setRegion] = useState('');
    const [realm, setRealm] = useState('');
    const [name, setName] = useState('');

    const REALM_LIST : string[] = ["Cenarius","Coilfang","Kil'Jaeden","Kilrogg","Lightbringer","Mok'Nathal","Moonrunner","Mug'thol","Proudmoore"]
    const REGION_LIST: string[] = [ "us", "eu", "kr", "tw" ]
    // const local: string[] = ["en_US","es_MX", "pt_BR","de_DE","en_GB","es_ES","fr_FR","it_IT","ru_RU","ko_KR","zh_TW","zh_CN"]
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
        //add axios and import something that can call backend apis.
    }

    interface playerInfo {
        region: string;
        realm: string;
        name: string;
    }

    return ( 
        <Container fluid className="d-flex justify-content-center m-2">
            <Form >
                <Row className="bg-body-tertiary border-black border border-2 align-items-center">
                    <Col >
                    <FloatingLabel label="Region">
                            <Form.Select className="bg-body-tertiary border-black m-2" style={{width:'100px'}} onChange={handleRegionChange} value={region} aria-label="Default">
                            {REGION_LIST.map((regions: string,index:number) => {
                                return <option key={index} value={regions}>{regions}</option>
                            })}
                        </Form.Select>
                        </FloatingLabel>
                    </Col>
                    <Col xs="auto">
                        <FloatingLabel label="Realm">
                            <Form.Select className="bg-body-tertiary border-black m-2" aria-label="Default" onChange={handleRealmChange} value={realm}>
                            {REALM_LIST.map((realms: string, index: number) => {
                                return <option key={index} value={realms}>{realms}</option>
                            })}
                        </Form.Select>
                        </FloatingLabel>
                    </Col>
                    <Col xs="auto">
                        <FloatingLabel label="Character Name">
                            <Form.Control className="bg-body-tertiary border-black m-2" id="inlineFormName" type="text" onChange={event => { setName(event.target.value) }} value={name}></Form.Control>
                        </FloatingLabel>
                    </Col>
                    <Col>
                        <Button id="submitInfo" className="align-self-end border-black" onClick={submit} type="submit">Search</Button>
                    </Col>
                </Row>
            </Form>
        </Container>             
    )
}