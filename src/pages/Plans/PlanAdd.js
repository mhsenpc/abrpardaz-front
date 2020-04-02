import React from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import axios from "axios";
import {api_base, newPlan} from "../../Api";
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


function PlanAdd() {
    const [response, setResponse] = React.useState([]);
    const paper = paperStyle();
    const classes = useStyles();

    function requestAddPlan(event) {
        event.preventDefault();
        const {remote_id, name, disk, ram, vcpu, hourly_price} = event.currentTarget.elements;
        axios.post(api_base + newPlan, {
            remote_id: remote_id.value,
            name: name.value,
            disk: disk.value,
            ram: ram.value,
            vcpu: vcpu.value,
            hourly_price: hourly_price.value,
        })
            .then(res => {
                setResponse(res.data)
                if (res.data.success)
                    window.location.href = '/PlansList';
            })
    }

    return (
        <div className={classes.root}>
            <title>افزودن پلن{admin_title_postfix}</title>

            <Grid container>
                <Grid item xs>
                    <Paper className={paper.paper}>
                        <h2>افزودن پلن</h2>

                        <form onSubmit={requestAddPlan}>
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
                                name="disk"
                                label="دیسک "
                                variant="filled"
                                required
                            />
                            <br/><br/>
                            <TextField
                                className={paper.alignText}
                                name="ram"
                                label="رم"
                                variant="filled"
                                required
                            />
                            <br/><br/>

                            <TextField
                                className={paper.alignText}
                                name="vcpu"
                                label="vcpu"
                                variant="filled"
                                required
                            />
                            <br/><br/>

                            <TextField
                                className={paper.alignText}
                                name="hourly_price"
                                label="هزینه ساعتی"
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

export default PlanAdd;