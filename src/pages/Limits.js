import React from 'react';
import axios from "axios";
import {api_base, LimitList} from "../Api";
import Grid from '@material-ui/core/Grid';
import {Box, Paper} from "@material-ui/core";
import {user_title_postfix} from "../consts";


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

    function caclPercentage(some, total) {
        return (100 * some) / total;
    }

    return (
        <Grid container>
            <Grid item xs={12}>
                <title>محدودیت ها{user_title_postfix}</title>

                <Paper>
                    <Box p={1}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <h2>{name}</h2>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <p>تعداد ماشین</p>
                                <div id="limitProgress">
                                    <span style={{position: 'absolute'}}>{currentMachines}/{maxMachines}</span>
                                    <div id="limitBar"
                                         style={{width: caclPercentage(currentMachines, maxMachines) + '%'}}>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <p>تعداد تصویرآنی </p>
                                <div id="limitProgress">
                                    <span style={{position: 'absolute'}}> {currentSnapshots}/{maxSnapshots}</span>
                                    <div id="limitBar"
                                         style={{width: caclPercentage(currentSnapshots, maxSnapshots) + '%'}}>
                                    </div>

                                </div>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <p>حجم استفاده شده دیسک ها</p>
                                <div id="limitProgress">
                                    <span
                                        style={{position: 'absolute'}}>{currentVolumesUsage}/{maxVolumesUsage} GB</span>
                                    <div id="limitBar"
                                         style={{width: caclPercentage(currentVolumesUsage, maxVolumesUsage) + '%'}}>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    )

}

