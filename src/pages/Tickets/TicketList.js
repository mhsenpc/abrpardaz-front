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
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Pagination from '@material-ui/lab/Pagination';
import {user_title_postfix} from "../../consts";


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
    const [filter, setFilter] = React.useState('all');
    const [count, setCount] = React.useState(0);
    const [page, setPage] = React.useState(1);
    const JDate = require('jalali-date');

    function loadTicketsList() {
        axios.get(api_base + ticketsList + '?filter=' + filter + '&page=' + page)
            .then(res => {
                const list = res.data.pagination.data;

                setItems(list);
                setCount(res.data.pagination.last_page);
            })
    }

    React.useEffect(() => {
        loadTicketsList();
    }, [page, filter]);

    function changeFilter(event) {
        setFilter(event.target.value)
        setPage(1)
    }

    function handleChangePagination(event, newPage) {
        setPage(newPage);
    }

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <title>لیست تیکت ها{user_title_postfix}</title>

                <Paper className={classes.paper} style={{padding: 10}}>
                    <Grid container>
                        <Grid item xs={8} md={10}>
                            <h2>
                                پشتیبانی
                            </h2>
                        </Grid>
                        <Grid item xs={4} md={2}>
                            <Button href={'/NewTicket'} variant="contained" color="primary">
                                <AddBoxIcon/>
                                تیکت جدید
                            </Button>
                        </Grid>
                    </Grid>

                    {/*(sessionStorage.getItem('permissions') && sessionStorage.getItem('permissions').includes("Ticket Operator")) &&*/}
                    <Grid item xs={12}>
                        <Select onChange={changeFilter} value={filter}>
                            <MenuItem value="all">همه</MenuItem>
                            <MenuItem value='awaiting_reply'>انتظار پاسخ</MenuItem>
                            <MenuItem value='open'>باز</MenuItem>
                            <MenuItem value='answered'>پاسخ داده شده</MenuItem>
                            <MenuItem value='customer_reply'>پاسخ مشتری</MenuItem>
                            <MenuItem value='closed'>بسته شده</MenuItem>
                        </Select>
                    </Grid>


                    {items.map(row => (
                        <Grid item xs={12} key={row.id}>
                            <Card variant={"outlined"} className={classes.ticketItem}>
                                <CardContent key={row.id}>

                                    <Grid container>
                                        <Grid item xs={8}>

                                                <Typography variant={'h3'} className={classes.title} color="textSecondary"
                                                            gutterBottom>
                                                    {row.title}
                                                </Typography>

                                        </Grid>
                                        <Grid item xs={4}>
                                            <Typography className={classes.title} color="textSecondary">
                                                ایجاد شده در
                                                {(new JDate(new Date(row.created_at))).format('YYYY/MM/DD')}&nbsp;
                                                {new Date(row.created_at).toLocaleTimeString()}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>

                                <CardActions>
                                    <Button variant={"outlined"} color={"primary"}
                                            href={'/TicketDetails/' + row.id.toString()} size="small">بیشتر</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}

                    {items.length > 0 &&
                    <Pagination page={page} count={count} onChange={handleChangePagination} color="primary" className={'ltr'}/>
                    }

                    {items.length === 0 &&
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