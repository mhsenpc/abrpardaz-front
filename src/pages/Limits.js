import React from 'react';
import '../App.css';
import axios from "axios";
import {api_base, LimitList} from "../Api";
import Grid from '@material-ui/core/Grid';


export default function Limits() {
    const [currentSnapshots, setCurrentSnapshots] = React.useState(0);
    const [maxSnapshots, setMaxSnapshots] = React.useState(0);
    const [currentMachines, setCurrentMachines] = React.useState(0);
    const [maxMachines, setMaxMachines] = React.useState(0);
    const [currentVolumesUsage, setCurrentVolumesUsage] = React.useState(0);
    const [maxVolumesUsage, setMaxVolumesUsage] = React.useState(0);
    const [name, setName] = React.useState('');



    React.useEffect(() => {
        axios.get(api_base + LimitList)
            .then(res => {
                setCurrentSnapshots(res.data.current_snapshots);
                setMaxSnapshots(res.data.max_snapshots);
                setCurrentMachines(res.data.current_machines);
                setMaxMachines(res.data.max_machines);
                setCurrentVolumesUsage(res.data.current_volumes_usage);
                setMaxVolumesUsage(res.data.max_volumes_usage);
                setName(res.data.name);

            })
    }, []);

    return (

        <Grid container spacing={1}>
            <Grid item xs={12}>
            <h2>{name}</h2>
            </Grid>
            <Grid item xs={12} sm={4}>
            <p>تعداد ماشین</p>
            <div id="myProgress">
                <span style={{position:'absolute'}}>{currentMachines}/{maxMachines}</span>
                <div id="myBar">
                </div>
            </div>
            </Grid>
            <Grid item xs={12} sm={4}>
            <p>تعداد تصویرآنی </p>
            <div id="myProgress">
                <span style={{position:'absolute'}}> {currentSnapshots}/{maxSnapshots}</span>
                <div id="myBar">
                </div>

            </div>
            </Grid>
            <Grid item xs={12} sm={4}>
            <p>حجم استفاده شده دیسک ها</p>
            <div id="myProgress">
                <span style={{position:'absolute'}}>{currentVolumesUsage}/{maxVolumesUsage} GB</span>
                <div id="myBar">
                </div>
            </div>
            </Grid>
        </Grid>
    )

}

