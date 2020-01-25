import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import Button from "@material-ui/core/Button";
import axios from "axios";
import {api_base, resetPassword} from "../../Api";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';

function ResetPasswordSend(event) {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let email = params.get('email');
    let token = params.get('token');

    event.preventDefault();
    const {password,password_confirmation} = event.currentTarget.elements;
    axios.post(api_base + resetPassword, {email: email,token:token,password:password.value,password_confirmation:password_confirmation.value })
        .then(res => {
            console.log(res.data)
            const msg = res.data.message;

            alert(msg)

        })
}



export default function ResetPassword() {
    function getEmail(){
        let search = window.location.search;
        let params = new URLSearchParams(search);
        return params.get('email');
    }

    return (
        <div>
            <Grid item xs={12} container
                  direction="row"
                  alignItems="center"
            >
                <Paper>

                    <Box  p={2} width={700}>
                        <form onSubmit={ResetPasswordSend}  noValidate autoComplete="off">
                            <FormLabel>ایمیل:</FormLabel>
                              <span>
                                  {getEmail()}
                              </span>
                            <br/>
                            <br/>
                            <FormLabel>رمز عبور:</FormLabel>
                            <TextField name="password" id="current-password" type="email"/>
                            <br/>
                            <FormLabel>تکرار رمز عبور:</FormLabel>
                            <TextField name="password_confirmation" id="current-password" type="email"/>
                            <br/>
                            <Button type="submit" variant="contained" color="primary">
                                تغییر رمز
                            </Button>
                        </form>

                    </Box>
                </Paper>
            </Grid>
        </div>

    )
}
