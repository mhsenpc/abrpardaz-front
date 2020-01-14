import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Copyright from "./CopyRight";
import {api_base, login, newTicket} from "../Api";
import axios from 'axios';


const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(http://www.mihanfal.com/wp-content/uploads/2017/04/3003925.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function sendLoginRequest(event) {
    event.preventDefault();
    axios.post(api_base + login, {
        firstName: 'Fred',
        lastName: 'Flintstone'
    })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}


function sendUser(event) {
    event.preventDefault();
    const {email, password} = event.currentTarget.elements;
    axios.post(api_base + login, {email: email.value, password: password.value})
        .then(res => {

            if (res.data.success == true) {
                const token = res.data.data.access_token;
                localStorage.setItem("token", token);
                alert('ورود با موفقیت انجام شد')
            } else {
                alert('نام کاربری یا رمز عبور اشتباه می باشد')
            }
        })
}


export default function Login() {


    const classes = useStyles();

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline/>
            <Grid item xs={false} sm={4} md={7} className={classes.image}/>
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        ورود کاربران
                    </Typography>
                    <form onSubmit={sendUser} className={classes.form} noValidate>
                        <TextField

                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="ایمیل"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="رمز عبور"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary"/>}
                            label="مرا به خاطر بسپار"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            ورود
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="/forgetPassword" variant="body2">
                                    فراموشی رمز عبور
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/register" variant="body2">
                                    {"حساب کاربری ندارید؟ ثبت نام"}
                                </Link>
                            </Grid>
                        </Grid>
                        <Box mt={5}>
                            <Copyright/>
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}
