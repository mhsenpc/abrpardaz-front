import React from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import axios from "axios";
import {api_base} from "../../Api";
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


function UserGroupEdit(props) {
    const [response, setResponse] = React.useState([]);
    const [item, setItem] = React.useState({name: '', content: ''});
    const paper = paperStyle();
    const classes = useStyles();

    React.useEffect(() => {
        let id = props.match.params.id;
        axios.get(api_base + 'user_groups/' + id.toString() + '/show')
            .then(res => {
                const user_group = res.data.item;

                setItem(user_group);


            })
    }, [])

    function requestEditUserGroup(event) {
        let id = props.match.params.id;
        event.preventDefault();
        const {name, max_machines, max_snapshots, max_volumes_usage} = event.currentTarget.elements;
        axios.post(api_base + 'user_groups/' + id.toString() + '/edit', {
            name: name.value,
            max_machines: max_machines.value,
            max_snapshots: max_snapshots.value,
            max_volumes_usage: max_volumes_usage.value,
        })
            .then(res => {
                setResponse(res.data)
                if (res.data.success)
                    window.location.href = '/UserGroupList';
            })
    }


    return (
        <div className={classes.root}>

            <Grid container
                  direction="row"
                  justify="center"
                  alignItems="center">

                <Grid item xs>

                    <Paper className={paper.paper}>
                        <h2>ویرایش گروه کاربری</h2>

                        <form onSubmit={requestEditUserGroup}>
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
                                name='max_machines'
                                className={paper.alignText}
                                label="حداکثر تعداد ماشین "
                                variant="filled"
                                onChange={event => setItem({max_machines: event.target.value})}
                                value={item.max_machines}
                                required
                            />
                            <br/><br/>
                            <TextField
                                name='max_snapshots'
                                className={paper.alignText}
                                label="حداکثر تعداد تصاویر آنی"
                                variant="filled"
                                onChange={event => setItem({max_snapshots: event.target.value})}
                                value={item.max_snapshots}
                                required
                            />
                            <br/><br/>
                            <TextField
                                name='max_volumes_usage'
                                className={paper.alignText}
                                label="حداکثر تعداد volume"
                                variant="filled"
                                onChange={event => setItem({max_volumes_usage: event.target.value})}
                                value={item.max_volumes_usage}
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

export default UserGroupEdit;