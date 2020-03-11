import React from 'react';
import axios from "axios";
import {api_base, NotificationMarkAllRead, NotificationPath} from "../Api";
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import {Paper} from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import Box from "@material-ui/core/Box";

export default function Notifications() {

    const [notification, setNotification] = React.useState([]);

    React.useEffect(() => {
        loadNotifications()
        requestNotificationMarkAllRead()
    }, []);


    function loadNotifications() {
        axios.get(api_base + NotificationPath)
            .then(res => {
                setNotification(res.data.list)
            })
    }


    function requestNotificationMarkAllRead() {
        axios.post(api_base + NotificationMarkAllRead)
            .then(res => {

            })
    }


    return (
        <Grid container>
            <Grid item>
                <h1>
                    رویدادها
                </h1>
            </Grid>

            {notification.map(row => (
                <Grid item xs={12}>
                    <Box p={1}>
                        <Paper style={{padding: 10}}>
                            {row.data.message}
                            {row.read_at === null &&
                            <NewReleasesIcon color={"primary"}/>
                            }
                        </Paper>
                    </Box>
                </Grid>
            ))}

        </Grid>
    )
}