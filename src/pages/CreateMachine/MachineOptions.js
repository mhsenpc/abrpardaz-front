import React from 'react';

import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import axios from "axios";
import {api_base, ProjectsListPath, sshKeysList} from "../../Api";
import Select from "@material-ui/core/Select";
import MenuItem from '@material-ui/core/MenuItem';


export default function MachineOptions(props) {
    const handleChangeSshId = event => {
        props.setSshId(event.target.value)
    };

    const handleChangeProjectId = event => {
        props.setProjectId(event.target.value)
    };

    const handleChangeName = event => {
        props.setMachineName(event.target.value);
    };


    const [sshkeyItems, setSshkeyItems] = React.useState([]);
    const [projectItems, setProjectItems] = React.useState([]);

    React.useEffect(() => {
        axios.get(api_base + sshKeysList)
            .then(res => {
                const list = res.data.pagination.data;

                setSshkeyItems(list);
            })

        axios.get(api_base + ProjectsListPath)
            .then(res => {
                const list = res.data.list;
                if (res.data.list)
                    setProjectItems(list);
                if (list.length > 0)
                    props.setProjectId(list[0].id)
            })
    }, []);


    return (
        <Grid container>
            <Grid xs={6}>
                <FormLabel>
                    انتخاب کلید SSH
                </FormLabel>

                <Select
                    onChange={handleChangeSshId}>
                    <MenuItem value={null}>هیچ</MenuItem>
                    {sshkeyItems.map(row => (
                        <MenuItem value={row.id}>{row.name}</MenuItem>
                    ))}
                </Select>
            </Grid>
            <Grid xs={6}>

                <FormLabel>
                    انتخاب پروژه
                </FormLabel>

                <Select
                    onChange={handleChangeProjectId}
                    value={props.projectId}>
                    {projectItems.map(row => (
                        <MenuItem value={row.id}>{row.name}</MenuItem>
                    ))}
                </Select>
            </Grid>


            <Grid item xs={12}>
                <TextField
                    id="filled-full-width"
                    label="نام سرور"
                    placeholder="Server1"
                    onChange={handleChangeName}
                />
            </Grid>
        </Grid>
    );
}