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

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

export default function ProfileValidation(props) {
    const classes = useStyles();
    const [userInfo, setUserInfo] = React.useState({profile: []});
    const [response, setResponse] = React.useState([]);

    React.useEffect(() => {
        axios.get(api_base + getUserInfo)
            .then(res => {
                const list = res.data.user;

                setUserInfo(list);
            })
    }, []);


    return (
        <Grid container>
            <Grid item xs={12}>
                <Box p={1}>
                    <fieldset>
                        <legend>اطلاعات کاربر</legend>
                        <Paper>
                            <BasicInfo userInfo={userInfo} setResponse={setResponse}/>
                        </Paper>
                    </fieldset>
                    <br/>

                    <fieldset>
                        <legend>راه های ارتباطی</legend>
                        <Paper>
                            <ContactWays userInfo={userInfo} setResponse={setResponse}/>
                        </Paper>
                    </fieldset>

                    <br/>
                    <fieldset>
                        <legend>بارگذاری مدارک</legend>
                        <Paper>
                            <UploadCertificates userInfo={userInfo} setResponse={setResponse}/>
                        </Paper>
                    </fieldset>
                </Box>
                <MessageBox response={response}/>
            </Grid>
        </Grid>
    );
}