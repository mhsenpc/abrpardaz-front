import React from 'react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import FormLabel from '@material-ui/core/FormLabel';
import Box from '@material-ui/core/Box';
import {sizing} from '@material-ui/system';
import {flexbox} from '@material-ui/system';
import {spacing} from '@material-ui/system';
import {makeStyles} from '@material-ui/core/styles';
import CloudIcon from '@material-ui/icons/Cloud';
import PlaceIcon from '@material-ui/icons/Place';
import Button from "@material-ui/core/Button";
import VpnKeyRoundedIcon from '@material-ui/icons/VpnKeyRounded';
import FileCopyRoundedIcon from '@material-ui/icons/FileCopyRounded';
import {useTheme, rgbToHex} from '@material-ui/core/styles';


export default function Confirm() {
    return (

        <div>

            <Grid item xs={12} container
                  direction="row"
                  alignItems="center"
            >
                <Paper>

                    <Box p={2} display="flex" justifyContent="flex-end">


                        <FormLabel>تایید نهایی سرور درخواستی</FormLabel>

                    </Box>

                    <paper variant="outlined">

                        <Box borderRadius={16} borderColor="grey.500" border={1} p={2} m={2} width={600}>

                            <p display="flex" justifyContent="flex-end">
                                <label>
                                    سیستم عامل
                                    <CloudIcon/>
                                </label>
                            </p>

                            <p>
                                <label>
                                    نرم افزار
                                    <CloudIcon/>
                                </label>
                            </p>


                            <label>
                                مشخصات سرور:C3.XLARGE
                                <FileCopyRoundedIcon/>
                            </label>
                            <br/>
                            <label>
                                مرکز داده:TEH-1
                                <CloudIcon/>
                            </label>
                            <br/>
                            <label>
                                ویژگی ها:
                                <CloudIcon/>
                            </label>
                            <br/>
                            <label>
                                کلید SSH:
                                <VpnKeyRoundedIcon/>
                            </label>


                        </Box>
                    </paper>



                </Paper>

            </Grid>


        </div>

    );


}































