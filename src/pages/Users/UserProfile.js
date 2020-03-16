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
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));


function UserProfile(props) {
    const [response, setResponse] = React.useState([]);
    const [item, setItem] = React.useState({profile: {}});

    const paper = paperStyle();
    const classes = useStyles();

    React.useEffect(() => {
        let id = props.match.params.id;
        axios.get(api_base + 'users/' + id.toString() + '/show')
            .then(res => {
                const image = res.data.item;

                setItem(image);


            })
    }, [])

    return (

        <div className={classes.root}>

            <Grid container>
                <Grid item xs>
                    <Paper className={paper.paper}>
                        <Grid container>
                            <Grid item xs={10}>
                            <h2>نمایش پروفایل</h2>
                            </Grid>

                            <Grid item xs={2}>

                            {item.profile.validated_at !== true &&
                                <Button variant={"contained"} color={"primary"}>تایید پروفایل</Button>
                            }
                            </Grid>
                        </Grid>
                        <p>
                            <span>ایمیل: </span>
                            <span>{item.email}</span>
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
                            {item.profile.validated_at === true &&
                            <span>
                                <CheckIcon style={{color: "green"}}/>
                                    تاییده شده
                                </span>
                            }

                            {item.profile.validated_at !== true &&
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
                                <img height={300} width={500} src={item.profile.national_card_front}/>
                            </a>
                            }

                            {item.profile.national_card_front === null &&
                            <span>انتخاب نشده</span>
                            }

                            {item.profile.national_card_front_verified_at === null &&
                            <span>
                                <WarningIcon color={"error"}/>
                                        تاییده نشده
                                    </span>
                            }

                            {item.profile.national_card_front_verified_at !== null &&
                            <span>
                                    <CheckIcon style={{color: "green"}}/>
                                    تاییده شده
                                </span>
                            }
                        </p>

                        <p>
                            <span>تصویر پشت کارت ملی: </span>
                            {item.profile.national_card_back !== null &&
                            <a href={item.profile.national_card_back} target={'_blank'}>
                                <img height={300} width={500} src={item.profile.national_card_back}/>
                                </a>
                            }

                            {item.profile.national_card_back === null &&
                            <span>انتخاب نشده</span>
                            }

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
                        </p>

                        <p>
                            <span>تصویر شناسنامه: </span>
                            {item.profile.birth_certificate !== null &&
                            <a href={item.profile.birth_certificate} target={'_blank'}>
                                <img height={300} width={500} src={item.profile.birth_certificate}/>
                            </a>
                            }

                            {item.profile.birth_certificate === null &&
                            <span>انتخاب نشده</span>
                            }


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
                        </p>

                    </Paper>
                </Grid>

            </Grid>
            <MessageBox response={response}/>
        </div>
    );
}

export default UserProfile;