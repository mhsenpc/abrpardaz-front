import React from 'react';

import {api_base, verify} from "../../Api";
import axios from "axios";
import CircularProgress from '@material-ui/core/CircularProgress';
import {user_title_postfix} from "../../consts";
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import swal from "sweetalert";
import Backdrop from "@material-ui/core/Backdrop";

const useStyles = makeStyles(theme => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

export default function Verify() {
    const classes = useStyles();
    const [backDropOpen, setBackDropOpen] = React.useState(true);


    function VerifyRequest(event) {
        let search = window.location.search;
        let params = new URLSearchParams(search);
        let email = params.get('email');
        let token = params.get('token');

        axios.post(api_base + verify, {email: email, token: token})
            .then(res => {
                if (res.data.success) {
                    sessionStorage.setItem('token', btoa(res.data.token));
                    sessionStorage.setItem('user_id', res.data.user_id);
                    sessionStorage.setItem('permissions', res.data.permissions);
                    window.localStorage.clear();
                    window.location.href = '/ProfileValidationWizard'
                } else {
                    swal(res.data.message, '', 'error')
                }
            })
    }

    React.useEffect(() => {
        let search = window.location.search;
        let params = new URLSearchParams(search);
        let email = params.get('email');
        let token = params.get('token');

        if (token && email) {
            setTimeout(VerifyRequest, 500);
        } else {
            window.location.href = '/Register';
        }

    }, []);

    return (
        <Container component="main" maxWidth="xs">
            <title>تایید ایمیل{user_title_postfix}</title>

            <Backdrop className={classes.backdrop} open={backDropOpen}>
                <CircularProgress color="inherit"/>
            </Backdrop>
        </Container>
    )
}














