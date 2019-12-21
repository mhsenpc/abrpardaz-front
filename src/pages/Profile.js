import React from 'react';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';


export default function Profile() {


    return (
        <div>

            <Grid item xs={12} container
                  direction="row"
                  justify="center"
                  alignItems="center">
                <Paper>
                    <Grid xs={6}>
                        <Grid item>
                            <FormLabel>نام:</FormLabel>
                            <TextField label="نام" variant="filled"/>
                        </Grid>

                        <Grid item>
                            <FormLabel>کد ملی:</FormLabel>
                            <TextField label="کد ملی" variant="filled"/>
                        </Grid>
                        <Grid item>
                            <FormLabel>کد پستی:</FormLabel>
                            <TextField label="کد پستی" variant="filled"/>
                        </Grid>
                        <Grid item>
                            <FormLabel>تاریخ تولد:</FormLabel>

                            <FormControl>
                                <InputLabel id="demo-controlled-open-select-label">Age</InputLabel>
                                <Select
                                    labelId="demo-controlled-open-select-label"
                                    id="demo-controlled-open-select"
                                    value={'age'}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>

                        </Grid>


                    </Grid>
                </Paper>
            </Grid>


        </div>
    );
}













