import React from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import axios from "axios";
import {api_base} from "../../Api";
import MessageBox from "../MessageBox";
import {createStyles, makeStyles, Theme} from "@material-ui/core";
import {user_title_postfix} from "../../consts";


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


function SshKeyEdit(props) {
    const [response, setResponse] = React.useState([]);
    const [item, setItem] = React.useState({name: '', content: ''});
    const paper = paperStyle();
    const classes = useStyles();

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
        <div className={classes.root}>
            <title>ویرایش کلید امنیتی{user_title_postfix}</title>

            <Grid container
                  direction="row"
                  justify="center"
                  alignItems="center">

                <Grid item xs>

                    <Paper className={paper.paper}>
                        <h2>ویرایش کلید امنیتی</h2>

                        <form onSubmit={requestEditKey}>
                            <TextField
                                className={paper.alignText}
                                name="name"
                                label="نام" variant="filled"
                                onChange={event => setItem({name: event.target.value})}
                                value={item.name}
                            />
                            <br/><br/>
                            <TextField
                                className={paper.alignText}
                                name="content"
                                label="محتوا"
                                multiline
                                rows="4"
                                variant="filled"
                                value={item.content}
                                onChange={event => setItem({content: event.target.value})}
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

export default SshKeyEdit;