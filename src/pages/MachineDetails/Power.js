import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from "@material-ui/core/Paper";
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import {user_title_postfix} from "../../consts";
import axios from "axios";
import {api_base, sshKeysAdd} from "../../Api";
import MessageBox from "../MessageBox";


export default function Power(props) {
    const [response, setResponse] = React.useState([]);

    function requestPowerOff() {
        axios.put(api_base + 'machines/'+ props.id.toString() + '/powerOff' )
            .then(res => {
                setResponse(res.data)
            })
    }

    function requestHardReboot() {
        axios.put(api_base + 'machines/'+ props.id.toString() + '/hardReboot' )
            .then(res => {
                setResponse(res.data)
            })
    }

    function requestSoftReboot() {
        axios.put(api_base + 'machines/'+ props.id.toString() + '/softReboot' )
            .then(res => {
                setResponse(res.data)
            })
    }

    return (
        <div>
            <title>برق{user_title_postfix}</title>

            <Grid item xs={12}>
                <Paper variant={"outlined"}>
                    <Box p={1}>
                        <h2>خاموش کردن</h2>

                        <p>
                            زدن این دکمه باعث خاموش شدن سرور شما می گردد.
                        </p>
                        <p>
                            لطفا توجه فرمایید که خاموش یا روشن بودن سرور، تاثیری در هزینه فاکتور شما ندارند.
                        </p>

                        <Button variant="contained" color="primary" onClick={requestPowerOff}>خاموش کردن</Button>
                    </Box>
                </Paper>
                <br/>
                <Paper variant={"outlined"}>
                    <Box p={1}>
                        <h2>راه اندازی مجدد</h2>
                        <p>
                            "راه اندازی مجدد نرم" به سیستم عامل و نرم افزارهای سرور شما اجازه می دهد که به شکل استاندارد
                            فرآیند بسته شدن و ذخیره اطلاعات نهایی روی دیسک را انجام دهند و سپس راه اندازی انجام شود
                        </p>
                        <p>
                            "راه اندازی سخت" مشابه کشیدن کابل سرور از پریز برق و اتصال مجدد آن می باشد. زدن این دکمه ممکن است باعث آسیب
                            به اطلاعات سرور شما گردد.
                        </p>

                        <Button variant="contained" color="primary" onClick={requestSoftReboot}>راه اندازی مجدد نرم</Button>
                        &nbsp;
                        <Button variant="contained" color="secondary" onClick={requestHardReboot} >راه اندازی مجدد سخت</Button>
                    </Box>
                </Paper>
            </Grid>
            <MessageBox response={response}/>

        </div>
    )
}