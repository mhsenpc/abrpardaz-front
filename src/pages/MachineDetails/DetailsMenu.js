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
}));

export default function DetailsMenu(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [state, setState] = React.useState({
        checkedA: true,
        checkedB: true,
    });
    const handleChangePower = name => event => {
        setState({...state, [name]: event.target.checked});
    };
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const id = props.match.params.id;
    const [machine, setMachine] = React.useState({name: '' , plan:[] });
    const [editMode, setEditMode] = React.useState(false);
    const [name, setName] = React.useState('');
    const [response, setResponse] = React.useState([]);

    React.useEffect(() => {
        axios.get(api_base + 'machines/' + id.toString() + '/details')
            .then(res => {
                const machine = res.data.machine;

                setMachine(machine);
                setName(machine.name)
            })
    }, []);

    function requestRenameMachine() {
        axios.post(api_base + "machines/" + id.toString() + "/rename", {name: name})
            .then(res => {
                setResponse(res.data)
                setEditMode(false)
            })
    }

    return (
        <Grid container>
            <Grid container item xs={12}>
                <Grid xs={3}>
                    <CreateIcon />
                    {editMode == true &&
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

                    {editMode == false &&
                    <span onClick={() => setEditMode(true)}>{name}</span>
                    }
                </Grid>
                <Grid xs={3}>
                    <div>
                        <DnsIcon/>
                        <span><b>IPv4:</b>{machine.public_ipv4}</span>
                    </div>
                </Grid>
                <Grid xs={3}>

                    <FormControlLabel
                        control={
                            <div>
                                <PowerIcon/>
                                <Switch
                                    checked={state.checkedB}
                                    onChange={handleChangePower('checkedB')}
                                    value="checkedB"
                                    color="primary"
                                />
                            </div>
                        }
                        label="روشن"
                    />
                </Grid>

            </Grid>
            <div className={classes.root}>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    className={classes.tabs}
                >
                    <Tab label="نمای کلی" {...a11yProps(0)} />
                    <Tab label="نمودار" {...a11yProps(1)} />
                    <Tab label="نسخه پشتیبان" {...a11yProps(2)} />
                    <Tab label="تصاویر آنی" {...a11yProps(3)} />
                    <Tab label="شبکه" {...a11yProps(4)} />
                    <Tab label="دیسک اضافه" {...a11yProps(5)} />
                    <Tab label="برق" {...a11yProps(6)} />
                    <Tab label="مرکز نجات" {...a11yProps(7)} />
                    <Tab label="اتصال دیسکت" {...a11yProps(8)} />
                    <Tab label="ارتقاء" {...a11yProps(9)} />
                    <Tab label="نصب مجدد" {...a11yProps(10)} />
                    <Tab label="حذف" {...a11yProps(11)} />
                </Tabs>
                <TabPanel value={value} index={0}>
                    <Overview id={id} machine={machine} setResponse={setResponse}/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Graphs id={id} machine={machine} setResponse={setResponse} />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <Backups id={id} machine={machine} setResponse={setResponse} />
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <ServerSnapshotsList id={id} machine={machine} setResponse={setResponse}/>
                </TabPanel>
                <TabPanel value={value} index={4}>
                    <Network id={id} machine={machine} setResponse={setResponse} />
                </TabPanel>
                <TabPanel value={value} index={5}>
                    <Volumes id={id} machine={machine} setResponse={setResponse} />
                </TabPanel>
                <TabPanel value={value} index={6}>
                    <Power id={id} machine={machine} setResponse={setResponse} />
                </TabPanel>
                <TabPanel value={value} index={7}>
                    <Rescue id={id} machine={machine} setResponse={setResponse}/>
                </TabPanel>
                <TabPanel value={value} index={8}>
                    <IsoImages id={id} machine={machine} setResponse={setResponse}/>
                </TabPanel>
                <TabPanel value={value} index={9}>
                    <UpgradeMachine id={id} machine={machine} setResponse={setResponse} />
                </TabPanel>
                <TabPanel value={value} index={10}>
                    <Rebuild id={id} machine={machine} setResponse={setResponse} />
                </TabPanel>
                <TabPanel value={value} index={11}>
                    <Remove id={id} machine={machine} setResponse={setResponse} />
                </TabPanel>
            </div>
            <MessageBox response={response}/>
        </Grid>
    );
}