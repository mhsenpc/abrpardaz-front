import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from "@material-ui/core/Paper/Paper";
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

export default function Volumes() {
    return (
        <div>
            <Grid item xs={12}
                  direction="row"
                  alignItems="center"
                  style={{direction: "rtl"}}
            >
                <Paper>
                    <Box width={700}>
                        <h1>دیسک ها</h1>
                        <p>
                            دیسک ها به شما توانایی اضافه کردن فضای سرور تا 100 گیگابایت را می دهند. شما می توانید دیسک را از سروری جدا کرده و به سرور دیگری متصل نمایید.
                        </p>

                        <Button variant="contained" color="primary">ساخت دیسک</Button>
                    </Box>
                </Paper>
            </Grid>

        </div>
    )
}