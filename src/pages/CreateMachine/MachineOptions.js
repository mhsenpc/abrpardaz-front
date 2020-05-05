import React from 'react';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import axios from "axios";
import {api_base, sshKeysList} from "../../Api";
import SimpleModal from "../SimpleModal";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/AddBox";
import {ListItemIcon, Paper} from "@material-ui/core";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import VpnKeyIcon from '@material-ui/icons/VpnKey';


export default function MachineOptions(props) {
    const handleChangeName = event => {
        props.setMachineName(event.target.value);
    };

    const [sshkeyItems, setSshkeyItems] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [keyName, setKeyName] = React.useState('');

    React.useEffect(() => {
        axios.get(api_base + sshKeysList)
            .then(res => {
                const list = res.data.pagination.data;

                setSshkeyItems(list);
            })
    }, []);

    function selectKey(id,name){
        props.setSshId(id)
        setKeyName(name)
        setOpen(false)
    }

    return (
        <Grid container>

            <Grid item xs={12}>
                <br/>
                <span className={'numbering'}>4</span>
                &nbsp;
                <h3 style={{display: "inline"}}>انتخاب کلید SSH</h3>
            </Grid>

            <Grid item xs={3}>
                <Paper className={"boxItem addItem"} onClick={() => setOpen(true)}>
                    {props.sshId === null &&

                    <Typography color="textSecondary">
                        <AddIcon/>
                    </Typography>
                    }

                    {props.sshId !== null &&

                    <Typography color="textSecondary">
                        <VpnKeyIcon/>
                        {keyName}
                    </Typography>
                    }
                </Paper>
            </Grid>

            <Grid item xs={12}>
                <br/>
                <span className={'numbering'}>5</span>
                &nbsp;
                <h3 style={{display: "inline"}}>نام سرور</h3>
            </Grid>

            <Grid item xs={12}>
                <TextField
                    required
                    style={{direction:"ltr"}}
                    placeholder="Server1"
                    value={props.machineName}
                    fullWidth
                    onChange={handleChangeName}
                />
            </Grid>
            <br/>
            <SimpleModal open={open} setOpen={setOpen}>
                <List component="nav" >
                    {sshkeyItems.map(row => (
                        <ListItem button onClick={() => (selectKey(row.id,row.name) ) }>
                            <ListItemIcon>
                                <VpnKeyIcon />
                            </ListItemIcon>
                            <ListItemText primary={row.name}/>
                        </ListItem>
                    ))}
                </List>
            </SimpleModal>
        </Grid>
    );
}