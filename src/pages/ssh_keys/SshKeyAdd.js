import React from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import axios from "axios";
import {api_base, sshKeysAdd} from "../../Api";


function AddKey(event) {
    event.preventDefault();
    const {name, content} = event.currentTarget.elements;
    axios.post(api_base + sshKeysAdd, {name: name.value, content: content.value})
        .then(res => {
            const msg = res.data.data.message;

            alert(msg)
            window.location.href= '/Sshkeylist';
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
                        <form onSubmit={AddKey}>
                            <TextField
                                name="name"
                                label="نام" variant="filled"
                            />
                            <TextField
                                name="content"
                                label="نظر"
                                multiline
                                rows="4"
                                variant="filled"
                            />

                            <Button type="submit" variant="contained" color="primary">
                                ذخیره
                            </Button>

                        </form>
                    </Box>

                </Paper>

            </Grid>

        </div>
    );
}

export default SshKeyAdd;