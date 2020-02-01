import React from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import axios from "axios";
import {api_base} from "../../Api";
import MessageBox from "../MessageBox";


function SshKeyEdit(props) {
    const [response, setResponse] = React.useState([]);
    const [item, setItem] = React.useState({name:'',content:''});


    React.useEffect(() => {
        let id = props.match.params.id;
        axios.get(api_base + 'sshKeys/' + id.toString() + '/show')
            .then(res => {
                const sshkey = res.data.item;

                setItem(sshkey);


            })
    }, [])

    function requestEditKey(event) {
        let id = props.match.params.id;
        event.preventDefault();
        const {name, content} = event.currentTarget.elements;
        axios.post(api_base + 'sshKeys/' + id.toString() + '/edit', {name: name.value, content: content.value})
            .then(res => {
                setResponse(res.data)
                if (res.data.success)
                    window.location.href = '/Sshkeylist';
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
                        <form onSubmit={requestEditKey}>
                            <TextField
                                name="name"
                                label="نام" variant="filled"
                                onChange={event => setItem({name: event.target.value})}
                                value={item.name}
                            />
                            <TextField
                                name="content"
                                label="محتوا"
                                multiline
                                rows="4"
                                variant="filled"
                                value={item.content}
                                onChange={event => setItem({content: event.target.value})}
                            />

                            <Button type="submit" variant="contained" color="primary">
                                ذخیره
                            </Button>

                        </form>
                    </Box>

                </Paper>

            </Grid>
            <MessageBox response={response}/>
        </div>
    );

}

export default SshKeyEdit;