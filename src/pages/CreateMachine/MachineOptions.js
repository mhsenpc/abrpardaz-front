import React from 'react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import FormLabel from '@material-ui/core/FormLabel';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import axios from "axios";
import {api_base, sshKeysList} from "../../Api";


export default function MachineOptions(props) {
    const handleChange = id => {
        props.setSshId(id)
    };

    const handleChangeName = event => {
        props.setMachineName(event.target.value);
    };


    const [items, setItems] = React.useState([]);

    React.useEffect(() => {
        axios.get(api_base + sshKeysList)
            .then(res => {
                const list = res.data.list;

                setItems(list);
            })
    },[]);


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

                            {items.map(row => (
                                <FormControlLabel
                                    key={row.id}
                                    control={
                                        <Checkbox
                                            onChange={handleChange(row.id)}
                                            color="primary"
                                        />
                                    }
                                    label={row.name}
                                />
                            ))}


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





























