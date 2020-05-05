import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/AddBox';
import axios from "axios";
import {api_base, machinesOfProject} from "../Api";
import CloudIcon from '@material-ui/icons/Cloud';
import Pusher from "pusher-js"
import {Paper} from "@material-ui/core";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import PowerIcon from '@material-ui/icons/Power';
import PowerOffIcon from '@material-ui/icons/PowerOff';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from "@material-ui/core/Backdrop";
import {user_title_postfix} from "../consts";
import Tooltip from '@material-ui/core/Tooltip';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import {HtmlTooltip} from "../Helpers";



const useStyles = makeStyles(theme => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

export default function ServerList(props) {
    const classes = useStyles();
    const [backDropOpen, setBackDropOpen] = React.useState(true);

    function showDetails(machine_id) {
        window.location.href = '/server/' + machine_id.toString();
    }

    const [items, setItems] = React.useState([]);

    React.useEffect(() => {
        let id = props.match.params.id;
        loadMachines();

        function loadMachines() {
            axios.get(api_base + machinesOfProject + id.toString())
                .then(res => {
                    const list = res.data.list;
                    if (res.data.list)
                        setItems(list);
                    setBackDropOpen(false)
                })
        }

    }, []);

    const handleBackdropClose = () => {
        setBackDropOpen(false);
    };

    function ServerItem(props) {
        return (
            <Grid item xs={12} sm={4}>
                <HtmlTooltip
                    placement="top"

                    title={
                        <React.Fragment>
                            {props.row.status === 'creating' &&
                            <div style={{direction: 'rtl'}}>
                                <Typography color="textPrimary">سرور در حال ایجاد شدن می باشد. لطفا شکیبا باشید</Typography>
                            </div>
                            }

                            {props.row.status === 'power_on' &&
                            <div style={{direction: 'rtl'}}>
                                <Typography color="textPrimary">سرور روشن و آماده استفاده می باشد</Typography>
                                <Typography color="textSecondary">شما می توانید با کلیک بر روی این گزینه، سرور خود را مدیریت نمایید</Typography>
                            </div>
                            }

                            {props.row.status === 'power_off' &&
                            <div style={{direction: 'rtl'}}>
                                <Typography color="textPrimary">سرور در حال حاضر خاموش می باشد</Typography>
                                <Typography color="textSecondary">شما می توانید با کلیک بر روی این گزینه، سرور خود را مدیریت نمایید</Typography>
                            </div>
                            }

                            {props.row.status === 'failed' &&
                            <div style={{direction: 'rtl'}}>
                                <Typography color="textPrimary">متاسفانه ساخت این سرور با مشکل مواجه شده است.</Typography>
                                <Typography color="textSecondary">این مشکل به تیم پشتیبانی ابرپرداز اطلاع داده شده است</Typography>
                            </div>
                            }
                        </React.Fragment>
                    }
                >
                    <Paper className={"boxItem serverItem"} onClick={() => showDetails(props.row.id)}>
                        <img width={64} src={"/images/os/"+ props.row.image.name.toLowerCase() + '.png'} />

                        <Typography>
                            {props.row.name}
                            &nbsp;
                            {props.row.status === 'failed' &&
                            <HighlightOffIcon color={"error"}/>
                            }

                            {props.row.status === 'power_on' &&
                            <PowerIcon style={{color: 'green'}}/>
                            }

                            {props.row.status === 'creating' &&
                            <CircularProgress size={20} title={"در حال ایجاد سرور"}/>
                            }

                            {props.row.status === 'power_off' &&
                            <PowerOffIcon style={{color: 'brown'}}/>
                            }
                        </Typography>


                        <Typography color="textSecondary">
                            {props.row.image.name} {props.row.image.version}
                        </Typography>
                    </Paper>
                </HtmlTooltip>
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
                                <Typography color="textSecondary">با کلیک بر روی این گزینه می توانید در کمتر از چند دقیقه سرور جدیدی با مشخصات مورد نیاز بسازید</Typography>
                            </div>
                        </React.Fragment>
                    }
                >
                <Paper className={"boxItem addItem"} onClick={() => window.location.href = '/'+ props.match.params.id.toString() + '/createMachine'}>
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
