import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import Button from "@material-ui/core/Button";
import Paper from '@material-ui/core/Paper';
import axios from "axios";
import {api_base, changePassword} from "../Api";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1),
                width: 200,
            },
        },
    }),
);

function ChangePasswords(event) {
    event.preventDefault();
    const {current_password, new_password,new_password_confirmation} = event.currentTarget.elements;
    axios.post(api_base + changePassword, {current_password: current_password.value, new_password: new_password.value ,new_password_confirmation: new_password_confirmation.value })
        .then(res => {
            console.log(res.data)
            const msg = res.data.data.message;


            alert(msg)
        })
}

export default function ChangePassword() {
    const classes = useStyles();

    return (
        <Paper>
            <form onSubmit={ChangePasswords} className={classes.root} noValidate autoComplete="off">
                <FormLabel>رمز عبور فعلی :</FormLabel>
                <TextField name="current_password" id="current-password" type="password"/>
                <br/>
                <FormLabel>رمز عبور جدید :</FormLabel>
                <TextField name="new_password" id="new-password" type="password"/>
                <br/>
                <FormLabel>تایید رمز عبور:</FormLabel>
                <TextField  name="new_password_confirmation" id="confirm-password" type="password"/>
                <br/>
                <Button type="submit" variant="contained" color="primary">
                    تغییر رمز عبور
                </Button>
            </form>
        </Paper>
    );
}
