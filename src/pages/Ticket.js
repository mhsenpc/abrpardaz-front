import React from 'react';
import Button from "@material-ui/core/Button";
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
    }
});

function Ticket() {

    const classes = useStyles();
    const card_ticket = cardticket();

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };



    const bull = <span className={classes.bullet}>•</span>;

    return (

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
                                  <CardContent>
                                      <Typography className={classes.title} color="textSecondary" gutterBottom>
                                          موضوع 1
                                      </Typography>
                                      <Typography className={classes.title} variant="h5" component="h2">
                                          Mohammad
                                      </Typography>
                                      <Typography className={classes.title} className={classes.pos} color="textSecondary">
                                          59 روز پیش
                                      </Typography>
                                  </CardContent>

                                  <CardContent>
                                      <Typography className={classes.title} color="textSecondary" gutterBottom>
                                          موضوع 1
                                      </Typography>
                                      <Typography className={classes.title} variant="h5" component="h2">
                                          Nik
                                      </Typography>
                                      <Typography className={classes.title} className={classes.pos} color="textSecondary">
                                          59 روز پیش
                                      </Typography>
                                  </CardContent>

                              </Card>
                              </Box>


                              <Box  width={600} mt={2}>

                                  <Card  className={classes.card} variant="outlined">

                                      <Box border={1} className={classes.border_color} borderRadius="borderRadius">
                                      <CardContent >


                                          <div align="right">
                                          <Avatar  alt="Remy Sharp" src="/broken-image.jpg" className={classes.orange}>
                                              M
                                          </Avatar>


                                          <Typography className={classes.title} variant="h5" component="h2">
                                              Mohammad
                                          </Typography>

                                          <p>
                                              سرورم روشن نمیشه
                                          </p>
                                          </div>

                                          <Typography className={classes.title} className={classes.pos} color="textSecondary">
                                             47:78-c-47:78-c25.22.3725.22.37
                                          </Typography>

                                      </CardContent>
                                      </Box>

                                      <Box border={1} mt={2}  borderRadius="borderRadius">
                                      <CardContent>

                                          <div align="right">
                                          <Avatar  alt="Remy Sharp" src="/broken-image.jpg" className={classes.orange}>
                                              M
                                          </Avatar>

                                          <Typography className={classes.title} variant="h5" component="h2">
                                              Mohammad
                                          </Typography>
                                          <p>
                                              سرورم روشن نمیشه
                                          </p>
                                          </div>

                                          <Typography className={classes.title} className={classes.pos} color="textSecondary">
                                              47:78-c-47:78-c25.22.3725.22.37
                                          </Typography>
                                      </CardContent>
                                      </Box>

                                  </Card>


                          </Box>

                        <Box m={2}>

                            <TextareaAutosize rows={2}
                                               rowsMax={4} aria-label="minimum height" rowsMin={3} placeholder="Minimum 3 rows" />

                            <div>

                            <Button variant="contained">پاسخ</Button>
                            <Button variant="contained" color="secondary">
                               بستن
                            </Button>


                            </div>

                        </Box>







                    </Box>

                </Paper>


            </Grid>



        </div>

    );
}

export default Ticket;