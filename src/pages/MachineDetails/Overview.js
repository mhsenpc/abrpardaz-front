import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from "@material-ui/core/Paper/Paper";
import Box from '@material-ui/core/Box';
import EuroIcon from '@material-ui/icons/Euro';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import ComputerSharpIcon from '@material-ui/icons/ComputerSharp';
import Divider from '@material-ui/core/Divider';
import axios from "axios";
import {api_base} from "../../Api";
import TableCell from "../SnapshotList";
import CheckIcon from '@material-ui/icons/Check';

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
            <Grid item xs={12}
                  direction="row"
                  alignItems="center"
            >
                <div>
                    <h1>نمای کلی</h1>
                    <br/>
                    <p>

                        CX31  {/*<Divider style={} orientation="vertical"  />*/}    <ComputerSharpIcon/>2vcpu  <LoyaltyIcon/> 8GB RAM  <LocalOfferIcon/> DISK LOCAL <EuroIcon/> 8.90/mo PRICE

                    </p>
                    <hr/>
                    <h2>فعالیت های سرور</h2>
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

                </div>
            </Grid>


        </div>
    )
}
