import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from "axios";
import {api_base, register} from "../Api";
import Copyright from "./CopyRight";
import MessageBox from "./MessageBox";


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


export default function Register() {
    const classes = useStyles();
    const [response, setResponse] = React.useState([]);

    function registerUser(event) {
        event.preventDefault();
        const {email, password} = event.currentTarget.elements;
        axios.post(api_base + register, {email: email.value, password: password.value})
            .then(res => {
                setResponse(res.data);
            })
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    ثبت نام
                </Typography>
                <form onSubmit={registerUser} className={classes.form} noValidate>
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
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="رمز عبور"
                                type="password"
                                id="password"
                                autoComplete="current-password"
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
                        ثبت نام
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <span>قبلا ثبت نام کرده اید؟ </span>
                            <Link href="/login" variant="body2">ورود</Link>
                        </Grid>
                    </Grid>
                </form>
                <MessageBox response={response} />
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}
