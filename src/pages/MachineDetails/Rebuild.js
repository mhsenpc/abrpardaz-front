import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from "@material-ui/core/Paper/Paper";
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Select from "@material-ui/core/Select";

export default function Rebuild() {
    return (
        <div>
            <Grid item xs={12}
                  direction="row"
                  alignItems="center"
                  style={{direction: "rtl"}}
            >
                <Box>
                    <Paper variant="outlined">
                        <Box width={700}>
                            <h1>نصب مجدد</h1>
                            <p>
                                در این بخش می توانید سیستم عامل سرور خود را مجددا نصب نمایید.
                            </p>
                            <p>
                                توجه: تمامی اطلاعات قبلی سرور حذف می گردد!
                            </p>
                            <Select
                                native>

                                <option>Ubuntu 16.04</option>
                                <option>Ubuntu 18.04</option>


                            </Select>
                            <br/>
                            <Button variant="contained" color="primary">نصب مجدد</Button>
                        </Box>
                    </Paper>
                </Box>
            </Grid>

        </div>
    )
}