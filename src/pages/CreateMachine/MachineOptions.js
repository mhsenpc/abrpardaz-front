import React from 'react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import FormLabel from '@material-ui/core/FormLabel';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import axios from "axios";
import {api_base, ProjectsListPath, sshKeysList} from "../../Api";
import Select from "@material-ui/core/Select";


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
                const list = res.data.list;

                setSshkeyItems(list);
            })

        axios.get(api_base + ProjectsListPath)
            .then(res => {
                const list = res.data.list;

                setProjectItems(list);
                props.setProjectId(list[0].id)
            })
    }, []);


    return (

        <div>

            <Grid item xs={12} container
                  direction="row"
                  justify="center"
                  alignItems="center">
                <Grid item xs={6} container
                      direction="row"
                      justify="center"
                      alignItems="center">
                    <Paper>

                        <Box textAlign="right" m={5} width={600}>
                            <FormLabel>لطفا گزینه های مورد نظر خود را انتخاب نمایید</FormLabel>
                        </Box>

                        <Box display="flex"
                             flexWrap="wrap"
                             alignContent="flex-end" m={5} border={1} borderRadius="borderRadius"
                             borderColor="grey.500">

                            <FormLabel>
                                انتخاب کلید SSH
                            </FormLabel>

                            <Select
                                onChange={handleChangeSshId}
                                native>
                                <option></option>
                                {sshkeyItems.map(row => (
                                    <option value={row.id}>{row.name}</option>
                                ))}
                            </Select>

                            <br />
                            <br />

                            <FormLabel>
                                انتخاب پروژه
                            </FormLabel>

                            <Select
                                onChange={handleChangeProjectId}
                                native>
                                {projectItems.map(row => (
                                    <option value={row.id}>{row.name}</option>
                                ))}
                            </Select>

                            <Box m={5} width={600}>

                                <TextField
                                    id="filled-full-width"
                                    label="نام سرور"
                                    style={{margin: 8}}
                                    placeholder="Server1"
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={handleChangeName}
                                    variant="filled"
                                />

                            </Box>
                        </Box>

                    </Paper>
                </Grid>
            </Grid>

        </div>

    );

}





























