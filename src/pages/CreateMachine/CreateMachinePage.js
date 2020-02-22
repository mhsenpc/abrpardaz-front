import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SelectSource from "./SelectSource";
import Plans from "./Plans";
import MachineOptions from "./MachineOptions";
import MessageBox from "../MessageBox";
import axios from "axios";
import {api_base, createFromImage, forgetPassword} from "../../Api";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

export default function CreateMachinePage() {
    const classes = useStyles();
    const [imageId, setImageId] = React.useState(null);
    const [planId, setPlanId] = React.useState(null);
    const [sshId, setSshId] = React.useState(null);
    const [projectId, setProjectId] = React.useState(null);
    const [machineName, setMachineName] = React.useState(null);
    const [response, setResponse] = React.useState([]);

    function createMachineRequest() {
        axios.post(api_base + createFromImage, {
            name: machineName,
            plan_id: planId,
            image_id: imageId,
            project_id: projectId,
            ssh_key_id: sshId
        })
            .then(res => {
                setResponse(res.data)

                setTimeout(function () {
                    if (res.data.success) {
                        window.location.href = '/servers/' + projectId.toString();
                    }
                }, 2000);
            })
    }

    return (
        <Grid container item xs={12}>
            <Grid item xs={12}>
                <SelectSource setImageId={setImageId}/>
            </Grid>
            <Grid item xs={12}>
                <Plans setPlanId={setPlanId}/>
            </Grid>
            <Grid item xs={12}>
                <MachineOptions setSshId={setSshId} setMachineName={setMachineName} setProjectId={setProjectId}
                                prjectId={projectId}/>
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={createMachineRequest}>ساخت ماشین</Button>
            </Grid>

            <MessageBox response={response}/>
        </Grid>
    );
}
