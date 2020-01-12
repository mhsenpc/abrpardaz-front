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
import SshKeyList from "./pages/ssh_keys/Sshkeylist";
import PaymentList from "./pages/Payment";
import Snapshotlist from "./pages/Snapshotlist";
import Ticket from "./pages/Ticket";
import Wizard from "./pages/CreateMachine/Wizard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ChangePassword from "./pages/Changepassword";
import Profile from "./pages/Profile";
import SshKeyAdd from "./pages/ssh_keys/SshKeyAdd";

const DefaultLayout = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={matchProps => (
            <Layout>
                <Component {...matchProps} />
            </Layout>
        )} />
    )
};

const routing = (
    <Router>
        <div>
                <DefaultLayout exact path="/" component={Dashboard}/>
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
                <DefaultLayout  path="/faq" component={FAQ}/>
                <DefaultLayout  path="/servers" component={ServerList}/>
                <DefaultLayout  path="/SshKeyList" component={SshKeyList}/>
                <DefaultLayout  path="/payment" component={PaymentList}/>
                <DefaultLayout  path="/createMachine" component={Wizard}/>
                <DefaultLayout  path="/404" component={Notfound} />
                <DefaultLayout  path="/snapshotList" component={Snapshotlist} />
                <DefaultLayout  path="/Tickets" component={Ticket} />
                <DefaultLayout  path="/changePassword" component={ChangePassword} />
                <DefaultLayout  path="/profile" component={Profile} />
                <DefaultLayout  path="/SshKeyAdd" component={SshKeyAdd} />

        </div>
    </Router>
);
ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
