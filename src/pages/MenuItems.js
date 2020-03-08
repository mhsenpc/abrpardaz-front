import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import LayersIcon from '@material-ui/icons/Layers';
import DnsIcon from '@material-ui/icons/Dns';
import BackupIcon from '@material-ui/icons/Backup';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import HelpIcon from '@material-ui/icons/Help';
import Divider from "@material-ui/core/Divider";
import HeadsetMicIcon from '@material-ui/icons/HeadsetMic';

export const mainListItems = (
    <div>
        <ListItem style={{textAlign: 'right'}} button component="a" href="/">
            <ListItemIcon>
                <DashboardIcon/>
            </ListItemIcon>
            <ListItemText primary="داشبورد"/>
        </ListItem>
        <ListItem style={{textAlign: 'right'}} button component="a" href="/ProjectsList">
            <ListItemIcon>
                <DnsIcon/>
            </ListItemIcon>
            <ListItemText primary="سرورهای من"/>
        </ListItem>

        <ListItem style={{textAlign: 'right'}} button component="a" href="/snapshotList">
            <ListItemIcon>
                <BackupIcon/>
            </ListItemIcon>
            <ListItemText primary="تصاویر آنی"/>
        </ListItem>

        <ListItem style={{textAlign: 'right'}} button component="a" href="/Sshkeylist">
            <ListItemIcon>
                <VpnKeyIcon/>
            </ListItemIcon>
            <ListItemText primary="کلیدهای امنیتی"/>
        </ListItem>
        <ListItem style={{textAlign: 'right'}} button component="a" href="/Invoices">
            <ListItemIcon>
                <AttachMoneyIcon/>
            </ListItemIcon>
            <ListItemText primary="امور مالی"/>
        </ListItem>
        <Divider/>
        <ListItem style={{textAlign: 'right'}} button component="a" href="/faq">
            <ListItemIcon>
                <HelpIcon/>
            </ListItemIcon>
            <ListItemText primary="پرسش و پاسخ"/>
        </ListItem>
        <ListItem style={{textAlign: 'right'}} button component="a" href="/tickets">
            <ListItemIcon>
                <HeadsetMicIcon/>
            </ListItemIcon>
            <ListItemText primary="پشتیبانی"/>
        </ListItem>

        {sessionStorage.getItem('permissions') && sessionStorage.getItem('permissions').includes("List Users") &&
        <ListItem style={{textAlign: 'right'}} button component="a" href="/UsersList">
            <ListItemIcon>
                <LayersIcon/>
            </ListItemIcon>
            <ListItemText primary="مدیریت کاربران"/>
        </ListItem>
        }
    </div>
);


export const secondaryListItems = ([
    {'title': 'حساب کاربری', 'url': '/profile'},
    {'title': 'تغییر رمز عبور', 'url': '/changePassword'},
    {'title': 'محدودیت ها', 'url': '/Limits'}
])