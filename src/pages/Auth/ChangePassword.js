import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import Paper from '@material-ui/core/Paper';
import axios from "axios";
import {api_base, changePassword} from "../../Api";
import MessageBox from "../MessageBox";
import Grid from '@material-ui/core/Grid';
import {Box} from "@material-ui/core";
import {user_title_postfix} from "../../consts";

export default function ChangePassword() {
    const [response, setResponse] = React.useState([]);


    function RequestChangePassword(event) {
        event.preventDefault();
        const {current_password, new_password, new_password_confirmation} = event.currentTarget.elements;
        axios.post(api_base + changePassword, {
            current_password: current_password.value,
            new_password: new_password.value,
            new_password_confirmation: new_password_confirmation.value
        })
            .then(res => {
                setResponse(res.data)
            })
    }

    return (
        <Grid container>
            <Grid item xs={12}>
                <title>تغییر رمز عبور{user_title_postfix}</title>
                <Paper>
                    <Box p={1}>
                        <form onSubmit={RequestChangePassword}
                              autoComplete="off">
                            <h2> تغییر رمز عبور </h2>
                            <br/>

                            <TextField name="current_password" type="password" variant="outlined"
                                       label={"رمز عبور فعلی"}
                                       required
                                       style={{padding: 5}}/>


                            <br/>
                            <TextField name="new_password" id="new-password" type="password" variant="outlined" required
                                       label={"رمز عبور جدید"} style={{padding: 5}}/>
                            <br/>
                            <TextField name="new_password_confirmation" id="confirm-password" type="password" required
                                       variant="outlined" label={"تایید رمز عبور"} style={{padding: 5}}/>
                            <br/>
                            <Button type="submit" variant="contained" color="primary">
                                تغییر رمز عبور
                            </Button>
                        </form>
                    </Box>
                </Paper>
                <MessageBox response={response}/>
            </Grid>
        </Grid>
    );
}
