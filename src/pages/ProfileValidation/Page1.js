
import React from 'react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


export default function Page1() {

        return (

            <div>

                <Grid item xs={12} container
                      direction="row"
                      alignItems="center"
                >
                    <Paper>

                        <Box  p={2} width={700}>

                            <TextField id="outlined-basic" label="نام" variant="outlined" />
                            <br/><br/>
                            <TextField id="outlined-basic" label="نام خانوادگی" variant="outlined" />
                            <br/><br/>

                            <TextField id="outlined-basic" label="کد ملی" variant="outlined" />

                        </Box>

                    </Paper>
                </Grid>

            </div>

        )

}


























