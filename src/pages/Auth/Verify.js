import React from 'react';

import {api_base, verify} from "../../Api";
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

export default function Verify() {
    const classes = useStyles();
    const [message, setMessage] = React.useState('');
    const [showLoading, setShowLoading] = React.useState(true);
    const [response, setResponse] = React.useState([]);


    function VerifyRequest(event) {
        let search = window.location.search;
        let params = new URLSearchParams(search);
        let email = params.get('email');
        let token = params.get('token');

        axios.post(api_base + verify, {email: email, token: token})
            .then(res => {
                setShowLoading(false);
                setMessage(res.data.message);
                setResponse(res.data)
            })
    }

    React.useEffect(() => {
        let search = window.location.search;
        let params = new URLSearchParams(search);
        let email = params.get('email');
        let token = params.get('token');

        if (token && email) {
            setTimeout(VerifyRequest, 3000);
        } else {
            window.location.href = '/Register';
        }

    }, []);

    return (
        <Container component="main" maxWidth="xs">
            <title>تایید ایمیل{user_title_postfix}</title>

            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    تایید ایمیل
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

                    <Grid container justify="flex-end">
                        <Grid item xs={1}>
                            <Link href="/login" variant="body2">ورود</Link>
                        </Grid>

                        <Grid item xs={2}>
                            <Link href="/Register" variant="body2">ثبت نام</Link>
                        </Grid>
                    </Grid>
                </form>
                <MessageBox response={response}/>
            </div>
        </Container>
    )
}














