import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/AddBox';
import axios from "axios";
import {api_base, machinesOfProject} from "../Api";
import {Paper} from "@material-ui/core";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import PowerIcon from '@material-ui/icons/Power';
import PowerOffIcon from '@material-ui/icons/PowerOff';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from "@material-ui/core/Backdrop";
import {user_title_postfix} from "../consts";
import {makeStyles} from '@material-ui/core/styles';
import {HtmlTooltip} from "../Helpers";
import Pusher from "pusher-js"


const useStyles = makeStyles(theme => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

export default function ServerList(props) {
    const classes = useStyles();
    const [backDropOpen, setBackDropOpen] = React.useState(true);

    const [items, setItems] = React.useState([]);

    React.useEffect(() => {
        let id = props.match.params.id;
        loadMachines();

        function loadMachines() {
            let items = localStorage.getItem('machines_of_' + id.toString());
            if (items) {
                let item = JSON.parse(items);
                setItems(item);
            }

            axios.get(api_base + machinesOfProject + id.toString())
                .then(res => {
                    const list = res.data.list;
                    if (res.data.list)
                        setItems(list);
                    setBackDropOpen(false);
                    localStorage.setItem('machines_of_' + id.toString(), JSON.stringify(list));
                })
        }

    }, []);

    const handleBackdropClose = () => {
        setBackDropOpen(false);
    };

    function ServerItem(props) {
        return (
            <Grid item xs={12} sm={4}>
                <a style={{textDecoration: 'none'}} href={'/server/' + props.row.id.toString()}>
                    <HtmlTooltip
                        placement="top"

                        title={
                            <React.Fragment>
                                {props.row.status === 'creating' &&
                                <div style={{direction: 'rtl'}}>
                                    <Typography color="textPrimary">سرور در حال ایجاد شدن می باشد. لطفا شکیبا
                                        باشید</Typography>
                                </div>
                                }

                                {props.row.status === 'ACTIVE' &&
                                <div style={{direction: 'rtl'}}>
                                    <Typography color="textPrimary">سرور روشن و آماده استفاده می باشد</Typography>
                                    <Typography color="textSecondary">شما می توانید با کلیک بر روی این گزینه، سرور خود
                                        را مدیریت نمایید</Typography>
                                </div>
                                }

                                {props.row.status === 'SHUTOFF' &&
                                <div style={{direction: 'rtl'}}>
                                    <Typography color="textPrimary">سرور در حال حاضر خاموش می باشد</Typography>
                                    <Typography color="textSecondary">شما می توانید با کلیک بر روی این گزینه، سرور خود
                                        را مدیریت نمایید</Typography>
                                </div>
                                }

                                {props.row.status === 'ERROR' &&
                                <div style={{direction: 'rtl'}}>
                                    <Typography color="textPrimary">متاسفانه ساخت این سرور با مشکل مواجه شده
                                        است.</Typography>
                                    <Typography color="textSecondary">این مشکل به تیم پشتیبانی ابرپرداز اطلاع داده شده
                                        است</Typography>
                                </div>
                                }
                                {props.row.status === 'REBUILD' &&
                                <div style={{direction: 'rtl'}}>
                                    <Typography color="textPrimary">در حال نصب مجدد سیستم عامل بر روی سرور
                                        هستیم.</Typography>
                                    <Typography color="textSecondary">لطفا تا زمان اتمام عملیات، تغییری روی سرور اعمال
                                        نکنید</Typography>
                                </div>
                                }
                            </React.Fragment>
                        }
                    >

                        <Paper className={"boxItem serverItem"}>
                            <img width={64} src={"/images/os/" + props.row.image.name.toLowerCase() + '.png'}/>

                            <Typography>
                                {props.row.name}
                                &nbsp;
                                {props.row.status === 'ERROR' &&
                                <HighlightOffIcon color={"error"}/>
                                }

                                {props.row.status === 'ACTIVE' &&
                                <PowerIcon style={{color: 'green'}}/>
                                }

                                {props.row.status === 'creating' &&
                                <CircularProgress size={20} title={"در حال ایجاد سرور"}/>
                                }

                                {props.row.status === 'REBUILD' &&
                                <CircularProgress size={20} title={"در حال نصب مجدد سیستم عامل"}/>
                                }

                                {props.row.status === 'SHUTOFF' &&
                                <PowerOffIcon style={{color: 'brown'}}/>
                                }
                            </Typography>


                            <Typography color="textSecondary">
                                {props.row.image.name} {props.row.image.version}
                            </Typography>
                        </Paper>

                    </HtmlTooltip>
                </a>
            </Grid>
        )
    }

    return (
        <Grid container spacing={1}>
            <title>سرورها{user_title_postfix}</title>

            {items.map(row => (
                <ServerItem row={row}/>
            ))}

            <Grid item xs={12} sm={4}>
                <HtmlTooltip
                    placement="top"

                    title={
                        <React.Fragment>
                            <div style={{direction: 'rtl'}}>
                                <Typography color="textPrimary">ایجاد سرور جدید</Typography>
                                <Typography color="textSecondary">با کلیک بر روی این گزینه می توانید در کمتر از چند
                                    دقیقه سرور جدیدی با مشخصات مورد نیاز بسازید</Typography>
                            </div>
                        </React.Fragment>
                    }
                >
                    <Paper className={"boxItem addItem"}
                           onClick={() => window.location.href = '/' + props.match.params.id.toString() + '/createMachine'}>
                        <Typography color="textSecondary">
                            <AddIcon/>
                        </Typography>
                    </Paper>
                </HtmlTooltip>
            </Grid>
            <Backdrop className={classes.backdrop} open={backDropOpen} onClick={handleBackdropClose}>
                <CircularProgress color="inherit"/>
            </Backdrop>
        </Grid>

    )
}
