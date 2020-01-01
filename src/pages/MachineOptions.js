import React from 'react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { green } from '@material-ui/core/colors';
import { withStyles , makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';



const GreenCheckbox = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})(props => <Checkbox color="default" {...props} />);



export default function MachineOptions() {


    const [state, setState] = React.useState({
        checkedA: true,
        checkedB: true,
        checkedF: true,
        checkedG: true,
    });

    const handleChange = name => event => {
        setState({ ...state, [name]: event.target.checked });
    };

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

                            <Box textAlign="right" m={5} width={600}  >
                                <FormLabel>لطفا گزینه های مورد نظر خود را انتخاب نمایید</FormLabel>
                            </Box>

                            <Box   display="flex"
                                   flexWrap="wrap"
                                   alignContent="flex-end" m={5} border={1}  borderRadius="borderRadius" borderColor="grey.500">


                                <formlabel>
                                    انتخاب کلید SSH
                                </formlabel>


                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={state.checkedA}
                                            onChange={handleChange('checkedA')}
                                            value="checkedA"
                                            color="primary"
                                        />
                                    }
                                    label="mohammad_jadid"
                                />

                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={state.checkedB}
                                            onChange={handleChange('checkedB')}
                                            value="checkedB"
                                            color="primary"
                                        />
                                    }
                                    label="mhmdx07@yahoo.com"
                                />

                                <Box m={5}  width={600}  >

                                    <label>
                                            نام سرور
                                    </label>

                                    <TextField
                                        id="filled-full-width"
                                        label="Label"
                                        style={{ margin: 8 }}
                                        placeholder="Placeholder"
                                        fullWidth
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="filled"
                                    />

                                    <label>
                                        تعداد ماشین ها
                                    </label>

                                    <TextField
                                        id="filled-full-width"
                                        label="Label"
                                        style={{ margin: 8 }}
                                        placeholder="Placeholder"
                                        fullWidth
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
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





























