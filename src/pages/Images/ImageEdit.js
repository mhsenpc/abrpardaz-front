import React from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import axios from "axios";
import {api_base} from "../../Api";
import MessageBox from "../MessageBox";
import {createStyles, makeStyles, Theme} from "@material-ui/core";
import {admin_title_postfix} from "../../consts";


const paperStyle = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            margin: 'auto',
            maxWidth: 700,
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


function ImageEdit(props) {
    const [response, setResponse] = React.useState([]);
    const [item, setItem] = React.useState({name: '', content: ''});
    const paper = paperStyle();
    const classes = useStyles();

    React.useEffect(() => {
        let id = props.match.params.id;
        axios.get(api_base + 'images/' + id.toString() + '/show')
            .then(res => {
                const image = res.data.item;

                setItem(image);


            })
    }, [])

    function requestEditImage(event) {
        let id = props.match.params.id;
        event.preventDefault();
        const {remote_id, name, version, min_disk, min_ram} = event.currentTarget.elements;
        axios.post(api_base + 'images/' + id.toString() + '/edit', {
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
            <title>ویرایش تصویر{admin_title_postfix}</title>

            <Grid container
                  direction="row"
                  justify="center"
                  alignItems="center">

                <Grid item xs>

                    <Paper className={paper.paper}>
                        <h2>ویرایش تصویر</h2>

                        <form onSubmit={requestEditImage}>
                            <TextField
                                name='remote_id'
                                className={paper.alignText}
                                label="remote_id "
                                variant="filled"
                                onChange={event => setItem({remote_id: event.target.value})}
                                value={item.remote_id}
                                required
                            />
                            <br/><br/>
                            <TextField
                                name='name'
                                className={paper.alignText}
                                label="نام"
                                variant="filled"
                                onChange={event => setItem({name: event.target.value})}
                                value={item.name}
                                required
                            />
                            <br/><br/>
                            <TextField
                                name='version'
                                className={paper.alignText}
                                label="نسخه"
                                variant="filled"
                                onChange={event => setItem({version: event.target.value})}
                                value={item.version}
                                required
                            />
                            <br/><br/>
                            <TextField
                                name='min_disk'
                                className={paper.alignText}
                                label="حداقل دیسک "
                                variant="filled"
                                onChange={event => setItem({min_disk: event.target.value})}
                                value={item.min_disk}
                                required
                            />
                            <br/><br/>
                            <TextField
                                name='min_ram'
                                className={paper.alignText}
                                label="حداقل رم"
                                variant="filled"
                                onChange={event => setItem({min_ram: event.target.value})}
                                value={item.min_ram}
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

export default ImageEdit;