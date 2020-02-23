import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from "@material-ui/core/Paper";
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Select from "@material-ui/core/Select";
import MenuItem from '@material-ui/core/MenuItem';

export default function Rebuild() {
    return (
        <div>
            <Grid item xs={12}>
                <Paper>
                    <Box width={700} p={1}>
                        <h1>نصب مجدد</h1>
                        <p>
                            در این بخش می توانید سیستم عامل سرور خود را مجددا نصب نمایید.
                        </p>
                        <p>
                            توجه: تمامی اطلاعات قبلی سرور حذف می گردد!
                        </p>
                        <Select>
                            <MenuItem>Ubuntu 16.04</MenuItem>
                            <MenuItem>Ubuntu 18.04</MenuItem>
                        </Select>
                        <br/>
                        <Button variant="contained" color="primary">نصب مجدد</Button>
                    </Box>
                </Paper>

            </Grid>

        </div>
    )
}