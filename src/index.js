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
import Sshkeylist from "./pages/Sshkeylist";
import PaymentList from "./pages/Payment";
import SelectOS from "./pages/CreateMachine/SelectOS";
import Snapshotlist from "./pages/Snapshotlist";
import ListDataCenters from "./pages/CreateMachine/ListDataCenters";
import MachineOptions from "./pages/CreateMachine/MachineOptions";
import Ticket from "./pages/Ticket";
import Confirm from "./pages/CreateMachine/Confirm";
import Wizard from "./pages/CreateMachine/Wizard";

const routing = (
    <Router>
        <div>
            <Layout>

                <Route exact path="/" component={Dashboard}/>
                <Route path="/faq" component={FAQ}/>
                <Route path="/servers" component={ServerList}/>
                <Route path="/Sshkeylist" component={Sshkeylist}/>
                <Route path="/payment" component={PaymentList}/>
                <Route path="/createmachine" component={Wizard}/>
                <Route path="/ListDatacenters" component={ListDataCenters}/>
                <Route path="/MachineOptions" component={MachineOptions}/>
                <Route path="/404" component={Notfound} />
                <Route path="/Snapshotlist" component={Snapshotlist} />
                <Route path="/Tickets" component={Ticket} />

            </Layout>
        </div>
    </Router>
);
ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
