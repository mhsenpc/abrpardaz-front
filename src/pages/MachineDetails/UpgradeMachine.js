import React from 'react';
import Paper from '@material-ui/core/Paper';
import axios from "axios";
import Box from '@material-ui/core/Box';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {api_base, plansList} from "../../Api";
import Button from "@material-ui/core/Button";
import {Checkbox} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {user_title_postfix} from "../../consts";


const useStyles = makeStyles({
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});


function UpgradeMachine(props) {

    const classes = useStyles();
    const [items, setItems] = React.useState([]);
    const [planId, setPlanId] = React.useState([]);


    React.useEffect(() => {
        axios.get(api_base + plansList)
            .then(res => {
                const list = res.data.pagination.data;

                setItems(list);
            })
    }, []);

    function requestUpgrade() {
        axios.post(api_base + 'machines/' + props.id.toString() + '/rescale', {plan_id: planId})
            .then(res => {
                props.setResponse(res.data)
            })
    }

    function selectPlan(id) {
        setPlanId(id)
    }

    function isActive(id) {
        if (id === planId) {
            return 'active';
        } else {
            return '';
        }
    }

    return (
        <div>
            <title>ارتقاء سرور{user_title_postfix}</title>

            <Grid item xs={12}>
                <Paper>
                    <Box p={1}>
                        <h2>ارتقاء سرور</h2>
                        <p>
                            نیاز به افزایش قدرت سرور دارید؟ کافیست سرور را به پلن قدرتمندتری ارتقاء دهید
                        </p>
                        <p>
                            شما می توانید پردازنده و رم را ارتقاء دهید و دیسک را تغییر ندهید یا دیسک را نیز گسترش دهید.
                        </p>
                        <p>
                            در صورتی می توانید به پلن انتخابی را تنزل بدهید که دیسک را تغییر نداده باشید. اگر اندازه
                            دیسک را تغییر داده باشید، تنزل پلن با دیسک کوچک تر ناممکن می گردد.
                        </p>

                        <p>
                            برای انجام عملیات ارتقاء / تنزل، نیاز است که سرور خاموش گردد. این عملیات معمولا چند دقیقه طول
                            می کشد.
                        </p>
                        <br />
                        <Grid item xs={12} container spacing={2}>
                            {items.map(row => (
                                <Grid item xs={12} sm={6} md={4}>
                                    <Paper>
                                        <Box className={"boxItem planItem " + isActive(row.id)} key={row.id}
                                             onClick={() => selectPlan(row.id)}>
                                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                                {row.name}
                                            </Typography>
                                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                                vcpu: {row.vcpu}
                                            </Typography>
                                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                                Ram: {row.ram}GB
                                            </Typography>
                                            <Typography variant="h5" component="h2">
                                                ساعتی {row.hourly_price} تومان
                                            </Typography>
                                            <Typography className={classes.pos} color="textSecondary">
                                                Disk: {row.disk}GB
                                            </Typography>
                                            <Typography variant="body2" component="p">
                                                ترافیک نا محدود
                                            </Typography>
                                        </Box>
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>

                        <br/>
                        <br/>
                        <Button variant="contained" color="primary" onClick={() => requestUpgrade()}>ارتقاء</Button>

                    </Box>
                </Paper>
            </Grid>
        </div>
    );
}

export default UpgradeMachine;