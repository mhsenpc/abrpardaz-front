import React from 'react';
import BasicInfo from './BasicInfo';
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


export default function Profile(props) {
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
                {(userInfo.profile.national_card_front_status !== 2 || userInfo.profile.national_card_back_status !== 2 || userInfo.profile.birth_certificate_status !== 2  ) &&
                <Alert severity="warning">
                    لطفا هر چه سریع تر برای تکمیل کردن مدارک خود اقدام نمایید
                </Alert>
                }
            </Grid>
            <Grid item xs={12}>
                <AppBar position="static" color={"transparent"}>
                    <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                        <Tab label="بارگذاری مدارک" {...a11yProps(0)} />
                        <Tab label="اطلاعات کاربری" {...a11yProps(1)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                    <Paper>
                        <Box p={1}>
                            <UploadCertificates userInfo={userInfo} setUserInfo={setUserInfo}
                                                setResponse={setResponse}/>
                        </Box>
                    </Paper>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Paper>
                        <Box p={1}>
                            <BasicInfo userInfo={userInfo} setResponse={setResponse} setUserInfo={setUserInfo}/>
                        </Box>
                    </Paper>
                </TabPanel>
                <MessageBox response={response}/>
            </Grid>
        </Grid>
    );
}