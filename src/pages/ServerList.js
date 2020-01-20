import React from 'react';
import {createStyles, makeStyles, Theme, useTheme} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/AddBox';
import CloudIcon from '@material-ui/icons/Cloud';
import axios from "axios";
import {api_base, machinesList} from "../Api";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";


const cardserverlist = makeStyles(theme => ({
    card: {
        display: 'flex',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 151,
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    playIcon: {
        height: 38,
        width: 38,
    },
}));

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

export default function ServerList() {
    const classes = useStyles();
    const cardlist = cardserverlist();
    const theme = useTheme();

    function removeMachine(id) {
        axios.delete(api_base + 'machines/' + id + '/remove')
            .then(res => {
                const msg = res.data.data.message;

                alert(msg)

            })
    }

    function showDetails(machine_id){
        window.location.href = '/server/' + machine_id.toString();
    }


    const [items, setItems] = React.useState([]);

    React.useEffect(() => {
        axios.get(api_base + machinesList)
            .then(res => {
                const list = res.data.data.list;

                setItems(list);
            })
    }, []);

    function Machines(props) {
        return (
            <div className={classes.root}>
                {items.map(row => (
                    <Card className={cardlist.card} >
                        <div className={cardlist.details} onClick={() => showDetails(row.id)}>
                            <CardContent className={cardlist.content}>
                                <Typography component="h5" variant="h5">
                                    {row.name}
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary">
                                    {row.image.name}{row.image.version}
                                </Typography>
                            </CardContent>

                        </div>
                        <CardMedia
                            className={cardlist.cover}
                            image="./images/vps.png"
                            onClick={() => showDetails(row.id)}
                        />
                        <a onClick={() => removeMachine(row.id)}>حذف ماشین</a>
                    </Card>
                ))}
            </div>
        )
    }

    function EmptyMachine(props){
        return (
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <Button variant="contained" color="primary" a href={"/createMachine"}>
                        ایجاد سرور
                        <AddIcon>+</AddIcon>
                    </Button>
                    <Grid>
                        سرور های شما
                    </Grid>
                </Paper>
                <Paper className={classes.paper}>
                    <Grid container spacing={3}>

                        <Grid item>
                            <CloudIcon className={classes.img}/>
                            <Grid item xs={3} sm container>
                                <Grid item xs container direction="column" spacing={3}>
                                    <Grid item>
                                        <Typography variant="body2" gutterBottom>
                                            به نظر میرسد در حال حاضر هیچ سروری ندارید.
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            به سادگی اولین سرور خود را ایجاد نمایید
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                    </Grid>
                </Paper>
            </div>
        )
    }

    if (items === undefined || items.length == 0){
        return <EmptyMachine />
    }
    else{
        return <Machines />
    }

}
