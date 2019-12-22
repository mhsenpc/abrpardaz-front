import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            margin: 'auto',
            maxWidth: 500,
        },
        image: {
            width: 128,
            height: 128,
        },
        img: {
            margin: 'auto',
            display: 'block',
            maxWidth: '100%',
            maxHeight: '100%',
        },
    }),
);

export default function Server() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Button variant="contained" color="primary">
                   ایجاد سرور +
                </Button>
                <Grid>
                   سرور های شما
                </Grid>
            </Paper>
            <Paper className={classes.paper}>
                <Grid container spacing={3}>

                    <Grid item>
                        <ButtonBase className={classes.image}>
                            <img className={classes.img} alt="complex" src="./images/3.jpg" />
                        </ButtonBase>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" spacing={12}>
                                <Grid item >
                                    <Typography variant="body2" gutterBottom>
                                        به نظر میرسد در حال حاضر هیچ سروری ندارید.
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        به سادگی اولین سرور خود را ایجاد نمایید
                                    </Typography>
                                </Grid>
                            </Grid>

                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="primary">
                                ایجاد سرور
                            </Button>
                        </Grid>
                    </Grid>

                </Grid>
            </Paper>
        </div>
    );
}
