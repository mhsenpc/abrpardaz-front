import React from 'react';
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import * as classes from "recharts";
const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
            width: theme.spacing(16),
            height: theme.spacing(16),
        },
    },
}));

function Snapshotlist() {
    const classes = useStyles();
    return (
        <div>

        <Button variant="contained">ایجاد سرور + </Button>
        <p style={{direction:"rtl"}}>تصاویر آنی شما </p>
            <div className={classes.root}>
                <Paper variant="outlined">
                    <p>
                        ساخت تصویرآنی
                    </p>
                    <Button variant="contained">                        ساخت تصویرآنی
                    </Button>
                </Paper>

            </div>

        </div>
    );
}
export default Snapshotlist;