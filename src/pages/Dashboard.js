import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';


export default function Dashboard() {
    return (
        <div>
            <Grid item xs={12} md={8} lg={9}>
                <Paper>
                    <p style={{display: "inline-block"}}>به پنل کاربری خوش آمدید</p>
                </Paper>
            </Grid>
        </div>
    );
}
