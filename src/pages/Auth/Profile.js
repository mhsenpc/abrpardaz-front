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
import Avatar from '@material-ui/core/Avatar';
import NavigationIcon from '@material-ui/icons/Navigation';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite';


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
                            <Avatar alt="Remy Sharp" src="./images/3.jpg" />
                        </Grid>

                        <Grid item>
                            <FormLabel>نام:</FormLabel>
                            <TextField label="نام" variant="filled"/>
                        </Grid>

                        <Grid item>
                            <FormLabel>کد ملی:</FormLabel>
                            <TextField label="کد ملی" variant="filled"/>
                        </Grid>
                        <Grid ite   m>
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

                            <InputLabel id="demo-controlled-open-select-label">آدرس</InputLabel>

                            <TextField
                                id="filled-multiline-static"
                                label="Multiline"
                                multiline
                                rows="4"
                                defaultValue="Default Value"
                                variant="filled"
                            />

                            <Fab variant="extended">
                                <NavigationIcon  />
                                Navigate
                            </Fab>



                        </Grid>



                    </Grid>
                </Paper>
            </Grid>


        </div>
    );
}













