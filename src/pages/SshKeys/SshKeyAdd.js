import React from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import axios from "axios";
import {api_base, sshKeysAdd} from "../../Api";
import MessageBox from "../MessageBox";




function SshKeyAdd() {
    const [response, setResponse] = React.useState([]);

    function requestAddKey(event) {
        event.preventDefault();
        const {name, content} = event.currentTarget.elements;
        axios.post(api_base + sshKeysAdd, {name: name.value, content: content.value})
            .then(res => {
                setResponse(res.data)
                if(res.data.success)
                    window.location.href= '/Sshkeylist';
            })
    }

    return (
        <div>
            <Grid item xs={12} container
                  direction="row"
                  justify="center"
                  alignItems="center">

                <Paper>

                    <Box p={2} width={700}>
                        <form onSubmit={requestAddKey}>
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
            <MessageBox response={response} />
        </div>
    );
}

export default SshKeyAdd;