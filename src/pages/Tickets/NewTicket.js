import React from 'react';
import Button from "@material-ui/core/Button";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import axios from "axios";
import {api_base, machinesList, newTicket, ticketCategories} from "../../Api";
import swal from 'sweetalert';
import MessageBox from "../MessageBox";

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


function NewTicket() {
    const classes = useStyles();
    const [machine, setMachine] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [priority, setPriority] = React.useState('متوسط');
    const [response, setResponse] = React.useState('');

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
                const list = res.data.list;
                setItemsMachine(list);
                if (list.length > 0)
                    setMachine(list[0].id);
            });

        axios.get(api_base + ticketCategories)
            .then(res => {
                const list = res.data.list;
                setItemsTicketsCat(list);
                if (list.length > 0)
                    setCategory(list[0].id);
            })

    }, []);


    function requestNewTicket(event) {
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
                const msg = res.data.message;
                if (res.data.success) {

                    swal(msg, '', 'success').then((result)=>{
                        window.location.href = '/tickets'
                    })

                }
                else{
                    setResponse(res.data)
                }
            })
    }

    return (
        <Grid item xs={12} container
              direction="row"
              alignItems="center"
        >
            <Paper>

                <Box p={2} width={700}>
                    <form onSubmit={requestNewTicket}>
                        <h2>درخواست پشتیبانی</h2>
                        <Grid container spacing={1}>
                            <Grid item xs={12} md={4}>
                                <FormControl className={classes.margin}>
                                    <InputLabel id="demo-customized-select-label">ماشین</InputLabel>
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
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <FormControl className={classes.margin}>
                                    <InputLabel id="demo-customized-select-label">دسته بندی</InputLabel>
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
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <FormControl className={classes.margin}>
                                    <InputLabel id="demo-customized-select-label">اولویت</InputLabel>
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
                            </Grid>
                        </Grid>
                        <TextField
                            name="title"
                            id="filled-multiline-static"
                            label="عنوان تیکت را وارد کنید"
                            variant="filled"
                            required
                        />
                        <br/>
                        <br/>

                        <TextField
                            name="message"
                            id="filled-multiline-static"
                            label="متن سوال را وارد کنید"
                            multiline
                            rows="4"
                            variant="filled"
                            required
                        />
                        <br/>
                        <br/>
                        <Button type="submit" variant="contained" color="primary">
                            ثبت تیکت
                        </Button>

                    </form>

                </Box>

            </Paper>
            <MessageBox response={response}/>
        </Grid>

    )
}

export default NewTicket;