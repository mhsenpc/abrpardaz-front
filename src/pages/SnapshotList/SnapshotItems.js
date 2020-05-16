import React from 'react';
import Alert from '@material-ui/lab/Alert';
import Paper from '@material-ui/core/Paper';
import axios from "axios";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {api_base, machineSnapshotsList, snapshotsList} from "../../Api";
import DeleteIcon from '@material-ui/icons/Delete';
import swal from "sweetalert";
import {StyledTableCell} from "../../StyledComponents";
import CircularProgress from "@material-ui/core/CircularProgress";
import CheckIcon from "@material-ui/icons/Check";
import SimpleModal from "../SimpleModal";
import Box from "@material-ui/core/Box";
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";


export default function SnapshotItems(props) {
    const [snapShotItems, setSnapShotItems] = React.useState([]);
    const [snapshotId, setSnapshotId] = React.useState(-1);
    const [open, setOpen] = React.useState(false);
    const [disabled, setDisabled] = React.useState(false);
    const JDate = require('jalali-date');
    const [snapshotName, setSnapshotName] = React.useState('');
    const [snapshotDescription, setSnapshotDescription] = React.useState('');

    React.useEffect(() => {
        if (props.machineId) {
            loadSnapshotsOfSpecificServer(props.machineId)
        } else {
            loadSnapshots();
        }
    }, []);

    function loadSnapshots() {
        let list = localStorage.getItem('snapShotItems');
        if (list) {
            let snapList = JSON.parse(list);
            setSnapShotItems(snapList);
        }
        axios.get(api_base + snapshotsList)
            .then(res => {
                const list = res.data.list;
                if (list) {
                    localStorage.setItem('snapShotItems', JSON.stringify(list))
                    setSnapShotItems(list);
                }

            })
    }

    function loadSnapshotsOfSpecificServer(machine_id) {
        axios.get(api_base + machineSnapshotsList + '?machine_id=' + machine_id)

            .then(res => {
                const list = res.data.list;
                if (res.data.list)
                    setSnapShotItems(list);
            })
    }

    function requestRemoveSnapshot(id, name) {
        swal("آیا از حذف تصویر آنی " + name + " اطمینان دارید؟", {
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

    function showUpdateInfo(row) {
        setDisabled(false)
        setOpen(true);
        setSnapshotId(row.id)
        setSnapshotName(row.name)
        setSnapshotDescription(row.description)
    }

    function requestUpdateSnapshotInfo(id) {
        setDisabled(true)
        axios.post(api_base + "snapshots/" + id.toString() + "/updateInfo", {
            name: snapshotName,
            description: snapshotDescription
        })
            .then(res => {
                props.setResponse(res.data)
                setOpen(false)
            })
    }

    return (
        <div>
            <h2>تصاویر آنی</h2>

            {snapShotItems.length === 0 &&
            <Alert severity="warning">تاکنون هیچ تصویر آنی ساخته نشده است.</Alert>
            }

            {snapShotItems.length > 0 &&
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="right">نام</StyledTableCell>
                            <StyledTableCell align="right">توضیحات</StyledTableCell>
                            <StyledTableCell align="right">وضعیت</StyledTableCell>
                            <StyledTableCell align="right">تاریخ ساخت</StyledTableCell>
                            <StyledTableCell align="right"></StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {snapShotItems.map(row => (
                            <TableRow key={row.id}>
                                <TableCell onClick={() => showUpdateInfo(row)} style={{cursor: "pointer"}} align="right"
                                           component="th" scope="row">
                                    <span>{row.name}</span>
                                </TableCell>
                                <TableCell onClick={() => showUpdateInfo(row)} style={{cursor: "pointer"}} align="right"
                                           component="th" scope="row">
                                    <span>{row.description}</span>
                                </TableCell>
                                <TableCell align="right" component="th" scope="row">
                                    {row.remote_id === "0" &&
                                    <CircularProgress color="inherit"/>
                                    }
                                    {row.remote_id.length > 3 &&
                                    <CheckIcon style={{color: "green"}}/>
                                    }
                                </TableCell>
                                <TableCell align="right" component="th" scope="row">
                                    {(new JDate(new Date(row.created_at))).format('YYYY/MM/DD')}
                                </TableCell>
                                <TableCell align="right" component="th" scope="row">
                                    <DeleteIcon style={{cursor: "pointer"}}
                                                onClick={() => requestRemoveSnapshot(row.id, row.name)}>حذف تصویر
                                        آنی</DeleteIcon>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            }

            <SimpleModal open={open} setOpen={setOpen}>
                <Box p={1}>
                    <TextField
                        id="outlined-full-width"
                        name="name"
                        label="نام"
                        placeholder=""
                        variant="outlined"
                        fullWidth
                        value={snapshotName}
                        onChange={event => setSnapshotName(event.target.value)}
                    />
                    <TextField
                        id="outlined-full-width"
                        name="description"
                        label="توضیحات"
                        multiline
                        placeholder=""
                        variant="outlined"
                        fullWidth
                        value={snapshotDescription}
                        onChange={event => setSnapshotDescription(event.target.value)}
                    />
                    <br/>
                    <Button disabled={disabled} variant="contained" color="primary"
                            onClick={() => requestUpdateSnapshotInfo(snapshotId)}>
                        ذخیره اطلاعات
                    </Button>
                    {disabled &&
                    <CircularProgress color="inherit"/>
                    }
                </Box>
            </SimpleModal>
        </div>
    )
}