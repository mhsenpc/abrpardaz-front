import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SelectSource from "./SelectSource";
import Plans from "./Plans";
import MachineOptions from "./MachineOptions";
import MessageBox from "../MessageBox";
import axios from "axios";
import {api_base, createFromImage, forgetPassword} from "../../Api";


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
    const [response, setResponse] = React.useState([]);



    function createMachineRequest() {
        axios.post(api_base + createFromImage, {name: machineName,plan_id:planId,image_id:imageId })
            .then(res => {
                setResponse(res.data)
            })
    }

    return (
        <div className={classes.root}>
            <SelectSource setImageId={setImageId}/>
            <Plans setPlanId={setPlanId}/>
            <MachineOptions setSshId={setSshId} setMachineName={setMachineName}/>
            <Button variant="contained" color="primary" onClick={createMachineRequest}>ساخت ماشین</Button>
            <MessageBox response={response} />
        </div>
    );
}
