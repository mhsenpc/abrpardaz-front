import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Container from "@material-ui/core/Container";
import {profile_validation_steps, user_title_postfix} from "../../consts";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

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
}));

function getStepContent(stepIndex) {
    return (
        <div>
            <center>
                <img src={"images/email.jpeg"}/>
            </center>
            <div style={{direction: "rtl"}}>
                <p>
                    لطفا صندوق پست الکترونیک خود را بررسی کنید. ما ایمیلی حاوی لینک فعال سازی را به آدرس پست الکترونیک شما ارسال
                    کرده
                    ایم. جهت ادامه مراحل ثبت نام روی آن لینک کلیک نمایید
                </p>
            </div>
        </div>
    );
}

export default function WaitForConfirmation() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = profile_validation_steps;

    return (
        <Container component="main" maxWidth="xs">
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
                    در انتظار تایید ایمیل
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
                            <div>
                                <Typography
                                    className={classes.instructions}>{getStepContent(activeStep)}</Typography>

                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </Container>
    );
}
