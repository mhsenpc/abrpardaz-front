import React from 'react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from "axios";
import {api_base, requestSetMobile, requestSetPhone, setMobile, setPhone} from "../../Api";
import MessageBox from "../MessageBox";


export default function Page2() {
    const [response, setResponse] = React.useState([]);
    const [mobileStep, setMobileStep] = React.useState(0);
    const [phoneStep, setPhoneStep] = React.useState(0);
    const [mobileNumber, setMobileNumber] = React.useState(0);
    const [phoneNumber, setPhoneNumber] = React.useState(0);

    function requestMobileRequest(event) {
        event.preventDefault();
        const {mobile} = event.currentTarget.elements;
        axios.post(api_base + requestSetMobile, {mobile: mobile.value})
            .then(res => {
                if (res.data.success) {
                    setMobileNumber(mobile.value)
                    setMobileStep(1)
                }
                setResponse(res.data)
            })
    }

    function requestPhoneRequest(event) {
        event.preventDefault();
        const {phone} = event.currentTarget.elements;
        axios.post(api_base + requestSetPhone, {phone: phone.value})
            .then(res => {
                if (res.data.success) {
                    setPhoneNumber(phone.value)
                    setPhoneStep(1)
                }
                setResponse(res.data)
            })
    }

    function requestSetMobileFinal(event) {
        event.preventDefault();
        const {usercode} = event.currentTarget.elements;
        axios.post(api_base + setMobile, {mobile: mobileNumber, code: usercode.value})
            .then(res => {
                if (res.data.success) {
                    setMobileStep(2)
                }
                setResponse(res.data)
            })
    }

    function requestSetPhoneFinal(event) {
        event.preventDefault();
        const { usercode} = event.currentTarget.elements;
        axios.post(api_base + setPhone, {phone: phoneNumber, code: usercode.value})
            .then(res => {
                if (res.data.success) {
                    setPhoneStep(2)
                }
                setResponse(res.data)
            })
    }


    return (

        <div>

            <Grid item xs={12} container
                  direction="row"
                  alignItems="center"
            >
                <Paper>


                    <Box width={700}>
                        {mobileStep == 0 &&
                        <FormMobile/>
                        }

                        {mobileStep == 1 &&
                        <FormMobileFinal/>
                        }

                        {mobileStep == 2 &&
                        <span>
                            شماره موبایل شما با موفقیت تایید شد
                        </span>
                        }

                        {phoneStep == 0 &&
                        <FormPhone/>
                        }

                        {phoneStep == 1 &&
                        <FormPhoneFinal/>
                        }

                        {phoneStep == 2 &&
                        <span>
                            تلفن ثابت شما با موفقیت تایید شد
                        </span>
                        }
                    </Box>

                </Paper>
            </Grid>
            <MessageBox response={response}/>
        </div>

    )


    function FormMobile(props) {

        return (
            <div>
                <form onSubmit={requestMobileRequest}>
                    <TextField name='mobile' id="outlined-basic" label="تلفن همراه" variant="outlined"/>
                    <Button type="submit" variant="contained">ارسال کد</Button>
                    <br/><br/>
                </form>
            </div>
        )
    }

    function FormPhone(props) {

        return (
            <div>
                <form onSubmit={requestPhoneRequest}>
                    <TextField name='phone' id="outlined-basic" label="تلفن ثابت" variant="outlined"/>
                    <Button type="submit" variant="contained">ارسال کد</Button>
                </form>
            </div>
        )
    }

    function FormMobileFinal(props) {

        return (

            <div>

                <form onSubmit={requestSetMobileFinal}>
                    <TextField name='usercode' id="outlined-basic" label="کد" variant="outlined"/>
                    <Button type="submit" variant="contained">ثبت شماره</Button>
                </form>

            </div>

        )

    }

    function FormPhoneFinal(props) {

        return (
            <div>
                <form onSubmit={requestSetPhoneFinal}>
                    <TextField name='usercode' id="outlined-basic" label="کد" variant="outlined"/>

                    <Button type="submit" variant="contained">ثبت شماره</Button>
                </form>
            </div>

        )
    }

}


























