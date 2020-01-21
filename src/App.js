import React from 'react';
import './App.css';
import axios from "axios";
import {api_base, machinesList} from "./Api";


export default function App() {
    const [machines, setMachines] = React.useState([]);

    React.useEffect(() => {
        loadMachines()
    }, []);

    function loadMachines() {
        axios.get(api_base + machinesList)
            .then(res => {
                setMachines(res.data.list)
            })
    }

    return (
        <div>

            {machines.map(row => (
                <div>
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