import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {deepOrange} from '@material-ui/core/colors';
import axios from "axios";
import {api_base, ticketsList} from "../../Api";
import Button from "@material-ui/core/Button";
import AddIcon from '@material-ui/icons/AddBox';
import {createStyles, makeStyles, Theme} from "@material-ui/core";




const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        card: {
            minWidth: 275,
        },
        paper: {
            padding: theme.spacing(2),
            margin: 'auto',
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

        <div>


            <Button href={'/NewTicket'} variant="contained" color="primary">
                <AddIcon/>
                تیکت جدید
            </Button>


            <Paper className={classes.paper} >
            <Grid container spacing={3}>


                    {items.map(row => (
                        <Grid item xs={8} className='itemList'>

                            <Paper className={classes.paper}   >
                                <CardContent className={row.status} key={row.id} >
                                    <Typography className={classes.title}  color="textSecondary" gutterBottom>
                                        <a className='titleTicket' href={'/TicketDetails/' + row.id.toString()}>

                                            {row.title}
                                        </a>
                                    </Typography>
                                    <Typography className={classes.title} variant="h5" component="h2">
                                        {row.status}
                                    </Typography>
                                    <Typography className={classes.title} color="textSecondary">
                                        {(new JDate(new Date(row.created_at))).format('DD MMMM YYYY')}
                                    </Typography>
                                </CardContent>
                            </Paper>

                        </Grid>
                    ))}

                    {items.length == 0 &&
                    <p>
                        شما تاکنون تیکتی ایجاد نکرده اید
                    </p>
                    }



            </Grid>
            </Paper>

        </div>

    );
}

export default TicketList;