import React from 'react';
import axios from "axios";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {api_base} from "../Api";
import MessageBox from "./MessageBox";
import {makeStyles} from "@material-ui/core";
import {user_title_postfix} from "../consts";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import SimpleModal from "./SimpleModal";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert/Alert";


const useStyles = makeStyles(theme => ({}));

export default function InvoicePayment(props) {
    const classes = useStyles();
    const [invoice, setInvoice] = React.useState([]);
    const [response, setResponse] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [description, setDescription] = React.useState('');
    const [file, setFile] = React.useState('');
    const [fileName, setFileName] = React.useState('');
    var numeral = require('numeral');

    React.useEffect(() => {
        let id = props.match.params.id;
        axios.get(api_base + 'invoices/' + id + '/show')
            .then(res => {
                const item = res.data.item;

                setInvoice(item);
            })
    }, []);

    function onChangeFileHandler(event) {
        if (event.target.files[0] !== undefined) {
            setFileName(event.target.files[0].name);
            setFile(event.target.files[0]);
        } else {
            setFile('');
            setFileName('')
        }
    }

    function uploadReceiptRequest() {
        let id = props.match.params.id;

        const data = new FormData()
        data.append('image', file)
        data.append('description', description)
        axios.post(api_base + 'invoices/' + id.toString() + '/uploadReceipt', data)
            .then(res => {
                setResponse(res.data)
                setOpen(false)
            })
    }

    return (
        <Grid container spacing={1}>
            <title>پرداخت فاکتور{user_title_postfix}</title>

            <Grid item xs={12}>
                <Paper>
                    <Box p={1}>
                        {invoice.receipt &&
                        <Alert severity="info">
                            <span>
                            <a target={"_blank"} href={invoice.receipt}>فیش بانکی</a>
                                &nbsp;
                                شما بارگذاری شده است و منتظر تایید کارشناسان است.
                        </span>
                        </Alert>
                        }

                        <h2>پرداخت فاکتور {invoice.invoice_id}</h2>
                        <p>
                            مبلغ خام:
                            {numeral(invoice.amount).format('0,0')} تومان
                        </p>
                        <p>
                            ارزش افزوده:
                            {numeral(invoice.vat).format('0,0')} تومان
                        </p>
                        <p>
                            مجموع:
                            {numeral(invoice.total).format('0,0')} تومان
                        </p>
                        <p>
                            <Button variant={"contained"} color={"primary"}>پرداخت آنلاین</Button>
                        </p>
                        <p>
                            و یا
                        </p>
                        <p>
                            <Button variant={"contained"} color={"secondary"} onClick={() => setOpen(true)}>بارگذاری فیش
                                بانکی</Button>
                        </p>
                    </Box>
                </Paper>
            </Grid>

            <MessageBox response={response}/>

            <SimpleModal open={open} setOpen={setOpen}>
                <h2 id="simple-modal-title">بارگذاری فیش بانکی</h2>
                <p>
                    <Button
                        variant="contained"
                        component="label"
                    >
                        انتخاب
                        <input
                            type="file"
                            name="file"
                            style={{display: "none"}}
                            onChange={onChangeFileHandler}
                        />
                    </Button>
                    &nbsp;
                    <span>{fileName}</span>
                </p>
                <p>
                    <TextField id="outlined-search" type="text" multiline variant="outlined"
                               onChange={event => setDescription(event.target.value)} label={"توضیحات"}/>
                </p>
                <Button color={"primary"} onClick={() => uploadReceiptRequest()} variant="contained">
                    ثبت
                </Button>
            </SimpleModal>
        </Grid>
    )
}
