import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from "@material-ui/core/Paper";
import Box from '@material-ui/core/Box';
import {user_title_postfix} from "../../consts";

export default function IsoImages() {
    return (
        <Grid item xs={12}>
            <title>اتصال دیسکت{user_title_postfix}</title>

            <Paper>
                <Box p={1}>
                    <h2>اتصال دیسکت</h2>
                    <p>
                        در این بخش شما می توانید دیسکت سیستم عامل های مختلف را در روی سرور خود بوت کنید.
                    </p>
                    <p>
                        راه اندازی مجدد سرور در حالی که دیسکت به آن متصل شده باشد باعث می شود که سرور از روی
                        دیسکت بوت شود.
                    </p>
                    <p>
                        پس ار بوت شدن سرور از روی دیسکت، شما می توانید از طریق کنسول سیستم عامل داخل آن را نصب
                        کنید و یا بدون نصب، از امکانات دیسکت استفاده نمایید.
                    </p>
                    <p>
                        بعضی از دیسکت ها نیاز به این دارند که شما در هنگام فرآیند بوت، کلیدی را بفشارید وگرنه
                        فرآیند بوت شدن با مشکل مواجه می گردد.
                    </p>
                </Box>
            </Paper>

        </Grid>
    )
}