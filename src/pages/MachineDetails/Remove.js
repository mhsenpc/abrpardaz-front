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
                        const msg = res.data.data.message;

                        alert(msg)

                        window.location.href = '/ProjectsList/';
                    })
            }
        });
    }


    return (
        <div>
            <Grid item xs={12} container
                  direction="row"
                  alignItems="center"
                  style={{direction: 'rtl'}}
            >
                <Paper>

                    <Box p={2} width={700}>
                        <h1>حذف سرور</h1>
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



