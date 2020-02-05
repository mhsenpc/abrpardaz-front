import React from 'react';
import axios from "axios";
import {api_base, NotificationMarkAllRead, NotificationPath} from "../Api";






export default function Notifications() {

    const [notification, setNotification] = React.useState([]);
    const [response, setResponse] = React.useState([]);

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
                setResponse(res.data)

            })
    }


    return (
        <div>
            <h1>
                رویدادها
            </h1>

            {notification.map(row => (
                <div>
                    <p>
                        {row.data.message}
                        {row.read_at == null &&
                        <span>خوانده نشده</span>
                        }
                    </p>

                </div>
            ))}

        </div>

    )
}