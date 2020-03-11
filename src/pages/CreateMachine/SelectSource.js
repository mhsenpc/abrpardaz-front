import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Storage from '@material-ui/icons/Storage';
import Description from '@material-ui/icons/Description';
import Save from '@material-ui/icons/Save';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import axios from "axios";
import {api_base, imagesList, snapshotsList} from "../../Api";


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

    React.useEffect(() => {
        axios.get(api_base + imagesList)
            .then(res => {
                const list = res.data.list;
                setOsItems(list);
                if (list.length > 0) {
                    props.setImageId(list[0].id)
                }
            });

        axios.get(api_base + snapshotsList)
            .then(res => {
                const list = res.data.list;

                setSnapshotItems(list);
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


    const handleChange = (event, newValue) => {
        setValue(newValue);
        if(newValue === 0){
            props.setSnapshotId(null);
        }
        else if(newValue === 1){
            props.setImageId(null);
        }
    };

    const selectImage = id => {
        props.setImageId(id)
    };

    const selectSnapshot = id => {
        props.setSnapshotId(id)
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
                <Tab label="تصاویر آنی" icon={<Storage/>} {...a11yProps(1)} />
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
                                     onClick={() => selectImage(row.id)}>
                                    <Save/>
                                    <h3>{row.name}{row.version}</h3>
                                </Box>
                            </Paper>
                        </Grid>
                    ))}
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
                                <Box className={"boxItem snapshotItem " + isSnapshotActive(row.id)} key={row.id} onClick={() => selectSnapshot(row.id)}>
                                    <Save/>
                                    <h3>{row.name}</h3>
                                </Box>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </TabPanel>

        </Grid>

    )
}