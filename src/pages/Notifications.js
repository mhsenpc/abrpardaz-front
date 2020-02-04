import React from 'react';
import axios from "axios";
import {api_base, NotificationPath} from "../Api";




export default function Notifications() {

    const [notification, setNotification] = React.useState([]);

    React.useEffect(() => {
        loadNotifications()
    }, []);

    function loadNotifications() {
        axios.get(api_base + NotificationPath)
            .then(res => {
                setNotification(res.data.list)
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
                        {row.name}
                    </p>

                </div>
            ))}



        </div>

    )
}