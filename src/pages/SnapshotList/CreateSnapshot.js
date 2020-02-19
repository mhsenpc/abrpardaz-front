import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import {TextField} from "@material-ui/core";
import axios from "axios";
import {api_base, machinesList, snapshotsList} from "../../Api";
import Button from "@material-ui/core/Button";
import Select from '@material-ui/core/Select';
import MessageBox from "../MessageBox";
import swal from 'sweetalert';

export default function CreateSnapshot() {
    const [response, setResponse] = React.useState([]);
    const [machineId, setMachineId] = React.useState(null);
    const [machineItems, setMachineItems] = React.useState([]);
    const [snapShotItems, setSnapShotItems] = React.useState([]);

    const handleChange = event => {
        setMachineId(event.target.value);
    };

    let user_id;
    if (sessionStorage.getItem('user_id'))
        user_id = sessionStorage.getItem('user_id');
    else if (localStorage.getItem('user_id'))
        user_id = localStorage.getItem('user_id');


    function loadSnapshots(){
        axios.get(api_base + snapshotsList)
            .then(res => {
                const list = res.data.list;

                setSnapShotItems(list);
            })
    }

    React.useEffect(() => {
        axios.get(api_base + machinesList)
            .then(res => {
                const list = res.data.list;

                setMachineItems(list);
                if (list.length > 0)
                    setMachineId(list[0].id);
            })

        loadSnapshots();

        if (user_id) {
            var channel = window.Echo.channel('private-user-' + user_id);
            channel.listen('.snapshot.created', function (data) {
                alert(JSON.stringify(data));
                //TODO: update snapshot which its creation process is completed
            });
        }
    }, []);


    function requestMakeSnapshot() {
        swal("آیا ازساخت تصویر آنی اطمینان دارید؟", {
            dangerMode: true,
            buttons: true,
        }).then(function (isConfirm) {
            if (isConfirm) {
                requestSnapShot()
            }
        });
    }

    const [name, setName] = React.useState('');

    function requestSnapShot() {
        axios.post(api_base + 'machines/' + machineId.toString() + '/takeSnapshot', {name: name})
            .then(res => {
                setResponse(res.data)
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
                        native
                        onChange={handleChange}
                    >
                        {machineItems.map(row => (
                            <option key={row.id} value={row.id}>{row.name}</option>
                        ))}

                    </Select>
                </FormControl>

                <p>
                    <TextField label={"نام تصویر آنی"} name='name'
                               onChange={event => setName(event.target.value)}/>
                    &nbsp;
                    <Button onClick={() => requestMakeSnapshot()}>
                        ساخت تصویرآنی
                    </Button>
                </p>


            </div>
            }
            <MessageBox response={response}/>
        </div>
    )

}
