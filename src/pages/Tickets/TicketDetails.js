import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import {deepOrange, red} from '@material-ui/core/colors';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import axios from "axios";
import {api_base} from "../../Api";
import Button from "@material-ui/core/Button";
import MessageBox from "../MessageBox";


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

    React.useEffect(() => {
        let id = props.match.params.id;
        axios.get(api_base + 'Tickets/' + id.toString() + '/show')
            .then(res => {
                const ticket = res.data.ticket;

                setTicket(ticket);

            })
    }, []);


    function requestSendReply(event) {

        event.preventDefault();
        const {comment} = event.currentTarget.elements;
        let id = props.match.params.id;
        axios.post(api_base + 'Tickets/' + id.toString() + '/newReply', {comment: comment.value})
            .then(res => {
                setResponse(res.data)
            })
    }


    function requestCloseTicket() {

        let id = props.match.params.id;
        axios.put(api_base + 'Tickets/' + id.toString() + '/close')
            .then(res => {
                setResponse(res.data)
            })

    }

    return (

        <div>

            <Grid item xs={12} container
                  direction="row"
                  alignItems="center"
            >
                <Paper>

                    <Box p={2} width={700}>


                        <Card className={classes.card} variant="outlined">


                            <CardContent>


                                <div align="right">

                                    <p>جزئیات تیکت شما</p>


                                    <Avatar alt="Remy Sharp" src="/broken-image.jpg" className={classes.orange}>
                                        M
                                    </Avatar>

                                    <Typography variant="h5" className={classes.title} color="textSecondary"
                                                gutterBottom>
                                        {ticket.title}
                                    </Typography>
                                    <Typography className={classes.title} variant="h5" component="h2">
                                        {ticket.message}
                                    </Typography>


                                    {ticket.replies.map(row => (

                                        <CardContent key={row.id}>


                                            <div align="right">

                                                <p>پاسخ</p>


                                                <Avatar alt="Remy Sharp" src="/broken-image.jpg"
                                                        className={classes.orange}>
                                                    M
                                                </Avatar>

                                                <Typography variant="h5" className={classes.title} color="textSecondary"
                                                            gutterBottom>
                                                    {row.ticket_id}
                                                </Typography>
                                                <Typography className={classes.title} variant="h5" component="h2">
                                                    {row.comment}
                                                </Typography>


                                            </div>


                                        </CardContent>


                                    ))}


                                    <Box m={2}>

                                        <form onSubmit={requestSendReply}>

                                            <TextareaAutosize name='comment' rows={2}
                                                              rowsMax={4} aria-label="minimum height" rowsMin={3}
                                                              placeholder="Minimum 3 rows"/>

                                            <div>

                                                <Button type="submit" variant="contained">پاسخ</Button>
                                                <Button onClick={requestCloseTicket} variant="contained"
                                                        color="secondary">
                                                    بستن
                                                </Button>


                                            </div>
                                        </form>

                                    </Box>

                                </div>


                            </CardContent>


                        </Card>

                    </Box>

                </Paper>
            </Grid>

            <MessageBox response={response}/>
        </div>

    )

}

export default TicketDetails;

























