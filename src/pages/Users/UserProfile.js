import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import axios from "axios";
import {api_base} from "../../Api";
import MessageBox from "../MessageBox";
import {createStyles, makeStyles, Theme} from "@material-ui/core";
import WarningIcon from '@material-ui/icons/Warning';
import CheckIcon from '@material-ui/icons/Check';
import Button from '@material-ui/core/Button';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Box from "@material-ui/core/Box";


const paperStyle = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
    }),
);


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 700,
        marginTop: 12
    },
}));


function UserProfile(props) {
    const [response, setResponse] = React.useState([]);
    const [item, setItem] = React.useState({profile: {}});
    const paper = paperStyle();
    const classes = useStyles();
    let id = props.match.params.id;

    React.useEffect(() => {
        loadUserInfo();
    }, [])

    function loadUserInfo(){
        axios.get(api_base + 'users/' + id.toString() + '/show')
            .then(res => {
                const profile = res.data.item;

                setItem(profile);
            })
    }

    function validateProfile() {
        axios.put(api_base + 'profile/' + id.toString() + '/validate')
            .then(res => {
                setResponse(res.data)
                loadUserInfo()
            })
    }

    function invalidateProfile() {
        axios.put(api_base + 'profile/' + id.toString() + '/invalidate')
            .then(res => {
                setResponse(res.data)
                loadUserInfo()
            })
    }

    function validateNCFront() {
        axios.put(api_base + 'profile/' + id.toString() + '/validateNCFront')
            .then(res => {
                setResponse(res.data)
                loadUserInfo()
            })
    }

    function invalidateNCFront() {
        axios.put(api_base + 'profile/' + id.toString() + '/invalidateNCFront')
            .then(res => {
                setResponse(res.data)
                loadUserInfo()
            })
    }

    function validateNCBack() {
        axios.put(api_base + 'profile/' + id.toString() + '/validateNCBack')
            .then(res => {
                setResponse(res.data)
                loadUserInfo()
            })
    }

    function invalidateNCBack() {
        axios.put(api_base + 'profile/' + id.toString() + '/invalidateNCBack')
            .then(res => {
                setResponse(res.data)
                loadUserInfo()
            })
    }

    function validateBC() {
        axios.put(api_base + 'profile/' + id.toString() + '/validateBC')
            .then(res => {
                setResponse(res.data)
                loadUserInfo()
            })
    }

    function invalidateBC() {
        axios.put(api_base + 'profile/' + id.toString() + '/invalidateBC')
            .then(res => {
                setResponse(res.data)
                loadUserInfo()
            })
    }

    function verifyEmail() {
        axios.put(api_base + 'users/' + id.toString() + '/verifyEmail')
            .then(res => {
                setResponse(res.data)
                loadUserInfo()
            })
    }


    return (

        <div className={classes.root}>

            <Grid container>
                <Grid item xs>
                    <Paper className={paper.paper}>
                        <Box p={1}>
                        <Grid container>
                            <Grid item xs={10}>
                                <h2>نمایش پروفایل</h2>
                            </Grid>

                            <Grid item xs={2}>

                                {(sessionStorage.getItem('permissions').includes("Verify Users") && item.profile.validated_at === null) &&
                                <Button variant={"contained"} color={"primary"} onClick={validateProfile}>تایید
                                    پروفایل</Button>
                                }

                                {(sessionStorage.getItem('permissions').includes("Verify Users") && item.profile.validated_at !== null) &&
                                <Button variant={"contained"} style={{backgroundColor: 'red'}}
                                        onClick={invalidateProfile}>رد
                                    پروفایل</Button>
                                }
                            </Grid>
                        </Grid>
                        <p>
                            <span>ایمیل: </span>
                            <span>{item.email}</span>
                            {item.email_verified_at === null &&
                            <span>
                                    <WarningIcon color={"error"}/>
                                        تاییده نشده
                                &nbsp;
                                <Button onClick={verifyEmail} variant={"outlined"}>
                                    <CheckCircleOutlineIcon style={{color: 'green'}}/>
                                </Button>
                            </span>
                            }

                            {item.email_verified_at !== null &&
                            <span>
                                <CheckIcon style={{color: "green"}}/>
                                    تاییده شده
                                </span>
                            }
                        </p>

                        <p>
                            <span>نام: </span>
                            <span>{item.profile.first_name}</span>
                        </p>
                        <p>
                            <span>نام خانوادگی: </span>
                            <span>{item.profile.last_name}</span>
                        </p>

                        <p>
                            <span>وضعیت پروفایل: </span>
                            {item.profile.validated_at !== null &&
                            <span>
                                <CheckIcon style={{color: "green"}}/>
                                    تاییده شده
                                </span>
                            }

                            {item.profile.validated_at === null &&
                            <span>
                                    <WarningIcon color={"error"}/>
                                        تاییده نشده
                                    </span>

                            }
                        </p>

                        <p>
                            <span>موبایل: </span>
                            <span>{item.profile.mobile}</span>

                            {item.profile.mobile_verified_at === null &&
                            <span>
                                <WarningIcon color={"error"}/>
                                        تاییده نشده
                                    </span>
                            }

                            {item.profile.mobile_verified_at !== null &&
                            <span>
                                    <CheckIcon style={{color: "green"}}/>
                                    تاییده شده
                                </span>
                            }
                        </p>

                        <p>
                            <span>تلفن: </span>
                            <span>{item.profile.phone}</span>

                            {item.profile.phone_verified_at === null &&
                            <span>
                                <WarningIcon color={"error"}/>
                                        تاییده نشده
                                    </span>
                            }

                            {item.profile.phone_verified_at !== null &&
                            <span>
                                    <CheckIcon style={{color: "green"}}/>
                                    تاییده شده
                                </span>
                            }
                        </p>

                        <p>
                            <span>کد پستی: </span>
                            <span>{item.profile.postal_code}</span>
                        </p>

                        <p>
                            <span>آدرس: </span>
                            <span>{item.profile.address}</span>
                        </p>

                        <p>
                            <span>سازمان: </span>

                            {item.profile.organization === true &&
                            <span>بلی</span>
                            }

                            {item.profile.organization !== true &&
                            <span>خیر</span>
                            }

                        </p>

                        <p>
                            <span>کد ملی: </span>
                            <span>{item.profile.national_code}</span>

                            {item.profile.national_code_verified_at === null &&
                            <span>
                                <WarningIcon color={"error"}/>
                                        تاییده نشده
                                    </span>
                            }

                            {item.profile.national_code_verified_at !== null &&
                            <span>
                                    <CheckIcon style={{color: "green"}}/>
                                    تاییده شده
                                </span>
                            }
                        </p>

                        <p>
                            <span>تصویر جلوی کارت ملی: </span>
                            {item.profile.national_card_front !== null &&
                            <a href={item.profile.national_card_front} target={'_blank'}>
                                <img height={200} width={300} src={item.profile.national_card_front}/>
                            </a>
                            }

                            {item.profile.national_card_front === null &&
                            <span>انتخاب نشده</span>
                            }
                            <br/>
                            {item.profile.national_card_front_verified_at === null &&
                            <span>
                                وضعیت فعلی:
                                <WarningIcon color={"error"}/>
                                        تاییده نشده
                                    </span>
                            }

                            {item.profile.national_card_front_verified_at !== null &&
                            <span>
                                وضعیت فعلی:
                                    <CheckIcon style={{color: "green"}}/>
                                    تاییده شده
                                </span>
                            }
                            <br/>
                            <p>
                                <Button variant={"outlined"}>
                                    <CheckCircleOutlineIcon style={{color: 'green'}} onClick={validateNCFront} />
                                </Button>
                                &nbsp;
                                <Button variant={"outlined"}>
                                    <CancelIcon color={"error"} onClick={invalidateNCFront} />
                                </Button>
                            </p>
                        </p>
                        <hr />

                        <p>
                            <span>تصویر پشت کارت ملی: </span>
                            {item.profile.national_card_back !== null &&
                            <a href={item.profile.national_card_back} target={'_blank'}>
                                <img height={200} width={300} src={item.profile.national_card_back}/>
                            </a>
                            }

                            {item.profile.national_card_back === null &&
                            <span>انتخاب نشده</span>
                            }
                            <br/>

                            {item.profile.national_card_back_verified_at === null &&
                            <span>
                                <WarningIcon color={"error"}/>
                                        تاییده نشده
                                    </span>
                            }

                            {item.profile.national_card_back_verified_at !== null &&
                            <span>
                                    <CheckIcon style={{color: "green"}}/>
                                    تاییده شده
                                </span>
                            }

                            <br/>
                            <p>
                                <Button variant={"outlined"}>
                                    <CheckCircleOutlineIcon style={{color: 'green'}} onClick={validateNCBack} />
                                </Button>
                                &nbsp;
                                <Button variant={"outlined"}>
                                    <CancelIcon color={"error"} onClick={invalidateNCBack} />
                                </Button>
                            </p>
                        </p>

                        <hr />

                        <p>
                            <span>تصویر شناسنامه: </span>
                            {item.profile.birth_certificate !== null &&
                            <a href={item.profile.birth_certificate} target={'_blank'}>
                                <img height={200} width={300} src={item.profile.birth_certificate}/>
                            </a>
                            }

                            {item.profile.birth_certificate === null &&
                            <span>انتخاب نشده</span>
                            }
                            <br />


                            {item.profile.birth_certificate_verified_at === null &&
                            <span>
                                <WarningIcon color={"error"}/>
                                        تاییده نشده
                                    </span>
                            }

                            {item.profile.birth_certificate_verified_at !== null &&
                            <span>
                                    <CheckIcon style={{color: "green"}}/>
                                    تاییده شده
                                </span>
                            }
                            <br/>
                            <p>
                                <Button variant={"outlined"}>
                                    <CheckCircleOutlineIcon style={{color: 'green'}} onClick={validateBC} />
                                </Button>
                                &nbsp;
                                <Button variant={"outlined"}>
                                    <CancelIcon color={"error"} onClick={invalidateBC} />
                                </Button>
                            </p>

                        </p>
                        </Box>
                    </Paper>
                </Grid>

            </Grid>
            <MessageBox response={response}/>
        </div>
    );
}

export default UserProfile;