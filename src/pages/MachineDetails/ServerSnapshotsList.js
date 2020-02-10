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

    React.useEffect(() => {
        axios.get(api_base + machineSnapshotsList + '?machine_id=' + props.id.toString())

            .then(res => {
                console.log(res.data)
                const list = res.data.list;

                setSnapShotItems(list);
            })
    }, []);

    function removeSnapshots(id) {
        axios.delete(api_base + 'snapshots/' + id + '/remove'
        )
            .then(res => {
                const msg = res.data.message;

                alert(msg)
            })
    }


    return (

        <div>
            <Box width={700}>
                <Paper variant="outlined">
                    <div style={{direction: "rtl"}}>
                        <h1>تصاویر آنی</h1>
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
                        <Button>تهیه تصویر آنی</Button>

                        <TableContainer component={Paper}>
                            <Table className={classes.table} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>نام</TableCell>
                                        <TableCell align="right">لوگو</TableCell>
                                        <TableCell align="right">نام کاربری</TableCell>
                                        <TableCell align="right">تاریخ ساخت</TableCell>
                                        <TableCell align="right">وضعیت</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {snapShotItems.map(row => (
                                        <TableRow key={row.name}>

                                            <TableCell component="th" scope="row">
                                                {row.name}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {row.remote_id}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {row.created_at}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                <h5>خالی</h5>
                                            </TableCell>

                                            <TableCell component="th" scope="row">
                                                <a onClick={() => removeSnapshots(row.id)}>حذف تصویر آنی</a>
                                            </TableCell>

                                        </TableRow>

                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </Paper>
            </Box>
        </div>
    );

}
