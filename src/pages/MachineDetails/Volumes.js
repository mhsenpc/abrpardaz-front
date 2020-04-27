import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from "@material-ui/core/Paper";
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import {user_title_postfix} from "../../consts";

export default function Volumes() {
    return (
        <div>
            <title>دیسک ها{user_title_postfix}</title>

            <Grid item xs={12} >
                <Paper>
                    <Box p={1}>
                        <h2>دیسک ها</h2>
                        <p>
                            دیسک ها به شما توانایی اضافه کردن فضای سرور تا 100 گیگابایت را می دهند. شما می توانید دیسک را از سروری جدا کرده و به سرور دیگری متصل نمایید.
                        </p>
                        <img title={"این قابلیت در آینده راه اندازی می گردد"} src={"/images/coming-soon.jpg"} />
                    </Box>
                </Paper>
            </Grid>

        </div>
    )
}