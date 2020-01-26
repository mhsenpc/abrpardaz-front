import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from "@material-ui/core/Paper/Paper";
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

export default function Backups() {
    return (
        <div>
            <Grid item xs={12}
                  direction="row"
                  alignItems="center"
                  style={{direction: "rtl"}}
            >
                <Box>
                <Paper variant="outlined" >
                    <Box width={700}>
                        <h1>نسخه های پشتیبان</h1>
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

                        <Button>اجرای دستی ساخت پشتیبان</Button>
                        <Button>غیرفعال کردن پشتیبان گیری خودکار</Button>
                    </Box>
                </Paper>
                </Box>
            </Grid>

        </div>
    )
}