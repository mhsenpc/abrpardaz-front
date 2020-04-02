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
import {api_base, InvoicesListPath} from "../Api";
import Button from '@material-ui/core/Button';
import Alert from "@material-ui/lab/Alert/Alert";
import SimpleModal from "./SimpleModal";
import {user_title_postfix} from "../consts";

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
    var numeral = require('numeral');
    const [open, setOpen] = React.useState(false);
    const [billingItems, setBillingItems] = React.useState([]);
    const JDate = require('jalali-date');
    const [total, setTotal] = React.useState(0);
    const [amount, setAmount] = React.useState(0);
    const [vat, setVat] = React.useState(0);


    React.useEffect(() => {
        axios.get(api_base + InvoicesListPath)
            .then(res => {
                const list = res.data.list;
                setItems(list);
            })
    }, []);

    function showDetails(data, amount, vat, total) {
        setBillingItems(JSON.parse(data));
        setOpen(true);
        setAmount(amount)
        setTotal(total)
        setVat(vat)
    }

    function pay(id) {

    }

    return (
        <Paper className={classes.root} style={{padding: 10}}>
            <title>صورت حساب ها{user_title_postfix}</title>

            <h2 style={{direction: "rtl", marginRight: 20}}>صورت حساب ها</h2>
            {items.length === 0 &&
            <Alert severity="info">
                در حال حاضر فاکتوری برای شما وجود ندارد
            </Alert>
            }

            {items.length > 0 &&
            <div>
                <Alert severity="info">
                    تمامی مبالغ به تومان می باشد
                </Alert>

                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">شماره فاکتور</TableCell>
                                <TableCell align="right">هزینه</TableCell>
                                <TableCell align="right">ارزش افزوده</TableCell>
                                <TableCell align="right">جمع کل</TableCell>
                                <TableCell align="right">تاریخ ایجاد</TableCell>
                                <TableCell align="right"></TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map(row => (
                                <TableRow key={row.id}>
                                    <TableCell component="th" scope="row">
                                        {row.invoice_id}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {numeral(row.amount).format('0,0')}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {numeral(row.vat).format('0,0')}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {numeral(row.total).format('0,0')}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {(new JDate(new Date(row.created_at))).format('YYYY/MM/DD')}&nbsp;
                                        {new Date(row.created_at).toLocaleTimeString()}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        <Button variant={"outlined"} color={"primary"}
                                                onClick={() => showDetails(row.data, row.amount, row.vat, row.total)}>نمایش
                                            جزئیات</Button>
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        <Button variant={"outlined"} color={"primary"} onClick={() => pay(row.id)}>
                                            پرداخت
                                        </Button>
                                    </TableCell>

                                </TableRow>

                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            }
            <br/>
            <a href={"/Transactions"}>نمایش تراکنش های بانکی</a>
            <br/>
            <br/>

            <SimpleModal open={open} setOpen={setOpen}>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">عنوان</TableCell>
                                <TableCell align="right">پلن</TableCell>
                                <TableCell align="right">هزینه ساعتی</TableCell>
                                <TableCell align="right">میزان مصرف</TableCell>
                                <TableCell align="right">هزینه</TableCell>
                                <TableCell align="right">تاریخ شروع</TableCell>
                                <TableCell align="right">تاریخ پایان</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {billingItems.map(row => (
                                <TableRow key={row.id}>
                                    <TableCell component="th" scope="row">
                                        {row.type === 'machine' &&
                                        <span>سرور {row.machine.name}</span>
                                        }
                                        {row.type === 'backup' &&
                                        <span>نسخه پشتیبان از {row.machine.name}</span>
                                        }
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {row.plan.name}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {row.type === 'machine' &&
                                        <span>{row.plan.hourly_price} تومان</span>
                                        }
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {row.hours} ساعت
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {numeral(row.total).format('0,0')}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {(new JDate(new Date(row.start))).format('YYYY/MM/DD')}&nbsp;
                                        {new Date(row.start).toLocaleTimeString()}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {(new JDate(new Date(row.end))).format('YYYY/MM/DD')}&nbsp;
                                        {new Date(row.end).toLocaleTimeString()}
                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <p> قیمت خام{amount}</p>
                <p>ارزش افزوده{vat}</p>
                <p>جمع کل{total}</p>
            </SimpleModal>
        </Paper>
    );

}