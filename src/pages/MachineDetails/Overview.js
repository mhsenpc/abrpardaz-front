import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from "@material-ui/core/Paper/Paper";
import Box from '@material-ui/core/Box';

export default function Overview() {
    return (
        <div>
            <Grid item xs={12}
                  direction="row"
                  alignItems="center"
            >
                <div>
                    <h1>نمای کلی</h1>
                </div>
            </Grid>

        </div>
    )
}