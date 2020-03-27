import React from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import axios from "axios";
import {api_base, newRole, permissionsList} from "../../Api";
import MessageBox from "../MessageBox";
import {createStyles, makeStyles, Theme} from "@material-ui/core";
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import { useTheme } from '@material-ui/core/styles';

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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}


function RoleAdd() {
    const [response, setResponse] = React.useState([]);
    const [permissions, setPermissions] = React.useState([]);
    const [selectedPermissions, setSelectedPermissions] = React.useState([]);
    const paper = paperStyle();
    const classes = useStyles();
    const theme = useTheme();

    React.useEffect(() => {
        axios.get(api_base + permissionsList)
            .then(res => {
                const list = res.data.list;
                setPermissions(list);
            });
    }, []);

    function requestAddRole(event) {
        event.preventDefault();
        const {name} = event.currentTarget.elements;
        axios.post(api_base + newRole, {
            name: name.value,
            permissions: selectedPermissions,
        })
            .then(res => {
                setResponse(res.data)
                if (res.data.success)
                    window.location.href = '/RolesList';
            })
    }

    const handleChangePermissions = event => {
        setSelectedPermissions(event.target.value);
    };

    return (

        <div className={classes.root}>

            <Grid container>
                <Grid item xs>
                    <Paper className={paper.paper}>
                        <h2>افزودن نقش کاربری</h2>

                        <form onSubmit={requestAddRole}>
                            <TextField
                                className={paper.alignText}
                                name="name"
                                label="نام"
                                variant="filled"
                                required
                            />
                            <br/><br/>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="demo-mutiple-chip-label">دسترسی ها</InputLabel>
                                <Select
                                    labelId="demo-mutiple-chip-label"
                                    id="demo-mutiple-chip"
                                    multiple
                                    value={selectedPermissions}
                                    onChange={handleChangePermissions}
                                    input={<Input id="select-multiple-chip"/>}
                                    renderValue={selected => (
                                        <div className={classes.chips}>
                                            {selected.map(value => (
                                                <Chip key={value} label={value} className={classes.chip}/>
                                            ))}
                                        </div>
                                    )}
                                    MenuProps={MenuProps}
                                >
                                    {permissions.map(row => (
                                        <MenuItem key={row.name} value={row.name} style={getStyles(row.name, selectedPermissions, theme)}>
                                            {row.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
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

export default RoleAdd;