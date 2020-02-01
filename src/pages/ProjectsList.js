import React from 'react';
import axios from "axios";
import {api_base, ProjectsListPath} from "../Api";
import Button from '@material-ui/core/Button';

export default function ProjectsList() {
    const [machines, setMachines] = React.useState([]);

    React.useEffect(() => {
        loadMachines()
    }, []);

    function loadMachines() {
        axios.get(api_base + ProjectsListPath)
            .then(res => {
                setMachines(res.data.list)
            })
    }

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

        </div>
    )
}
