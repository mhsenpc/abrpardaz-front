import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import {api_base, api_host, getOneCaptcha, login} from "../../Api";
import axios from 'axios';
import MessageBox from "../MessageBox";
import {user_title_postfix} from "../../consts";
import EmailIcon from '@material-ui/icons/Email';
import ReplayIcon from '@material-ui/icons/Replay';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import InputAdornment from "@material-ui/core/InputAdornment";
import {redirectToGoogle} from "../../Helpers";
import LockIcon from '@material-ui/icons/Lock';


const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(images/back.jpg)',
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


export default function Login() {
    const classes = useStyles();
    const [response, setResponse] = React.useState([]);
    const [captchaUrl, setCaptchaUrl] = React.useState('');
    const [captchaKey, setCaptchaKey] = React.useState('');
    const [captcha, setCaptcha] = React.useState('');

    React.useEffect(() => {
        loadCaptcha();
    }, []);

    function loadCaptcha() {
        axios.get(api_host + '/' + getOneCaptcha)
            .then(res => {
                setCaptchaUrl(res.data.img);
                setCaptchaKey(res.data.key);
            });
    }

    function sendUser(event) {
        event.preventDefault();
        const {email, password} = event.currentTarget.elements;
        axios.post(api_base + login, {email: email.value, password: password.value, captcha: captcha, ckey: captchaKey})
            .then(res => {
                setResponse(res.data);
                if (res.data.success) {
                    const token = res.data.access_token;
                    localStorage.clear();
                    localStorage.setItem("token", btoa(token));
                    localStorage.setItem("user_id", res.data.user_id);
                    localStorage.setItem("permissions", res.data.permissions);
                    window.location.href = '/Dashboard';
                } else {
                    loadCaptcha();
                    setCaptcha('')
                }
            })
    }


    return (
        <Grid container component="main" className={classes.root}>
            <title>ورود کاربران{user_title_postfix}</title>
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
                    <form onSubmit={sendUser} className={classes.form}>
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
                            InputProps={{
                                endAdornment: <InputAdornment
                                    position="end"><EmailIcon color={"disabled"}/></InputAdornment>,
                            }}
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
                            InputProps={{
                                endAdornment: <InputAdornment
                                    position="end"><LockIcon color={"disabled"}/></InputAdornment>,
                            }}
                        />
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
                                    InputProps={{
                                        endAdornment: <InputAdornment
                                            position="end"><VpnKeyIcon color={"disabled"}/></InputAdornment>,
                                    }}
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
                            ورود
                        </Button>
                        <Button
                            type="button"
                            onClick={redirectToGoogle}
                            fullWidth
                            variant="contained"
                            style={{backgroundColor: 'rgb(66,134,245)', color: 'white'}}
                            className={classes.submit}
                        >
                            ورود با گوگل
                            &nbsp;
                            <img src={"/images/google.png"} width={24}/>
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="/forgetPassword" variant="body2">
                                    فراموشی رمز عبور
                                </Link>
                            </Grid>
                            <Grid item>
                                <span>حساب کاربری ندارید؟</span>
                                <Link href="/Register" variant="body2">
                                    {" ثبت نام"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <MessageBox response={response}/>
            </Grid>
        </Grid>
    );
}
