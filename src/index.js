import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Layout from "./pages/Layout";
import FAQ from "./pages/FAQ";

import {BrowserRouter as Router, Route} from 'react-router-dom';
import Notfound from "./pages/Notfound";
import Dashboard from "./pages/Dashboard";
import ServerList from "./pages/ServerList";
import SshKeyList from "./pages/SshKeys/SshkeyList";
import Transactions from "./pages/Transactions";
import SnapshotList from "./pages/SnapshotList";
import TicketList from "./pages/Tickets/TicketList";
import CreateMachinePage from "./pages/CreateMachine/CreateMachinePage";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ChangePassword from "./pages/Auth/ChangePassword";
import SshKeyAdd from "./pages/SshKeys/SshKeyAdd";
import NewTicket from "./pages/Tickets/NewTicket";
import TicketDetails from "./pages/Tickets/TicketDetails";
import ForgetPassword from "./pages/Auth/ForgetPassword";
import ResetPassword from "./pages/Auth/ResetPassword";
import Verify from "./pages/Auth/Verify";
import ProfileValidation from "./pages/ProfileValidation/ProfileValidation";
import ServerDetailsMenu from "./pages/MachineDetails/DetailsMenu";
import ServerSnapshotsList from "./pages/MachineDetails/ServerSnapshotsList";
import SshKeyEdit from "./pages/SshKeys/SshKeyEdit";
import ProjectsList from "./pages/ProjectsList";
import Notifications from "./pages/Notifications";
import axios from "axios";
import swal from 'sweetalert';
import Invoices from "./pages/Invoices";
import Limits from "./pages/Limits";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';


const theme = createMuiTheme({
    direction: 'rtl', // Both here and <body dir="rtl">
});


(function () {
    const tokenOnLocalStorage = localStorage.getItem("token");
    if (tokenOnLocalStorage)
        sessionStorage.setItem('token', tokenOnLocalStorage);
    let token = sessionStorage.getItem("token");
    if (token) {
        token = atob(token);
        axios.defaults.headers.common['Accept'] = 'application/json';
        axios.defaults.headers.post['Authorization'] = `Bearer ${token}`;
        axios.defaults.headers.put['Authorization'] = `Bearer ${token}`;
        axios.defaults.headers.get['Authorization'] = `Bearer ${token}`;
        axios.defaults.headers.delete['Authorization'] = `Bearer ${token}`;
    } else {
        axios.defaults.headers.post['Authorization'] = null;
        axios.defaults.headers.put['Authorization'] = null;
        axios.defaults.headers.get['Authorization'] = null;
        axios.defaults.headers.delete['Authorization'] = null;
        /*if setting null does not remove `Authorization` header then try
          delete axios.defaults.headers.common['Authorization'];
        */
    }

    axios.interceptors.response.use(function (response) {
        return response;
    }, function (error) {
        if (401 === error.response.status) {
            swal("توکن منقضی شده است", "شما نیاز به احراز هویت مجدد دارید!", "warning").then((value) => {
                window.location.href = '/login';
            });
            return Promise.reject(error);
        } else {
            swal("خطا", "در پردازش درخواست شما مشکلی وجود دارد", "error");
            return Promise.reject(error);
        }
    });
})();


const DefaultLayout = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={matchProps => (
            <ThemeProvider theme={theme}>
                <div dir="rtl">
                    <Layout>
                        <Component {...matchProps} />
                    </Layout>
                </div>
            </ThemeProvider>

        )}/>
    )
};

const routing = (
    <Router>
        <div>
            <DefaultLayout exact path="/" component={Dashboard}/>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
            <DefaultLayout path="/faq" component={FAQ}/>
            <DefaultLayout path="/ProjectsList" component={ProjectsList}/>
            <DefaultLayout path="/Transactions" component={Transactions}/>
            <DefaultLayout path="/Invoices" component={Invoices}/>
            <DefaultLayout path="/createMachine" component={CreateMachinePage}/>
            <DefaultLayout path="/404" component={Notfound}/>
            <DefaultLayout path="/snapshotList" component={SnapshotList}/>
            <DefaultLayout path="/Tickets" component={TicketList}/>
            <DefaultLayout path="/ChangePassword" component={ChangePassword}/>
            <DefaultLayout path="/profile" component={ProfileValidation}/>
            <DefaultLayout path="/SshKeyList" component={SshKeyList}/>
            <DefaultLayout path="/SshKeyAdd" component={SshKeyAdd}/>
            <DefaultLayout path="/SshKeyEdit/:id" component={SshKeyEdit}/>
            <DefaultLayout path="/NewTicket" component={NewTicket}/>
            <DefaultLayout path="/Limits" component={Limits}/>
            <DefaultLayout path="/ResetPassword" component={ResetPassword}/>
            <DefaultLayout path="/TicketDetails/:id" component={TicketDetails}/>
            <DefaultLayout path="/ForgetPassword" component={ForgetPassword}/>
            <DefaultLayout path="/Verify" component={Verify}/>
            <DefaultLayout path="/Notifications" component={Notifications}/>
            <DefaultLayout path="/MachineSnapshotList/:id" component={ServerSnapshotsList}/>
            <DefaultLayout path="/servers/:id" component={ServerList}/>
            <DefaultLayout path="/server/:id" component={ServerDetailsMenu}/>
        </div>
    </Router>
);
ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

