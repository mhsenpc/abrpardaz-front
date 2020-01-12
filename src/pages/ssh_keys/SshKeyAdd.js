import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import {useSpring, animated} from 'react-spring/web.cjs'; // web.cjs is required for IE 11 support
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import FormLabel from '@material-ui/core/FormLabel';
import NavigationIcon from '@material-ui/icons/Navigation';
import CancelIcon from '@material-ui/icons/Cancel';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import axios from "axios";
import {api_base, sshKeysAdd} from "../../Api";

let name = null;
let content = null;

function AddKey() {
    return;
    axios.post(api_base + sshKeysAdd, {name: name.current.value, content: content.current.value})
        .then(res => {
            const msg = res.data.data.message;

            alert(msg)
        })
}

function SshKeyAdd() {


    return (
        <div>
            <Grid item xs={12} container
                  direction="row"
                  justify="center"
                  alignItems="center">

                <Paper>

                    <Box p={2} width={700}>

                        <TextField id="filled-basic" label="نام" variant="filled"
                                   ref={(input) => { name = input; }}
                        />
                        <TextField
                            id="filled-multiline-static"
                            label="نظر"
                            multiline
                            rows="4"
                            variant="filled"
                            ref={(input) => { content = input; }}
                        />

                        <Button onClick={() => AddKey()} type="button" variant="contained" color="primary">
                            ذخیره
                        </Button>


                    </Box>

                </Paper>

            </Grid>

        </div>
    );
}

export default SshKeyAdd;