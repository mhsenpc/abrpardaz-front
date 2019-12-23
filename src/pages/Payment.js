import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import SendIcon from '@material-ui/icons/Send';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

const currencies = [
    {
        value: 'USD',
        label: '10.000',
    },
    {
        value: 'EUR',
        label: '20.000',
    },
    {
        value: 'BTC',
        label: '30.000',
    },
    {
        value: 'JPY',
        label: '40.000',
    },
];



const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
    },
}));


export default function Payment() {
    const classes = useStyles();
    const [currency, setCurrency] = React.useState('EUR');
    return (
        <Paper className={classes.root}>
            <Typography variant="h5" component="h3">
                پرداخت
            </Typography>
        <br/>

            <div>
                <ul>
                    <li>پرداخت های شما یک طرفه است و امکان بازگشت وجود ندارد.مبالغ برحسب تومان می باشد.</li>
                    <br/>
                    <li>به مبلغ وارد شده 9 درصد هزینه مالیات برارزش افزوده اضافه می گردد.</li>

                </ul>


            </div>

            <Typography component="p">
                <TextField
                    id="standard-select-currency"
                    select
                    label="مبلغ(تومان)"
                    value={currency}
                >
                    {currencies.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>

            </Typography>
            <br/>
            <Button variant="contained">پرداخت</Button>
        </Paper>
    );
}
