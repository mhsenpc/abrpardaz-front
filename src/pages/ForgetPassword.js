import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import Button from "@material-ui/core/Button";
import axios from "axios";
import {api_base, forgetPassword} from "../Api";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';

function ForgetPassword(event) {
    event.preventDefault();
    const {email} = event.currentTarget.elements;
    axios.post(api_base + forgetPassword, {email: email.value })
        .then(res => {
            console.log(res.data)
            const msg = res.data.data.message;


            alert(msg)
        })
}



export default function ChangePassword() {


    return (
        <div>
            <Grid item xs={12} container
                  direction="row"
                  alignItems="center"
            >
                <Paper>

                    <Box  p={2} width={700}>
                        <form onSubmit={ForgetPassword}  noValidate autoComplete="off">
                            <FormLabel>رمز عبور فعلی :</FormLabel>
                            <TextField name="email" id="current-password" type="email"/>
                            <br/>
                            <br/>
                            <Button type="submit" variant="contained" color="primary">
                                ارسال لینک فعال سازی
                            </Button>
                        </form>

                    </Box>
                </Paper>
            </Grid>
        </div>

    )
}
