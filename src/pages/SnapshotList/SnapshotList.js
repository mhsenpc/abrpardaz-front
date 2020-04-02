import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import SnapshotRules from "./SnapshotRules";
import CreateSnapshot from "./CreateSnapshot";
import SnapshotItems from "./SnapshotItems";
import MessageBox from "../MessageBox";
import {admin_title_postfix, user_title_postfix} from "../../consts";

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

export default function SnapshotList(props) {
    const classes = paperStyle();
    const [response, setResponse] = React.useState([]);

    return (
        <div>
            <title>تصاویر آنی{user_title_postfix}</title>

            <Grid container>
                <Grid item xs={8}>
                    <Paper className={classes.paper}>
                        <CreateSnapshot setResponse={setResponse}/>

                        <hr/>
                        <SnapshotRules/>

                    </Paper>
                </Grid>

                <Grid item xs={4}>
                    <Paper className={classes.paper}>
                        <div>
                            <SnapshotItems setResponse={setResponse} />
                        </div>
                    </Paper>
                </Grid>
            </Grid>
            <MessageBox response={response}/>
        </div>
    );
}
