import React from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import axios from "axios";
import {api_base, permissionsList} from "../../Api";
import MessageBox from "../MessageBox";
import {createStyles, makeStyles, Theme} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import Chip from "@material-ui/core/Chip";
import MenuItem from "@material-ui/core/MenuItem";
import {useTheme} from "@material-ui/core/styles";
import {admin_title_postfix} from "../../consts";


const paperStyle = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            margin: 'auto',
            maxWidth: 700,
            marginTop: 12

        },
        image: {
            width: 128,
            height: 128,
        },
        img: {
            margin: 'auto',
            display: 'block',
            maxWidth: '100%',
            maxHeight: '100%',
        },
        alignText: {
            textAlign: 'right'
        }
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
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
    noLabel: {
        marginTop: theme.spacing(3),
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


function RoleEdit(props) {
    const [response, setResponse] = React.useState([]);
    const [item, setItem] = React.useState({name: '', content: ''});
    const paper = paperStyle();
    const classes = useStyles();
    const [permissions, setPermissions] = React.useState([]);
    const [selectedPermissions, setSelectedPermissions] = React.useState([]);
    const theme = useTheme();


    React.useEffect(() => {
        let id = props.match.params.id;
        axios.get(api_base + 'roles/' + id.toString() + '/show')
            .then(res => {
                const role = res.data.item;
                setItem(role);
                var arr = [];
                role.permissions.map(row => (
                    arr.push(row.name)
                ));
                setSelectedPermissions(arr)
            })

        axios.get(api_base + permissionsList)
            .then(res => {
                const list = res.data.list;
                if (res.data.list)
                    setPermissions(list);
            });
    }, [])

    function requestEditRole(event) {
        let id = props.match.params.id;
        event.preventDefault();
        const {name} = event.currentTarget.elements;
        axios.post(api_base + 'roles/' + id.toString() + '/edit', {
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
            <title>ویرایش نقش کاربری{admin_title_postfix}</title>

            <Grid container
                  direction="row"
                  justify="center"
                  alignItems="center">

                <Grid item xs>

                    <Paper className={paper.paper}>
                        <h2>ویرایش نقش کاربری</h2>

                        <form onSubmit={requestEditRole}>
                            <TextField
                                name='name'
                                className={paper.alignText}
                                label="نام"
                                variant="filled"
                                onChange={event => setItem({name: event.target.value})}
                                value={item.name}
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
                                        <MenuItem key={row.name} value={row.name}
                                                  style={getStyles(row.name, selectedPermissions, theme)}>
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

export default RoleEdit;