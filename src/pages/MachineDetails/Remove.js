import React from 'react';
import Button from "@material-ui/core/Button";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import axios from "axios";
import {api_base} from "../../Api";
import {useTheme} from '@material-ui/core/styles';
import swal from "sweetalert";


function Remove(props) {

    const theme = useTheme();

    function requestRemoveMachine() {
        swal("در صورت حذف ماشین ،اطلاعات آن نابود میگرددو این عملیات قابل برگشت نیست. آیا از حذف اطمینان دارید؟", {
            dangerMode: true,
            buttons: true,
        }).then(function (isConfirm) {
            if (isConfirm) {
                let id = props.id.toString();
                axios.delete(api_base + 'machines/' + id + '/remove')
                    .then(res => {
                        const msg = res.data.message;

                        if (res.data.success) {
                            swal(msg, '', 'success').then(function(){
                                window.location.href = '/ProjectsList';
                            });
                        } else {
                            swal(msg, '', 'error');
                        }
                    })
            }
        });
    }


    return (
        <div>
            <Grid item xs={12}>
                <Paper>
                    <Box p={1} width={700}>
                        <h2>حذف سرور</h2>
                        <p>
                            حذف سرور باعث متوقف شدن تمام پردازش های سرور و نابودی سیستم عامل، دیسک و نسخه های پشتیبان آن
                            می گردد.
                        </p>
                        <p>
                            اطلاعاتی که با زدن این دکمه حذف می گردد غیر قابل بازیابی هستند.
                        </p>
                        <p>
                            نکته: تصاویر آنی گرفته شده از سرور آسیبی نخواهند دید
                        </p>

                        <Button onClick={() => requestRemoveMachine()} variant="contained" color="secondary">
                            حذف ماشین
                        </Button>

                    </Box>

                </Paper>
            </Grid>

        </div>
    )

}

export default Remove;



