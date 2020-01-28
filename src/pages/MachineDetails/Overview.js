import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from "@material-ui/core/Paper/Paper";
import Box from '@material-ui/core/Box';
import EuroIcon from '@material-ui/icons/Euro';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import ComputerSharpIcon from '@material-ui/icons/ComputerSharp';
import Divider from '@material-ui/core/Divider';

export default function Overview() {
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

                        CX31  {/*<Divider style={} orientation="vertical"  />*/}    <ComputerSharpIcon/>2vcpu   <LoyaltyIcon/> 8GB RAM  <LocalOfferIcon/> DISK LOCAL <EuroIcon/> 8.90/mo PRICE

                    </p>
                    <hr/>
                </div>
            </Grid>


        </div>
    )
}
