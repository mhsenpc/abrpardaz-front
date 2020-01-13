import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import axios from "axios";
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {api_base, plansList, ticketsList} from "../../Api";
import Ticket from "../Ticket";


const useStyles = makeStyles({
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});


function Plans() {

    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    const [items,setItems] = React.useState([]);

    React.useEffect(() => {
        axios.get(api_base + plansList)
            .then(res => {
                const list = res.data.data.list;

                setItems(list);
            })
    }, []);

    return (
        <div>
            <Grid item xs={12} container
                  direction="row"
                  alignItems="center"
            >
                <Paper>

                    <Box  p={2} width={700}>



                        <Card className={classes.card}>
                            {items.map(row => (
                            <CardContent>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    <p>{row.name}</p>
                                </Typography>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    <p>vcpu: {row.vcpu}</p>
                                </Typography>
                                <Typography variant="h5" component="h2">
                                    <p>
                                        <p>2: {row.ram} GB</p>
                                    </p>
                                </Typography>
                                <Typography className={classes.pos} color="textSecondary">
                                        <p>Disk: {row.disk} GB</p>
                                </Typography>
                                <Typography variant="body2" component="p">
                                    <p> ترافیک نا محدود </p>
                                    <br />

                                </Typography>

                            </CardContent>
                            ))}

                        </Card>



                    </Box>


                </Paper>
            </Grid>
        </div>
    );
}
export default Plans;