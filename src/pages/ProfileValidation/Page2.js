
import React from 'react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


export default function Page2() {

    return (

        <div>

            <Grid item xs={12} container
                  direction="row"
                  alignItems="center"
            >
                <Paper>

                    <Box  p={2} width={700}>

                        <label p={2}>تلفن همراه</label>

                        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                        <Button variant="contained">ارسال کد</Button>
                        <br/><br/>
                        <label p={2}>تلفن ثابت</label>
                        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                        <Button variant="contained">ارسال کد</Button>


                    </Box>

                </Paper>
            </Grid>

        </div>

    )

}


























