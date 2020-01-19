import React from 'react';

import {api_base, machinesList, resetPassword, verify} from "../Api";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import axios from "axios";
import CircularProgress from '@material-ui/core/CircularProgress';




export default function Verify() {
    const [message, setMessage] = React.useState('');
    const [showloading, setShowloading] = React.useState(true);

    function VerifyRequest(event) {
        let search = window.location.search;
        let params = new URLSearchParams(search);
        let email = params.get('email');
        let token = params.get('token');

        axios.post(api_base + verify, {email: email, token: token})
            .then(res => {
                console.log(res.data)
                const msg = res.data.error.message;

                setShowloading(false);
                setMessage(msg);

            })
    }

    React.useEffect(() => {
        setTimeout(VerifyRequest, 3000);

    }, []);

    if (showloading == true) {
        return (

            <div>

                <Grid item xs={12} container
                      direction="row"
                      alignItems="center"
                >
                    <Paper>

                        <Box p={2} width={700}>

                              <span>
                                <CircularProgress/>
                              </span>

                        </Box>
                    </Paper>
                </Grid>

            </div>

        )
    } else {
        return (
            <spna>{message}</spna>
        )
    }
}














