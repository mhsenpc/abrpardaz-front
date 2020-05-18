import React from 'react';
import Paper from '@material-ui/core/Paper';
import axios from "axios";
import Box from '@material-ui/core/Box';
import {api_base, plansList} from "../../Api";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {user_title_postfix} from "../../consts";
import Plans from "../CreateMachine/Plans";


function UpgradeMachine(props) {
    const [planId, setPlanId] = React.useState('');
    const [planName, setPlanName] = React.useState('');
    const [minDisk, setMinDisk] = React.useState('');
    const [minRam, setMinRam] = React.useState('');


    React.useEffect(() => {
        setMinDisk(props.machine.image.min_disk)
        setMinRam(props.machine.image.min_ram)
    }, []);

    function requestUpgrade() {
        axios.post(api_base + 'machines/' + props.id.toString() + '/rescale', {plan_id: planId})
            .then(res => {
                props.setResponse(res.data)
            })
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
                            برای انجام عملیات ارتقاء / تنزل، نیاز است که سرور خاموش گردد. این عملیات معمولا چند دقیقه
                            طول
                            می کشد.
                        </p>
                        <br/>

                        <Plans setPlanId={setPlanId} planId={planId} setPlanName={setPlanName} minRam={minRam}
                               minDisk={minDisk}/>

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