import React from 'react';

import {api_base, verify} from "../Api";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import axios from "axios";
import CircularProgress from '@material-ui/core/CircularProgress';
import MessageBox from "./MessageBox";


export default function Verify() {
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
                if (res.data.success) {
                    const msg = res.data.error.message;

                    setShowLoading(false);
                    setMessage(msg);
                }
                else{
                    setResponse(res.data)
                }
            })
    }

    React.useEffect(() => {
        setTimeout(VerifyRequest, 3000);

    }, []);

    if (showLoading) {
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

                <MessageBox response={response} />

            </div>

        )
    } else {
        return (
            <span>{message}</span>
        )
    }
}














