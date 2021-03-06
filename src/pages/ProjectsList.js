import React, {useEffect, useState} from 'react';
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
import {HtmlTooltip} from "../Helpers";

const useStyles = makeStyles(theme => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

export default function ProjectsList() {
    const [projects, setProjects] = useState([]);
    const [response, setResponse] = useState([]);
    const [name, setName] = useState('');
    const [open, setOpen] = useState(false);
    const classes = useStyles();
    const [backDropOpen, setBackDropOpen] = React.useState(true);

    const handleBackdropClose = () => {
        setBackDropOpen(false);
    };

    useEffect(() => {
        loadProjects()
    }, []);


    function loadProjects() {
        setBackDropOpen(true)


        let projects = localStorage.getItem('projects');
        if (projects) {
            let project = JSON.parse(projects);
            setProjects(project);
        }


        axios.get(api_base + ProjectsListPath)
            .then(res => {
                const data = res.data.list;
                if (data) {
                    localStorage.setItem('projects', JSON.stringify(data));
                    setProjects(data)
                }

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
            <title>?????????? ????{user_title_postfix}</title>

            {projects.map(row => (
                <Grid item xs={12} sm={4} key={row.id}>
                    <HtmlTooltip
                        placement="top"

                        title={
                            <React.Fragment>
                                <div style={{direction: 'rtl'}}>
                                    <Typography color="textPrimary">???????? ?????????????? ?????? ??????????</Typography>
                                    <Typography color="textSecondary">???? ???????? ???? ?????? ?????? ???????????? ???? ???????????? ???????????????? ????
                                        ?????????? ???? ?????? ?????????? ?????????? ???? ???????????? ????????</Typography>
                                </div>
                            </React.Fragment>
                        }
                    >
                        <Paper className={"boxItem projectItem"}
                               onClick={() => window.location.href = "servers/" + row.id.toString()}>
                            <Typography color="textSecondary">
                                {row.name}
                            </Typography>
                        </Paper>
                    </HtmlTooltip>
                </Grid>
            ))}

            <Grid item xs={12} sm={4}>
                <HtmlTooltip
                    placement="top"

                    title={
                        <React.Fragment>
                            <div style={{direction: 'rtl'}}>
                                <Typography color="textPrimary">?????????? ?????????? ????????</Typography>
                                <Typography color="textSecondary">???? ?????????? ?????????? ?????? ???????????? ???? ???????????? ?????????????? ?????? ???? ????
                                    ???????? ?????? ?????????????? ???????? ???????? ????????????</Typography>
                            </div>
                        </React.Fragment>
                    }
                >
                    <Paper className={"boxItem addItem"} onClick={handleOpen}>
                        <Typography color="textSecondary">
                            <AddIcon/>
                        </Typography>
                    </Paper>
                </HtmlTooltip>
            </Grid>


            <SimpleModal open={open} setOpen={setOpen}>
                <h2 id="simple-modal-title">?????? ?????????? ???? ???????? ????????????</h2>
                <TextField id="outlined-search" type="search" variant="outlined"
                           onChange={event => setName(event.target.value)}/>
                &nbsp;
                <Button color={"primary"} onClick={() => requestModal()} variant="contained">
                    ??????
                </Button>
            </SimpleModal>

            <MessageBox response={response}/>
            <Backdrop className={classes.backdrop} open={backDropOpen} onClick={handleBackdropClose}>
                <CircularProgress color="inherit"/>
            </Backdrop>
        </Grid>
    )
}
