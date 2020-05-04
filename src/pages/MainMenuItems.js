import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
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

export default function MainMenuItems(props) {
    return (
        <div>
            <ListItem style={{textAlign: 'right'}} button component="a" href="/">
                <ListItemIcon className={'iconItem'}>
                    <DashboardIcon/>
                </ListItemIcon>
                {props.drawerFullWidth &&
                <ListItemText primary="داشبورد"/>
                }
            </ListItem>
            <ListItem style={{textAlign: 'right'}} button component="a" href="/ProjectsList">
                <ListItemIcon className={'iconItem'}>
                    <DnsIcon/>
                </ListItemIcon>
                {props.drawerFullWidth &&
                <ListItemText primary="سرورهای من"/>
                }
            </ListItem>

            <ListItem style={{textAlign: 'right'}} button component="a" href="/snapshotList">
                <ListItemIcon className={'iconItem'}>
                    <BackupIcon/>
                </ListItemIcon>
                {props.drawerFullWidth &&
                <ListItemText primary="تصاویر آنی"/>
                }
            </ListItem>

            <ListItem style={{textAlign: 'right'}} button component="a" href="/Sshkeylist">
                <ListItemIcon className={'iconItem'}>
                    <VpnKeyIcon/>
                </ListItemIcon>
                {props.drawerFullWidth &&
                <ListItemText primary="کلیدهای امنیتی"/>
                }
            </ListItem>
            <ListItem style={{textAlign: 'right'}} button component="a" href="/Invoices">
                <ListItemIcon className={'iconItem'}>
                    <AttachMoneyIcon/>
                </ListItemIcon>
                {props.drawerFullWidth &&
                <ListItemText primary="امور مالی"/>
                }
            </ListItem>
            <Divider/>
            <ListItem style={{textAlign: 'right'}} button component="a" href="/tickets">
                <ListItemIcon className={'iconItem'}>
                    <HeadsetMicIcon/>
                </ListItemIcon>
                {props.drawerFullWidth &&
                <ListItemText primary="پشتیبانی"/>
                }
            </ListItem>

            {(localStorage.getItem('permissions') && localStorage.getItem('permissions').includes("List Users")) &&
            <ListItem style={{textAlign: 'right'}} button component="a" href="/UsersList">
                <ListItemIcon className={'iconItem'}>
                    <PeopleIcon/>
                </ListItemIcon>
                {props.drawerFullWidth &&
                <ListItemText primary="کاربران"/>
                }
            </ListItem>
            }

            {(localStorage.getItem('permissions') && localStorage.getItem('permissions').includes("Manage Images")) &&
            <ListItem style={{textAlign: 'right'}} button component="a" href="/ImagesList">
                <ListItemIcon className={'iconItem'}>
                    <ImageIcon/>
                </ListItemIcon>
                {props.drawerFullWidth &&
                <ListItemText primary="تصاویر"/>
                }
            </ListItem>
            }


            {(localStorage.getItem('permissions') && localStorage.getItem('permissions').includes("Manage Plans")) &&
            <ListItem style={{textAlign: 'right'}} button component="a" href="/PlansList">
                <ListItemIcon className={'iconItem'}>
                    <SettingsEthernetIcon/>
                </ListItemIcon>
                {props.drawerFullWidth &&
                <ListItemText primary="پلن ها"/>
                }
            </ListItem>
            }

            {(localStorage.getItem('permissions') && localStorage.getItem('permissions').includes("List User Limits")) &&
            <ListItem style={{textAlign: 'right'}} button component="a" href="/UserLimitList">
                <ListItemIcon className={'iconItem'}>
                    <ListIcon/>
                </ListItemIcon>
                {props.drawerFullWidth &&
                <ListItemText primary="محدودیت ها"/>
                }
            </ListItem>
            }

            {(localStorage.getItem('permissions') && localStorage.getItem('permissions').includes("List Roles")) &&
            <ListItem style={{textAlign: 'right'}} button component="a" href="/RolesList">
                <ListItemIcon className={'iconItem'}>
                    <SupervisedUserCircleIcon/>
                </ListItemIcon>
                {props.drawerFullWidth &&
                <ListItemText primary="نقش ها"/>
                }
            </ListItem>
            }

        </div>
    )
}