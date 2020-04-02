import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {deepOrange, red} from '@material-ui/core/colors';
import axios from "axios";
import {api_base} from "../../Api";
import Button from "@material-ui/core/Button";
import MessageBox from "../MessageBox";
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import TextField from "@material-ui/core/TextField";
import {user_title_postfix} from "../../consts";

const useStyles = makeStyles({
    card: {
        maxWidth: 345,
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
    },

    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',

    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },


});


function TicketDetails(props) {

    const classes = useStyles();
    const [ticket, setTicket] = React.useState({replies: []});
    const [response, setResponse] = React.useState([]);
    const JDate = require('jalali-date');

    function loadTicket() {
        let id = props.match.params.id;
        axios.get(api_base + 'tickets/' + id.toString() + '/show')
            .then(res => {
                const ticket = res.data.ticket;
                setTicket(ticket);
            })
    }

    React.useEffect(() => {
        loadTicket();
    }, []);


    function requestSendReply(event) {

        event.preventDefault();
        const {comment} = event.currentTarget.elements;
        let id = props.match.params.id;
        axios.post(api_base + 'tickets/' + id.toString() + '/newReply', {comment: comment.value})
            .then(res => {
                setResponse(res.data);
                comment.value = "";
                loadTicket();
            })
    }


    function requestCloseTicket() {

        let id = props.match.params.id;
        axios.put(api_base + 'tickets/' + id.toString() + '/close')
            .then(res => {
                setResponse(res.data)
            })

    }

    return (
        <div>
            <title>جزئیات تیکت {ticket.ticket_id} {user_title_postfix}</title>

            <Grid container>
                <Grid item xs={12}>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link color="inherit" href="/tickets">
                            پشتیبانی
                        </Link>
                        <Typography color="textPrimary">{ticket.ticket_id}</Typography>
                    </Breadcrumbs>


                    <Paper style={{padding: 10}}>

                        <h2>
                            {ticket.title}
                        </h2>

                        <Typography className={classes.title} variant="h5" component="h2">
                            {ticket.message}
                        </Typography>

                        <Typography color={"textSecondary"} variant={"caption"}>
                            نوشته شده در:
                            {(new JDate(new Date(ticket.created_at))).format('YYYY/MM/DD')}&nbsp;
                            {new Date(ticket.created_at).toLocaleTimeString()}
                        </Typography>
                        <br/>
                        <br/>
                        <Grid container>
                            {ticket.replies.map(row => (
                                <Grid item xs={12}>
                                    <Paper variant={"outlined"} style={{padding: 10}}>
                                        <Typography variant="h5" className={classes.title} color="textSecondary"
                                                    gutterBottom>
                                            {(row.user.profile.first_name || row.user.profile.last_name) &&
                                            row.user.profile.first_name + ' ' + row.user.profile.last_name
                                            }
                                            {(!(row.user.profile.first_name || row.user.profile.last_name)) &&
                                            row.user.email
                                            }
                                        </Typography>
                                        <Typography className={classes.title} variant="h5" component="h2">
                                            {row.comment}
                                        </Typography>
                                        <Typography color={"textSecondary"} variant={"caption"}>
                                            نوشته شده در:
                                            {(new JDate(new Date(row.created_at))).format('YYYY/MM/DD')}&nbsp;
                                            {new Date(row.created_at).toLocaleTimeString()}
                                        </Typography>


                                        <br/>
                                    </Paper>
                                </Grid>

                            ))}
                        </Grid>

                        <br/>
                        <form onSubmit={requestSendReply}>
                            <p>پرسش دیگری دارید؟</p>
                            <Grid item xs={12}>
                                <TextField name="comment" variant="outlined" multiline
                                />
                            </Grid>

                            <div>

                                <Button type="submit" variant="contained" color={"primary"}>پاسخ</Button>
                                &nbsp;
                                <Button onClick={requestCloseTicket} variant="contained"
                                        color="secondary">
                                    بستن
                                </Button>


                            </div>
                        </form>


                    </Paper>
                </Grid>
            </Grid>

            <MessageBox response={response}/>
        </div>

    )

}

export default TicketDetails;