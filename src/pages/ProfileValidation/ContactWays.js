import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from "axios";
import {api_base, requestSetMobile, requestSetPhone, setMobile, setPhone} from "../../Api";


export default function ContactWays(props) {
    const [mobileStep, setMobileStep] = React.useState(0);
    const [phoneStep, setPhoneStep] = React.useState(0);
    const [mobileNumber, setMobileNumber] = React.useState('');
    const [phoneNumber, setPhoneNumber] = React.useState('');

    React.useEffect(() => {
        setMobileNumber(props.userInfo.profile.mobile)
        setPhoneNumber(props.userInfo.profile.phone)
    }, [props.userInfo]);

    function requestMobileRequest(event) {
        event.preventDefault();
        const {txtmobile} = event.currentTarget.elements;
        axios.post(api_base + requestSetMobile, {mobile: txtmobile.value})
            .then(res => {
                if (res.data.success) {
                    setMobileStep(1)
                    setMobileNumber(txtmobile.value)
                }
                props.setResponse(res.data)
            })
    }

    function requestPhoneRequest(event) {
        event.preventDefault();
        const {txtphone} = event.currentTarget.elements;
        axios.post(api_base + requestSetPhone, {phone: txtphone.value})
            .then(res => {
                if (res.data.success) {
                    setPhoneStep(1)
                    setPhoneNumber(txtphone.value)
                }
                props.setResponse(res.data)
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
                props.setResponse(res.data)
            })
    }

    function requestSetPhoneFinal(event) {
        event.preventDefault();
        const {usercode} = event.currentTarget.elements;
        axios.post(api_base + setPhone, {phone: phoneNumber, code: usercode.value})
            .then(res => {
                if (res.data.success) {
                    setPhoneStep(2)
                }
                props.setResponse(res.data)
            })
    }

    function FormMobile() {

        return (
            <div>
                <form onSubmit={requestMobileRequest}>
                    <TextField name='txtmobile' id="outlined-basic" label='موبایل' variant="outlined"
                               value={mobileNumber}
                    />
                    &nbsp;
                    <Button type="submit" variant="contained">ارسال کد</Button>
                    <br/><br/>
                </form>
            </div>
        )
    }

    function FormPhone() {

        return (
            <div>
                <form onSubmit={requestPhoneRequest}>
                    <TextField name='txtphone' id="outlined-basic" label="تلفن ثابت" variant="outlined"
                               value={phoneNumber}/>
                    &nbsp;
                    <Button type="submit" variant="contained">ارسال کد</Button>
                </form>
            </div>
        )
    }

    function FormMobileFinal() {

        return (

            <div>

                <form onSubmit={requestSetMobileFinal}>
                    <TextField name='usercode' id="outlined-basic" label="کد" variant="outlined"/>
                    <Button type="submit" variant="contained">ثبت شماره</Button>
                </form>

            </div>

        )

    }

    function FormPhoneFinal() {

        return (
            <div>
                <form onSubmit={requestSetPhoneFinal}>
                    <TextField name='usercode' id="outlined-basic" label="کد" variant="outlined"/>

                    <Button type="submit" variant="contained">ثبت شماره</Button>
                </form>
            </div>

        )
    }

    function MobileForm() {
        if (props.userInfo.profile.mobile_verified_at)
            return 'شماره تلفن همراه شما ' + props.userInfo.profile.mobile + ' تایید شده است';
        else {
            if (mobileStep === 0)
                return <FormMobile/>;
            else if (mobileStep === 1)
                return <FormMobileFinal/>;
            else if (mobileStep === 2)
                return (<span>
                شماره موبایل شما با موفقیت تایید شد
                </span>)
        }
    }

    function PhoneForm() {
        if (props.userInfo.profile.phone_verified_at)
            return 'تلفن ثابت شما ' + props.userInfo.profile.phone + ' تایید شده است';
        else {
            if (phoneStep === 0)
                return <FormPhone/>;
            else if (phoneStep === 1)
                return <FormPhoneFinal/>;
            else if (phoneStep === 2)
                return (<span>
                تلفن ثابت شما با موفقیت تایید شد
                </span>)
        }
    }

    return (
        <div>
            <MobileForm/>
            <br/>
            <PhoneForm/>
        </div>
    )
}