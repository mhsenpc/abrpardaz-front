import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import axios from "axios";
import Box from '@material-ui/core/Box';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {api_base, plansList} from "../../Api";
import Button from "@material-ui/core/Button";
import {Checkbox} from "@material-ui/core";


const useStyles = makeStyles({
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});


function UpgradeMachine() {

    const classes = useStyles();
    const [items, setItems] = React.useState([]);

    React.useEffect(() => {
        axios.get(api_base + plansList)
            .then(res => {
                const list = res.data.list;

                setItems(list);
            })
    }, []);

    return (
        <div>
            <Grid item xs={12} container
                  direction="row"
                  alignItems="center"
                  style={{direction: "rtl"}}
            >
                <Paper>

                    <Box component="span" m={1} height="auto" width="auto" display="inline-block">
                        <h1>ارتقاء سرور</h1>
                        <p>
                            نیاز به افزایش قدرت سرور دارید؟ کافیست سرور را به پلن قدرتمندتری ارتقاء دهید
                        </p>
                        <p>
                            شما می توانید پردازنده و رم را ارتقا دهید و دیسک را تغییر ندهید یا دیسک را نیز گسترش دهید. در صورتی می توانید به پلن انتخابی را تنزل بدهید که دیسک را تغییر نداده باشید. اگر اندازه دیسک را تغییر داده باشید، تنزل پلن با دیسک کوچک تر ناممکن می گردد.
                        </p>

                        <p>
                            برای انجام عملیات ارتقا/تنزل ، نیاز است که سرور خاموش گردد. این عملیات معمولا چند دقیقه طول می کشد.
                        </p>

                        <Box>
                            <Checkbox>فقط پردازنده و رم</Checkbox>
                            <span>با انتخاب این گزینه، اندازه دیسک تغییر نمی کند که به شما اجازه می دهد در آینده پلن ضعیف تری انتخاب کنید</span>
                        </Box>

                        {items.map(row => (
                            <Button >
                                <Card className={classes.card}>
                                    <CardContent>
                                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                                            {row.name}
                                        </Typography>
                                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                                            vcpu: {row.vcpu}
                                        </Typography>
                                        <Typography variant="h5" component="h2">
                                            Ram: {row.ram}GB
                                        </Typography>
                                        <Typography className={classes.pos} color="textSecondary">
                                            Disk: {row.disk}GB
                                        </Typography>
                                        <Typography variant="body2" component="p">
                                            ترافیک نا محدود
                                        </Typography>

                                    </CardContent>


                                </Card>
                            </Button>
                        ))}

                        <Button>ارتقاء</Button>

                    </Box>

                </Paper>
            </Grid>
        </div>
    );
}

export default UpgradeMachine;