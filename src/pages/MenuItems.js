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
import ImageIcon from '@material-ui/icons/Image';
import PeopleIcon from '@material-ui/icons/People';
import SettingsEthernetIcon from '@material-ui/icons/SettingsEthernet';
import ListIcon from '@material-ui/icons/List';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';

export const mainListItems = (
    <div>
        <ListItem style={{textAlign: 'right'}} button component="a" href="/">
            <ListItemIcon className={'iconItem'} >
                <DashboardIcon/>
            </ListItemIcon>
            <ListItemText primary="داشبورد"/>
        </ListItem>
        <ListItem style={{textAlign: 'right'}} button component="a" href="/ProjectsList">
            <ListItemIcon className={'iconItem'}>
                <DnsIcon/>
            </ListItemIcon>
            <ListItemText primary="سرورهای من"/>
        </ListItem>

        <ListItem style={{textAlign: 'right'}} button component="a" href="/snapshotList">
            <ListItemIcon className={'iconItem'}>
                <BackupIcon/>
            </ListItemIcon>
            <ListItemText primary="تصاویر آنی"/>
        </ListItem>

        <ListItem style={{textAlign: 'right'}} button component="a" href="/Sshkeylist">
            <ListItemIcon className={'iconItem'}>
                <VpnKeyIcon/>
            </ListItemIcon>
            <ListItemText primary="کلیدهای امنیتی"/>
        </ListItem>
        <ListItem style={{textAlign: 'right'}} button component="a" href="/Invoices">
            <ListItemIcon className={'iconItem'}>
                <AttachMoneyIcon/>
            </ListItemIcon>
            <ListItemText primary="امور مالی"/>
        </ListItem>
        <Divider/>
        <ListItem style={{textAlign: 'right'}} button component="a" href="/faq">
            <ListItemIcon className={'iconItem'}>
                <HelpIcon/>
            </ListItemIcon>
            <ListItemText primary="پرسش و پاسخ"/>
        </ListItem>
        <ListItem style={{textAlign: 'right'}} button component="a" href="/tickets">
            <ListItemIcon className={'iconItem'}>
                <HeadsetMicIcon/>
            </ListItemIcon>
            <ListItemText primary="پشتیبانی"/>
        </ListItem>

        {(sessionStorage.getItem('permissions') && sessionStorage.getItem('permissions').includes("List Users") ) &&
        <ListItem style={{textAlign: 'right'}} button component="a" href="/UsersList">
            <ListItemIcon className={'iconItem'}>
                <PeopleIcon/>
            </ListItemIcon>
            <ListItemText primary="کاربران"/>
        </ListItem>
        }

        {(sessionStorage.getItem('permissions') && sessionStorage.getItem('permissions').includes("List Images")) &&
        <ListItem style={{textAlign: 'right'}} button component="a" href="/ImagesList">
            <ListItemIcon className={'iconItem'}>
                <ImageIcon/>
            </ListItemIcon>
            <ListItemText primary="تصاویر"/>
        </ListItem>
        }


        {(sessionStorage.getItem('permissions') && sessionStorage.getItem('permissions').includes("List Plans")) &&
        <ListItem style={{textAlign: 'right'}} button component="a" href="/PlansList">
            <ListItemIcon className={'iconItem'}>
                <SettingsEthernetIcon/>
            </ListItemIcon>
            <ListItemText primary="پلن ها"/>
        </ListItem>
        }

        {(sessionStorage.getItem('permissions') && sessionStorage.getItem('permissions').includes("List User Groups")) &&
        <ListItem style={{textAlign: 'right'}} button component="a" href="/UserGroupList">
            <ListItemIcon className={'iconItem'}>
                <ListIcon/>
            </ListItemIcon>
            <ListItemText primary="محدودیت ها"/>
        </ListItem>
        }

        {(sessionStorage.getItem('permissions') &&sessionStorage.getItem('permissions').includes("List Roles")) &&
        <ListItem style={{textAlign: 'right'}} button component="a" href="/RolesList">
            <ListItemIcon className={'iconItem'}>
                <SupervisedUserCircleIcon/>
            </ListItemIcon>
            <ListItemText primary="نقش ها"/>
        </ListItem>
        }

    </div>
);


export const secondaryListItems = ([
    {'title': 'حساب کاربری', 'url': '/profile'},
    {'title': 'تغییر رمز عبور', 'url': '/changePassword'},
    {'title': 'محدودیت ها', 'url': '/Limits'}
])