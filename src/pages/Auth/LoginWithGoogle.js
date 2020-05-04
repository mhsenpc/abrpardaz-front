import React from 'react';

import {api_base, handleGoogleCallbackPath, verify} from "../../Api";
import Grid from '@material-ui/core/Grid';
import axios from "axios";
import CircularProgress from '@material-ui/core/CircularProgress';
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

export default function LoginWithGoogle() {
    const classes = useStyles();
    const [message, setMessage] = React.useState('');
    const [showLoading, setShowLoading] = React.useState(true);
    const [response, setResponse] = React.useState([]);


    function VerifyRequest(event) {
        let search = window.location.search;
        let params = new URLSearchParams(search);

        axios.get(api_base + handleGoogleCallbackPath, {
            params
        })
            .then(res => {
                setShowLoading(false);
                setResponse(res.data)
                if(res.data.success){
                    localStorage.clear();
                    localStorage.setItem('token', btoa(res.data.access_token));
                    localStorage.setItem('user_id', res.data.user_id);
                    localStorage.setItem('permissions', res.data.permissions);
                    window.location.href='/Dashboard';
                }
                else{
                    setMessage(res.data.message);
                }
            })
    }

    React.useEffect(() => {
        let search = window.location.search;
        let params = new URLSearchParams(search);

        if (params) {
            setTimeout(VerifyRequest, 3000);
        } else {
           window.location.href = '/Login';
        }

    }, []);

    return (
        <Container component="main" maxWidth="xs">
            <title>ورود با گوگل{user_title_postfix}</title>

            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    در حال بررسی اطلاعات
                </Typography>
                <form className={classes.form} noValidate>
                    {showLoading &&
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <center>
                                <CircularProgress/>
                            </center>
                        </Grid>
                    </Grid>
                    }
                    {!showLoading &&
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <center>
                                {message}
                            </center>
                        </Grid>
                    </Grid>
                    }
                </form>
                <MessageBox response={response}/>
            </div>
        </Container>
    )
}














