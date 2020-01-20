import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Navbar from "./pages/Navbar";
import axios from "axios";
import {Button} from "@material-ui/core";
import AddIcon from "./pages/ServerList";
import {api_base, imagesList, machinesList} from "./Api";


export default function App() {
    const [machines, setMachines] = React.useState([]);

    React.useEffect(() => {
        loadMachines()
    }, []);

    function loadMachines() {
        axios.get(api_base + machinesList )
            .then(res => {
                setMachines(res.data.data.list)
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