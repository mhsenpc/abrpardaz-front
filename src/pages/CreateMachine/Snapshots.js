import React from 'react';

import {makeStyles} from '@material-ui/core/styles';

import {green, pink} from '@material-ui/core/colors';
import Avatar from '@material-ui/core/Avatar';
import Description from '@material-ui/icons/Description';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import axios from "axios";
import {api_base, snapshotsList} from "../../Api";
import Button from "@material-ui/core/Button";


const snapshott = makeStyles(theme => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    pink: {
        color: theme.palette.getContrastText(pink[500]),
        backgroundColor: pink[500],
    },
    green: {
        color: '#fff',
        backgroundColor: green[500],
    },
}));

export default function Snapshots() {

    const snap = snapshott();

    const [items, setItems] = React.useState([]);

    React.useEffect(() => {
        axios.get(api_base + snapshotsList)
            .then(res => {
                const list = res.data.list;

                setItems(list);
            })
    },[]);


    return (

        <div>

            <div className={snap.root}>
                <List>
                    {items.map(row => (
                        <Button key={row.id}>
                            <ListItem>
                                <ListItemAvatar>

                                    <Avatar>
                                        <Description/>
                                    </Avatar>

                                </ListItemAvatar>
                                <ListItemText primary={row.name} secondary={row.created_at}/>
                            </ListItem>
                        </Button>
                    ))}
                </List>

            </div>

        </div>

    );


}






























