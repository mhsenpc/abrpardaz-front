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
import {api_base, snapshotsList} from "../../Api";
import DeleteIcon from '@material-ui/icons/Delete';
import swal from "sweetalert";
import SnapshotName from "./SnapshotName";


export default function SnapshotItems(props) {
    const [snapShotItems, setSnapShotItems] = React.useState([]);
    const JDate = require('jalali-date');

    let user_id;
    if (sessionStorage.getItem('user_id'))
        user_id = sessionStorage.getItem('user_id');
    else if (localStorage.getItem('user_id'))
        user_id = localStorage.getItem('user_id');


    React.useEffect(() => {
        loadSnapshots();

        if (user_id) {
            var channel = window.Echo.channel('private-user-' + user_id);
            channel.listen('.snapshot.created', function (data) {
                alert(JSON.stringify(data));
                //TODO: update snapshot which its creation process is completed
                loadSnapshots();
            });
        }
    }, []);

    function loadSnapshots() {
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
                                    <SnapshotName setResponse={props.setResponse} row={row}/>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {(new JDate(new Date(row.created_at))).format('YYYY/MM/DD')}
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
    )
}