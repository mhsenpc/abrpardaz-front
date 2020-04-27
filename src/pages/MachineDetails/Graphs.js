import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from "@material-ui/core/Paper";
import Box from '@material-ui/core/Box';
import {user_title_postfix} from "../../consts";

export default function Graphs() {
    return (
        <div>
            <title>نمودار{user_title_postfix}</title>

            <Grid item xs={12}>
                <Paper>
                    <Box p={1}>
                        <h2>نمودار</h2>
                        <img title={"این قابلیت در آینده راه اندازی می گردد"} src={"/images/coming-soon.jpg"} />
                    </Box>
                </Paper>
            </Grid>
        </div>
    )
}