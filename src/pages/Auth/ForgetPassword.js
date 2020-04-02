import React from 'react';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import Button from "@material-ui/core/Button";
import axios from "axios";
import {api_base, forgetPassword} from "../../Api";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import MessageBox from "../MessageBox";
import {user_title_postfix} from "../../consts";

export default function ForgetPassword() {
    const [response, setResponse] = React.useState([]);

    function RequestForgetPassword(event) {
        event.preventDefault();
        const {email} = event.currentTarget.elements;
        axios.post(api_base + forgetPassword, {email: email.value})
            .then(res => {
                setResponse(res.data)
            })
    }

    return (
        <div>
            <title>فراموشی رمز عبور{user_title_postfix}</title>
            <Grid item xs={12} container
                  direction="row"
                  alignItems="center"
            >
                <Paper>

                    <Box p={2} width={700}>
                        <form onSubmit={RequestForgetPassword} noValidate autoComplete="off">
                            <FormLabel>پست الکترونیک :</FormLabel>
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

            <MessageBox response={response}/>
        </div>

    )
}
