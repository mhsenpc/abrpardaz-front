import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { deepOrange } from '@material-ui/core/colors';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import axios from "axios";
import {api_base} from "../Api";


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
        textAlign:'right'
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


    const [ticket,setItems] = React.useState({replies:[]});

    React.useEffect(() => {
        let id = props.match.params.id;
        axios.get(api_base + 'tickets/' + id.toString() +'/show')
            .then(res => {
                const ticket = res.data.data.ticket;

                setItems(ticket);
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


                            <Card className={classes.card} variant="outlined">



                            <CardContent>


                                <div align="right">

                                    <p>جزئیات تیکت شما</p>


                                    <Avatar  alt="Remy Sharp" src="/broken-image.jpg" className={classes.orange}>
                                           M
                                    </Avatar>

                                <Typography variant="h5" className={classes.title} color="textSecondary" gutterBottom>
                                        {ticket.title}
                                </Typography>
                                <Typography className={classes.title} variant="h5" component="h2">
                                        {ticket.message}
                                </Typography>



                                    {ticket.replies.map(row => (

                                    <CardContent>


                                        <div align="right">

                                            <p>پاسخ</p>


                                            <Avatar  alt="Remy Sharp" src="/broken-image.jpg" className={classes.orange}>
                                                M
                                            </Avatar>

                                            <Typography variant="h5" className={classes.title} color="textSecondary" gutterBottom>
                                                {row.ticket_id}
                                            </Typography>
                                            <Typography className={classes.title} variant="h5" component="h2">
                                                {row.comment}
                                            </Typography>

                                        </div>


                                    </CardContent>

                                    ))}


                                </div>


                            </CardContent>



                            </Card>

                        </Box>

                    </Paper>
                </Grid>

            </div>

        )

}
export default TicketDetails;

























