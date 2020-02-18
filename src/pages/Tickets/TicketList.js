import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import axios from "axios";
import {api_base, ticketsList} from "../../Api";
import Button from "@material-ui/core/Button";
import AddBoxIcon from '@material-ui/icons/AddBox';
import {createStyles, makeStyles, Theme} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        ticketItem: {
            marginBottom: 5
        },
        title: {
            fontSize: 14,
            textAlign: 'right'
        },
    }));


function TicketList() {

    const classes = useStyles();

    const [items, setItems] = React.useState([]);
    const JDate = require('jalali-date');

    React.useEffect(() => {
        axios.get(api_base + ticketsList)
            .then(res => {
                const list = res.data.list;

                setItems(list);
            })
    }, []);


    return (

        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <Button href={'/NewTicket'} variant="contained" color="primary">
                        <AddBoxIcon/>
                        تیکت جدید
                    </Button>


                    {items.map(row => (
                        <Grid item xs={10}>
                            <Card variant={"outlined"} className={classes.ticketItem}>
                                <CardContent key={row.id}>
                                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                                        <Grid container>
                                            <Grid item xs={3}>
                                                <a className='titleTicket'>
                                                    {row.title}
                                                </a>
                                            </Grid>
                                            <Grid item xs={5}></Grid>
                                            <Grid item xs={4}>
                                                <Typography className={classes.title} color="textSecondary">
                                                    ایجاد شده در
                                                    {(new JDate(new Date(row.created_at))).format('DD MMMM YYYY')}&nbsp;
                                                    {new Date(row.created_at).toLocaleTimeString()}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Typography>

                                </CardContent>

                                <CardActions>
                                    <Button variant={"outlined"} color={"primary"}
                                            href={'/TicketDetails/' + row.id.toString()} size="small">بیشتر</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}

                    {items.length == 0 &&
                    <Alert severity="info">
                        شما تاکنون تیکتی ایجاد نکرده اید
                    </Alert>
                    }
                </Paper>
            </Grid>
        </Grid>

    );
}

export default TicketList;