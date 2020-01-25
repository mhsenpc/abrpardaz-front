
import React from 'react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from "axios";
import {api_base, getUserInfo, setUserInfo} from "../../Api";
import MessageBox from "../MessageBox";







export default function Page1() {

    const [item, setItem] = React.useState({profile:[]});
    const [firsName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [nationalCod, setNationalCod] = React.useState('');

    React.useEffect(() => {
        axios.get(api_base + getUserInfo)
            .then(res => {
                console.log(res.data)
                const userInfo = res.data.user;

                setItem(userInfo);
                setFirstName(userInfo.profile.first_name)
                setLastName(userInfo.profile.last_name)
                setNationalCod(userInfo.profile.national_code)

            })
    }, []);


    const [response, setResponse] = React.useState([]);

    function saveUserInfo(event) {
        event.preventDefault();
        const {txtfirstname , txtlastname , txtnationalcode} = event.currentTarget.elements;
        axios.post(api_base + setUserInfo, {first_name: txtfirstname.value, last_name: txtlastname.value ,national_code : txtnationalcode.value })
            .then(res => {
                setResponse(res.data);
            })
    }

        return (

            <div>

                <Grid item xs={12} container
                      direction="row"
                      alignItems="center"
                >
                    <Paper>

                        <Box  p={2} width={700}>

                            <form onSubmit={saveUserInfo} >

                            <TextField id="outlined-basic" name="txtfirstname" onChange={val => setFirstName(val.value)} value={firsName} label="نام" variant="outlined" />

                            <br/><br/>
                            <TextField id="outlined-basic" name="txtlastname" onChange={val => setLastName(val.value)}  value={lastName} label="نام خانوادگی" variant="outlined" />
                            <br/><br/>

                            <TextField id="outlined-basic" name="txtnationalcode" onChange={val => setNationalCod(val.value)}  value={nationalCod} label="کد ملی" variant="outlined" />


                            <Button type='submit' variant="contained" color="primary">
                                ذخیره
                            </Button>

                            </form>

                        </Box>

                    </Paper>
                </Grid>
                <MessageBox response={response} />

            </div>

        )

}


























