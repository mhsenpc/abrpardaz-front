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


const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

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


export default function SnapshotList() {
    const classes = useStyles();
    const paper = paperStyle();
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
                if (list.length > 0)
                    setMachineId(list[0].id);
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


            <Grid
                container
                direction="row"
                alignItems="right"
            >

                <Grid item xs={4}>

                    <Paper className={paper.paper}>


                        <Button variant="contained">ایجاد سرور + </Button>
                        <p>تصاویر آنی شما </p>


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
                            <p style={{border: "solid 1px red", direction: "rtl"}}>هم اکنون سروری برای حساب کاربری شما
                                وجود
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
                                    نام تصویر آنی باید فقط شامل حرف و عدد باشد، استفاده از کاراکتر خاص به جزخط فاصله
                                    مجاز نمی
                                    باشد!
                                </li>
                                <li>
                                    استفاده از فضای خالی
                                </li>

                            </ul>

                        </div>

                    </Paper>
                </Grid>


                <Grid item xs={8}>


                    <Paper className={paper.paper}>

                        <div style={{direction: "rtl"}}>
                            تصاویر آنی
                            <br/>
                            تاکنون تصویر آنی ساخته نشده است.


                            <TableContainer component={Paper}>
                                <Table className={classes.table} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>

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
                    </Paper>

                </Grid>

            </Grid>


            <MessageBox response={response}/>
        </div>
    );

}
