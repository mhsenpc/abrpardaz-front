import React from 'react';
import Button from "@material-ui/core/Button";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import axios from "axios";
import {api_base} from "../../Api";


function MachineRemove(props) {

    function removeMachine() {

        let id = props.id.toString();
        axios.delete(api_base + 'machines/' + id + '/remove')
            .then(res => {
                const msg = res.data.data.message;

                alert(msg)

                window.location.href = '/servers/';

            })
    }



    return(
        <div>
            <Grid item xs={12} container
                  direction="row"
                  alignItems="center"
            >
                <Paper>

                    <Box  p={2} width={700}>
                        <p>
                            در صورت حذف ماشین ،اطلاعات آن نابود میگرددو این عملیات قابل برگشت نیست.
                        </p>

                        <Button onClick={() => removeMachine()} variant="contained" color="secondary">
                           حذف ماشین
                        </Button>

                    </Box>

                </Paper>
            </Grid>

        </div>



    )

}

export default MachineRemove;



