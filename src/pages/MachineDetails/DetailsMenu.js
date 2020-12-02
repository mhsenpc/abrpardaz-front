import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ServerSnapshotsList from "./ServerSnapshotsList";
import Overview from "./Overview";
import Remove from "./Remove";
import UpgradeMachine from "./UpgradeMachine";
import Backups from "./Backups";
import Graphs from "./Graphs";
import Volumes from "./Volumes";
import Network from "./Network";
import Rescue from "./Rescue";
import Power from "./Power";
import Rebuild from "./Rebuild";
import IsoImages from "./IsoImages";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import axios from "axios";
import {api_base} from "../../Api";
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import MessageBox from "../MessageBox";
import CancelIcon from '@material-ui/icons/Cancel';
import Grid from '@material-ui/core/Grid';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import PowerIcon from '@material-ui/icons/Power';
import DnsIcon from '@material-ui/icons/Dns';
import CreateIcon from '@material-ui/icons/Create';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import swal from 'sweetalert';
import {Select} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

function TabPanel(props) {
    const {children, value, index, ...other} = props;


    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: 500

    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
}));

export default function DetailsMenu(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [powerState, setPowerState] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const id = props.match.params.id;
    const [machine, setMachine] = React.useState({name: '', plan: {hourly_price: 0}});
    const [editMode, setEditMode] = React.useState(false);
    const [name, setName] = React.useState('');
    const [response, setResponse] = React.useState([]);
    const [backDropOpen, setBackDropOpen] = React.useState(true);

    function handleChangePower() {
        if (powerState) {
            requestPowerOff()
            setPowerState(!powerState);
        } else {
            requestPowerOn();
        }

        setPowerState(!powerState);
    }

    function requestPowerOn() {
        axios.put(api_base + 'machines/' + id.toString() + '/powerOn')
            .then(res => {
                setResponse(res.data);
                if (res.data.success)
                    setPowerState(true);
            })
    }

    function requestPowerOff() {
        axios.put(api_base + 'machines/' + id.toString() + '/powerOff')
            .then(res => {
                setResponse(res.data);
                if (res.data.success)
                    setPowerState(false);
            })
    }

    React.useEffect(() => {
        props.setDrawerFullWidth(false)
        axios.get(api_base + 'machines/' + id.toString() + '/details')
            .then(res => {
                const machine = res.data.machine;

                setMachine(machine);
                setName(machine.name)
                if (machine.status === 'SHUTOFF')
                    setPowerState(0);
                else
                    setPowerState(1);

                setBackDropOpen(false)

                if (machine.status === 'ERROR') {
                    swal('متاسفانه این سرور ساخته نشده است', 'ساخت این سرور به دلیل مشکلات فنی انجام نشده است. برای اطلاعات بیشتر لطفا با پشتیبانی تماس حاصل فرمایید', 'error');
                } else if (machine.status === 'CREATING') {
                    swal('سرور هم اکنون درحال ایجاد می باشد', 'تا زمانیکه سرور بطور کامل ساخته نشده باشد، نمی توانید تغییری روی آن اعمال نمایید', 'warning').then(function () {
                        window.location.href = "/ProjectsList";
                    });
                }
            })
    }, []);

    function requestRenameMachine() {
        axios.post(api_base + "machines/" + id.toString() + "/rename", {name: name})
            .then(res => {
                setResponse(res.data)
                setEditMode(false)
            })
    }

    const handleBackdropClose = () => {
        setBackDropOpen(false);
    };

    const handleChangeMenuItem = event => {
        setValue(parseInt(event.target.value));
    };

    const handleConsole = () => {
        axios.get(api_base + 'machines/' + id.toString() + '/console')
            .then(res => {
                let link = res.data.link;
                link = "https://google.com";
               window.open(link, "", "width=700,height=500");
            })};

    const detailsmenuItems = [
        {id: 0, title: 'نمای کلی'},
        {id: 1, title: 'نمودار'},
        {id: 2, title: 'نسخه پشتیبان'},
        {id: 3, title: 'تصاویر آنی'},
        {id: 4, title: 'شبکه'},
        {id: 5, title: 'دیسک اضافه'},
        {id: 6, title: 'برق'},
        {id: 7, title: 'مرکز نجات'},
        {id: 8, title: 'اتصال دیسکت'},
        {id: 9, title: 'ارتقاء'},
        {id: 10, title: 'نصب مجدد'},
        {id: 11, title: 'حذف'},
    ]

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={6} md={3}>
                    <CreateIcon/>
                    {editMode === true &&
                    <span>
                    <TextField
                        variant="outlined"
                        required
                        label="نام جدید"
                        value={name}
                        onChange={event => setName(event.target.value)}
                    />
                    <Button variant="contained" color="primary" onClick={requestRenameMachine}>
                        <CheckCircleOutlineIcon/>
                    </Button>
                    <Button variant="contained" color="secondary">
                        <CancelIcon onClick={() => setEditMode(false)}/>
                    </Button>
                </span>
                    }

                    {editMode === false &&
                    <span onClick={() => setEditMode(true)}>{name}</span>
                    }
                </Grid>
                <Grid item xs={6} md={3}>
                    <div>
                        <DnsIcon/>
                        <span><b>IPv4:</b>{machine.public_ipv4}</span>
                    </div>
                </Grid>
                <Grid item xs={6} md={3}>
                    <div>
                        <img src={'/images/console.png'} width={40} onClick={handleConsole}/>
                    </div>
                </Grid>

                <Grid item xs={6} md={3}>
                    <FormControlLabel
                        control={
                            <div>
                                <PowerIcon/>
                                <Switch
                                    checked={Boolean(powerState)}
                                    onChange={handleChangePower}
                                    value={powerState}
                                    color="primary"
                                />
                            </div>
                        }
                        label={(powerState === 1 ? 'روشن' : 'خاموش')}
                    />
                </Grid>

            </Grid>


            <Grid container>
                <Grid item md={2}>
                    <Paper variant={"outlined"}>
                        <Tabs
                            orientation="vertical"
                            variant="scrollable"
                            value={value}
                            onChange={handleChange}
                            className={classes.tabs + ' ' + classes.sectionDesktop}
                        >
                            {detailsmenuItems.map(row => (
                                <Tab label={row.title} {...a11yProps(row.id)} />
                            ))}
                        </Tabs>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={10}>
                    <Select onChange={handleChangeMenuItem} native={true} className={classes.sectionMobile}
                            value={value}>
                        {detailsmenuItems.map(row => (
                            <option value={row.id}>{row.title}</option>
                        ))}
                    </Select>

                    <TabPanel value={value} index={0}>
                        <Overview id={id} machine={machine} setResponse={setResponse}/>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <Graphs id={id} machine={machine} setResponse={setResponse}/>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <Backups id={id} machine={machine} setMachine={setMachine} setResponse={setResponse}/>
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        <ServerSnapshotsList id={id} machine={machine} setResponse={setResponse}/>
                    </TabPanel>
                    <TabPanel value={value} index={4}>
                        <Network id={id} machine={machine} setResponse={setResponse}/>
                    </TabPanel>
                    <TabPanel value={value} index={5}>
                        <Volumes id={id} machine={machine} setResponse={setResponse}/>
                    </TabPanel>
                    <TabPanel value={value} index={6}>
                        <Power id={id} machine={machine} setResponse={setResponse}/>
                    </TabPanel>
                    <TabPanel value={value} index={7}>
                        <Rescue id={id} machine={machine} setResponse={setResponse}/>
                    </TabPanel>
                    <TabPanel value={value} index={8}>
                        <IsoImages id={id} machine={machine} setResponse={setResponse}/>
                    </TabPanel>
                    <TabPanel value={value} index={9}>
                        <UpgradeMachine id={id} machine={machine} setResponse={setResponse}/>
                    </TabPanel>
                    <TabPanel value={value} index={10}>
                        <Rebuild id={id} machine={machine} setResponse={setResponse}/>
                    </TabPanel>
                    <TabPanel value={value} index={11}>
                        <Remove id={id} machine={machine} setResponse={setResponse}/>
                    </TabPanel>
                </Grid>
            </Grid>

            <MessageBox response={response}/>
            <Backdrop className={classes.backdrop} open={backDropOpen} onClick={handleBackdropClose}>
                <CircularProgress color="inherit"/>
            </Backdrop>
        </div>
    );
}