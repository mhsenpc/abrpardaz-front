import React from 'react';
import axios from "axios";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {AddProject, api_base, ProjectsListPath} from "../Api";
import Button from '@material-ui/core/Button';
import SimpleModal from "./SimpleModal";
import TextField from '@material-ui/core/TextField';
import MessageBox from "./MessageBox";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {createStyles, makeStyles, Theme} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import Box from "@material-ui/core/Box";


const useStyles = makeStyles({
    root: {
        minWidth: 235,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

const paperStyle = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            margin: 'auto',
            maxWidth: 700,

        },
        alignText: {
            textAlign: 'right'
        }
    }),
);


export default function ProjectsList() {
    const [machines, setMachines] = React.useState([]);
    const [response, setResponse] = React.useState([]);
    const [name, setName] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();
    const paper = paperStyle();
    const bull = <span className={classes.bullet}>•</span>;


    React.useEffect(() => {
        loadProjects()
    }, []);


    function loadProjects() {
        axios.get(api_base + ProjectsListPath)
            .then(res => {
                setMachines(res.data.list)
            })
    }

    function requestModal() {
        axios.post(api_base + AddProject, {name: name})
            .then(res => {
                setResponse(res.data)
                setOpen(false)
                loadProjects();
            })
    }

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <Grid container spacing={1}>
            {machines.map(row => (
                <Grid item xs={12} sm={4}>
                    <Paper className={"projectItem"}  onClick={()=>window.location.href="servers/" + row.id.toString()}>
                        <Typography color="textSecondary">
                            {row.name}
                        </Typography>
                    </Paper>
                </Grid>
            ))}

            <Grid item xs={12} sm={4}>
                <Paper className={"projectItem"} onClick={handleOpen}>
                    <Typography color="textSecondary">
                        <AddIcon/>
                    </Typography>
                </Paper>
            </Grid>


            <SimpleModal open={open} setOpen={setOpen}>
                <h2 id="simple-modal-title">نام پروژه را وارد نمایید</h2>
                <TextField id="outlined-search" type="search" variant="outlined"
                           onChange={event => setName(event.target.value)}/>
                <Button onClick={() => requestModal()} variant="contained">
                    ثبت
                </Button>
            </SimpleModal>

            <MessageBox response={response}/>
        </Grid>
    )
}
