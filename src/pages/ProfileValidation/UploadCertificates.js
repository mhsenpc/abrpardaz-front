import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import axios from "axios";
import {api_base, uploadBirthCertificate, uploadNationalCardBack, uploadNationalCardFront} from "../../Api";
import swal from "sweetalert";
import Typography from '@material-ui/core/Typography';
import WarningIcon from '@material-ui/icons/Warning';
import CheckIcon from '@material-ui/icons/Check';
import InfoIcon from '@material-ui/icons/Info';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';

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


export default function UploadCertificates(props) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const onChangeHandlerCardFront = event => {
        const data = new FormData()
        data.append('image', event.target.files[0])
        axios.post(api_base + uploadNationalCardFront, data)
            .then(res => {
                props.setResponse(res.data)
                if (res.data.success) {
                    swal('تصویر با موفقیت بارگذاری شد', 'تصویر بعد از بررسی کارشناسان ما تایید می شود', 'success').then((value) => {
                        window.location.reload()
                    });
                }
            })
    };

    const onChangeHandlerCardBack = event => {
        const data = new FormData()
        data.append('image', event.target.files[0])
        axios.post(api_base + uploadNationalCardBack, data)
            .then(res => {
                props.setResponse(res.data)
                if (res.data.success) {
                    swal('تصویر با موفقیت بارگذاری شد', 'تصویر بعد از بررسی کارشناسان ما تایید می شود', 'success').then((value) => {
                        window.location.reload()
                    });
                }
            })
    }

    const onChangeHandlerCertificate = event => {

        const data = new FormData()
        data.append('image', event.target.files[0])
        axios.post(api_base + uploadBirthCertificate, data)
            .then(res => {
                props.setResponse(res.data)
                if (res.data.success) {
                    swal('تصویر با موفقیت بارگذاری شد', 'تصویر بعد از بررسی کارشناسان ما تایید می شود', 'success').then((value) => {
                        window.location.reload()
                    });
                }
            })
    }


    function UploadNationalCardFrontForm() {
        return (
            <Grid container>
                <Grid item xs={6}>
                    <span>تصویر جلوی کارت ملی &nbsp;</span>
                    <br/>
                    <br/>
                    {props.userInfo.profile.national_card_front_status === 0 &&
                    <span>وضعیت:<InfoIcon style={{color: 'orange'}}/> انتخاب نشده</span>
                    }

                    {props.userInfo.profile.national_card_front_status === 1 &&
                    <span>وضعیت:<InfoIcon style={{color: 'blue'}}/> در انتظار تایید</span>
                    }

                    {props.userInfo.profile.national_card_front_status === 2 &&
                    <span><CheckIcon style={{color: "green"}}/> تایید شده</span>
                    }

                    {props.userInfo.profile.national_card_front_status === 3 &&
                    <div>
                        <span>وضعیت:<WarningIcon color={"error"}/> رد شده</span>
                        <br/>
                        <span>دلیل عدم تایید: {props.userInfo.profile.national_card_front_reason}</span>
                    </div>
                    }
                </Grid>

                <Grid item xs={6}>
                    <a target={"_blank"} href={props.userInfo.profile.national_card_front}>
                        <img width={300} height={200} src={props.userInfo.profile.national_card_front}/>
                    </a>
                    {props.userInfo.profile.national_card_front_status !== 2 &&
                    <div>
                        <Button
                            variant="contained"
                            component="label"
                        >
                            بارگذاری تصویر
                            <input
                                type="file"
                                name="file"
                                onChange={onChangeHandlerCardFront}
                                style={{display: "none"}}
                            />
                        </Button>
                    </div>
                    }
                </Grid>
            </Grid>

        )
    }

    function UploadNationalCardBackForm() {
        return (
            <Grid container>
                <Grid item xs={6}>
                    <span>تصویر پشت کارت ملی &nbsp;</span>
                    <br/>
                    <br/>

                    {props.userInfo.profile.national_card_back_status === 0 &&
                    <span>وضعیت:<InfoIcon style={{color: 'orange'}}/>انتخاب نشده</span>
                    }

                    {props.userInfo.profile.national_card_back_status === 1 &&
                    <span>وضعیت:<InfoIcon style={{color: 'blue'}}/> در انتظار تایید</span>
                    }

                    {props.userInfo.profile.national_card_back_status === 2 &&
                    <span><CheckIcon style={{color: "green"}}/> تایید شده</span>
                    }

                    {props.userInfo.profile.national_card_back_status === 3 &&
                    <div>
                        <span>وضعیت:<WarningIcon color={"error"}/> رد شده</span>
                        <br/>
                        <span>دلیل عدم تایید: {props.userInfo.profile.national_card_back_reason}</span>
                    </div>
                    }
                </Grid>
                <Grid item xs={6}>
                    <a href={props.userInfo.profile.national_card_back} target={"_blank"}>
                        <img width={300} height={200} src={props.userInfo.profile.national_card_back}/>
                    </a>
                    {props.userInfo.profile.national_card_back_status !== 2 &&
                    <div>
                        <Button
                            variant="contained"
                            component="label"
                        >
                            بارگذاری تصویر
                            <input
                                type="file"
                                name="file"
                                onChange={onChangeHandlerCardBack}
                                style={{display: "none"}}
                            />
                        </Button>
                        <br/>
                        <br/>
                    </div>
                    }
                </Grid>
            </Grid>
        )
    }

    function UploadBirthCertificateForm() {
        return (
            <Grid container>
                <Grid item xs={6}>
                    <span>تصویر شناسنامه&nbsp;</span>
                    <br/>
                    <br/>
                    {props.userInfo.profile.birth_certificate_status === 0 &&
                    <span>وضعیت:<InfoIcon style={{color: 'orange'}}/>انتخاب نشده</span>
                    }

                    {props.userInfo.profile.birth_certificate_status === 1 &&
                    <span>وضعیت:<InfoIcon style={{color: 'blue'}}/> در انتظار تایید</span>
                    }

                    {props.userInfo.profile.birth_certificate_status === 2 &&
                    <span><CheckIcon style={{color: "green"}}/> تایید شده</span>
                    }

                    {props.userInfo.profile.birth_certificate_status === 3 &&
                    <div>
                        <span>وضعیت:<WarningIcon color={"error"}/> رد شده</span>
                        <br/>
                        <span>دلیل عدم تایید: {props.userInfo.profile.birth_certificate_reason}</span>
                    </div>
                    }
                </Grid>
                <Grid item xs={6}>
                    <a target={"_blank"} href={props.userInfo.profile.birth_certificate}>
                        <img width={300} height={200} src={props.userInfo.profile.birth_certificate}/>
                    </a>
                    {props.userInfo.profile.birth_certificate_status !== 2 &&
                    <div>
                        <Button
                            variant="contained"
                            component="label"
                        >
                            بارگذاری تصویر
                            <input
                                type="file"
                                name="file"
                                onChange={onChangeHandlerCertificate}
                                style={{display: "none"}}
                            />
                        </Button>
                        <br/>
                        <br/>
                    </div>
                    }
                </Grid>
            </Grid>
        )
    }


    return (
        <div>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="کارت ملی" {...a11yProps(0)} />
                    <Tab label="شناسنامه" {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <UploadNationalCardFrontForm/>
                <br/>
                <hr/>

                <UploadNationalCardBackForm/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <UploadBirthCertificateForm/>
            </TabPanel>
        </div>
    )

}