import React from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import axios from "axios";
import {api_base, newUser} from "../../Api";
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


function UserAdd() {
    const [response, setResponse] = React.useState([]);
    const paper = paperStyle();
    const classes = useStyles();

    function requestAddUser(event) {
        event.preventDefault();
        const {email, password} = event.currentTarget.elements;
        axios.post(api_base + newUser, {
            email: email.value,
            password: password.value,
        })
            .then(res => {
                setResponse(res.data)
                if (res.data.success)
                    window.location.href = '/UsersList';
            })
    }

    return (

        <div className={classes.root}>
            <title>افزودن کاربر{admin_title_postfix}</title>

            <Grid container>
                <Grid item xs>
                    <Paper className={paper.paper}>
                        <h2>افزودن کاربر</h2>

                        <form onSubmit={requestAddUser}>
                            <TextField
                                className={paper.alignText}
                                name="email"
                                label="پست الکترونیک"
                                variant="filled"
                                required
                            />
                            <br/><br/>
                            <TextField
                                className={paper.alignText}
                                name="password"
                                label="رمز"
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

export default UserAdd;