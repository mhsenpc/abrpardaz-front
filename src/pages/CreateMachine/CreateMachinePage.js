import React from 'react';
import Button from '@material-ui/core/Button';
import SelectSource from "./SelectSource";
import Plans from "./Plans";
import MachineOptions from "./MachineOptions";
import MessageBox from "../MessageBox";
import axios from "axios";
import {api_base, createMachine} from "../../Api";
import Grid from '@material-ui/core/Grid';
import {user_title_postfix} from "../../consts";


export default function CreateMachinePage() {
    const [imageId, setImageId] = React.useState(null);
    const [snapshotId, setSnapshotId] = React.useState(null);
    const [planId, setPlanId] = React.useState(null);
    const [sshId, setSshId] = React.useState(null);
    const [projectId, setProjectId] = React.useState(null);
    const [machineName, setMachineName] = React.useState(null);
    const [response, setResponse] = React.useState([]);
    const [minDisk, setMinDisk] = React.useState(0);
    const [minRam, setMinRam] = React.useState(0);

    function createMachineRequest() {
        axios.post(api_base + createMachine, {
            name: machineName,
            plan_id: planId,
            image_id: imageId,
            project_id: projectId,
            ssh_key_id: sshId,
            snapshot_id: snapshotId
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
                <title>ساخت ماشین{user_title_postfix}</title>

                <SelectSource setImageId={setImageId} imageId={imageId} snapshotId={snapshotId}
                              setSnapshotId={setSnapshotId} setMinDisk={setMinDisk} setMinRam={setMinRam}/>
            </Grid>
            <Grid item xs={12}>
                <Plans setPlanId={setPlanId} planId={planId}  minRam={minRam} minDisk={minDisk} />
            </Grid>
            <Grid item xs={12}>
                <MachineOptions setSshId={setSshId} setMachineName={setMachineName} setProjectId={setProjectId}
                                projectId={projectId} />
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={createMachineRequest}>ساخت ماشین</Button>
            </Grid>

            <MessageBox response={response}/>
        </Grid>
    );
}
