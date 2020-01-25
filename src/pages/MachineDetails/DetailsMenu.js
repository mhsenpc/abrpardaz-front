import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ServerSnapshotsList from "./ServerSnapshotsList";
import Overview from "./Overview";
import MachineRemove from "./MachineRemove";
import UpgradeMachine from "./UpgradeMachine";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

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
        height:500

    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
}));

export default function DetailsMenu(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const id = props.match.params.id;

    return (
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
                <Tab label="گراف" {...a11yProps(1)} />
                <Tab label="نسخه پشتیبان" {...a11yProps(2)} />
                <Tab label="تصاویر آنی" {...a11yProps(3)} />
                <Tab label="شبکه" {...a11yProps(4)} />
                <Tab label="فضای اضافه" {...a11yProps(5)} />
                <Tab label="برق" {...a11yProps(6)} />
                <Tab label="دیسک نجات" {...a11yProps(7)} />
                <Tab label="اتصال دیسک" {...a11yProps(8)} />
                <Tab label="ارتقاء" {...a11yProps(9)} />
                <Tab label="ساخت مجدد" {...a11yProps(10)} />
                <Tab label="حذف" {...a11yProps(11)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <Overview />
            </TabPanel>
            <TabPanel value={value} index={1}>

            </TabPanel>
            <TabPanel value={value} index={2}>
                Item Three
            </TabPanel>
            <TabPanel value={value} index={3}>
                <ServerSnapshotsList id={id} />
            </TabPanel>
            <TabPanel value={value} index={4}>
                Item Five
            </TabPanel>
            <TabPanel value={value} index={5}>
                Item Six
            </TabPanel>
            <TabPanel value={value} index={7}>
            Item Seven
        </TabPanel>
            <TabPanel value={value} index={8}>
                Item Seven
            </TabPanel>
            <TabPanel value={value} index={9}>
               <UpgradeMachine/>
            </TabPanel>
            <TabPanel value={value} index={11}>
                <MachineRemove id={id} />
            </TabPanel>
        </div>
    );
}