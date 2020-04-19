import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from "@material-ui/core/Paper";
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import axios from "axios";
import {api_base, machineBackupsList} from "../../Api";
import {user_title_postfix} from "../../consts";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import DeleteIcon from "@material-ui/icons/Delete";
import TableContainer from "@material-ui/core/TableContainer";
import swal from "sweetalert";

export default function Backups(props) {
    const [backupsItems, setBackupItems] = React.useState([]);
    const JDate = require('jalali-date');

    React.useEffect(() => {
        loadBackups();
    }, []);

    function loadBackups() {
        axios.get(api_base + machineBackupsList + '?machine_id=' + props.id.toString())

            .then(res => {
                const list = res.data.list;
                if (list)
                    setBackupItems(list);
            })
    }

    function requestRemoveBackup(id, name) {
        swal("آیا از حذف نسخه پشیبان  " + name + " اطمینان دارید؟", {
            dangerMode: true,
            buttons: true,
            icon: "warning",
        }).then(function (isConfirm) {
            if (isConfirm) {
                axios.delete(api_base + 'backups/' + id + '/remove')
                    .then(res => {
                        props.setResponse(res.data)
                        loadBackups();
                    })
            }
        });
    }

    function requestEnableBackup() {
        let id = props.id;
        axios.put(api_base + 'machines/' + id.toString() + '/enableBackup')
            .then(res => {
                props.setResponse(res.data);
                if (res.data.success) {
                    props.setMachine({backup: true})
                }
            })
    }

    function requestDisableBackup() {
        let id = props.id;
        axios.put(api_base + 'machines/' + id.toString() + '/disableBackup')
            .then(res => {
                props.setResponse(res.data);
                if (res.data.success) {
                    props.setMachine({backup: false})
                }
            })
    }

    function requestTriggerBackup() {
        let id = props.id;
        axios.put(api_base + 'backups/trigger?machine_id=' + id.toString())
            .then(res => {
                props.setResponse(res.data);
                loadBackups();
            })
    }

    return (
        <div>
            <title>نسخه های پشتیبان{user_title_postfix}</title>

            <Grid item xs={12}>
                <Box>
                    <Paper>
                        <Box p={1}>
                            <h2>نسخه های پشتیبان</h2>
                            <p>
                                نسخه پشتیبان یک کپی از دیسک سرور شماست که بصورت اتوماتیک تهیه می گردد. به ازای هر سرور 7
                                جایگاه نسخه پشتیبان وجود دارد.
                            </p>
                            <p>
                                اگر همه جایگاه پر شوند و نیاز به جای جدید باشد، قدیمی ترین نسخه پشتیبان حذف می گردد.
                            </p>
                            <p>
                                توصیه ما این است برای جلوگیری از آسیب به اطلاعات روی دیسک ها، قبل از تهیه نسخه پشتیبان،
                                سرور
                                خود را خاموش کنید.
                            </p>
                            <p>
                                فعال سازی تهیه خودکار پشتیبان به اندازه 20 درصد هزینه ماهانه سرور به مبلغ فاکتور اضافه
                                می
                                کند.
                            </p>

                            <Button onClick={() => requestTriggerBackup()} variant="contained" color="primary"> اجرای
                                دستی Backup</Button>
                            &nbsp;
                            {props.machine.backup === true &&
                            <Button onClick={() => requestDisableBackup()} variant="contained" color="secondary">غیرفعال
                                سازی پشتیبان گیری خودکار</Button>
                            }

                            {props.machine.backup === false &&
                            <Button onClick={() => requestEnableBackup()} variant="contained" color="primary">فعال سازی
                                پشتیبان گیری خودکار</Button>
                            }


                            <TableContainer component={Paper}>
                                <Table aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>#</TableCell>
                                            <TableCell>نام</TableCell>
                                            <TableCell>تاریخ ساخت</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {backupsItems.map(row => (
                                            <TableRow key={row.name}>
                                                <TableCell component="th" scope="row">
                                                    {row.id}
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    {row.name}
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    {(new JDate(new Date(row.created_at))).format('YYYY/MM/DD')}&nbsp;
                                                    {new Date(row.created_at).toLocaleTimeString()}
                                                </TableCell>

                                                <TableCell component="th" scope="row">
                                                    <DeleteIcon onClick={() => requestRemoveBackup(row.id, row.name)}>حذف
                                                        پشتیبان</DeleteIcon>
                                                </TableCell>

                                            </TableRow>

                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Paper>
                </Box>
            </Grid>
        </div>
    )
}