import React from 'react';
import {createStyles, makeStyles, Theme, useTheme} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/AddBox';
import axios from "axios";
import {api_base, machinesOfProject} from "../Api";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import CancelIcon from '@material-ui/icons/Cancel';
import CardActions from "@material-ui/core/CardActions";
import CloudIcon from '@material-ui/icons/Cloud';
import Pusher from "pusher-js"
import {Paper} from "@material-ui/core";

const cardserverlist = makeStyles(theme => ({
    card: {
        display: 'flex',
    },
    cardwidth: {
        width: '100%'
    },
    details: {
        display: 'flex',
        flexDirection: 'row',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 151,
        height: 135
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


export default function ServerList(props) {
    const classes = useStyles();
    const cardlist = cardserverlist();
    const theme = useTheme();
    const [response, setResponse] = React.useState([]);

    function showDetails(machine_id) {
        window.location.href = '/server/' + machine_id.toString();
    }

    const [items, setItems] = React.useState([]);

    React.useEffect(() => {
        let id = props.match.params.id;
        axios.get(api_base + machinesOfProject + id.toString())
            .then(res => {
                const list = res.data.list;

                setItems(list);
            })

        var channel = window.Echo.channel('private-project-' + id.toString());
        channel.listen('.server.created', function (data) {
            alert(JSON.stringify(data));
            //TODO: update machine which its creation process is completed
        });
    }, []);

    function ServerItem(props) {
        const [editMode, setEditMode] = React.useState(false);
        const [name, setName] = React.useState('');

        function requestRenameMachine(id) {
            axios.post(api_base + "machines/" + id.toString() + "/rename", {name: name})
                .then(res => {
                    setResponse(res.data)
                    setEditMode(false);
                })
        }

        React.useEffect(() => {
            setName(props.row.name)
        }, []);

        function cancelRename() {
            setEditMode(false);
            setResponse([]);
        }

        return (
            <Grid item xs={3}>
                <Card key={props.row.id} style={{textAlign: "center"}}>
                    <div onClick={() => setEditMode(true)} className='itemList'>
                        <CardContent>
                            <CloudIcon width={50} color={"primary"} fontSize={"large"}/>
                            {editMode === false &&
                            <Typography component="h5" variant="h5">
                                {props.row.name}
                            </Typography>
                            }
                            {editMode === true &&
                            <div>
                                <TextField
                                    id="outlined-full-width"
                                    name="name"
                                    label="نام جدید"
                                    placeholder=""
                                    variant="outlined"
                                    value={name}
                                    onChange={event => setName(event.target.value)}
                                />
                                <Button variant="contained" color="primary"
                                        onClick={() => requestRenameMachine(props.row.id)}>
                                    تغییر نام
                                </Button>
                                <CancelIcon onClick={cancelRename}/>
                            </div>
                            }
                            <Typography variant="subtitle1" color="textSecondary">
                                {props.row.image.name}{props.row.image.version}
                            </Typography>


                        </CardContent>
                    </div>
                </Card>

            </Grid>
        )
    }

    return (
        <div className={classes.root}>
            <Grid
                container
                direction="row"
                justify="flex-start"
                spacing={1}>

                {items.map(row => (
                    <ServerItem row={row}/>
                ))}

                <Grid item xs={3}>
                    <Card className={"itemList"} style={{textAlign: "center"}} onClick={()=>window.location.href='/createMachine'}>
                        <CardContent>
                            <p>&nbsp;</p>
                        <Typography className={classes.title} color="textSecondary"
                                    >
                            <AddIcon/>
                        </Typography>
                        </CardContent>
                    </Card>

                </Grid>

            </Grid>
        </div>
    )
}
