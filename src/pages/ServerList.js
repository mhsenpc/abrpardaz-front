import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/AddBox';
import axios from "axios";
import {api_base, machinesOfProject} from "../Api";
import CloudIcon from '@material-ui/icons/Cloud';
import Pusher from "pusher-js"
import {Paper} from "@material-ui/core";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import PowerIcon from '@material-ui/icons/Power';
import PowerOffIcon from '@material-ui/icons/PowerOff';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from "@material-ui/core/Backdrop";
import Echo from "laravel-echo";
import swal from "sweetalert";
import {user_title_postfix} from "../consts";


const useStyles = makeStyles(theme => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

export default function ServerList(props) {
    const classes = useStyles();
    const [backDropOpen, setBackDropOpen] = React.useState(true);

    function showDetails(machine_id) {
        window.location.href = '/server/' + machine_id.toString();
    }

    const [items, setItems] = React.useState([]);

    React.useEffect(() => {
        let id = props.match.params.id;
        loadMachines();

        function loadMachines() {
            axios.get(api_base + machinesOfProject + id.toString())
                .then(res => {
                    const list = res.data.list;
                    if (res.data.list)
                        setItems(list);
                    setBackDropOpen(false)
                })
        }

    }, []);

    const handleBackdropClose = () => {
        setBackDropOpen(false);
    };

    function ServerItem(props) {
        return (
            <Grid item xs={12} sm={4}>
                <Paper className={"boxItem serverItem"} onClick={() => showDetails(props.row.id)}>
                    <CloudIcon width={50} color={"primary"} fontSize={"large"}/>
                    <Typography>
                        {props.row.name}
                        {props.row.status === 'failed' &&
                        <HighlightOffIcon color={"error"}/>
                        }

                        {props.row.status === 'creating' &&
                        <CircularProgress/>
                        }

                        {props.row.status === 'power_on' &&
                        <PowerIcon style={{color: 'green'}}/>
                        }

                        {props.row.status === 'power_off' &&
                        <PowerOffIcon style={{color: 'brown'}}/>
                        }
                    </Typography>

                    <Typography variant="subtitle1" color="textSecondary">
                        {props.row.image.name} {props.row.image.version}
                    </Typography>
                </Paper>
            </Grid>
        )
    }

    return (
        <Grid container spacing={1}>
            <title>سرورها{user_title_postfix}</title>

            {items.map(row => (
                <ServerItem row={row}/>
            ))}

            <Grid item xs={12} sm={4}>
                <Paper className={"boxItem addItem"} onClick={() => window.location.href = '/createMachine'}>
                    <Typography color="textSecondary">
                        <AddIcon/>
                    </Typography>
                </Paper>
            </Grid>
            <Backdrop className={classes.backdrop} open={backDropOpen} onClick={handleBackdropClose}>
                <CircularProgress color="inherit"/>
            </Backdrop>
        </Grid>

    )
}
