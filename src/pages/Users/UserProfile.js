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
import SimpleModal from "../SimpleModal";
import Select from "@material-ui/core/Select";
import InfoIcon from "@material-ui/icons/Info";
import {admin_title_postfix} from "../../consts";


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
    const picture_reasons = [
        'عکس بی کیفیت است',
        'تصویر ناقص است',
        'تصویر نامربوط به مورد خواسته شده است',
    ];
    const profile_reasons = [
        'آدرس معتبر نمی باشد',
        'نام به درستی وارد نشده است',
        'کد پستی معتبر نیست',
        'کد ملی معتبر نیست',
    ];
    const [ncFrontOpen, setNcFrontOpen] = React.useState(false);
    const [ncFrontReason, setNcFrontReason] = React.useState(picture_reasons[0]);
    const [ncBackOpen, setNcBackOpen] = React.useState(false);
    const [ncBackReason, setNcBackReason] = React.useState(picture_reasons[0]);
    const [bcOpen, setBcOpen] = React.useState(false);
    const [bcReason, setBcReason] = React.useState(picture_reasons[0]);
    const [profileOpen, setProfileOpen] = React.useState(false);
    const [profileReason, setProfileReason] = React.useState(profile_reasons[0]);


    React.useEffect(() => {
        loadUserInfo();
    }, [])

    function loadUserInfo() {
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
                setProfileOpen(false)
            })
    }

    function invalidateProfile() {
        axios.post(api_base + 'profile/' + id.toString() + '/invalidate', {reason: profileReason})
            .then(res => {
                setResponse(res.data)
                loadUserInfo()
                setProfileOpen(false)
            })
    }

    function validateNCFront() {
        axios.put(api_base + 'profile/' + id.toString() + '/validateNCFront')
            .then(res => {
                setResponse(res.data)
                loadUserInfo()
                setNcFrontOpen(false);
            })
    }

    function invalidateNCFront() {
        axios.post(api_base + 'profile/' + id.toString() + '/invalidateNCFront', {reason: ncFrontReason})
            .then(res => {
                setResponse(res.data);
                loadUserInfo();
                setNcFrontOpen(false);
            })
    }

    function validateNCBack() {
        axios.put(api_base + 'profile/' + id.toString() + '/validateNCBack')
            .then(res => {
                setResponse(res.data)
                loadUserInfo()
                setNcBackOpen(false);
            })
    }

    function invalidateNCBack() {
        axios.post(api_base + 'profile/' + id.toString() + '/invalidateNCBack', {reason: ncBackReason})
            .then(res => {
                setResponse(res.data)
                loadUserInfo()
                setNcBackOpen(false);
            })
    }

    function validateBC() {
        axios.put(api_base + 'profile/' + id.toString() + '/validateBC')
            .then(res => {
                setResponse(res.data)
                loadUserInfo()
                setBcOpen(false);
            })
    }

    function invalidateBC() {
        axios.post(api_base + 'profile/' + id.toString() + '/invalidateBC', {reason: bcReason})
            .then(res => {
                setResponse(res.data)
                loadUserInfo()
                setBcOpen(false);
            })
    }

    function verifyEmail() {
        axios.put(api_base + 'users/' + id.toString() + '/verifyEmail')
            .then(res => {
                setResponse(res.data)
                loadUserInfo()
            })
    }

    function NcFrontPart() {
        return (
            <p>
                <span>تصویر جلوی کارت ملی: </span>
                {item.profile.national_card_front !== null &&
                <div>
                    <a href={item.profile.national_card_front} target={'_blank'}>
                        <img height={200} width={300} src={item.profile.national_card_front}/>
                    </a>
                </div>
                }
                <br/>

                {item.profile.national_card_front_status === 0 &&
                <span>وضعیت:<InfoIcon style={{color: 'orange'}}/> انتخاب نشده</span>
                }

                {item.profile.national_card_front_status === 1 &&
                <span>
                                    <span>وضعیت:<InfoIcon style={{color: 'blue'}}/> در انتظار تایید</span>

                                </span>

                }


                {item.profile.national_card_front_status === 2 &&
                <span>
                                وضعیت فعلی:
                                    <CheckIcon style={{color: "green"}}/>
                                    تایید شده
                                </span>
                }

                {item.profile.national_card_front_status === 3 &&
                <div>
                                <span>
                                وضعیت فعلی:
                                <WarningIcon color={"error"}/>
                                        تایید نشده
                                    </span>
                    <span>
                                        <br/>
                                        دلیل: {item.profile.national_card_front_reason}
                                    </span>
                </div>
                }

                <br/>
                <p>
                    {(localStorage.getItem('permissions') && localStorage.getItem('permissions').includes("Validate Documents")) &&
                    <Button color={"primary"} variant={"outlined"} onClick={() => setNcFrontOpen(true)}>تغییر
                        وضعیت</Button>
                    }
                    <SimpleModal open={ncFrontOpen} setOpen={setNcFrontOpen}>
                        <h2>تصویر جلوی کارت ملی</h2>
                        {item.profile.national_card_front &&
                        <div>
                            <img width={300} height={200} src={item.profile.national_card_front}/>
                            <br/>
                        </div>
                        }

                        <Button variant={"outlined"} onClick={validateNCFront}>
                            <CheckCircleOutlineIcon style={{color: 'green'}} />
                        </Button>
                        <br/>
                        <Select value={ncFrontReason}
                                onChange={event => setNcFrontReason(event.target.value)}>
                            {picture_reasons.map(reason =>
                                <option value={reason}>{reason}</option>
                            )}
                        </Select>
                        <Button variant={"outlined"} onClick={invalidateNCFront}>
                            <CancelIcon color={"error"} />
                        </Button>
                    </SimpleModal>
                </p>
            </p>
        )
    }

    function NcBackPart() {
        return (
            <p>
                <span>تصویر پشت کارت ملی: </span>
                {item.profile.national_card_back !== null &&
                <div>
                    <a href={item.profile.national_card_back} target={'_blank'}>
                        <img height={200} width={300} src={item.profile.national_card_back}/>
                    </a>
                </div>
                }
                <br/>

                {item.profile.national_card_back_status === 0 &&
                <span>وضعیت:<InfoIcon style={{color: 'orange'}}/> انتخاب نشده</span>
                }

                {item.profile.national_card_back_status === 1 &&
                <span>
                                    <span>وضعیت:<InfoIcon style={{color: 'blue'}}/> در انتظار تایید</span>

                                </span>

                }

                {item.profile.national_card_back_status === 2 &&
                <span>
                                وضعیت فعلی:
                                    <CheckIcon style={{color: "green"}}/>
                                    تایید شده
                                </span>
                }

                {item.profile.national_card_back_status === 3 &&
                <div>
                                <span>
                                وضعیت فعلی:
                                <WarningIcon color={"error"}/>
                                        تایید نشده
                                    </span>
                    <span>
                                        <br/>
                                        دلیل: {item.profile.national_card_back_reason}
                                    </span>
                </div>
                }

                <br/>
                <p>
                    {(localStorage.getItem('permissions') && localStorage.getItem('permissions').includes("Validate Documents")) &&
                    <Button color={"primary"} variant={"outlined"} onClick={() => setNcBackOpen(true)}>تغییر
                        وضعیت</Button>
                    }
                    <SimpleModal open={ncBackOpen} setOpen={setNcBackOpen}>
                        <h2>تصویر پشت کارت ملی</h2>
                        {item.profile.national_card_back &&
                        <div>
                            <img width={300} height={200} src={item.profile.national_card_back}/>
                            <br/>
                        </div>
                        }

                        <Button variant={"outlined"} onClick={validateNCBack}>
                            <CheckCircleOutlineIcon style={{color: 'green'}} />
                        </Button>
                        <br/>
                        <Select value={ncBackReason}
                                onChange={event => setNcBackReason(event.target.value)}>
                            {picture_reasons.map(reason =>
                                <option value={reason}>{reason}</option>
                            )}
                        </Select>
                        <Button variant={"outlined"} onClick={invalidateNCBack}>
                            <CancelIcon color={"error"} />
                        </Button>
                    </SimpleModal>
                </p>
            </p>
        )
    }

    function ProfilePart() {
        return (
            <SimpleModal open={profileOpen} setOpen={setProfileOpen}>
                <h2>کلیت پروفایل</h2>

                <Button variant={"outlined"} onClick={validateProfile}>
                    <CheckCircleOutlineIcon style={{color: 'green'}} />
                </Button>
                <br/>
                <Select value={profileReason}
                        onChange={event => setProfileReason(event.target.value)}>
                    {profile_reasons.map(reason =>
                        <option value={reason}>{reason}</option>
                    )}
                </Select>
                <Button variant={"outlined"} onClick={invalidateProfile}>
                    <CancelIcon color={"error"} />
                </Button>
            </SimpleModal>
        )
    }

    function BcPart() {
        return (
            <p>
                <span>تصویر شناسنامه: </span>
                {item.profile.birth_certificate !== null &&
                <div>
                    <a href={item.profile.birth_certificate} target={'_blank'}>
                        <img height={200} width={300} src={item.profile.birth_certificate}/>
                    </a>
                </div>
                }
                <br/>

                {item.profile.birth_certificate_status === 0 &&
                <span>وضعیت:<InfoIcon style={{color: 'orange'}}/> انتخاب نشده</span>
                }

                {item.profile.birth_certificate_status === 1 &&
                <span>
                                    <span>وضعیت:<InfoIcon style={{color: 'blue'}}/> در انتظار تایید</span>

                                </span>
                }

                {item.profile.birth_certificate_status === 2 &&
                <span>
                                وضعیت فعلی:
                                    <CheckIcon style={{color: "green"}}/>
                                    تایید شده
                                </span>
                }

                {item.profile.birth_certificate_status === 3 &&
                <div>
                                <span>
                                وضعیت فعلی:
                                <WarningIcon color={"error"}/>
                                        تایید نشده
                                    </span>
                    <span>
                                        <br/>
                                        دلیل: {item.profile.birth_certificate_reason}
                                    </span>
                </div>
                }

                <br/>
                <p>
                    {(localStorage.getItem('permissions') && localStorage.getItem('permissions').includes("Validate Documents")) &&
                    <Button color={"primary"} variant={"outlined"} onClick={() => setBcOpen(true)}>تغییر
                        وضعیت</Button>
                    }
                    <SimpleModal open={bcOpen} setOpen={setBcOpen}>
                        <h2>تصویر شناسنامه</h2>
                        {item.profile.birth_certificate &&
                        <div>
                            <img width={300} height={200} src={item.profile.birth_certificate}/>
                            <br/>
                        </div>
                        }

                        <Button variant={"outlined"} onClick={validateBC}>
                            <CheckCircleOutlineIcon style={{color: 'green'}} />
                        </Button>
                        <br/>
                        <Select value={bcReason}
                                onChange={event => setBcReason(event.target.value)}>
                            {picture_reasons.map(reason =>
                                <option value={reason}>{reason}</option>
                            )}
                        </Select>
                        <Button variant={"outlined"} onClick={invalidateBC}>
                            <CancelIcon color={"error"} />
                        </Button>
                    </SimpleModal>
                </p>
            </p>
        )
    }

    return (

        <div className={classes.root}>
            <title>{item.email}اطلاعات کاربری {admin_title_postfix}</title>
            <Grid container>
                <Grid item xs>
                    <Paper className={paper.paper}>
                        <Box p={1}>
                            <Grid container>
                                <Grid item xs={10}>
                                    <h2>نمایش پروفایل</h2>
                                </Grid>

                                <Grid item xs={2}>
                                    {(localStorage.getItem('permissions') && localStorage.getItem('permissions').includes("Validate Profile")) &&
                                    <Button variant={"contained"} color={"primary"}
                                            onClick={() => setProfileOpen(true)}>
                                        تغییر وضعیت
                                    </Button>
                                    }
                                </Grid>
                            </Grid>
                            <p>
                                <span>ایمیل: </span>
                                <span>{item.email}</span>
                                {item.email_verified_at === null &&
                                <span>
                                    <WarningIcon color={"error"}/>
                                        تایید نشده
                                    &nbsp;
                                    <Button onClick={verifyEmail} variant={"outlined"}>
                                    <CheckCircleOutlineIcon style={{color: 'green'}}/>
                                </Button>
                            </span>
                                }

                                {item.email_verified_at !== null &&
                                <span>
                                <CheckIcon style={{color: "green"}}/>
                                    تایید شده
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
                                    تایید شده
                                </span>
                                }

                                {item.profile.validated_at === null &&
                                <span>
                                    <WarningIcon color={"error"}/>
                                        تایید نشده
                                    </span>

                                }
                            </p>

                            <p>
                                <span>موبایل: </span>
                                <span>{item.profile.mobile}</span>

                                {item.profile.mobile_verified_at === null &&
                                <span>
                                <WarningIcon color={"error"}/>
                                        تایید نشده
                                    </span>
                                }

                                {item.profile.mobile_verified_at !== null &&
                                <span>
                                    <CheckIcon style={{color: "green"}}/>
                                    تایید شده
                                </span>
                                }
                            </p>

                            <p>
                                <span>تلفن: </span>
                                <span>{item.profile.phone}</span>

                                {item.profile.phone_verified_at === null &&
                                <span>
                                <WarningIcon color={"error"}/>
                                        تایید نشده
                                    </span>
                                }

                                {item.profile.phone_verified_at !== null &&
                                <span>
                                    <CheckIcon style={{color: "green"}}/>
                                    تایید شده
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

                            </p>

                            <NcFrontPart/>
                            <hr/>
                            <NcBackPart/>
                            <hr/>
                            <BcPart/>
                            <hr/>
                            <ProfilePart/>
                        </Box>
                    </Paper>
                </Grid>

            </Grid>
            <MessageBox response={response}/>
        </div>
    );
}

export default UserProfile;