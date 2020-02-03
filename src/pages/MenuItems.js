import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Divider from "@material-ui/core/Divider";
import ProjectsList from "./ProjectsList";

export const mainListItems = (
    <div>
        <ListItem button component="a" href="/">
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="داشبورد" />
        </ListItem>
        <ListItem button component="a" href="/ProjectsList">
            <ListItemIcon>
                <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="سرورهای من" />
        </ListItem>

        <ListItem button component="a" href="/snapshotList">
            <ListItemIcon>
                <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="تصاویر آنی" />
        </ListItem>

        <ListItem button component="a" href="/Sshkeylist">
            <ListItemIcon>
                <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="کلیدهای امنیتی" />
        </ListItem>
        <ListItem button component="a" href="/Invoices">
            <ListItemIcon>
                <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="امور مالی" />
        </ListItem>
        <Divider/>
        <ListItem button component="a" href="/faq">
            <ListItemIcon>
                <LayersIcon />
            </ListItemIcon>
            <ListItemText primary="پرسش و پاسخ" />
        </ListItem>
        <ListItem button component="a" href="/tickets">
            <ListItemIcon>
                <LayersIcon />
            </ListItemIcon>
            <ListItemText primary="پشتیبانی" />
        </ListItem>
    </div>
);
