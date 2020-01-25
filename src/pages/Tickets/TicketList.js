import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {deepOrange, red} from '@material-ui/core/colors';
import axios from "axios";
import {api_base, ticketsList} from "../../Api";


const cardticket = makeStyles(theme => ({
    card: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));


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
        textAlign: 'right'
    },
    pos: {
        marginBottom: 12,
    },
    orange: {
        backgroundColor: deepOrange[500],
    },
    border_color: {
        borderColor: '#f1f1f1'
    }
});


function TicketList() {

    const classes = useStyles();

    const [items, setItems] = React.useState([]);

    React.useEffect(() => {
        axios.get(api_base + ticketsList)
            .then(res => {
                const list = res.data.list;

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

                    <Box p={2} width={700}>

                        <Box width={200}>


                            <Card className={classes.card} variant="outlined">


                                {items.map(row => (
                                    <CardContent key={row.id}>
                                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                                            <a href={'/TicketDetails/' + row.id.toString()}>{row.title}</a>
                                        </Typography>
                                        <Typography className={classes.title} variant="h5" component="h2">
                                            {row.status}
                                        </Typography>
                                        <Typography className={classes.title} color="textSecondary">
                                            {row.created_at}
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

export default TicketList;