import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FAQList from "./FAQList";


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    container: {
        display: 'flex',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        flex: '1 0 auto',
        margin: theme.spacing(1),
    },
}));


function BreakpointOnly(props) {
    const classes = useStyles();
    const {width} = props;

    return (
        <div className={classes.root}>
            <br/>
            <Button variant="contained" color="primary">
                تیکت های من
            </Button>
            <br/>
            <br/>
            <h2> جست و جو برای یک مشکل</h2>
            <TextField
                id="outlined-full-width"
                label="Label"
                style={{margin: 8}}
                placeholder="چطورمیتونم ...؟"
                fullWidth
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
                variant="outlined"
            />
            <FAQList/>


        </div>

    );
}

BreakpointOnly.propTypes = {
    width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired,
};

export default withWidth()(BreakpointOnly);