import React from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import axios from "axios";
import {api_base, newPlan, newUserLimit} from "../../Api";
import MessageBox from "../MessageBox";
import {createStyles, makeStyles, Theme} from "@material-ui/core";
import {admin_title_postfix} from "../../consts";


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


function UserLimitAdd() {
    const [response, setResponse] = React.useState([]);
    const paper = paperStyle();
    const classes = useStyles();

    function requestAddUserLimit(event) {
        event.preventDefault();
        const {name, max_machines, max_snapshots, max_volumes_usage} = event.currentTarget.elements;
        axios.post(api_base + newUserLimit, {
            name: name.value,
            max_machines: max_machines.value,
            max_snapshots: max_snapshots.value,
            max_volumes_usage: max_volumes_usage.value,
        })
            .then(res => {
                setResponse(res.data)
                if (res.data.success)
                    window.location.href = '/UserLimitList';
            })
    }

    return (

        <div className={classes.root}>
            <title>افزودن محدودیت کاربری{admin_title_postfix}</title>

            <Grid container>
                <Grid item xs>
                    <Paper className={paper.paper}>
                        <h2>افزودن محدودیت کاربری</h2>

                        <form onSubmit={requestAddUserLimit}>
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
                                name="max_machines"
                                label="حداکثر تعداد ماشین "
                                variant="filled"
                                required
                            />
                            <br/><br/>
                            <TextField
                                className={paper.alignText}
                                name="max_snapshots"
                                label="حداکثر تعداد تصاویر آنی"
                                variant="filled"
                                required
                            />
                            <br/><br/>

                            <TextField
                                className={paper.alignText}
                                name="max_volumes_usage"
                                label="حداکثر تعداد volume"
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

export default UserLimitAdd;