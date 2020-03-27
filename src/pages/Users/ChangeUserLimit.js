import React from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import axios from "axios";
import {api_base, userLimitList} from "../../Api";
import MessageBox from "../MessageBox";
import {makeStyles} from "@material-ui/core";
import Select from "@material-ui/core/Select";
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 700,
        marginTop: 12

    },
}));


function ChangeUserLimit(props) {
    const [response, setResponse] = React.useState([]);
    const [user, setUser] = React.useState({profile: ''});
    const [userLimits, setUserLimits] = React.useState([]);
    const [userLimitId, setUserLimitId] = React.useState(0);
    const classes = useStyles();

    let id = props.match.params.id;

    React.useEffect(() => {
        loadUser();
        loadUserLimits();
    }, [])

    function loadUser() {
        axios.get(api_base + 'users/' + id.toString() + '/show')
            .then(res => {
                const user = res.data.item;

                setUser(user);
                setUserLimitId(user.user_limit_id)
            })
    }

    function loadUserLimits() {
        axios.get(api_base + userLimitList)
            .then(res => {
                const items = res.data.pagination.data;

                setUserLimits(items)
            })
    }

    function requestChangeUserLimit(event) {
        let id = props.match.params.id;
        event.preventDefault();
        axios.post(api_base + 'users/' + id.toString() + '/changeUserLimit', {
            user_limit_id: userLimitId,
        })
            .then(res => {
                setResponse(res.data)
                if (res.data.success)
                    window.location.href = '/UsersList';
            })
    }

    function handleClick(event) {
        setUserLimitId(event.target.value)
    }


    return (
        <div className={classes.root}>

            <Grid container
                  direction="row"
                  justify="center"
                  alignItems="center">

                <Grid item xs>

                    <Paper className={classes.paper}>
                        <h2>تغییر محدودیت کاربری</h2>

                        <form onSubmit={requestChangeUserLimit}>
                            <p>
                                <span>نام: </span>
                                <span>{user.profile.first_name} {user.profile.last_name}</span>
                            </p>

                            <p>
                                <span>ایمیل: </span>
                                <span>{user.email}</span>
                            </p>

                            <Select onChange={handleClick} value={userLimitId}>
                                {userLimits.map(row => (
                                    <MenuItem value={row.id}>{row.name}</MenuItem>
                                ))}
                            </Select>
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

export default ChangeUserLimit;