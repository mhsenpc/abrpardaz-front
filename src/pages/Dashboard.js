import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';


export default function Dashboard() {
    return (
        <div>
            <Grid item xs={12} md={8} lg={9}>

                <Paper>
                    <Box p={2} width={700}>

                    <p style={{display: "inline-block"}}>به پنل کاربری خوش آمدید</p>

                    </Box>
                </Paper>

            </Grid>
        </div>
    );
}
