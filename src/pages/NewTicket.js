import React, {useEffect} from 'react';
import Button from "@material-ui/core/Button";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import axios from "axios";
import {api_base, machinesList, newTicket, sshKeysAdd, ticketCategories} from "../Api";


const BootstrapInput = withStyles(theme => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}))(InputBase);

const useStyles = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(1),
    },
}));


function ticketPost(event) {
    event.preventDefault();
    const {machine, category, message, title, priority} = event.currentTarget.elements;
    axios.post(api_base + newTicket, {
        machine: machine.value,
        category: category.value,
        title: title.value,
        message: message.value,
        priority: priority.value
    })
        .then(res => {
            const msg = res.data.data.message;

            alert(msg)
        })
}


function NewTicket() {
    const classes = useStyles();
    const [machine, setMachine] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [priority, setPriority] = React.useState('');

    const handleChangeMachine = event => {
        setMachine(event.target.value);
    };
    const handleChangeCat = event => {
        setCategory(event.target.value);
    };
    const handleChangePriority = event => {
        setPriority(event.target.value);
    };

    const [itemsMachine, setItemsMachine] = React.useState([]);
    const [itemsTicketsCat, setItemsTicketsCat] = React.useState([]);

    React.useEffect(() => {
        axios.get(api_base + machinesList)
            .then(res => {
                const list = res.data.data.list;
                console.log(list);
                setItemsMachine(list);
            });

        axios.get(api_base + ticketCategories)
            .then(res => {
                const list = res.data.data.list;
                console.log(list);
                setItemsTicketsCat(list);
            })

    }, []);


    return (

        <div>


            <Grid item xs={12} container
                  direction="row"
                  alignItems="center"
            >
                <Paper>

                    <Box p={2} width={700}>

                        <label>ماشین:</label>

                        <form onSubmit={ticketPost}>


                            <FormControl className={classes.margin}>
                                <InputLabel id="demo-customized-select-label">Age</InputLabel>
                                <Select
                                    name="machine"
                                    labelId="demo-customized-select-label"
                                    id="demo-customized-select"
                                    value={machine}
                                    onChange={handleChangeMachine}
                                    input={<BootstrapInput/>}
                                >

                                    {itemsMachine.map(row => (
                                        <MenuItem value={row.id}>{row.name}</MenuItem>

                                    ))}
                                </Select>
                            </FormControl>

                            <br/>
                            <label>دسته بندی:</label>
                            <FormControl className={classes.margin}>
                                <InputLabel id="demo-customized-select-label">Age</InputLabel>
                                <Select
                                    name="category"
                                    labelId="demo-customized-select-label"
                                    id="demo-customized-select"
                                    value={category}
                                    onChange={handleChangeCat}
                                    input={<BootstrapInput/>}
                                >
                                    {itemsTicketsCat.map(row => (
                                        <MenuItem value={row.id}>{row.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <br/>

                            <label>اولویت:</label>
                            <FormControl className={classes.margin}>
                                <InputLabel id="demo-customized-select-label">Age</InputLabel>
                                <Select
                                    name="priority"
                                    labelId="demo-customized-select-label"
                                    id="demo-customized-select"
                                    value={priority}
                                    onChange={handleChangePriority}
                                    input={<BootstrapInput/>}
                                >
                                    <MenuItem value='کم'>کم</MenuItem>
                                    <MenuItem value='متوسط'>متوسط</MenuItem>
                                    <MenuItem value='زیاد'>زیاد</MenuItem>
                                </Select>
                            </FormControl>

                            <br/>
                            <label>عنوان</label>
                            <TextField
                                name="title"
                                id="filled-multiline-static"
                                label="عنوان خود را وارد کنید"
                                rows="4"
                                variant="filled"
                            />
                            <br/>

                            <label>متن</label>
                            <TextField
                                name="message"
                                id="filled-multiline-static"
                                label="متن خود را وارد کنید"
                                multiline
                                rows="4"
                                variant="filled"
                            />
                            <Button type="submit" variant="contained" color="primary">
                                ارسال
                            </Button>

                        </form>

                    </Box>

                </Paper>
            </Grid>
        </div>

    )
}

export default NewTicket;
















