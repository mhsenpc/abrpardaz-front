import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Description from '@material-ui/icons/Description';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import axios from "axios";
import {api_base, backupsList, imagesList, snapshotsList} from "../../Api";
import Alert from "@material-ui/lab/Alert/Alert";
import BackupIcon from '@material-ui/icons/Backup';
import SettingsBackupRestoreIcon from '@material-ui/icons/SettingsBackupRestore';
import TreeView from '@material-ui/lab/TreeView';
import {StyledTreeItem} from "../../StyledComponents";
import MailIcon from '@material-ui/icons/Mail';
import DeleteIcon from '@material-ui/icons/Delete';
import Label from '@material-ui/icons/Label';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import InfoIcon from '@material-ui/icons/Info';
import ForumIcon from '@material-ui/icons/Forum';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import DnsIcon from '@material-ui/icons/Dns';


function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-force-tabpanel-${index}`}
            aria-labelledby={`scrollable-force-tab-${index}`}
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
        id: `scrollable-force-tab-${index}`,
        'aria-controls': `scrollable-force-tabpanel-${index}`,
    };
}

export default function SelectSource(props) {
    const [value, setValue] = React.useState(0);
    const [osItems, setOsItems] = React.useState([]);
    const [snapshotItems, setSnapshotItems] = React.useState([]);
    const [backupItems, setBackupItems] = React.useState([]);

    React.useEffect(() => {
        axios.get(api_base + imagesList)
            .then(res => {
                const list = res.data.pagination.data;
                setOsItems(list);
                if (list.length > 0) {
                    props.setImageId(list[0].id)
                    props.setMinRam(list[0].min_ram)
                    props.setMinDisk(list[0].min_disk)
                    props.setSourceName(list[0].name)
                }
            });

        axios.get(api_base + snapshotsList)
            .then(res => {
                const list = res.data.list;
                if (res.data.list)
                    setSnapshotItems(list);
            })

        axios.get(api_base + backupsList)
            .then(res => {
                const list = res.data.list;
                if (res.data.list)
                    setBackupItems(list);
            })
    }, []);

    function isImageActive(id) {
        if (id === props.imageId) {
            return 'active';
        } else {
            return '';
        }
    }

    function isSnapshotActive(id) {
        if (id === props.snapshotId) {
            return 'active';
        } else {
            return '';
        }
    }

    function isBackupActive(id) {
        if (id === props.backupId) {
            return 'active';
        } else {
            return '';
        }
    }


    const handleChange = (event, newValue) => {
        setValue(newValue);
        if (newValue === 0) {
            props.setSnapshotId(null);
            props.setBackupId(null);
        } else if (newValue === 1) {
            props.setImageId(null);
            props.setBackupId(null);
        } else if (newValue === 2) {
            props.setImageId(null);
            props.setSnapshotId(null);
        }
    };

    const selectImage = (id, name, minRam, minDisk) => {
        props.setImageId(id);
        props.setMinDisk(minDisk);
        props.setMinRam(minRam);
        props.setSourceName(name);
    };

    const selectSnapshot = (id, name, minRam, minDisk) => {
        props.setSnapshotId(id);
        props.setMinDisk(minDisk);
        props.setMinRam(minRam);
        props.setSourceName(name);
    };

    const selectBackup = (id, name, minRam, minDisk) => {
        props.setBackupId(id);
        props.setMinDisk(minDisk);
        props.setMinRam(minRam);
        props.setSourceName(name);
    };

    return (
        <Grid item xs={12}>
            <Tabs
                value={value}
                onChange={handleChange}
                variant="fullWidth"
                indicatorColor="secondary"
                textColor="secondary"
            >
                <Tab label="سیستم عامل" icon={<Description/>} {...a11yProps(0)} />
                <Tab label="تصاویر آنی" icon={<BackupIcon/>} {...a11yProps(1)} />
                <Tab label="نسخه پشتیبان" icon={<SettingsBackupRestoreIcon/>} {...a11yProps(2)} />
            </Tabs>


            <TabPanel value={value} index={0}>
                <p>
                    لطفا سیستم عامل مورد نظر خود را انتخاب نمایید
                </p>
                <Grid container>
                    {osItems.map(row => (
                        <Grid item xs={12} md={4} style={{padding: 2}}>
                            <Paper>
                                <Box className={"boxItem osItem " + isImageActive(row.id)} key={row.id}
                                     onClick={() => selectImage(row.id, row.name, row.min_ram, row.min_disk)}>
                                    <img width={64} src={"/images/os/" + row.name.toLowerCase() + '.png'}/>
                                    <h3>{row.name} {row.version}</h3>
                                </Box>
                            </Paper>
                        </Grid>
                    ))}
                    {osItems.length === 0 &&
                    <Alert severity="warning">متاسفانه سیستم عاملی برای انتخاب وجود ندارد</Alert>
                    }
                </Grid>
            </TabPanel>

            <TabPanel value={value} index={1}>
                <p>
                    لطفا تصویر آنی مورد نظر خود را انتخاب نمایید
                </p>
                <Grid container>
                    {snapshotItems.map(row => (
                        <Grid item xs={12} md={4} style={{padding: 2}}>
                            <Paper>
                                <Box className={"boxItem snapshotItem " + isSnapshotActive(row.id)} key={row.id}
                                     onClick={() => selectSnapshot(row.id, row.name, row.image.min_ram, row.image.min_disk)}>
                                    <img width={64} src={"/images/snapshot.webp"}/>
                                    <h3>{row.name}</h3>
                                </Box>
                            </Paper>
                        </Grid>
                    ))}
                    {snapshotItems.length === 0 &&
                    <Alert severity="warning">متاسفانه هیچ تصویر آنی برای انتخاب وجود ندارد</Alert>
                    }
                </Grid>
            </TabPanel>

            <TabPanel value={value} index={2}>
                <p>
                    لطفا نسخه پشتیبان مورد نظر خود را انتخاب نمایید
                </p>
                <Grid container>

                        <Grid item xs={5} style={{padding: 2}}>

                            <TreeView
                                defaultExpanded={['3']}
                                defaultCollapseIcon={<ArrowDropDownIcon/>}
                                defaultExpandIcon={<ArrowRightIcon/>}
                                defaultEndIcon={<div style={{width: 24}}/>}
                            >
                                {backupItems.map(machine => (
                                <StyledTreeItem nodeId="3" labelText={machine.name} labelIcon={DnsIcon}>
                                    {machine.backups.map(row => (
                                    <StyledTreeItem
                                        onClick={() => selectBackup(row.id, row.name, row.image.min_ram, row.image.min_disk)}
                                        className={"backupItem " + isBackupActive(row.id)}
                                        nodeId="5"
                                        labelText={row.name}
                                        labelIcon={SettingsBackupRestoreIcon}
                                        color="#1a73e8"
                                        bgColor="#e8f0fe"
                                    />
                                    ))}
                                </StyledTreeItem>
                                ))}
                            </TreeView>
                        </Grid>
                    {backupItems.length === 0 &&
                    <Alert severity="warning">متاسفانه هیچ نسخه پشیبان از هیچ کدام از سرورهای شما موجود نمی باشد</Alert>
                    }
                </Grid>
            </TabPanel>
        </Grid>

    )
}