import React from 'react';
import axios from "axios";
import {api_base, setUserInfo} from "../../Api";
import Gravatar from 'react-gravatar'
import Avatar from '@material-ui/core/Avatar';
import {makeStyles} from '@material-ui/core/styles';

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


            <label>نام: </label>
            <b>
                <label>{firsName} {lastName}</label>
            </b>
            <br/>

            <label>کد ملی: </label>
            <b>
                <label>{nationalCode}</label>
            </b>
            <br/>

            <label>کد پستی: </label>
            <b>
                <label>{postalCode}</label>
            </b>
            <br/>

            <label>آدرس: </label>
            <b>
                <label>{address}</label>
            </b>
            <br/>

        </form>
    )
}