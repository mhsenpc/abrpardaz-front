import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SelectSource from "./SelectSource";
import Plans from "./Plans";
import MachineOptions from "./MachineOptions";


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
    const [machineName, setMachineName] = React.useState(null);


    function createMachineRequest() {
        alert(machineName)
        alert('create a machine')
    }

    return (
        <div className={classes.root}>
            <SelectSource setImageId={setImageId}/>
            <Plans setPlanId={setPlanId}/>
            <MachineOptions setSshId={setSshId} setMachineName={setMachineName}/>
            <Button variant="contained" color="primary" onClick={createMachineRequest}>ساخت ماشین</Button>
        </div>
    );
}
