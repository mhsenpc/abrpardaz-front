import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Alert from "@material-ui/lab/Alert/Alert";

export default function Dashboard() {
    return (
        <Paper>
            <Grid item xs={12}>

                <Box p={2}>
                    <Alert severity={"success"}>
                        به پنل کاربری خوش آمدید
                    </Alert>
                </Box>

            </Grid>

            <Grid container spacing={3} style={{padding: 10}}>
                <Grid item xs={4}>
                    <Grid item xs={12}>
                        <Paper variant={"outlined"}>
                            <Box p={2}>
                                <p>تعداد ماشین</p>
                                <p>5</p>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>

                <Grid item xs={4}>
                    <Grid item xs={12}>
                        <Paper variant={"outlined"}>
                            <Box p={2}>
                                <p>تعداد تصاویر آنی</p>
                                <p>5</p>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>

                <Grid item xs={4}>
                    <Grid item xs={12}>
                        <Paper variant={"outlined"}>
                            <Box p={2}>
                                <p>تعداد پروژه ها</p>
                                <p>5</p>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>

        </Paper>
    );
}
