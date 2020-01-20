import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
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

    function createMachineRequest(){
        alert('create a machine')
    }

    return (
        <div className={classes.root}>
            <SelectSource/>
            <Plans/>
            <MachineOptions/>

            <Button  variant="contained" color="primary" onClick={createMachineRequest}>ساخت ماشین</Button>
        </div>
    );
}
