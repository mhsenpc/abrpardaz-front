import React from 'react';
import Box from '@material-ui/core/Box';
import Button from "@material-ui/core/Button";
import {makeStyles} from '@material-ui/core/styles';
import axios from "axios";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {api_base, machineSnapshotsList} from "../../Api";
import swal from "sweetalert";
import DeleteIcon from "@material-ui/icons/Delete";


const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));


export default function ServerSnapshotsList(props) {
    const [snapShotItems, setSnapShotItems] = React.useState([]);
    const classes = useStyles();
    const JDate = require('jalali-date');

    React.useEffect(() => {
        loadSnapshots();
    }, []);

    function loadSnapshots() {
        axios.get(api_base + machineSnapshotsList + '?machine_id=' + props.id.toString())

            .then(res => {
                const list = res.data.list;

                setSnapShotItems(list);
            })
    }

    function requestRemoveSnapshot(id) {
        swal("آیا از حذف تصویر آنی اطمینان دارید؟", {
            dangerMode: true,
            buttons: true,
            icon: "warning",
        }).then(function (isConfirm) {
            if (isConfirm) {
                axios.delete(api_base + 'snapshots/' + id + '/remove')
                    .then(res => {
                        props.setResponse(res.data)
                        loadSnapshots();
                    })
            }
        });
    }

    return (
        <Paper>
            <Box width={700} p={1}>
                <h2>تصاویر آنی</h2>
                <p>
                    تصاویر آنی کپی لحظه ای از دیسک های سرور شماست.
                </p>
                <p>
                    شما می توانید از تصویر آنی سرور جدیدی بسازید و حتی آن را به پروژه دیگری منتقل کنید
                </p>
                <p>
                    ما پیشنهاد می کنیم که برای جلوگیری از تخریب اطلاعات روی دیسک، قبل از تهیه تصویر آنی، سرور
                    خود را
                    خاموش نمایید
                </p>
                <p>
                    هزینه استفاده از تصویر آنی 100 تومان به ازای هر گیگابایت است
                </p>

                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>نام</TableCell>
                                <TableCell >تاریخ ساخت</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {snapShotItems.map(row => (
                                <TableRow key={row.name}>

                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {(new JDate(new Date(row.created_at))).format('YYYY/MM/DD')}&nbsp;
                                        {new Date(row.created_at).toLocaleTimeString()}
                                    </TableCell>

                                    <TableCell component="th" scope="row">
                                        <DeleteIcon onClick={() => requestRemoveSnapshot(row.id)}>حذف تصویر
                                            آنی</DeleteIcon>
                                    </TableCell>

                                </TableRow>

                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </Box>
        </Paper>
    );
}
