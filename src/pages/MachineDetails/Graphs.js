import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from "@material-ui/core/Paper/Paper";
import Box from '@material-ui/core/Box';

export default function Graphs() {
    return (
        <div>
            <Grid item xs={12}
                  direction="row"
                  alignItems="center"
            >
                <Paper>
                    <Box width={700}>
                        <h1>این صفحه در آینده راه اندازی می گردد</h1>
                    </Box>
                </Paper>
            </Grid>

        </div>
    )
}