import React from 'react';
import axios from "axios";
import {AddProject, api_base, ProjectsListPath} from "../Api";
import Button from '@material-ui/core/Button';
import SimpleModal from "./SimpleModal";
import TextField from '@material-ui/core/TextField';
import MessageBox from "./MessageBox";

export default function ProjectsList() {
    const [machines, setMachines] = React.useState([]);
    const [response, setResponse] = React.useState([]);
    const [name, setName] = React.useState('');
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        loadProjects()
    }, []);

    function loadProjects(){
        axios.get(api_base + ProjectsListPath)
            .then(res => {
                setMachines(res.data.list)
            })
    }

    function requestModal() {
        axios.post(api_base + AddProject, {name: name})
            .then(res => {
                setResponse(res.data)
                setOpen(false)
                loadProjects();
            })
    }

    const handleOpen = () => {
        setOpen(true);
    };

    return (

        <div>
            {machines.map(row => (<div>
                    <Button href={"servers/" + row.id.toString()}>
                        <p>
                            {row.name}
                        </p>
                    </Button>
                </div>
            ))}
            <Button type="button" variant="contained" color="primary" onClick={handleOpen}>
                + افزودن پروژه
            </Button>
            <SimpleModal open={open} setOpen={setOpen}>
                <h2 id="simple-modal-title">نام پروژه را وارد نمایید</h2>
                <TextField id="outlined-search" type="search" variant="outlined"
                           onChange={event => setName(event.target.value)}/>
                <Button onClick={() => requestModal()} variant="contained">
                    ثبت
                </Button>
            </SimpleModal>
            <MessageBox response={response}/>
        </div>
    )
}
