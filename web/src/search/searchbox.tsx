import {Select, type SelectChangeEvent, MenuItem, TextField, Button, FormControl, InputLabel, Box } from "@mui/material"
import {useState, Fragment} from "react"

export default function SearchBox() {
    const [region, setRegion] = useState('');
    const [realm, setRealm] = useState('');
    const [name, setName] = useState('');

    const REALM_LIST = ["Cenarius","Coilfang","Kil'Jaeden","Kilrogg","Lightbringer","Mok'Nathal","Moonrunner","Mug'thol"]

    const handleRegionChange = (event: SelectChangeEvent) => {
        setRegion(event.target.value as string);
    }

    const handleRealmChange = (event: SelectChangeEvent) => {
        setRealm(event.target.value as string);
    }

    function submit(player : playerInfo) {
        console.log(player)
    }

    interface playerInfo {
        region: string;
        realm: string;
        name: string;
    }

    return (
        <Fragment>
            <div>
            <Box 
                component="form"
                sx={{ 
                    display:'grid',
                    width: 'fit-content',
                    mx:'auto',
                    spacing: 2,
                    height:'100vh',
                    justifyContent:'center',
                    alignItems:'center',
                    flexDirection:'row'}}>
                    <FormControl >
                    <InputLabel id="region-menu-label">Select Region</InputLabel>
                    <Select
                        labelId="region-menu-label"
                        id="region-menu"
                        value={region}
                        onChange={handleRegionChange}>
                        <MenuItem value="us">Americas</MenuItem>
                        <MenuItem value="eu">Europe</MenuItem>
                        <MenuItem value="kr">Korea</MenuItem>
                        <MenuItem value="tw">Taiwan</MenuItem>
                        <MenuItem value="cn">China</MenuItem>
                    </Select>

                    <InputLabel id="realm-menu-label">Select Realm</InputLabel>
                    <Select
                        labelId="realm-menu-label"
                        id="realm-menu"
                        value={realm}
                        onChange={handleRealmChange}>
                        {
                            
                                REALM_LIST.map((r:string,index:number)=> (
                                <MenuItem key={index} value={r}>{r}</MenuItem>
                            ))
                        }
                    </Select>
                    <InputLabel id="character-name">Write Character Name</InputLabel>
                    <TextField
                        id="name"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value)
                            }
                        }/>
                        <Button 
                            variant="outlined" 
                            size="small" 
                            color="warning" 
                            onClick={() =>
                                {
                                    const player : playerInfo = {region: region, realm: realm, name: name}
                                    submit(player)
                                }
                            }>Submit
                        </Button>
                </FormControl>      
            </Box>
            </div>
        </Fragment>
    )
}

