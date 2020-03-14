import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from "axios";
import {api_base, setUserInfo} from "../../Api";


export default function BasicInfo(props) {
    const [firsName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [nationalCode, setNationalCode] = React.useState('');
    const [postalCode, setPostalCode] = React.useState('');
    const [address, setAddress] = React.useState('');

    React.useEffect(() => {
        setFirstName(props.userInfo.profile.first_name)
        setLastName(props.userInfo.profile.last_name)
        setNationalCode(props.userInfo.profile.national_code)
        setPostalCode(props.userInfo.profile.postal_code)
        setAddress(props.userInfo.profile.address)
    }, [props.userInfo]);

    function saveUserInfo(event) {
        event.preventDefault();
        axios.post(api_base + setUserInfo, {
            first_name: firsName,
            last_name: lastName,
            national_code: nationalCode,
            postal_code: postalCode,
            address: address,
        })
            .then(res => {
                props.setResponse(res.data);
            })
    }

    return (
        <form onSubmit={saveUserInfo}>

            <TextField id="outlined-basic" onChange={event => setFirstName(event.target.value)}
                       value={firsName} label="نام" variant="outlined" required/>

            <br/><br/>
            <TextField id="outlined-basic" onChange={event => setLastName(event.target.value)}
                       value={lastName} label="نام خانوادگی" variant="outlined" required/>
            <br/><br/>

            <TextField id="outlined-basic"
                       onChange={event => setNationalCode(event.target.value)} value={nationalCode} label="کد ملی"
                       variant="outlined" required/>

            <br/><br/>
            <TextField id="outlined-basic" label="کد پستی" variant="outlined"
                       onChange={event => setPostalCode(event.target.value)}
                       value={postalCode} required/>

            <br/><br/>
            <TextField id="outlined-basic" label="آدرس" variant="outlined" multiline
                       onChange={event => setAddress(event.target.value)}
                       value={address}
                       rows="5"
                       required
            />

            <br/><br/>
            <Button type='submit' variant="contained" color="primary">
                ذخیره
            </Button>
        </form>
    )
}