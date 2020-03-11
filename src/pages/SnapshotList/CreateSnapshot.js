import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import {TextField} from "@material-ui/core";
import axios from "axios";
import {api_base, machinesList} from "../../Api";
import Button from "@material-ui/core/Button";
import Select from '@material-ui/core/Select';
import swal from 'sweetalert';
import Alert from "@material-ui/lab/Alert";
import MenuItem from '@material-ui/core/MenuItem';


export default function CreateSnapshot(props) {
    const [machineId, setMachineId] = React.useState(null);
    const [machineItems, setMachineItems] = React.useState([]);

    const handleChange = event => {
        setMachineId(event.target.value);
    };

    React.useEffect(() => {
        axios.get(api_base + machinesList)
            .then(res => {
                const list = res.data.list;

                setMachineItems(list);
                if (list.length > 0)
                    setMachineId(list[0].id);
            })
    }, []);


    function requestMakeSnapshot() {
        swal("آیا ازساخت تصویر آنی اطمینان دارید؟", {
            icon:'warning',
            buttons: true,
        }).then(function (isConfirm) {
            if (isConfirm) {
                requestSnapShot()
            }
        });
    }

    const [name, setName] = React.useState('');

    function requestSnapShot() {
        axios.post(api_base + 'snapshots/takeSnapshot', {machine_id:machineId, name: name})
            .then(res => {
                props.setResponse(res.data)
                if(res.data.success)
                    setName('');
            })
    }


    return (
        <div>
            <h2>
                ساخت تصویرآنی
            </h2>

            {machineItems.length > 0 &&
            <div>
                <p>
                    لطفا قبل از گرفتن تصویر آنی سرور خود را خاموش کنید!
                </p>

                <FormControl variant="outlined">
                    <Select
                        onChange={handleChange}
                        value={machineId}
                    >
                        {machineItems.map(row => (
                            <MenuItem key={row.id} value={row.id}>{row.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <p>
                    <TextField label={"نام تصویر آنی"} name='name'
                               onChange={event => setName(event.target.value)} value={name} />
                    &nbsp;
                    <Button color={"primary"} variant={"contained"} onClick={() => requestMakeSnapshot()}>
                        ساخت تصویرآنی
                    </Button>
                </p>


            </div>
            }
            {machineItems.length === 0 &&
            <Alert severity="warning">
                هم اکنون سروری برای حساب کاربری شما وجود ندارد
            </Alert>
            }
        </div>
    )
}
