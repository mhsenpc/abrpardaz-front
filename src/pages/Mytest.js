import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Button from "@material-ui/core/Button";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';

import axios from "axios";
import {api_base, ticketsList} from "../Api";




function Mytest() {

    const [items,setItems] = React.useState([]);

    React.useEffect(() => {
        axios.get(api_base + ticketsList)
            .then(res => {
                const list = res.data.data.list;

                setItems(list);
            })
    }, []);
    return(

        <div>
            <Grid item xs={12} container
                  direction="row"
                  alignItems="center"
            >
                <Paper>

                    <Box  p={2} width={700}>

                        <Box bgcolor="info.main" p={2}>
                            این تیکت بسته شده.شما میتوانید به سادگی با پاسخ دادن این تیکت را به جریان بیاندازید
                        </Box>

                        <Box width={200}  >


                            <Card className={classes.card} variant="outlined">


                                {items.map(row => (
                                    <CardContent>
                                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                                            {row.title}
                                        </Typography>
                                        <Typography className={classes.title} variant="h5" component="h2">
                                            {row.status}
                                        </Typography>
                                        <Typography className={classes.title} className={classes.pos} color="textSecondary">
                                            {row.created_at}
                                        </Typography>
                                        <Typography className={classes.title} className={classes.pos} color="textSecondary">
                                            <a href={'/TicketDetails/' + row.id.toString() } >جزئیات</a>
                                        </Typography>
                                    </CardContent>
                                ))}


                            </Card>
                        </Box>



                    </Box>
                </Paper>
            </Grid>
        </div>


    );
}
export default Mytest;