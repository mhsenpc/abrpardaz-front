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
            <div>
                <span>تصویر جلوی کارت ملی &nbsp;</span>

                {props.userInfo.profile.national_card_front_status !== 1 &&
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
                        <br/>
                        <br/>
                    </div>
                }

                {(props.userInfo.profile.national_card_front_status === 0 && !props.userInfo.profile.national_card_front) &&
                <div>
                    <br/>
                    <span>وضعیت:<InfoIcon style={{color: 'orange'}}/> انتخاب نشده</span>
                </div>
                }

                {props.userInfo.profile.national_card_front &&
                <div>
                    <img width={300} height={200} src={props.userInfo.profile.national_card_front}/>
                    <br/>
                </div>
                }

                {(props.userInfo.profile.national_card_front && props.userInfo.profile.national_card_front_status === 0) &&
                <span>وضعیت:<InfoIcon style={{color: 'blue'}}/> در انتظار تایید</span>
                }

                {props.userInfo.profile.national_card_front_status === 1 &&
                <span><CheckIcon style={{color: "green"}}/> تایید شده</span>
                }

                {props.userInfo.profile.national_card_front_status === 2 &&
                <div>
                    <span>وضعیت:<WarningIcon color={"error"}/> رد شده</span>
                    <br/>
                    <span>دلیل عدم تایید: {props.userInfo.profile.national_card_front_reason}</span>
                </div>
                }
            </div>
        )
    }

    function UploadNationalCardBackForm() {
        return (
            <div>
                <span>تصویر پشت کارت ملی &nbsp;</span>

                {props.userInfo.profile.national_card_back_status !== 1 &&
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


                {(props.userInfo.profile.national_card_back_status === 0 && !props.userInfo.profile.national_card_back) &&
                <div>
                    <br/>
                    <span>وضعیت:<InfoIcon style={{color: 'orange'}}/> انتخاب نشده</span>
                </div>
                }

                {props.userInfo.profile.national_card_back &&
                <div>
                    <img width={300} height={200} src={props.userInfo.profile.national_card_back}/>
                    <br/>
                </div>
                }

                {(props.userInfo.profile.national_card_back && props.userInfo.profile.national_card_back_status === 0) &&
                <span>وضعیت:<InfoIcon style={{color: 'blue'}}/> در انتظار تایید</span>
                }

                {props.userInfo.profile.national_card_back_status === 1 &&
                <span><CheckIcon style={{color: "green"}}/> تایید شده</span>
                }

                {props.userInfo.profile.national_card_back_status === 2 &&
                <div>
                    <span>وضعیت:<WarningIcon color={"error"}/> رد شده</span>
                    <br/>
                    <span>دلیل عدم تایید: {props.userInfo.profile.national_card_back_reason}</span>
                </div>
                }

            </div>
        )
    }

    function UploadBirthCertificateForm() {
        return (
            <div>
                <span>تصویر شناسنامه&nbsp;</span>

                {props.userInfo.profile.birth_certificate_status !== 1 &&
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


                {(props.userInfo.profile.birth_certificate_status === 0 && !props.userInfo.profile.birth_certificate_front) &&
                <div>
                    <br/>
                    <span>وضعیت:<InfoIcon style={{color: 'orange'}}/> انتخاب نشده</span>
                </div>
                }

                {props.userInfo.profile.birth_certificate &&
                <div>
                    <img width={300} height={200} src={props.userInfo.profile.birth_certificate}/>
                    <br/>
                </div>
                }

                {(props.userInfo.profile.birth_certificate && props.userInfo.profile.birth_certificate_status === 0) &&
                <span>وضعیت:<InfoIcon style={{color: 'blue'}}/> در انتظار تایید</span>
                }

                {props.userInfo.profile.birth_certificate_status === 1 &&
                <span><CheckIcon style={{color: "green"}}/> تایید شده</span>
                }

                {props.userInfo.profile.birth_certificate_status === 2 &&
                <div>
                    <span>وضعیت:<WarningIcon color={"error"}/> رد شده</span>
                    <br/>
                    <span>دلیل عدم تایید: {props.userInfo.profile.birth_certificate_reason}</span>
                </div>
                }
            </div>
        )
    }


    return (
        <div>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="جلوی کارت ملی" {...a11yProps(0)} />
                    <Tab label="پشت کارت ملی" {...a11yProps(1)} />
                    <Tab label="شناسنامه" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <UploadNationalCardFrontForm/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <UploadNationalCardBackForm/>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <UploadBirthCertificateForm/>
            </TabPanel>
        </div>
    )

}