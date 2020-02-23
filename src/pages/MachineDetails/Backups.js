import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from "@material-ui/core/Paper";
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

export default function Backups() {
    return (
        <div>
            <Grid item xs={12}>
                <Box>
                <Paper>
                    <Box width={700} p={1}>
                        <h2>نسخه های پشتیبان</h2>
                        <p>
                            نسخه پشتیبان یک کپی از دیسک سرور شماست که بصورت اتوماتیک تهیه می گردد. به ازای هر سرور 7
                            جایگاه نسخه پشتیبان وجود دارد.
                        </p>
                        <p>
                            اگر همه جایگاه پر شوند و نیاز به جای جدید باشد، قدیمی ترین نسخه پشتیبان حذف می گردد.
                        </p>
                        <p>
                            توصیه ما این است برای جلوگیری از آسیب به اطلاعات روی دیسک ها، قبل از تهیه نسخه پشتیبان، سرور
                            خود را خاموش کنید.
                        </p>
                        <p>
                            فعال سازی تهیه خودکار پشتیبان به اندازه 20 درصد هزینه ماهانه سرور به مبلغ فاکتور اضافه می
                            کند.
                        </p>

                        <Button variant="contained" color="primary">اجرای دستی ساخت پشتیبان</Button>
                        &nbsp;
                        <Button variant="contained" color="secondary">غیرفعال کردن پشتیبان گیری خودکار</Button>
                    </Box>
                </Paper>
                </Box>
            </Grid>

        </div>
    )
}