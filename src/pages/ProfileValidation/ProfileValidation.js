import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import BasicInfo from './BasicInfo';
import ContactWays from './ContactWays';
import UploadCertificates from './UploadCertificates';
import {Box, Paper} from "@material-ui/core";
import axios from "axios";
import {api_base, getUserInfo} from "../../Api";
import MessageBox from "../MessageBox";
import Grid from "@material-ui/core/Grid";

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
                <Box p={1}>
                    <fieldset>
                        <legend>اطلاعات کاربر</legend>
                        <Paper>
                            <BasicInfo userInfo={userInfo} setResponse={setResponse} setUserInfo={setUserInfo}/>
                        </Paper>
                    </fieldset>
                    <br/>

                    <fieldset>
                        <legend>راه های ارتباطی</legend>
                        <Paper>
                            <ContactWays userInfo={userInfo} setUserInfo={setUserInfo} setResponse={setResponse} />
                        </Paper>
                    </fieldset>

                    <br/>
                    <fieldset>
                        <legend>بارگذاری مدارک</legend>
                        <Paper>
                            <UploadCertificates userInfo={userInfo} setUserInfo={setUserInfo} setResponse={setResponse}/>
                        </Paper>
                    </fieldset>
                </Box>
                <MessageBox response={response}/>
            </Grid>
        </Grid>
    );
}