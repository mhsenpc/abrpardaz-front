import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import axios from "axios";
import {api_base, resetPassword} from "../../Api";
import Grid from '@material-ui/core/Grid';
import {user_title_postfix} from "../../consts";
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import MessageBox from "../MessageBox";

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


export default function ResetPassword() {
    const classes = useStyles();
    const [response, setResponse] = React.useState([]);

    function ResetPasswordSend(event) {
        let search = window.location.search;
        let params = new URLSearchParams(search);
        let email = params.get('email');
        let token = params.get('token');

        event.preventDefault();
        const {password, password_confirmation} = event.currentTarget.elements;
        axios.post(api_base + resetPassword, {
            email: email,
            token: token,
            password: password.value,
            password_confirmation: password_confirmation.value
        })
            .then(res => {
                setResponse(res.data);
                if (res.data.success) {
                    window.location.href = '/Login'
                }
            })
    }

    function getEmail() {
        let search = window.location.search;
        let params = new URLSearchParams(search);
        return params.get('email');
    }

    return (
        <Container component="main" maxWidth="xs">
            <title>بازنشانی رمز عبور{user_title_postfix}</title>
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    بازنشانی رمز عبور
                </Typography>
                <form onSubmit={ResetPasswordSend} className={classes.form}>
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
                                value={getEmail()}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="رمز عبور"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password_confirmation"
                                label="تایید رمز عبور"
                                type="password"
                                id="password_confirmation"
                                autoComplete="confirmation-password"
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
                        تغییر رمز
                    </Button>
                </form>
                <MessageBox response={response}/>
            </div>
        </Container>
    )
}
