import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from "@material-ui/core/Paper/Paper";
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

export default function Rescue() {
    return (
        <div>
            <Grid item xs={12}
                  direction="row"
                  alignItems="center"
                  style={{direction: "rtl"}}
            >
                <Paper>
                    <Box width={700}>
                        <h1>مرکز نجات</h1>
                        <p>
                            مرکز نجات محیطی است که در آن می توانید مشکلاتی که بوت شدن عادی سیستم عامل را دچار مشکل می کند، حل نمایید.
                        </p>
                        <p>
                            پس از فعال سازی حالت نجات، شما باید سرور خود را راه اندازی مجدد کنید تا بتوانید از آن استفاده کنید. با راه اندازی بعدی بعد از آن، سیستم عامل مطابق معمول  از روی دیسک پیش فرض بارگذاری می شود.
                        </p>

                        <Button>فعال سازی حالت نجات</Button>
                        <Button>فعال سازی حالت نجات و راه اندازی مجدد</Button>
                    </Box>
                </Paper>

                <Paper>
                    <Box width={700}>
                        <h1>فراموشی رمز سیستم عامل</h1>
                        <p>
                            در صورتی که رمز مدیر سیستم عامل خود را فراموش کرده باشید با این گزینه می توانید رمز آن را تنظیم مجدد کنید.
                        </p>
                        <p>
                            نکته: در صورتی که برنامه quemu-guest agent را از سیستم عامل خود حذف نمایید، این قابلیت از کار می افتد و عملیات با شکست مواجه می شود.
                        </p>

                        <Button>تنظیم مجدد رمز مدیر سیستم</Button>
                    </Box>
                </Paper>
            </Grid>

        </div>
    )
}