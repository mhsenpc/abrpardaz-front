import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Navbar from "./pages/Navbar";
import axios from "axios";
import {api_base, machinesList, sshKeysAdd, sshKeysList} from "./Api";
import {Button} from "@material-ui/core";

export default class App extends Component {
    state = {
        rows: []
    };

    createkey(){
      axios.post(api_base + sshKeysAdd, {
        name: 'mhmdx',
        content: 'Flintstone'
      })
          .then(res => {
            if(res.data.success === true){
              alert(res.data.data.message);
            }
            else{
              console.log(res.data.data.message)
            }
          })
    }

    componentDidMount() {
        axios.get(api_base + sshKeysList)
            .then(res => {
                const list = res.data.data.list;

                this.setState({'rows': list});
            })
    }

    render() {
        return (
            <div>
                <ul>
                    {this.state.rows.map(row => (
                        <li>{row.name} date {row.created_at}</li>
                    ))}
                </ul>

                <Button onClick={this.createkey}>create</Button>
            </div>
        );
    }
}