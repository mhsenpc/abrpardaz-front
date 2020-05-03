import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import CreateSnapshot from "./CreateSnapshot";
import SnapshotItems from "./SnapshotItems";
import MessageBox from "../MessageBox";
import {user_title_postfix} from "../../consts";
import {Box} from "@material-ui/core";

export default function SnapshotList(props) {
    const [response, setResponse] = React.useState([]);

    return (
        <div>
            <title>تصاویر آنی{user_title_postfix}</title>

            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Paper>
                        <Box p={1}>
                            <CreateSnapshot setResponse={setResponse}/>
                        </Box>

                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    <Paper>
                        <Box p={1}>
                            <SnapshotItems setResponse={setResponse}/>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
            <MessageBox response={response}/>
        </div>
    );
}
