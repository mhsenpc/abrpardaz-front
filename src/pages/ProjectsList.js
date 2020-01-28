import React from 'react';
import axios from "axios";
import {api_base, ProjectsListPath} from "../Api";

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
                    <p>
                        {row.name}
                    </p>

                    <p>
                        {row.created_at}
                    </p>
                </div>
            ))};

        </div>
    )
}
