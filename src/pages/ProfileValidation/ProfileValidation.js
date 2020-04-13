import React from 'react';
import BasicInfo from './BasicInfo';
import ContactWays from './ContactWays';
import UploadCertificates from './UploadCertificates';
import {Box, Paper} from "@material-ui/core";
import axios from "axios";
import {api_base, getUserInfo} from "../../Api";
import MessageBox from "../MessageBox";
import Grid from "@material-ui/core/Grid";
import Alert from "@material-ui/lab/Alert/Alert";
import {user_title_postfix} from "../../consts";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";


function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


export default function ProfileValidation(props) {
    const [userInfo, setUserInfo] = React.useState({profile: []});
    const [response, setResponse] = React.useState([]);
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    React.useEffect(() => {
        axios.get(api_base + getUserInfo)
            .then(res => {
                const user = res.data.user;

                setUserInfo(user);
            })
    }, []);


    return (
        <Grid container>
            <Grid item xs={12}>
                <title>اطلاعات کاربری{user_title_postfix}</title>
                {(userInfo.profile.validation_status == 0) &&
                <Alert severity="warning">
                    پروفایل شما در حالت تایید نشده می باشد
                </Alert>
                }
                {(userInfo.profile.validation_status == 2) &&
                <Alert severity="warning">
                    پروفایل شما توسط پشتیبانی تایید نشده است.
                    <br />
                    دلیل: {userInfo.profile.validation_reason}
                </Alert>
                }
                {(userInfo.profile.validation_status == 1) &&
                <Alert severity="success">
                    اطلاعات پروفایل شما تایید شده است
                </Alert>
                }
            </Grid>
            <Grid item xs={12}>
                <AppBar position="static">
                    <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                        <Tab label="اطلاعات کاربری" {...a11yProps(0)} />
                        <Tab label="راه های ارتباطی" {...a11yProps(1)} />
                        <Tab label="بارگذاری مدارک" {...a11yProps(2)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                    <Paper>
                        <Box p={1}>
                            <BasicInfo userInfo={userInfo} setResponse={setResponse} setUserInfo={setUserInfo}/>
                        </Box>
                    </Paper>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Paper>
                        <Box p={1}>
                            <ContactWays userInfo={userInfo} setUserInfo={setUserInfo} setResponse={setResponse}/>
                        </Box>
                    </Paper>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <Paper>
                    <Box p={1}>
                        <UploadCertificates userInfo={userInfo} setUserInfo={setUserInfo}
                                            setResponse={setResponse}/>
                    </Box>
                </Paper>
                </TabPanel>

                <MessageBox response={response}/>
            </Grid>
        </Grid>
    );
}