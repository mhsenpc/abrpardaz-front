import React from 'react';
import Grid from '@material-ui/core/Grid';
import EuroIcon from '@material-ui/icons/Euro';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import ComputerSharpIcon from '@material-ui/icons/ComputerSharp';
import axios from "axios";
import {api_base} from "../../Api";
import CheckIcon from '@material-ui/icons/Check';
import AlbumIcon from '@material-ui/icons/Album';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import AlarmIcon from '@material-ui/icons/Alarm';
import {Box} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

export default function Overview(props) {

    const JDate = require('jalali-date');
    const [items, setItems] = React.useState([]);

    React.useEffect(() => {

        axios.get(api_base + 'machines/' + props.id.toString() + '/activities')
            .then(res => {
                const activities = res.data.list;
                setItems(activities);
            })
    }, [])

    return (

        <div>
            <Grid item xs={12}>
                <Paper>
                    <Box p={1} width={700}>
                        <h2>نمای کلی</h2>
                        <AlarmIcon/> {props.machine.plan.name}
                        <LoyaltyIcon/> {props.machine.plan.vcpu}
                        <LocalOfferIcon/> {props.machine.plan.ram} GB
                        <AlbumIcon/> {props.machine.plan.disk} GB
                        <AttachMoneyIcon/>ماهیانه {props.machine.plan.hourly_price * 24 * 30} تومان

                        <hr/>
                        <h3>فعالیت های سرور</h3>
                        {items.map(row => (
                            <div>
                                <p>
                                    <CheckIcon color={'primary'}/>
                                    {row.message}
                                </p>

                                <p>
                                    {(new JDate(new Date(row.created_at))).format('DD MMMM YYYY')}
                                </p>

                            </div>
                        ))}
                    </Box>
                </Paper>
            </Grid>


        </div>
    )
}
