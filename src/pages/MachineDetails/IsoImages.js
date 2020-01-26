import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from "@material-ui/core/Paper/Paper";
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

export default function IsoImages() {
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
                        <h1>اتصال دیسکت</h1>
                        <p>
                            در این بخش شما می توانید دیسکت سیستم عامل های مختلف را در روی سرور خود بوت کنید.
                        </p>
                        <p>
                            راه اندازی مجدد سرور در حالی که دیسکت به آن متصل شده باشد باعث می شود که سرور از روی دیسکت بوت شود.
                            پس ار بوت شدن سرور از روی دیسکت، شما می توانید از طریق کنسول سیستم عامل داخل آن را نصب کنید و یا بدون نصب، از امکانات دیسکت استفاده نمایید.
                            بعضی از دیسکت ها نیاز به این دارند که شما در هنگام فرآیند بوت، کلیدی را بفشارید وگرنه فرآیند بوت شدن با مشکل مواجه می گردد.
                        </p>
                        <p>

                        </p>
                        <p>

                        </p>
                    </Box>
                </Paper>
                </Box>
            </Grid>

        </div>
    )
}