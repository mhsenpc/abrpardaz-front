import React from 'react';
import Box from '@material-ui/core/Box';
import Button from "@material-ui/core/Button";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {makeStyles} from '@material-ui/core/styles';
import axios from "axios";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {api_base, machinesList, snapshotsList} from "../Api";


const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const useStyles1 = makeStyles({
    table: {
        minWidth: 650,
    },
});

export default function Snapshotlist() {
    const classes = useStyles1();
    const [machine, setMachine] = React.useState('');

    const [labelWidth, setLabelWidth] = React.useState(0);

    const handleChange = name => event => {
        setMachine(event.target.value);
        alert(event.target.value);
    };

    const [machineItems, setMachineItems] = React.useState([]);
    const [snapShotItems, setSnapShotItems] = React.useState([]);

    React.useEffect(() => {
        axios.get(api_base + machinesList)
            .then(res => {
                const list = res.data.data.list;

                setMachineItems(list);
            })
    }, [machineItems]);

    React.useEffect(() => {

        axios.get(api_base + snapshotsList)
            .then(res => {
                const list = res.data.data.list;

                setSnapShotItems(list);
            })
    }, [snapShotItems]);


    function removeSnapshots(id) {
        axios.delete(api_base + 'snapshots/' + id + '/remove'
        )
            .then(res => {
                const msg = res.data.data.message;

                alert(msg)
            })
    }

    return (

        <div>
            <Box width={700} p={1} my={0.5} borderRadius="borderRadius">
                <Button variant="contained">ایجاد سرور + </Button>
                <p style={{direction: "rtl"}}>تصاویر آنی شما </p>
            </Box>
            <Box width={700} style={{border: "solid 1px gray"}} p={1} my={0.5} borderRadius="borderRadius">

                <p style={{direction: "rtl"}}>
                    ساخت تصویرآنی

                    <br/>
                    <br/>
                    لطفاقبل از گرفتن تصویر آنی سرور خود را خاموش کنید!
                </p>
                <FormControl variant="outlined" className={classes.formControl}>
                    <Select
                        native
                        value={machine}
                        onChange={handleChange}
                        labelWidth={labelWidth}
                        inputProps={{
                            name: 'age',
                            id: 'outlined-age-native-simple',
                        }}
                    >
                        {machineItems.map(row => (

                            <option value={row.id}>{row.name}</option>

                        ))}

                    </Select>
                </FormControl>
                <p style={{border: "solid 1px red", direction: "rtl"}}>
                    هم اکنون سروری برای حساب کاربری شما وجود ندارد.
                </p>
                <Button variant="contained"> ساخت تصویرآنی
                </Button>
                <hr/>
                <div style={{color: "red", direction: "rtl"}}>
                    قوانین نامگذاری تصویر آنی:
                    <ul>
                        <li>
                            نام تصویر آنی باید انگلیسی وارد شود
                        </li>
                        <li>
                            نام تصویر آنی باید انگلیسی وارد شود
                        </li>
                        <li>
                            نام تصویر آنی باید انگلیسی وارد شود
                        </li>
                        <li>
                            نام تصویر آنی باید انگلیسی وارد شود
                        </li>

                    </ul>

                </div>
            </Box>
            <Box width={700} style={{border: "solid 1px gray"}} p={1} my={0.5} borderRadius="borderRadius">
                <div style={{direction: "rtl"}}>
                    تصاویر آنی
                    <br/>
                    تاکنون تصویر آنی ساخته نشده است.


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
            </Box>
        </div>
    );

}
