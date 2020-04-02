import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from "@material-ui/core/Paper";
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import {user_title_postfix} from "../../consts";

export default function Power() {
    return (
        <div>
            <title>برق{user_title_postfix}</title>

            <Grid item xs={12} >
                <Paper>
                    <Box p={1}>
                        <h2>برق</h2>
                        <p>
                            "خاموش کردن نرم" به سیستم عامل و نرم افزارهای سرور شما اجازه می دهد که به شکل استاندارد فرآیند بسته شدن و ذخیره اطلاعات نهایی روی دیسک را انجام دهند.
                        </p>
                        <p>
                            "خاموش کردن سخت" مشابه کشیدن کابل سرور از پریز برق می باشد. زدن این دکمه ممکن است باعث آسیب به اطلاعات سرور شما گردد.
                        </p>

                        <p>
                            لطفا توجه فرمایید که خاموش یا روشن بودن سرور، تاثیری در هزینه فاکتور شما ندارند.
                        </p>

                        <Button variant="contained" color="primary">خاموش کردن نرم</Button>
                        &nbsp;
                        <Button variant="contained" color="secondary">خاموش کردن سخت</Button>
                    </Box>
                </Paper>

                <Paper>
                    <Box p={1}>
                        <h2>راه اندازی سخت</h2>
                        <p>
                            زدن این دکمه باعث راه اندازی مجدد سرور شما می گردد. توجه کنید که این عملیات ممکن است باعث آسیب به اطلاعات سرور شما گردد.
                        </p>

                        <Button variant="contained" color="primary">راه اندازی سخت</Button>
                    </Box>
                </Paper>
            </Grid>

        </div>
    )
}