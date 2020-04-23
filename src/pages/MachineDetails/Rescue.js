import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from "@material-ui/core/Paper";
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import axios from "axios";
import {api_base} from "../../Api";
import MessageBox from "../MessageBox";
import {user_title_postfix} from "../../consts";

export default function Rescue(props) {


    const [response, setResponse] = React.useState([]);

    function requestPassword() {
        axios.put(api_base + 'machines/' + props.id.toString() + '/resendInfo')
            .then(res => {
                setResponse(res.data)
            })
    }


    return (
        <div>
            <title>مرکز نجات{user_title_postfix}</title>

            <Grid item xs={12}>
                <Paper variant={"outlined"}>
                    <Box p={1}>
                        <h2>مرکز نجات</h2>
                        <p>
                            مرکز نجات محیطی است که در آن می توانید مشکلاتی که بوت شدن عادی سیستم عامل را دچار مشکل می
                            کند، حل نمایید.
                        </p>
                        <p>
                            پس از فعال سازی حالت نجات، شما باید سرور خود را راه اندازی مجدد کنید تا بتوانید از آن
                            استفاده کنید.
                        </p>
                        <p>
                            با راه اندازی بعدی بعد از آن، سیستم عامل مطابق معمول از روی دیسک پیش فرض
                            بارگذاری می شود.
                        </p>

                        <Button variant="contained" color="primary">فعال سازی حالت نجات</Button>
                        &nbsp;
                        <Button variant="contained" color="secondary">فعال سازی حالت نجات و راه اندازی مجدد</Button>
                    </Box>
                </Paper>
<br/>
                <Paper variant={"outlined"}>
                    <Box p={1}>
                        <h2>فراموشی رمز سیستم عامل</h2>
                        <p>
                            در صورتی که رمز مدیر سیستم عامل خود را فراموش کرده باشید با این گزینه می توانید رمز آن را
                            تنظیم مجدد کنید.
                        </p>
                        <p>
                            نکته: در صورتی که برنامه quemu-guest agent را از سیستم عامل خود حذف نمایید، این قابلیت از
                            کار می افتد و عملیات با شکست مواجه می شود.
                        </p>

                        <Button variant="contained" color="primary">تنظیم مجدد رمز مدیر سیستم</Button>
                    </Box>
                </Paper>
                <br/>
                <Paper>
                    <Box p={1}>
                        <h2>فراموشی رمز سیستم عامل</h2>
                        <p>
                            درصورت نیاز به بازیابی رمز و دریافت از طریق صندوق پستی خود، کلیک کنید.
                        </p>
                        <Button onClick={requestPassword} variant="contained"
                                color="secondary">بازیابی رمز </Button>
                    </Box>
                </Paper>
            </Grid>
            <MessageBox response={response}/>

        </div>
    )
}