import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import axios from "axios";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {api_base, machinesList, snapshotsList} from "../Api";
import {TextField} from "@material-ui/core";
import MessageBox from "./MessageBox";
import Alert from '@material-ui/lab/Alert';
import DeleteIcon from '@material-ui/icons/Delete';
import CancelIcon from '@material-ui/icons/Cancel';
import swal from 'sweetalert';

const paperStyle = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            margin: 'auto',
            maxWidth: 700,
            marginTop: 12

        },
        image: {
            width: 128,
            height: 128,
        },
        img: {
            margin: 'auto',
            display: 'block',
            maxWidth: '100%',
            maxHeight: '100%',
        },
    }),
);

function SnapshotName(props) {
    const [editMode, setEditMode] = React.useState(false);
    const [snapshotName, setSnapshotName] = React.useState('');

    React.useEffect(() => {
        setSnapshotName(props.row.name)
    }, []);

    function requestRenameSnapshot(id) {
        axios.post(api_base + "snapshots/" + id.toString() + "/rename", {name: snapshotName})
            .then(res => {
                props.setResponse(res.data)
                setEditMode(false);
            })
    }

    if (editMode) {
        return (
            <div>
                <TextField
                    id="outlined-full-width"
                    name="name"
                    label="نام جدید"
                    placeholder=""
                    variant="outlined"
                    value={snapshotName}
                    onChange={event => setSnapshotName(event.target.value)}
                />
                <Button variant="contained" color="primary" onClick={() => requestRenameSnapshot(props.row.id)}>
                    تغییر نام
                </Button>
                <CancelIcon onClick={() => setEditMode(false)}/>
            </div>
        )
    } else {
        return (
            <span onClick={() => setEditMode(true)}>
                    {snapshotName}
                </span>
        )
    }
}


export default function SnapshotList() {
    const classes = paperStyle();
    const [machineId, setMachineId] = React.useState(null);
    const [response, setResponse] = React.useState([]);
    const JDate = require('jalali-date');


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
                if (list.length > 0)
                    setMachineId(list[0].id);
            })

        loadSnapshots();

        if (user_id) {
            var channel = window.Echo.channel('private-user-' + user_id);
            channel.listen('.snapshot.created', function (data) {
                alert(JSON.stringify(data));
                //TODO: update snapshot which its creation process is completed
            });
        }
    }, []);

    function loadSnapshots(){
        axios.get(api_base + snapshotsList)
            .then(res => {
                const list = res.data.list;

                setSnapShotItems(list);
            })
    }

    function requestRemoveSnapshot(id) {
        swal("آیا از حذف تصویر آنی اطمینان دارید؟", {
            dangerMode: true,
            buttons: true,
        }).then(function (isConfirm) {
            if (isConfirm) {
                axios.delete(api_base + 'snapshots/' + id + '/remove')
                    .then(res => {
                        setResponse(res.data)
                        loadSnapshots();
                    })
            }
        });
    }

    function requestMakeSnapshot() {
        swal("آیا ازساخت تصویر آنی اطمینان دارید؟", {
            dangerMode: true,
            buttons: true,
        }).then(function (isConfirm) {
            if (isConfirm) {
                requestSnapShot()
            }
        });
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


            <Grid
                container
            >

                <Grid item xs={8}>

                    <Paper className={classes.paper}>
                        <h2>
                            ساخت تصویرآنی
                        </h2>

                        {machineItems.length > 0 &&
                        <div>
                            <p>
                                لطفا قبل از گرفتن تصویر آنی سرور خود را خاموش کنید!
                            </p>

                            <FormControl variant="outlined">
                                <Select
                                    native
                                    onChange={handleChange}
                                >
                                    {machineItems.map(row => (
                                        <option key={row.id} value={row.id}>{row.name}</option>
                                    ))}

                                </Select>
                            </FormControl>

                            <p>
                                <TextField label={"نام تصویر آنی"} name='name'
                                           onChange={event => setName(event.target.value)}/>
                                &nbsp;
                                <Button onClick={() =>requestMakeSnapshot()}>
                                    ساخت تصویرآنی
                                </Button>
                            </p>


                        </div>
                        }


                        {machineItems.length == 0 &&
                        <Alert severity="warning">
                            هم اکنون سروری برای حساب کاربری شما وجود ندارد
                        </Alert>
                        }

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
                                    نام تصویر آنی باید فقط شامل حرف و عدد باشد، استفاده از کاراکتر خاص به جزخط فاصله
                                    مجاز نمی
                                    باشد!
                                </li>
                                <li>
                                    استفاده از فضای خالی بین کلمات مجاز نمی باشد. جهت جداسازی کلمات می توانید از خط
                                    فاصله کمک بگیرید!
                                </li>

                            </ul>

                        </div>

                    </Paper>
                </Grid>


                <Grid item xs={4}>


                    <Paper className={classes.paper}>

                        <div>
                            <h2>تصاویر آنی</h2>

                            {snapShotItems.length == 0 &&
                            <Alert severity="warning">تاکنون هیچ تصویر آنی ساخته نشده است.</Alert>
                            }

                            {snapShotItems.length > 0 &&
                            <TableContainer component={Paper}>
                                <Table aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="right">نام</TableCell>
                                            <TableCell align="right">تاریخ ساخت</TableCell>
                                            <TableCell align="right"></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {snapShotItems.map(row => (
                                            <TableRow key={row.id}>

                                                <TableCell component="th" scope="row">
                                                    <SnapshotName setResponse={setResponse} row={row}/>
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    {(new JDate(new Date(row.created_at))).format('DD MMMM YYYY')}
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
                            }
                        </div>
                    </Paper>

                </Grid>

            </Grid>

            <MessageBox response={response}/>
        </div>
    );

}
