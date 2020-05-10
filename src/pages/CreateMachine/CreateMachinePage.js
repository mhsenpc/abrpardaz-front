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
import {Box, Paper} from "@material-ui/core";


export default function CreateMachinePage(props) {
    const [imageId, setImageId] = React.useState(null);
    const [snapshotId, setSnapshotId] = React.useState(null);
    const [backupId, setBackupId] = React.useState(null);
    const [planId, setPlanId] = React.useState(null);
    const [sshId, setSshId] = React.useState(null);
    const [machineName, setMachineName] = React.useState(null);
    const [response, setResponse] = React.useState([]);
    const [minDisk, setMinDisk] = React.useState(0);
    const [minRam, setMinRam] = React.useState(0);
    const [sourceName, setSourceName] = React.useState('');
    const [planName, setPlanName] = React.useState('');
    const [backup, setBackup] = React.useState(true);

    function createMachineRequest() {
        axios.post(api_base + createMachine, {
            name: machineName,
            plan_id: planId,
            image_id: imageId,
            project_id: props.match.params.projectId,
            ssh_key_id: sshId,
            snapshot_id: snapshotId,
            backup_id: backupId,
            auto_backup: backup
        })
            .then(res => {
                setResponse(res.data)

                setTimeout(function () {
                    if (res.data.success) {
                        window.location.href = '/servers/' + props.match.params.projectId.toString();
                    }
                }, 2000);
            })
    }

    React.useEffect(() => {
        setMachineName('Tehran-' + sourceName + '-' + planName)
    }, [sourceName, planName]);

    return (
        <Grid container>
            <Grid item xs={12}>
                <title>ساخت ماشین{user_title_postfix}</title>
                <h1>ایجاد سرور</h1>
            </Grid>
            <Grid item xs={12}>
                <Box p={1}>
                    <Grid container>
                        <Grid item xs={12}>
                            <span className={'numbering'}>1</span>
                            &nbsp;
                            <h3 style={{display: "inline"}}>محل سرور</h3>
                        </Grid>
                    </Grid>
                    <br/>

                    <Grid container>
                        <Grid item xs={4}>
                            <Paper className={"boxItem active"}>
                                    <Box p={1}>
                                        <br/>
                                        <img src={"/images/iran_flag.png"} width={128}/>
                                        <h3>Tehran</h3>
                                    </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
            <br/>
            <br/>
            <br/>

            <Grid item xs={12}>
                <Grid container>
                    <Grid item xs={12}>
                        <span className={'numbering'}>2</span>
                        &nbsp;
                        <h3 style={{display: "inline"}}>انتخاب سیستم عامل</h3>
                    </Grid>
                </Grid>

                <SelectSource setSourceName={setSourceName}
                              setImageId={setImageId}
                              imageId={imageId}
                              snapshotId={snapshotId}
                              setSnapshotId={setSnapshotId}
                              setMinDisk={setMinDisk}
                              setMinRam={setMinRam}
                              backupId = {backupId}
                              setBackupId={setBackupId}
                />
            </Grid>
            <br/>
            <Grid item xs={12}>
                <Grid container>
                    <Grid item xs={12}>
                        <span className={'numbering'}>3</span>
                        &nbsp;
                        <h3 style={{display: "inline"}}>انتخاب نوع سرور</h3>
                    </Grid>
                </Grid>
                <Plans setPlanName={setPlanName} setPlanId={setPlanId} planId={planId} minRam={minRam}
                       minDisk={minDisk}/>
            </Grid>
            <Grid item xs={12}>
                <MachineOptions setSshId={setSshId} setMachineName={setMachineName} machineName={machineName}
                                sshId={sshId} backup={backup} setBackup={setBackup}/>
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={createMachineRequest}>ایجاد سرور</Button>
            </Grid>

            <MessageBox response={response}/>
        </Grid>
    );
}
