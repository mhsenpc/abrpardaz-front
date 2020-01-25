import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import BasicInfo from './BasicInfo';
import ContactWays from './ContactWays';
import UploadCertificates from './UploadCertificates';
import {Paper} from "@material-ui/core";
import axios from "axios";
import {api_base, getUserInfo} from "../../Api";
import MessageBox from "../MessageBox";

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
        <div className={classes.root}>
            <Paper>
                <fieldset>
                    <legend>اطلاعات کاربر</legend>
                    <BasicInfo userInfo={userInfo} setResponse={setResponse}/>
                </fieldset>

                <fieldset>
                    <legend>راه های ارتباطی</legend>
                    <ContactWays userInfo={userInfo} setResponse={setResponse}/>
                </fieldset>

                <fieldset>
                    <legend>بارگذاری مدارک</legend>
                    <UploadCertificates userInfo={userInfo} setResponse={setResponse}/>
                </fieldset>
            </Paper>
            <MessageBox response={response}/>
        </div>
    );
}