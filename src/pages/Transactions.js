import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import axios from "axios";
import {api_base, TransactionsListPath} from "../Api";
import Alert from "@material-ui/lab/Alert/Alert";

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
});

export default function Invoices() {
    const classes = useStyles();
    const [items, setItems] = React.useState([]);

    React.useEffect(() => {
        axios.get(api_base + TransactionsListPath)
            .then(res => {
                const list = res.data.list;

                setItems(list);
            })
    }, []);


    return (
        <Paper className={classes.root}>
            <h2 style={{direction: "rtl", marginRight: 20}}>تراکنش های بانکی</h2>
            {items.length === 0 &&
            <Alert severity="info">
                تاکنون هیچ تراکنشی مالی برای این شما ثبت نشده است.
            </Alert>
            }

            {items.length > 0 &&
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>نام</TableCell>
                            <TableCell align="right">شماره فاکتور</TableCell>
                            <TableCell align="right">هزینه</TableCell>
                            <TableCell align="right">ارزش افزوده</TableCell>
                            <TableCell align="right">جمع کل</TableCell>
                            <TableCell align="right">تاریخ ایجاد</TableCell>
                            <TableCell align="right">وضعیت</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map(row => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row.invoice.id}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.invoice.amount}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.invoice.vat}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.invoice.total}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.created_at}
                                </TableCell>

                                <TableCell component="th" scope="row">
                                    {row.is_paid &&
                                    <span>پرداخت شده</span>
                                    }
                                    {!row.is_paid &&
                                    <span>در انتظار پرداخت</span>
                                    }
                                </TableCell>
                            </TableRow>

                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            }
        </Paper>
    );

}
