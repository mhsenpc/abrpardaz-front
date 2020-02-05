import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import axios from "axios";
import {api_base, InvoicesListPath, plansList} from "../Api";
import Button from '@material-ui/core/Button';
import Alert from "@material-ui/lab/Alert/Alert";
import {Box} from "@material-ui/core";

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
        axios.get(api_base + InvoicesListPath)
            .then(res => {
                const list = res.data.list;

                setItems(list);
            })
    }, []);

    function showDetails(id) {

    }

    function pay(id){

    }


    return (
        <Paper className={classes.root}>
            <h2 style={{direction: "rtl", marginRight: 20}}>فاکتور های پرداخت</h2>
            {items.length == 0 &&
            <Alert severity="info">
                در حال حاضر فاکتوری برای شما وجود ندارد
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
                            <TableCell align="right">جزئیات</TableCell>
                            <TableCell align="right">پرداخت</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map(row => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.amount}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.vat}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.total}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.created_at}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    <a onClick={()=>showDetails(row.id)}>نمایش جزئیات</a>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    <Button onClick={()=>pay(row.id)}>
                                        پرداخت
                                    </Button>
                                </TableCell>

                            </TableRow>

                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            }
            <br />
            <a href={"/Transactions"} >نمایش تراکنش های بانکی</a>
        </Paper>
    );

}
