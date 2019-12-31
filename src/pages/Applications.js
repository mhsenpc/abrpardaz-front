import React from 'react';

import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';

import FormLabel from '@material-ui/core/FormLabel';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { sizing } from '@material-ui/system';
import {makeStyles} from "@material-ui/core";

const applicationscard = makeStyles(theme => ({
    cover: {
        width: 151,
        height:151
    }

}));

export default function Applications() {

    const appcard = applicationscard();


     return (

         <div>


             <Box component="span" m={1} height="auto" width="auto" display="inline-block" >

                 <div>


                     <Paper variant="outlined" square >


                         <CardMedia
                             className={appcard.cover}
                             image="./images/live-from-space.jpg"
                             title="Live from space album cover"
                         />


                         <Paper>

                             <h3>Ubuntu 18.04</h3>

                         </Paper>

                     </Paper>


                 </div>

             </Box>


         </div>

     );

}

























