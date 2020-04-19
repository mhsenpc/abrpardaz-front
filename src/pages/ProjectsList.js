import React from 'react';
import axios from "axios";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {AddProject, api_base, ProjectsListPath} from "../Api";
import Button from '@material-ui/core/Button';
import SimpleModal from "./SimpleModal";
import TextField from '@material-ui/core/TextField';
import MessageBox from "./MessageBox";
import Typography from '@material-ui/core/Typography';
import {makeStyles} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from "@material-ui/core/Backdrop";
import {user_title_postfix} from "../consts";

const useStyles = makeStyles(theme => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

export default function ProjectsList() {
    const [machines, setMachines] = React.useState([]);
    const [response, setResponse] = React.useState([]);
    const [name, setName] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();
    const [backDropOpen, setBackDropOpen] = React.useState(true);

    const handleBackdropClose = () => {
        setBackDropOpen(false);
    };

    React.useEffect(() => {
        loadProjects()
    }, []);


    function loadProjects() {
        setBackDropOpen(true)
        axios.get(api_base + ProjectsListPath)
            .then(res => {
                if(res.data.list)
                    setMachines(res.data.list)
                setBackDropOpen(false)
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
            <title>پروژه ها{user_title_postfix}</title>

            {machines.map(row => (
                <Grid item xs={12} sm={4} key={row.id}>
                    <Paper className={"boxItem projectItem"}
                           onClick={() => window.location.href = "servers/" + row.id.toString()}>
                        <Typography color="textSecondary">
                            {row.name}
                        </Typography>
                    </Paper>
                </Grid>
            ))}

            <Grid item xs={12} sm={4}>
                <Paper className={"boxItem addItem"} onClick={handleOpen}>
                    <Typography color="textSecondary">
                        <AddIcon/>
                    </Typography>
                </Paper>
            </Grid>


            <SimpleModal open={open} setOpen={setOpen}>
                <h2 id="simple-modal-title">نام پروژه را وارد نمایید</h2>
                <TextField id="outlined-search" type="search" variant="outlined"
                           onChange={event => setName(event.target.value)}/>
                &nbsp;
                <Button color={"primary"} onClick={() => requestModal()} variant="contained">
                    ثبت
                </Button>
            </SimpleModal>

            <MessageBox response={response}/>
            <Backdrop className={classes.backdrop} open={backDropOpen} onClick={handleBackdropClose}>
                <CircularProgress color="inherit"/>
            </Backdrop>
        </Grid>
    )
}
