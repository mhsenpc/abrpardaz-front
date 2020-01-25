import React from 'react';
import Grid from "../ProfileValidation/Page2";
import Paper from "@material-ui/core/Paper/Paper";
import Box from '@material-ui/core/Box';

export default function Overview() {
    return (
        <div>
            <Grid item xs={12} container
                  direction="row"
                  alignItems="center"
            >
                <Paper>
                    <Box width={700}>
                        <h2>Centos-8gb-nbg1-dc3-1</h2>
                       <span> <b>IPv4:</b>195.201.37.23</span>
                        <span> <b>IPv6:</b>2a01:4f8:1c0c:6b9f::/64</span>
                        <span> <b>Floating IPs:</b>78.46.229.42</span>
                    </Box>
                </Paper>
            </Grid>

        </div>
    )
}