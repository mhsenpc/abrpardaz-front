import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Layout from "./pages/Layout";
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import Notfound from "./pages/Notfound";
import Dashboard from "./pages/Dashboard";
import ServerList from "./pages/ServerList";
import SshKeyList from "./pages/SshKeys/SshkeyList";
import Transactions from "./pages/Transactions";
import SnapshotList from "./pages/SnapshotList/SnapshotList";
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
import ImagesList from "./pages/Images/ImagesList";
import ImageAdd from "./pages/Images/ImageAdd";
import ImageEdit from "./pages/Images/ImageEdit";
import PlansList from "./pages/Plans/PlansList";
import PlanAdd from "./pages/Plans/PlanAdd";
import PlanEdit from "./pages/Plans/PlanEdit";
import UsersList from "./pages/Users/UsersList";
import UserAdd from "./pages/Users/UserAdd";
import UserProfile from './pages/Users/UserProfile';
import UserLimitList from "./pages/UserLimits/UserLimitList";
import UserLimitAdd from "./pages/UserLimits/UserLimitAdd";
import UserLimitEdit from "./pages/UserLimits/UserLimitEdit";
import ChangeUserLimit from "./pages/Users/ChangeUserLimit";
import RolesList from "./pages/Roles/RolesList";
import RoleAdd from "./pages/Roles/RoleAdd";
import RoleEdit from "./pages/Roles/RoleEdit";
import ChangeUserRole from "./pages/Users/ChangeUserRole";
import App from "./App";
import LoginWithGoogle from "./pages/Auth/LoginWithGoogle";


const theme = createMuiTheme({
    direction: 'rtl', // Both here and <body dir="rtl">
});


(function () {
    axios.defaults.headers.common['Accept'] = 'application/json';
    const tokenOnLocalStorage = localStorage.getItem("token");
    const tokenOnSessionStorage = sessionStorage.getItem("token");
    if (tokenOnLocalStorage && !tokenOnSessionStorage){
        //load everything from localstorage
        sessionStorage.setItem('user_id', localStorage.getItem("user_id"));
        sessionStorage.setItem('permissions', localStorage.getItem("permissions"));
        sessionStorage.setItem('token', tokenOnLocalStorage);
    }
    let token = sessionStorage.getItem("token");
    if (token) {
        token = atob(token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        axios.defaults.headers.common['Authorization'] = null;
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
                <div>
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
            <Switch>
            <DefaultLayout exact path="/" component={App}/>
            <DefaultLayout path="/Dashboard" component={Dashboard}/>
            <Route path="/login" component={Login}/>
            <Route path="/Register" component={Register}/>
            <DefaultLayout path="/ProjectsList" component={ProjectsList}/>
            <DefaultLayout path="/Transactions" component={Transactions}/>
            <DefaultLayout path="/Invoices" component={Invoices}/>
            <DefaultLayout path="/createMachine" component={CreateMachinePage}/>
            <DefaultLayout path="/snapshotList" component={SnapshotList}/>
            <DefaultLayout path="/Tickets" component={TicketList}/>
            <DefaultLayout path="/ChangePassword" component={ChangePassword}/>
            <DefaultLayout path="/profile" component={ProfileValidation}/>
            <DefaultLayout path="/SshKeyList" component={SshKeyList}/>
            <DefaultLayout path="/SshKeyAdd" component={SshKeyAdd}/>
            <DefaultLayout path="/SshKeyEdit/:id" component={SshKeyEdit}/>
            <DefaultLayout path="/NewTicket" component={NewTicket}/>
            <DefaultLayout path="/Limits" component={Limits}/>
            <Route path="/ResetPassword" component={ResetPassword}/>
            <DefaultLayout path="/TicketDetails/:id" component={TicketDetails}/>
            <Route path="/ForgetPassword" component={ForgetPassword}/>
            <Route path="/Verify" component={Verify}/>
            <Route path="/LoginWithGoogle" component={LoginWithGoogle}/>
            <DefaultLayout path="/Notifications" component={Notifications}/>
            <DefaultLayout path="/MachineSnapshotList/:id" component={ServerSnapshotsList}/>
            <DefaultLayout path="/servers/:id" component={ServerList}/>
            <DefaultLayout path="/server/:id" component={ServerDetailsMenu}/>
            <DefaultLayout path="/ImagesList" component={ImagesList}/>
            <DefaultLayout path="/ImageAdd" component={ImageAdd}/>
            <DefaultLayout path="/ImageEdit/:id" component={ImageEdit}/>
            <DefaultLayout path="/PlansList" component={PlansList}/>
            <DefaultLayout path="/PlanAdd" component={PlanAdd}/>
            <DefaultLayout path="/PlanEdit/:id" component={PlanEdit}/>
            <DefaultLayout path="/UsersList" component={UsersList}/>
            <DefaultLayout path="/UserAdd" component={UserAdd}/>
            <DefaultLayout path="/ChangeUserLimit/:id" component={ChangeUserLimit}/>
            <DefaultLayout path="/ChangeUserRole/:id" component={ChangeUserRole}/>
            <DefaultLayout path="/UserProfile/:id" component={UserProfile}/>
            <DefaultLayout path="/UserLimitList" component={UserLimitList}/>
            <DefaultLayout path="/UserLimitAdd" component={UserLimitAdd}/>
            <DefaultLayout path="/UserLimitEdit/:id" component={UserLimitEdit}/>
            <DefaultLayout path="/RolesList" component={RolesList}/>
            <DefaultLayout path="/RoleAdd" component={RoleAdd}/>
            <DefaultLayout path="/RoleEdit/:id" component={RoleEdit}/>
            <Route component={Notfound}/>
            </Switch>
        </div>
    </Router>
);
ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

