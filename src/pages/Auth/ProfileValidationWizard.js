import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Container from "@material-ui/core/Container";
import {profile_validation_steps, user_title_postfix} from "../../consts";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import axios from "axios";
import {api_base, requestSetMobilePath, setMobileFinalPath, setUserAddress, setUserInfo, verify} from "../../Api";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import swal from 'sweetalert';
import TextField from "@material-ui/core/TextField";
import MessageBox from "../MessageBox";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    button: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

export default function ProfileValidationWizard() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(3);
    const steps = profile_validation_steps;
    const [backDropOpen, setBackDropOpen] = React.useState(true);
    const [response, setResponse] = React.useState([]);
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [nationalCode, setNationalCode] = React.useState('');
    const [postalCode, setPostalCode] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [mobile, setMobile] = React.useState('');
    const [mobileUserCode, setMobileUserCode] = React.useState('');

    const handleBackdropClose = () => {
        setBackDropOpen(false);
    };

    function getStepContent(stepIndex) {
        switch (stepIndex) {
            case 1:
                return (
                    <div>
                        <TextField id="first_name"
                                   value={firstName}
                                   onChange={(event) => setFirstName(event.target.value)}
                                   label="نام"
                                   variant="outlined"
                                   fullWidth
                                   required/>
                        <br/><br/>
                        <TextField id="last_name"
                                   value={lastName}
                                   onChange={(event) => setLastName(event.target.value)}
                                   label="نام خانوادگی" variant="outlined" fullWidth
                                   required/>
                        <br/><br/>

                        <TextField id="national_code"
                                   value={nationalCode}
                                   onChange={(event) => setNationalCode(event.target.value)}
                                   label="کد ملی"
                                   variant="outlined" fullWidth required/>

                        <br/><br/>
                    </div>
                )
            case 2:
                return (
                    <div>
                        <TextField id="postal_code" label="کد پستی" variant="outlined"
                                   value={postalCode}
                                   onChange={(event) => setPostalCode(event.target.value)}
                                   required
                                   fullWidth
                        />

                        <br/><br/>
                        <TextField id="address" label="آدرس" variant="outlined" multiline
                                   value={address}
                                   onChange={(event) => setAddress(event.target.value)}
                                   rows="5"
                                   required
                                   fullWidth
                        />

                        <br/><br/>
                    </div>
                )
            case 3:
                return (
                    <div>
                        <TextField id="mobile" label="تلفن همراه" variant="outlined"
                                   value={mobile}
                                   placeholder={"مثلا 09123456789"}
                                   onChange={(event) => setMobile(event.target.value)}
                                   required
                                   fullWidth
                        />

                        <br/><br/>
                    </div>
                )
            case 4:
                return (
                    <div>
                        <TextField id="usercode" label="کد تایید" variant="outlined"
                                   value={mobileUserCode}
                                   placeholder={"مثلا 23654"}
                                   onChange={(event) => setMobileUserCode(event.target.value)}
                                   required
                                   fullWidth
                        />

                        <br/><br/>
                    </div>
                )
            default:
                return 'Unknown stepIndex';
        }
    }

    function VerifyRequest(event) {
        let search = window.location.search;
        let params = new URLSearchParams(search);
        let email = params.get('email');
        let token = params.get('token');

        axios.post(api_base + verify, {email: email, token: token})
            .then(res => {
                if (res.data.success) {
                    sessionStorage.setItem('token', btoa(res.data.token));
                    sessionStorage.setItem('user_id', res.data.user_id);
                    sessionStorage.setItem('permissions', res.data.permissions);
                } else {
                    swal(res.data.message, '', 'error')
                }
                setBackDropOpen(false);
            })
    }


    function requestMobileRequest() {
        setBackDropOpen(true);

        axios.post(api_base + requestSetMobilePath, {mobile: mobile})
            .then(res => {
                if (res.data.success) {
                    setActiveStep((prevActiveStep) => prevActiveStep + 1);
                } else {
                    setResponse(res.data);
                }
                setBackDropOpen(false);
            })
    }

    function requestSetMobileFinal() {
        axios.post(api_base + setMobileFinalPath, {mobile: mobile, code: mobileUserCode})
            .then(res => {
                if (res.data.success) {
                    window.location.href = '/Profile';
                } else {
                    setResponse(res.data);
                }
                setBackDropOpen(false);
            })
    }

    React.useEffect(() => {
        let search = window.location.search;
        let params = new URLSearchParams(search);
        let email = params.get('email');
        let token = params.get('token');

        if (token && email) {
            VerifyRequest();
        }

    }, []);
    const handleNext = () => {
        if (activeStep === 1) {
            saveUserInfo();
        } else if (activeStep === 2) {
            saveUserAddress();
        } else if (activeStep === 3) {
            requestMobileRequest();
        } else if (activeStep === 4) {
            requestSetMobileFinal()
        }

    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    function saveUserInfo() {
        setBackDropOpen(true);
        axios.post(api_base + setUserInfo, {
            first_name: firstName,
            last_name: lastName,
            national_code: nationalCode,
        })
            .then(res => {
                if (res.data.success) {
                    setActiveStep((prevActiveStep) => prevActiveStep + 1);
                } else {
                    setResponse(res.data);
                }
                setBackDropOpen(false);
            })
    }

    function saveUserAddress(event) {
        setBackDropOpen(true);

        axios.post(api_base + setUserAddress, {
            postal_code: postalCode,
            address: address,
        })
            .then(res => {
                if (res.data.success) {
                    setActiveStep((prevActiveStep) => prevActiveStep + 1);
                } else {
                    setResponse(res.data);
                }
                setBackDropOpen(false);
            })
    }

    return (
        <Container component="main" maxWidth="md">
            <title>تایید ایمیل{user_title_postfix}</title>
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    ثبت نام
                </Typography>
                <Typography component="h6" color={"textSecondary"}>
                    لطفا تمامی مراحل را تا تکمیل ثبت نام دنبال نمایید
                </Typography>
                <form className={classes.form}>
                    <div className={classes.root}>
                        <Stepper activeStep={activeStep} alternativeLabel>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        <div>
                            {activeStep === steps.length ? (
                                <div>
                                    <Typography className={classes.instructions}>مراحل ثبت نام با موفقیت تکمیل شدند</Typography>

                                </div>
                            ) : (
                                <div>
                                    <Typography
                                        className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                                    <div>
                                        <Button
                                            disabled={activeStep <= 1}
                                            onClick={handleBack}
                                            className={classes.backButton}
                                        >
                                            مرحله قبلی
                                        </Button>
                                        <Button variant="contained" color="primary" onClick={handleNext}>
                                            {activeStep === steps.length - 1 ? 'تایید کد' : 'مرحله بعدی'}
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </form>
            </div>
            <Backdrop className={classes.backdrop} open={backDropOpen} onClick={handleBackdropClose}>
                <CircularProgress color="inherit"/>
            </Backdrop>
            <MessageBox response={response}/>
        </Container>
    );
}
