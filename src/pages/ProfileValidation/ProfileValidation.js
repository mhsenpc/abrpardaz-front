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


export default function ProfileValidation(props) {
    const [userInfo, setUserInfo] = React.useState({profile: []});
    const [response, setResponse] = React.useState([]);

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
                <Box p={1}>
                    <fieldset>
                        <legend>اطلاعات کاربر</legend>
                        <Paper>
                            <Box p={1}>
                                <BasicInfo userInfo={userInfo} setResponse={setResponse} setUserInfo={setUserInfo}/>
                            </Box>
                        </Paper>
                    </fieldset>
                    <br/>

                    <fieldset>
                        <legend>راه های ارتباطی</legend>
                        <Paper>
                            <Box p={1}>
                                <ContactWays userInfo={userInfo} setUserInfo={setUserInfo} setResponse={setResponse}/>
                            </Box>
                        </Paper>
                    </fieldset>

                    <br/>
                    <fieldset>
                        <legend>بارگذاری مدارک</legend>
                        <Paper>
                            <Box p={1}>
                                <UploadCertificates userInfo={userInfo} setUserInfo={setUserInfo}
                                                    setResponse={setResponse}/>
                            </Box>
                        </Paper>
                    </fieldset>
                </Box>
                <MessageBox response={response}/>
            </Grid>
        </Grid>
    );
}