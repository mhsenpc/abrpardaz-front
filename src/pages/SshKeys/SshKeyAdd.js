import React from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import axios from "axios";
import {api_base, sshKeysAdd} from "../../Api";
import MessageBox from "../MessageBox";
import {createStyles, makeStyles, Theme} from "@material-ui/core";



const paperStyle = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            margin: 'auto',
            // maxWidth: 700,
            marginTop: 12

        },
        image: {
            width: 128,
            height: 128,
        },
        img: {
            margin: 'auto',
            display: 'block',
            maxWidth: '100%',
            maxHeight: '100%',
        },
        alignText: {
            textAlign: 'right'
        }
    }),
);


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));



function SshKeyAdd() {
    const [response, setResponse] = React.useState([]);
    const paper = paperStyle();
    const classes = useStyles();

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

        <div className={classes.root}>

            <Grid
                item xs={12}
                container
                direction="row"
                alignItems="right"
            >

                <Grid item xs>

                <Paper className={paper.paper}>

                        <form onSubmit={requestAddKey}>
                            <TextField
                                className={paper.alignText}
                                name="name"
                                label="نام" variant="filled"
                            />
                            <br/><br/>
                            <TextField
                                className={paper.alignText}
                                name="content"
                                label="نظر"
                                multiline
                                rows="4"
                                variant="filled"
                            />
                            <br/><br/>
                            <Button type="submit" variant="contained" color="primary">
                                ذخیره
                            </Button>

                        </form>

                </Paper>
                </Grid>

            </Grid>
            <MessageBox response={response} />
        </div>
    );
}

export default SshKeyAdd;