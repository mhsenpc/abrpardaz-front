import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Alert from "@material-ui/lab/Alert/Alert";
import axios from "axios";
import {api_base, machinesList, ProjectsListPath, snapshotsList} from "../Api";
import {user_title_postfix} from "../consts";

export default function Dashboard() {
    const [machinesCount, setMachinesCount] = React.useState(0);
    const [snapshotsCount, setSnapshotsCount] = React.useState(0);
    const [projectsCount, setProjectsCount] = React.useState(0);

    React.useEffect(() => {
        axios.get(api_base + ProjectsListPath)
            .then(res => {
                if (res.data.list)
                    setProjectsCount(res.data.list.length)
            })

        axios.get(api_base + machinesList)
            .then(res => {
                if (res.data.list)
                    setMachinesCount(res.data.list.length)
            })

        axios.get(api_base + snapshotsList)
            .then(res => {
                if (res.data.list)
                    setSnapshotsCount(res.data.list.length)
            })

    }, []);


    return (
        <Paper>
            <title>داشبورد{user_title_postfix}</title>

            <Grid item xs={12}>

                <Box p={2}>
                    <Alert severity={"success"}>
                        به پنل کاربری خوش آمدید
                    </Alert>
                </Box>

            </Grid>

            <Grid container spacing={3} style={{padding: 10}}>
                <Grid item xs={4}>
                    <Grid item xs={12}>
                        <Paper variant={"outlined"}>
                            <Box p={2}>
                                <p>تعداد ماشین</p>
                                <p>{machinesCount}</p>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>

                <Grid item xs={4}>
                    <Grid item xs={12}>
                        <Paper variant={"outlined"}>
                            <Box p={2}>
                                <p>تعداد تصاویر آنی</p>
                                <p>{snapshotsCount}</p>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>

                <Grid item xs={4}>
                    <Grid item xs={12}>
                        <Paper variant={"outlined"}>
                            <Box p={2}>
                                <p>تعداد پروژه ها</p>
                                <p>{projectsCount}</p>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>

        </Paper>
    );
}
