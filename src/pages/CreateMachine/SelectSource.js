import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Storage from '@material-ui/icons/Storage';
import Description from '@material-ui/icons/Description';
import Save from '@material-ui/icons/Save';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import Snapshots from "./Snapshots";
import axios from "axios";
import {api_base, imagesList} from "../../Api";


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

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
}));


const SimplePaper = makeStyles(theme => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
            width: theme.spacing(16),
            height: theme.spacing(16),
        },
    },
}));


const cardpic = makeStyles(theme => ({
    cover: {
        width: 151,
        height: 151
    }

}));

export default function SelectSource() {
    const classes = useStyles();
    const Simple_Paper = SimplePaper();

    const card = cardpic();

    const [value, setValue] = React.useState(0);
    const [items, setItems] = React.useState([]);

    React.useEffect(() => {
        axios.get(api_base + imagesList)
            .then(res => {
                const list = res.data.data.list;

                setItems(list);
            })
    });


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (

        <div>

            <Grid item xs={12} container
                  direction="row"
                  justify="center"
                  alignItems="center">
                <Grid item xs={6} container
                      direction="row"
                      justify="center"
                      alignItems="center">
                    <Paper>

                        <Box textAlign="right" m={5}>
                            <FormLabel>لطفا سیستم عامل مورد نظر خود را انتخاب نمایید</FormLabel>
                        </Box>


                        <AppBar position="static" color="default">
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                variant="scrollable"
                                scrollButtons="on"
                                indicatorColor="primary"
                                textColor="primary"
                                aria-label="scrollable force tabs example"
                            >

                                <Tab label="سیستم عامل" icon={<Description/>} {...a11yProps(0)} />
                                <Tab label="تصاویر آنی" icon={<Storage/>} {...a11yProps(1)} />

                            </Tabs>
                        </AppBar>


                        <TabPanel value={value} index={0}>
                            {items.map(row => (
                                <Button onClick={handleClick}>
                                    <Box component="span" m={1} height="auto" width="auto" display="inline-block">

                                        <div>
                                            <Paper variant="outlined" square>
                                                <Save/>

                                                <Paper>

                                                    <h3>{row.name}{row.version}</h3>
                                                    {row.version}
                                                </Paper>

                                            </Paper>


                                        </div>

                                    </Box>
                                </Button>
                            ))}


                        </TabPanel>

                        <TabPanel value={value} index={1}>

                            <Snapshots/>

                        </TabPanel>


                    </Paper>
                </Grid>


            </Grid>

        </div>
    )

}





























