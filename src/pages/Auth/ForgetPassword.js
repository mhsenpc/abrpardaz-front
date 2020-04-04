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
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";


const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function ForgetPassword() {
    const [response, setResponse] = React.useState([]);
    const classes = useStyles();

    function RequestForgetPassword(event) {
        event.preventDefault();
        const {email} = event.currentTarget.elements;
        axios.post(api_base + forgetPassword, {email: email.value})
            .then(res => {
                setResponse(res.data)
            })
    }

    return (
        <Container component="main" maxWidth="xs">
            <title>فراموشی رمز عبور{user_title_postfix}</title>

            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    فراموشی رمز عبور
                </Typography>
                <form onSubmit={RequestForgetPassword} className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="پست الکترونیک"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>

                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        ارسال لینک فعال سازی
                    </Button>
                </form>
                <MessageBox response={response}/>
            </div>
        </Container>
    )
}
