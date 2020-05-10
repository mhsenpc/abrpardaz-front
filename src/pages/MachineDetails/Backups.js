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
import {TextField} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import SimpleModal from "../SimpleModal";

export default function Backups(props) {
    const [backupsItems, setBackupItems] = React.useState([]);
    const JDate = require('jalali-date');
    const [disabled, setDisabled] = React.useState(false);
    const [backupName, setBackupName] = React.useState('');
    const [backupDescription, setBackupDescription] = React.useState('');
    const [backupId, setBackupId] = React.useState(-1);
    const [open, setOpen] = React.useState(false);
    React.useEffect(() => {
        loadBackups();
    }, []);

    function showUpdateInfo(row) {
        setDisabled(false)
        setOpen(true);
        setBackupId(row.id)
        setBackupName(row.name)
        setBackupDescription(row.description)
    }

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

    function requestUpdateBackupsInfo(id) {
        setDisabled(true)
        axios.post(api_base + "backups/" + id.toString() + "/updateInfo", {
            name: backupName,
            description: backupDescription
        })
            .then(res => {
                props.setResponse(res.data)
                setOpen(false)
                loadBackups();
            })
    }


    return (
        <div>
            <title>نسخه پشتیبان{user_title_postfix}</title>

            <Grid item xs={12}>
                <Box>
                    <Paper>
                        <Box p={1}>
                            <h2>نسخه  پشتیبان</h2>
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
                                            <TableCell align="right">#</TableCell>
                                            <TableCell align="right">نام</TableCell>
                                            <TableCell align="right">توضیحات</TableCell>
                                            <TableCell align="right">تاریخ ساخت</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>


                                        {backupsItems.map(row => (
                                            <TableRow key={row.name}>
                                                <TableCell component="th" scope="row"  align="right">
                                                    {row.id}
                                                </TableCell>
                                                <TableCell component="th" scope="row" onClick={() => showUpdateInfo(row)} style={{cursor:"pointer"}} align="right">
                                                    {row.name}
                                                </TableCell>
                                                <TableCell component="th" scope="row" onClick={() => showUpdateInfo(row)} style={{cursor:"pointer"}} align="right">
                                                    {row.description}
                                                </TableCell>
                                                <TableCell component="th" scope="row" align="right">
                                                    {(new JDate(new Date(row.created_at))).format('YYYY/MM/DD')}&nbsp;
                                                    {new Date(row.created_at).toLocaleTimeString()}
                                                </TableCell>

                                                <TableCell component="th" scope="row" align="right">
                                                    <DeleteIcon onClick={() => requestRemoveBackup(row.id, row.name)}>حذف
                                                        پشتیبان</DeleteIcon>
                                                </TableCell>

                                            </TableRow>

                                        ))}
                                    </TableBody>
                                </Table>

                            </TableContainer>
                            <SimpleModal open={open} setOpen={setOpen}>
                                <Box p={1}>
                                    <TextField
                                        id="outlined-full-width"
                                        name="name"
                                        label="نام"
                                        placeholder=""
                                        variant="outlined"
                                        fullWidth
                                        value={backupName}
                                        onChange={event => setBackupName(event.target.value)}
                                    />
                                    <TextField
                                        id="outlined-full-width"
                                        name="description"
                                        label="توضیحات"
                                        multiline
                                        placeholder=""
                                        variant="outlined"
                                        fullWidth
                                        value={backupDescription}
                                        onChange={event => setBackupDescription(event.target.value)}
                                    />
                                    <br/>
                                    <Button disabled={disabled} variant="contained" color="primary" onClick={() => requestUpdateBackupsInfo(backupId)}>
                                        ذخیره اطلاعات
                                    </Button>
                                    {disabled &&
                                    <CircularProgress  color="inherit"/>
                                    }
                                </Box>
                            </SimpleModal>

                        </Box>
                    </Paper>
                </Box>
            </Grid>
        </div>
    )
}