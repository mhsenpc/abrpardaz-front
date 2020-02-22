import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import MessageBox from "./MessageBox";
import Alert from '@material-ui/lab/Alert';
import SnapshotRules from "./SnapshotList/SnapshotRules";
import CreateSnapshot from "./SnapshotList/CreateSnapshot";
import SnapshotItems from "./SnapshotList/SnapshotItems";

const paperStyle = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            margin: 'auto',
            maxWidth: 700,
            marginTop: 12

        },

    }),
);

export default function SnapshotList() {
    const classes = paperStyle();
    const [response, setResponse] = React.useState([]);
    const [machineItems, setMachineItems] = React.useState([]);


    return (

        <div>


            <Grid
                container
            >

                <Grid item xs={8}>

                    <Paper className={classes.paper}>

                        <CreateSnapshot/>

                        {machineItems.length == 0 &&
                        <Alert severity="warning">
                            هم اکنون سروری برای حساب کاربری شما وجود ندارد
                        </Alert>
                        }

                        <hr/>
                        <SnapshotRules/>

                    </Paper>
                </Grid>


                <Grid item xs={4}>

                    <Paper className={classes.paper}>

                        <div>
                            <SnapshotItems/>
                        </div>
                    </Paper>

                </Grid>

            </Grid>

            <MessageBox response={response}/>
        </div>
    );

}
