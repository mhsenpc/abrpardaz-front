import React from 'react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from "axios";
import {api_base, setUserInfo} from "../../Api";


export default function BasicInfo(props) {
    const [firsName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [nationalCode, setNationalCode] = React.useState('');
    const [postalCode, setPostalCode] = React.useState('');
    const [address, setAddress] = React.useState('');

    React.useEffect(() => {
        setFirstName(props.userInfo.profile.first_name)
        setLastName(props.userInfo.profile.last_name)
        setNationalCode(props.userInfo.profile.national_code)
        //todo: set postalcode && address
    }, [props.userInfo]);

    function saveUserInfo(event) {
        event.preventDefault();
        const {txtfirstname, txtlastname, txtnationalcode,txtpostalcode,txtaddress} = event.currentTarget.elements;
        axios.post(api_base + setUserInfo, {
            first_name: txtfirstname.value,
            last_name: txtlastname.value,
            national_code: txtnationalcode.value,
            postal_code:txtpostalcode.value,
            address:txtaddress.value,
        })
            .then(res => {
                props.setResponse(res.data);
            })
    }

    return (

        <div>

            <Grid item xs={12} container
                  direction="row"
                  alignItems="center"
            >
                <Paper>

                    <Box p={2} width={700}>

                        <form onSubmit={saveUserInfo}>

                            <TextField id="outlined-basic" name="txtfirstname" onChange={val => setFirstName(val.value)}
                                       value={firsName} label="نام" variant="outlined"/>

                            <br/><br/>
                            <TextField id="outlined-basic" name="txtlastname" onChange={val => setLastName(val.value)}
                                       value={lastName} label="نام خانوادگی" variant="outlined"/>
                            <br/><br/>

                            <TextField id="outlined-basic" name="txtnationalcode"
                                       onChange={val => setNationalCode(val.value)} value={nationalCode} label="کد ملی"
                                       variant="outlined"/>

                            <br/><br/>
                            <TextField id="outlined-basic" name="txtpostalcode" label="کد پستی" variant="outlined" onChange={val => setPostalCode(val.value)}
                                       value={postalCode}/>

                            <br/><br/>
                            <TextField id="outlined-basic" name="txtaddress" label="آدرس" variant="outlined" multiline onChange={val => setAddress(val.value)}
                                       value={address}
                                       rows="5"
                            />

                            <br/><br/>
                            <Button type='submit' variant="contained" color="primary">
                                ذخیره
                            </Button>

                        </form>

                    </Box>

                </Paper>
            </Grid>

        </div>

    )

}


























