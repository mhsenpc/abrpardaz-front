import React from 'react';
import Grid from '@material-ui/core/Grid';
import axios from "axios";
import {api_base} from "../../Api";
import CheckIcon from '@material-ui/icons/Check';
import {Box} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import {user_title_postfix} from "../../consts";

export default function Overview(props) {

    const JDate = require('jalali-date');
    const [items, setItems] = React.useState([]);

    React.useEffect(() => {

        axios.get(api_base + 'machines/' + props.id.toString() + '/activities')
            .then(res => {
                const activities = res.data.list;
                if (activities)
                    setItems(activities);
            })
    }, [])

    return (
        <Grid item xs={12}>
            <title>نمای کلی{user_title_postfix}</title>

            <Paper>
                <Box p={1}>
                    <h2>نمای کلی</h2>
                    <Grid container>
                        <Grid item xs={2} title={"نام پلن جاری"}>
                            <img src={"/images/settings.png"} width={32}/>
                            <br/>
                            {props.machine.plan.name}
                        </Grid>

                        <Grid item xs={2} title={"تعداد پردازنده های مجازی اختصاص داده شده به این سرور"}>
                            <img src={"/images/cpu.jpg"} width={32}/>
                            <br/>
                            {props.machine.plan.vcpu } عدد
                        </Grid>
                        <Grid item xs={2} title={"میزان رم سرور"}>
                            <img src={"/images/ram.webp"} width={32}/>
                            <br/>
                            {props.machine.plan.ram} GB

                        </Grid>
                        <Grid item xs={2} title={"میزان فضای دیسک سرور"}>
                            <img src={"/images/disk.png"} width={32}/>
                            <br/>
                            {props.machine.plan.disk} GB

                        </Grid>
                        <Grid item xs={3} title={"هزینه ماهیانه این سرور"}>
                            <img src={"/images/money.webp"} width={32}/>
                            <br/>
                            {props.machine.plan.hourly_price * 24 * 30}
                            &nbsp;
                            تومان
                        </Grid>
                    </Grid>


                    <hr/>
                    <h3>فعالیت های سرور</h3>
                    <div style={{
                        overflow: 'auto',
                        maxHeight: 260,
                    }}>
                        {items.map(row => (
                            <div key={row.id}>
                                <p>
                                    <CheckIcon color={'primary'}/>
                                    {row.message}
                                </p>

                                <p>
                                    {(new JDate(new Date(row.created_at))).format('DD MMMM YYYY')}
                                </p>

                            </div>
                        ))}
                    </div>
                </Box>
            </Paper>
        </Grid>
    )
}
