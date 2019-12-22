import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import Button from "@material-ui/core/Button";

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

export default function Changepassword() {
    const classes = useStyles();

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <FormLabel>رمز عبور فعلی :</FormLabel>
        <TextField id="current-password" type="password" />
        <br/>
            <FormLabel>رمز عبور جدید :</FormLabel>
        <TextField id="new-password" type="password" />
         <br/>
            <FormLabel>تایید رمز عبور:</FormLabel>
        <TextField id="confirm-password" type="password" />
            <br/>
            <Button variant="contained" color="primary" >
               تغییر رمز عبور
            </Button>
        </form>
    );
}
