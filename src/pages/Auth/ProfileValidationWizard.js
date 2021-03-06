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
import {api_base, getUserInfo, requestSetMobilePath, setMobileFinalPath, setUserAddress, setUserInfo} from "../../Api";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import MessageBox from "../MessageBox";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import {Paper} from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import {fancyTimeFormat} from "../../Helpers";


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
    const [activeStep, setActiveStep] = React.useState(1);
    const steps = profile_validation_steps;
    const [backDropOpen, setBackDropOpen] = React.useState(false);
    const [response, setResponse] = React.useState([]);
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [nationalCode, setNationalCode] = React.useState('');
    const [postalCode, setPostalCode] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [mobile, setMobile] = React.useState('');
    const [mobileUserCode, setMobileUserCode] = React.useState('');
    const [organizationName, setOrganizationName] = React.useState('');
    const [personValue, setPersonValue] = React.useState('individual');
    const [counter, setCounter] = React.useState(0);
    const [timerEnabled, setTimerEnabled] = React.useState(false);

    const handleChange = (event) => {
        setPersonValue(event.target.value);
        if (event.target.value !== 'organization')
            setOrganizationName('');
    };

    const handleBackdropClose = () => {
        setBackDropOpen(false);
    };

    React.useEffect(() => {
        axios.get(api_base + getUserInfo)
            .then(res => {
                let user = res.data.user;
                setFirstName(user.profile.first_name);
                setLastName(user.profile.last_name);
                setNationalCode(user.profile.national_code);
                setPostalCode(user.profile.postal_code);
                setAddress(user.profile.address);
                setMobile(user.profile.mobile);
                setOrganizationName(user.profile.organization_name);
                if (user.profile.organization)
                    setPersonValue('organization');
            });
    }, []);

    React.useEffect(() => {
        const timer =
            counter > 0 && setInterval(() => {
                if (timerEnabled === true) {
                    setCounter(counter - 1)
                }
            }, 1000);
        return () => clearInterval(timer);
    }, [counter,timerEnabled]);

    function getStepContent(stepIndex) {
        switch (stepIndex) {
            case 1:
                return (
                    <div>
                        <RadioGroup value={personValue} onChange={handleChange}>
                            <Grid container>
                                <Grid item xs={6}>
                                    <FormControlLabel value="individual" control={<Radio/>} label="??????????"/>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControlLabel value="organization" control={<Radio/>} label="??????????"/>
                                </Grid>
                            </Grid>
                        </RadioGroup>

                        {personValue === 'organization' &&
                        <div>
                            <TextField id="organization_name"
                                       value={organizationName}
                                       onChange={(event) => setOrganizationName(event.target.value)}
                                       label="?????? ????????????"
                                       variant="outlined"
                                       fullWidth/>
                            <br/><br/>
                        </div>
                        }
                        <TextField id="first_name"
                                   value={firstName}
                                   onChange={(event) => setFirstName(event.target.value)}
                                   label="??????"
                                   variant="outlined"
                                   fullWidth
                                   required/>
                        <br/><br/>
                        <TextField id="last_name"
                                   value={lastName}
                                   onChange={(event) => setLastName(event.target.value)}
                                   label="?????? ????????????????" variant="outlined" fullWidth
                                   required/>
                        <br/><br/>

                        <TextField id="national_code"
                                   value={nationalCode}
                                   onChange={(event) => setNationalCode(event.target.value)}
                                   label="???? ??????"
                                   variant="outlined" fullWidth required/>

                        <br/><br/>
                    </div>
                )
            case 2:
                return (
                    <div>
                        <TextField id="postal_code" label="???? ????????" variant="outlined"
                                   value={postalCode}
                                   onChange={(event) => setPostalCode(event.target.value)}
                                   required
                                   fullWidth
                        />

                        <br/><br/>
                        <TextField id="address" label="????????" variant="outlined" multiline
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
                        <TextField id="mobile" label="???????? ??????????" variant="outlined"
                                   value={mobile}
                                   placeholder={"???????? 09123456789"}
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
                        <TextField id="usercode" label="???? ??????????" variant="outlined"
                                   value={mobileUserCode}
                                   placeholder={"???????? 23654"}
                                   onChange={(event) => setMobileUserCode(event.target.value)}
                                   required
                                   fullWidth
                                   InputProps={{
                                       endAdornment: <InputAdornment
                                           position="start">{fancyTimeFormat(counter)}</InputAdornment>,
                                   }}


                        />

                        <br/><br/>
                    </div>
                )
            default:
                return 'Unknown stepIndex';
        }
    }


    function requestMobileRequest() {
        setBackDropOpen(true);

        axios.post(api_base + requestSetMobilePath, {mobile: mobile})
            .then(res => {
                if (res.data.success) {
                    setActiveStep((prevActiveStep) => prevActiveStep + 1);
                    setCounter(300);
                    setTimerEnabled(true)
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
            organization_name: organizationName
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
            <title>?????????? ?????????? ????????{user_title_postfix}</title>
            <CssBaseline/>
            <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    ?????? ??????
                </Typography>
                <Typography component="h6" color={"textSecondary"}>
                    ???????? ?????????? ?????????? ???? ???? ?????????? ?????? ?????? ?????????? ????????????
                </Typography>
                <div className={classes.form}>
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
                                    <Typography className={classes.instructions}>?????????? ?????? ?????? ???? ???????????? ??????????
                                        ????????</Typography>

                                </div>
                            ) : (
                                <div>
                                    {getStepContent(activeStep)}
                                    <div>
                                        <Button
                                            disabled={activeStep <= 1}
                                            onClick={handleBack}
                                            className={classes.backButton}
                                        >
                                            ?????????? ????????
                                        </Button>
                                        <Button variant="contained" color="primary" onClick={handleNext}>
                                            {activeStep === steps.length - 1 ? '?????????? ????' : '?????????? ????????'}
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Paper>
            <Backdrop className={classes.backdrop} open={backDropOpen} onClick={handleBackdropClose}>
                <CircularProgress color="inherit"/>
            </Backdrop>
            <MessageBox response={response}/>
        </Container>
    );
}
