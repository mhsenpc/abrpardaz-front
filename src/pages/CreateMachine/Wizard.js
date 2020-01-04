import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ListDataCenters from "./ListDataCenters";
import SelectOS from "./SelectOS";
import Plans from "./Plans";
import MachineOptions from "./MachineOptions";
import Confirm from "./Confirm";

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

function getSteps() {
    return ['انتخاب دیتا سنتر', 'انتخاب سیستم عامل', 'انتخاب پلن','تنظیمات ماشین','بازبینی'];
}

function getStepContent(stepIndex) {
    switch (stepIndex) {
        case 0:
            return <ListDataCenters/>;
        case 1:
            return <SelectOS />;
        case 2:
            return <Plans />;
        case 3:
            return <MachineOptions/>;
        case 4:
            return <Confirm />;
        default:
            return 'Unknown stepIndex';
    }
}

export default function Wizard() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <div className={classes.root}>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map(label => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div>
                {activeStep === steps.length ? (
                    <div>
                        <Typography className={classes.instructions}>All steps completed</Typography>
                        <Button onClick={handleReset}>Reset</Button>
                    </div>
                ) : (
                    <div>
                        <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                        <div>
                            <Button
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                className={classes.backButton}
                            >
                                قبلی
                            </Button>
                            <Button variant="contained" color="primary" onClick={handleNext}>
                                {activeStep === steps.length - 1 ? 'ساخت ماشین' : 'بعدی'}
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
