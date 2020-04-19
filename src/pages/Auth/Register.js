import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from "axios";
import {api_base, api_host, getOneCaptcha, register} from "../../Api";
import MessageBox from "../MessageBox";
import {user_title_postfix} from "../../consts";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import {OutlinedInput} from "@material-ui/core";
import InputLabel from '@material-ui/core/InputLabel';
import ReplayIcon from "@material-ui/icons/Replay";
import swal from "sweetalert";

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
    const [captchaUrl, setCaptchaUrl] = React.useState('');
    const [captchaKey, setCaptchaKey] = React.useState('');
    const [captcha, setCaptcha] = React.useState('');
    const [showPassword, setShowPassword] = React.useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = React.useState(false);

    React.useEffect(() => {
        loadCaptcha();
    }, []);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleClickShowPasswordConfirm = () => {
        setShowPasswordConfirm(!showPassword);
    };

    const handleMouseDownPasswordConfirm = (event) => {
        event.preventDefault();
    };

    function loadCaptcha() {
        axios.get(api_host + '/' + getOneCaptcha)
            .then(res => {
                setCaptchaUrl(res.data.img);
                setCaptchaKey(res.data.key);
            });
    }

    function registerUser(event) {
        event.preventDefault();
        const {email, password,password_confirmation} = event.currentTarget.elements;
        axios.post(api_base + register, {email: email.value, password: password.value,password_confirmation:password_confirmation.value,captcha: captcha,ckey:captchaKey})
            .then(res => {
                if(res.data.success === true){
                    window.location.href = "/WaitForConfirmation";
                }
                else{
                    setCaptcha('')
                    loadCaptcha();
                    setResponse(res.data);
                }
            })
    }

    return (
        <Container component="main" maxWidth="xs" >
            <title>ثبت نام کاربران{user_title_postfix}</title>
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    ثبت نام
                </Typography>
                <Typography component="h7" color={"textSecondary"} >
                    لطفا آدرس ایمیل و رمز دلخواه خود را وارد کنید
                </Typography>
                <form onSubmit={registerUser} className={classes.form}>
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
                            <div>
                                <InputLabel htmlFor="password">رمز عبور</InputLabel>
                                <OutlinedInput
                                    variant="outlined"
                                    label={"رمز عبور"}
                                    required
                                    fullWidth
                                    name="password"
                                    id="password"
                                    autoComplete="password"
                                    type={showPassword ? 'text' : 'password'}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {showPassword ? <Visibility/> : <VisibilityOff/>}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </div>
                        </Grid>

                        <Grid item xs={12}>
                            <div>
                                <InputLabel htmlFor="password">تکرار رمز عبور</InputLabel>
                                <OutlinedInput
                                    variant="outlined"
                                    label={"تکرار رمز عبور"}
                                    required
                                    fullWidth
                                    name="password_confirmation"
                                    id="password_confirmation"
                                    autoComplete="password"
                                    type={showPasswordConfirm ? 'text' : 'password'}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPasswordConfirm}
                                                onMouseDown={handleMouseDownPasswordConfirm}
                                            >
                                                {showPasswordConfirm ? <Visibility/> : <VisibilityOff/>}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </div>
                        </Grid>
                    </Grid>
                    <br/>
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <TextField
                                variant="outlined"
                                required
                                id="captcha"
                                label="کد را وارد کنید"
                                name="captcha"
                                value={captcha}
                                onChange={(event) => setCaptcha(event.target.value)}
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <img src={captchaUrl}/>
                        </Grid>
                        <Grid item xs={2}>
                            <Button onClick={loadCaptcha} variant={"outlined"}>
                                <ReplayIcon/>
                            </Button>
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
                <MessageBox response={response}/>
            </div>
        </Container>
    );
}
