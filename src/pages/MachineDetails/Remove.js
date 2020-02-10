import React from 'react';
import Button from "@material-ui/core/Button";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import axios from "axios";
import {api_base} from "../../Api";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';



function Remove(props) {

    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function removeMachine() {

        let id = props.id.toString();
        axios.delete(api_base + 'machines/' + id + '/remove')
            .then(res => {
                const msg = res.data.data.message;

                alert(msg)

                window.location.href = '/ProjectsList/';

            })
    }



    return(
        <div>
            <Grid item xs={12} container
                  direction="row"
                  alignItems="center"
                  style={{direction:'rtl'}}
            >
                <Paper>

                    <Box  p={2} width={700}>
                        <h1>حذف سرور</h1>
                        <p>
                            حذف سرور باعث متوقف شدن تمام پردازش های سرور و نابودی سیستم عامل، دیسک و نسخه های پشتیبان آن می گردد.
                        </p>
                        <p>
                            اطلاعاتی که با زدن این دکمه حذف می گردد غیر قابل بازیابی هستند.
                        </p>
                        <p>
                            نکته: تصاویر آنی گرفته شده از سرور آسیبی نخواهند دید
                        </p>

                        <Dialog
                            fullScreen={fullScreen}
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="responsive-dialog-title"
                        >
                            <DialogTitle id="responsive-dialog-title">{"⚠️حذف ماشین"}</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    در صورت حذف ماشین ،اطلاعات آن نابود میگرددو این عملیات قابل برگشت نیست. آیا از حذف اطمینان دارید؟
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button autoFocus onClick={handleClose} color="primary">
                                    انصراف
                                </Button>
                                <Button onClick={() => removeMachine()} color="primary" autoFocus>
                                    حذف
                                </Button>
                            </DialogActions>
                        </Dialog>
                        <Button onClick={handleClickOpen} variant="contained" color="secondary">
                           حذف ماشین
                        </Button>

                    </Box>

                </Paper>
            </Grid>

        </div>
    )

}

export default Remove;



