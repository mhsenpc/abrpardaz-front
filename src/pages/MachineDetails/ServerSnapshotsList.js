import React from 'react';
import Box from '@material-ui/core/Box';
import axios from "axios";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {api_base, machineSnapshotsList} from "../../Api";
import swal from "sweetalert";
import DeleteIcon from "@material-ui/icons/Delete";
import {user_title_postfix} from "../../consts";
import SnapshotItems from "../SnapshotList/SnapshotItems";


export default function ServerSnapshotsList(props) {

    return (
        <Paper>
            <title>تصاویر آنی{user_title_postfix}</title>

            <Box p={1}>
                <h2>تصاویر آنی</h2>
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

                <SnapshotItems machineId={props.id}/>

            </Box>
        </Paper>
    );
}
