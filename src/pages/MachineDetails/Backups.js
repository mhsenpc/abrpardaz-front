import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from "@material-ui/core/Paper";
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import axios from "axios";
import {api_base} from "../../Api";

export default function Backups(props) {

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

    return (
        <div>
            <Grid item xs={12}>
                <Box>
                    <Paper>
                        <Box p={1}>
                            <h2>نسخه های پشتیبان</h2>
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

                            <Button variant="contained" color="primary">اجرای دستی ساخت پشتیبان</Button>
                            &nbsp;
                            {props.machine.backup === true &&
                            <Button onClick={() => requestDisableBackup()} variant="contained" color="secondary">غیرفعال
                                سازی پشتیبان گیری خودکار</Button>
                            }

                            {props.machine.backup === false &&
                            <Button onClick={() => requestEnableBackup()} variant="contained" color="primary">فعال سازی
                                پشتیبان گیری خودکار</Button>
                            }
                        </Box>
                    </Paper>
                </Box>
            </Grid>
        </div>
    )
}