import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import axios from "axios";
import {api_base, api_host, forgetPassword, getOneCaptcha} from "../../Api";
import Grid from '@material-ui/core/Grid';
import MessageBox from "../MessageBox";
import {user_title_postfix} from "../../consts";
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import ReplayIcon from "@material-ui/icons/Replay";
import swal from 'sweetalert';
import InputAdornment from "@material-ui/core/InputAdornment";
import LockIcon from "@material-ui/icons/Lock";
import EmailIcon from "@material-ui/icons/Email";


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
    const [captchaUrl, setCaptchaUrl] = React.useState('');
    const [captchaKey, setCaptchaKey] = React.useState('');
    const [captcha, setCaptcha] = React.useState('');

    function RequestForgetPassword(event) {
        event.preventDefault();
        const {email} = event.currentTarget.elements;
        axios.post(api_base + forgetPassword, {email: email.value, captcha: captcha, ckey: captchaKey})
            .then(res => {
                setResponse(res.data)
                if (res.data.success === true) {
                    swal(res.data.message,'','success').then(function(){
                        window.location.href=  "/Login";
                    });
                }
                else{
                    loadCaptcha();
                    setCaptcha('')
                }
            })
    }

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

    return (
        <Container component="main" maxWidth="xs">
            <title>?????????????? ?????? ????????{user_title_postfix}</title>

            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    ?????????????? ?????? ????????
                </Typography>
                <form onSubmit={RequestForgetPassword} className={classes.form}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="?????? ??????????????????"
                                name="email"
                                autoComplete="email"
                                InputProps={{
                                    endAdornment: <InputAdornment
                                        position="end"><EmailIcon color={"disabled"} /></InputAdornment>,
                                }}
                            />
                        </Grid>

                    </Grid>
                    <br/>
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <TextField
                                variant="outlined"
                                required
                                id="captcha"
                                label="???? ???? ???????? ????????"
                                name="captcha"
                                value={captcha}
                                onChange={(event) => setCaptcha(event.target.value)}
                                InputProps={{
                                    endAdornment: <InputAdornment
                                        position="end"><LockIcon color={"disabled"} /></InputAdornment>,
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
                        ?????????? ???????? ???????? ????????
                    </Button>
                </form>
                <MessageBox response={response}/>
            </div>
        </Container>
    )
}
