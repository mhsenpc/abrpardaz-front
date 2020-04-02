import React from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import axios from "axios";
import {api_base, newImage} from "../../Api";
import MessageBox from "../MessageBox";
import {createStyles, makeStyles, Theme} from "@material-ui/core";
import {admin_title_postfix, user_title_postfix} from "../../consts";


const paperStyle = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
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


function ImageAdd() {
    const [response, setResponse] = React.useState([]);
    const paper = paperStyle();
    const classes = useStyles();

    function requestAddImage(event) {
        event.preventDefault();
        const {remote_id, name, version, min_disk, min_ram} = event.currentTarget.elements;
        axios.post(api_base + newImage, {
            remote_id: remote_id.value,
            name: name.value,
            version: version.value,
            min_disk: min_disk.value,
            min_ram: min_ram.value
        })
            .then(res => {
                setResponse(res.data)
                if (res.data.success)
                    window.location.href = '/ImagesList';
            })
    }

    return (

        <div className={classes.root}>
            <title>افزودن تصویر{admin_title_postfix}</title>

            <Grid container>
                <Grid item xs>
                    <Paper className={paper.paper}>
                        <h2>افزودن تصویر</h2>

                        <form onSubmit={requestAddImage}>
                            <TextField
                                className={paper.alignText}
                                name="remote_id"
                                label="remote_id"
                                variant="filled"
                                required
                            />
                            <br/><br/>
                            <TextField
                                className={paper.alignText}
                                name="name"
                                label="نام"
                                variant="filled"
                                required
                            />
                            <br/><br/>
                            <TextField
                                className={paper.alignText}
                                name="version"
                                label="نسخه"
                                variant="filled"
                                required
                            />
                            <br/><br/>
                            <TextField
                                className={paper.alignText}
                                name="min_disk"
                                label="حداقل دیسک "
                                variant="filled"
                                required
                            />
                            <br/><br/>
                            <TextField
                                className={paper.alignText}
                                name="min_ram"
                                label="حداقل رم"
                                variant="filled"
                                required
                            />
                            <br/><br/>

                            <Button type="submit" variant="contained" color="primary">
                                ذخیره
                            </Button>

                        </form>

                    </Paper>
                </Grid>

            </Grid>
            <MessageBox response={response}/>
        </div>
    );
}

export default ImageAdd;