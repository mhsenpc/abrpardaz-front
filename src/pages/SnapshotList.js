import React from 'react';
import Box from '@material-ui/core/Box';
import Button from "@material-ui/core/Button";
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
import {TextField} from "@material-ui/core";
import MessageBox from "./MessageBox";


const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export default function SnapshotList() {
    const classes = useStyles();
    const [machineId, setMachineId] = React.useState(null);
    const [response, setResponse] = React.useState([]);


    const handleChange = event => {
        setMachineId(event.target.value);
    };

    let user_id;
    if (sessionStorage.getItem('user_id'))
        user_id = sessionStorage.getItem('user_id');
    else if (localStorage.getItem('user_id'))
        user_id = localStorage.getItem('user_id');



    const [machineItems, setMachineItems] = React.useState([]);
    const [snapShotItems, setSnapShotItems] = React.useState([]);

    React.useEffect(() => {
        axios.get(api_base + machinesList)
            .then(res => {
                const list = res.data.list;

                setMachineItems(list);
                setMachineId(list[0].id); //TODO: what if there were no machines?!
            })

        axios.get(api_base + snapshotsList)
            .then(res => {
                const list = res.data.list;

                setSnapShotItems(list);
            })

        if (user_id) {
            var channel = window.Echo.channel('private-user-' + user_id);
            channel.listen('.snapshot.created', function (data) {
                alert(JSON.stringify(data));
                //TODO: update snapshot which its creation process is completed
            });
        }
    }, []);

    function requestRemoveSnapshot(id) {
        axios.delete(api_base + 'snapshots/' + id + '/remove')
            .then(res => {
                setResponse(res.data)
            })
    }


    const [name, setName] = React.useState('');

    function requestSnapShot() {
        axios.post(api_base + 'machines/' + machineId.toString() + '/takeSnapshot', {name: name})
            .then(res => {
                setResponse(res.data)
            })
    }


    return (

        <div>
            <Box width={700} p={1} my={0.5} borderRadius="borderRadius">
                <Button variant="contained">ایجاد سرور + </Button>
                <p>تصاویر آنی شما </p>
            </Box>
            <Box width={700} style={{border: "solid 1px gray"}} p={1} my={0.5} borderRadius="borderRadius">

                <p>
                    ساخت تصویرآنی
                </p>

                <p>
                    لطفا قبل از گرفتن تصویر آنی سرور خود را خاموش کنید!
                </p>
                <FormControl variant="outlined" className={classes.formControl}>
                    <Select
                        native
                        value={machineId}
                        onChange={handleChange}
                        inputProps={{
                            name: 'age',
                            id: 'outlined-age-native-simple',
                        }}
                    >
                        {machineItems.map(row => (

                            <option key={row.id} value={row.id}>{row.name}</option>

                        ))}

                    </Select>
                </FormControl>


                {machinesList.length > 0 ? (
                    <p>
                        <TextField name='name' onChange={event => setName(event.target.value)}/>
                    </p>
                ) : (
                    <p style={{border: "solid 1px red", direction: "rtl"}}>هم اکنون سروری برای حساب کاربری شما وجود
                        ندارد.</p>
                )}

                <Button onClick={() => requestSnapShot()} variant="contained">
                    ساخت تصویرآنی
                </Button>

                <hr/>
                <div style={{color: "red", direction: "rtl"}}>
                    قوانین نامگذاری تصاویر آنی:
                    <ul>
                        <li>
                            نام تصویر آنی باید به انگلیسی وارد گردد.
                        </li>
                        <li>
                            حداقل تعدادکاراکترهای نام تصویر آنی 4 عدد می باشد!
                        </li>
                        <li>
                            نام تصویر آنی باید فقط شامل حرف و عدد باشد، استفاده از کاراکتر خاص به جزخط فاصله مجاز نمی
                            باشد!
                        </li>
                        <li>
                            استفاده از فضای خالی
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
                                    <TableRow key={row.id}>

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
                                            <a onClick={() => requestRemoveSnapshot(row.id)}>حذف تصویر آنی</a>
                                        </TableCell>

                                    </TableRow>

                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>


                </div>
            </Box>
            <MessageBox response={response}/>
        </div>
    );

}
