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
import {api_base, machinesList, machineSnapshotsList, snapshotsList} from "../Api";


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

export default function MachineSnapshotsList(props) {
    const [snapShotItems, setSnapShotItems] = React.useState([]);
    const classes = useStyles1();

    React.useEffect(() => {
        let id = props.match.params.id;
        axios.get(api_base + machineSnapshotsList + '?machine_id=' + id.toString() )

            .then(res => {
                console.log(res.data)
                const list = res.data.data.list;

                setSnapShotItems(list);
            })
    }, []);

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
