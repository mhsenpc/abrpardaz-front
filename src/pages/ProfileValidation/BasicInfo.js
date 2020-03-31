import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from "axios";
import {api_base, setUserInfo} from "../../Api";
import Gravatar from 'react-gravatar'
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import InfoIcon from "@material-ui/icons/Info";
import WarningIcon from '@material-ui/icons/Warning';
import CheckIcon from '@material-ui/icons/Check';

const useStyles = makeStyles(theme => ({
    large: {
        width: theme.spacing(15),
        height: theme.spacing(15),
    },
}));

export default function BasicInfo(props) {
    const [firsName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [nationalCode, setNationalCode] = React.useState('');
    const [postalCode, setPostalCode] = React.useState('');
    const [address, setAddress] = React.useState('');
    const classes = useStyles();

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
            <center>
                <Avatar className={classes.large}>
                    <Gravatar email={props.userInfo.email} size={120}/>

                </Avatar>
                {props.userInfo.email}
            </center>
            <br/>


            <TextField id="outlined-basic" onChange={event => setFirstName(event.target.value)}
                       value={firsName} label="نام" variant="outlined" required/>

            <br/><br/>
            <TextField id="outlined-basic" onChange={event => setLastName(event.target.value)}
                       value={lastName} label="نام خانوادگی" variant="outlined" required/>
            <br/><br/>

            <TextField id="outlined-basic"
                       onChange={event => setNationalCode(event.target.value)} value={nationalCode} label="کد ملی"
                       variant="outlined" required/>

            {props.userInfo.profile.national_code_status == 1 &&
            <span>
                                    <CheckIcon style={{color: "green"}}/>
                                    تاییده شده
                                </span>
            }

            {props.userInfo.profile.national_code_status == 2 &&
            <span>
                                    <WarningIcon style={{color: "red"}}/>
                                    رد شده. دلیل: {props.userInfo.profile.national_code_reason}

            </span>
            }

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