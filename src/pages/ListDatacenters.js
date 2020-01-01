import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import FormLabel from '@material-ui/core/FormLabel';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';



const useStyles = makeStyles({
    card: {
        maxWidth: 345,
    },
    media: {
        height: 140
    }
});




export default function ListDatacenters() {


    const classes = useStyles();


    return (

             <div>

                 <div>




                     <Grid item xs={12} container
                           direction="row"
                           justify="center"
                           alignItems="center"

                     >
                         <Grid item xs={6} container
                               direction="row"
                               justify="center"
                               alignItems="center">
                             <Paper>

                                 <Box textAlign="right" m={5}>
                                     <FormLabel  >لطفا مرکز داده مورد نظر را انتخاب نمایید</FormLabel>
                                 </Box>



                                 <Card className={classes.card}>

                                     <CardActionArea alignItems="flex-end">



                                         <CardMedia
                                             className={classes.media}
                                             image="./images/iranjpg.png"
                                             title="Contemplative Reptile"
                                         />



                                         <CardContent>
                                             <Typography textAlign="center" gutterBottom variant="h5" component="h2">
                                                 Tehran
                                             </Typography>



                                         </CardContent>


                                     </CardActionArea>

                                     <TextField
                                         id="filled-full-width"
                                         label="انتخاب شده"
                                         style={{ margin: 8 }}
                                         placeholder="1"
                                         helperText="1"
                                         margin="normal"
                                         InputLabelProps={{
                                             shrink: true,
                                         }}
                                         variant="filled"
                                     />



                                     <Button variant="outlined" color="primary">
                                         انتخاب نوع سیستم عامل
                                     </Button>



                                 </Card>








                             </Paper>
                         </Grid>




                     </Grid>

                 </div>

             </div>

        );


}















