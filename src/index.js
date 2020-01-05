import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Layout from "./pages/Layout";
import FAQ from "./pages/FAQ";
import {Switch} from "@material-ui/core";

import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom';
import Notfound from "./pages/Notfound";
import Dashboard from "./pages/Dashboard";
import ServerList from "./pages/ServerList";
import Sshkeylist from "./pages/ssh_keys/Sshkeylist";
import PaymentList from "./pages/Payment";
import Snapshotlist from "./pages/Snapshotlist";
import ListDataCenters from "./pages/CreateMachine/ListDataCenters";
import MachineOptions from "./pages/CreateMachine/MachineOptions";
import Ticket from "./pages/Ticket";
import Wizard from "./pages/CreateMachine/Wizard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SshKeyAdd from "./pages/ssh_keys/SshKeyAdd";
import Changepassword from "./pages/Changepassword";
import Profile from "./pages/Profile";

const routing = (
    <Router>
        <div>
            <Layout>
                <Route exact path="/" component={Dashboard}/>
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
                <Route path="/faq" component={FAQ}/>
                <Route path="/servers" component={ServerList}/>
                <Route path="/Sshkeylist" component={Sshkeylist}/>
                <Route path="/payment" component={PaymentList}/>
                <Route path="/createmachine" component={Wizard}/>
                <Route path="/404" component={Notfound} />
                <Route path="/Snapshotlist" component={Snapshotlist} />
                <Route path="/Tickets" component={Ticket} />
                <Route path="/changepassword" component={Changepassword} />
                <Route path="/profile" component={Profile} />
            </Layout>
        </div>
    </Router>
);
ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
