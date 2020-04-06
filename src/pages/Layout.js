import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import axios from "axios";
import {api_base, broadcasting_base, getUserInfo, logout} from "../Api";
import MessageBox from "./MessageBox";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreIcon from '@material-ui/icons/MoreVert';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Grid from "@material-ui/core/Grid";
import clsx from 'clsx';
import Avatar from "@material-ui/core/Avatar";
import Gravatar from "react-gravatar";
import {secondaryListItems} from "./secondaryListItems";
import MainMenuItems from "./MainMenuItems";
import swal from "sweetalert";
import Echo from "laravel-echo";


let drawerWidth = 151;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            whiteSpace: 'nowrap',
            width: drawerWidth,
            flexShrink: 0
        },
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        [theme.breakpoints.up('sm')]: {
            //width: `calc(100% - ${drawerWidth}px)`,
            //marginLeft: drawerWidth,
        },
    },
    appBarShift: {
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'right',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(1),
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },

}));

function Layout(props) {
    const {container} = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const [drawerFullWidth, setDrawerFullWidth] = React.useState(true);

    const [unreadCount, setUnreadCount] = React.useState(0);
    const [user, setUser] = React.useState(0);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = event => {
        setMobileMoreAnchorEl(event.currentTarget);
    };


    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            id={menuId}
            keepMounted
            transformOrigin={{vertical: 'top', horizontal: 'right'}}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <div className={classes.sectionDesktop}>
                <center style={{margin: 2}}>
                    <Avatar className={classes.large}>
                        <Gravatar email={user.email}/>
                    </Avatar>
                    {user.email}
                </center>
            </div>
            {secondaryListItems.map(row => (
                <MenuItem key={row.url} component="a" href={row.url} onClick={handleMenuClose}>{row.title}</MenuItem>
            ))}

            <MenuItem component="a" onClick={() => {
                requestLogout();
                handleMenuClose();
            }}>خروج</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{vertical: 'top', horizontal: 'right'}}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            {secondaryListItems.map(row => (
                <MenuItem key={row.url} component="a" href={row.url} onClick={handleMenuClose}>{row.title}</MenuItem>
            ))}

            <MenuItem onClick={() => {
                requestLogout();
                handleMenuClose();
            }}>خروج</MenuItem>
        </Menu>
    );

    const [response, setResponse] = React.useState([]);


    React.useEffect(() => {
        axios.get(api_base + getUserInfo)
            .then(res => {
                setUnreadCount(res.data.notifications)
                setUser(res.data.user)
            });
        waitForPushMessages();
    }, []);

    function waitForPushMessages() {
        let token = atob(sessionStorage.getItem("token"));
        if (!token)
            return;

        window.Echo = new Echo({
            broadcaster: 'pusher',
            key: '95c0537be9f255c6a252',
            cluster: 'ap3',
            forceTLS: true,
            authEndpoint: broadcasting_base,
            auth: {
                headers: {
                    Authorization: 'Bearer ' + token
                },
            },
        });

        let user_id;
        if (sessionStorage.getItem('user_id'))
            user_id = sessionStorage.getItem('user_id');

        if (user_id) {
            var channel1 = window.Echo.channel('private-user-' + user_id);
            channel1.listen('.snapshot.created', function (data) {
                swal("تصویر آنی شما با نام " + data.snapshot_name + " با موفقیت ایجاد گردید", "", "success");
            });

            var channel2 = window.Echo.channel('private-user-' + user_id);
            channel2.listen('.server.created', function (data) {
                swal("سرور شما با نام " + data.machine_name + " با موفقیت ایجاد گردید", "", "success");
            });
        }
    }


    function requestLogout() {
        axios.put(api_base + logout)
            .then(res => {
                setResponse(res.data)

                setTimeout(function () {
                    if (res.data.success) {
                        localStorage.removeItem('token');
                        sessionStorage.removeItem("token");
                        window.location.href = '/login';
                    }
                }, 1000);
            })
    }


    const drawer = (
        <div>
            <div className={classes.toolbar + ' ' + classes.sectionDesktop}/>
            <div className={classes.sectionMobile}>
                <center style={{margin: 2}}>
                    <Avatar className={classes.large}>
                        <Gravatar email={user.email}/>
                    </Avatar>
                    {user.email}
                </center>
            </div>
            <Divider/>
            <List><MainMenuItems drawerFullWidth={drawerFullWidth}/></List>

        </div>
    );

    return (
        <div dir={"rtl"} className={classes.root}>
            <CssBaseline/>
            <AppBar position="fixed"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: drawerFullWidth,
                    })}>
                <Toolbar>
                    <Grid item xs={9} sm={10} md={11}>
                        <Typography variant="h6" noWrap>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                edge="start"
                                onClick={handleDrawerToggle}
                                className={classes.menuButton}
                            >
                                <MenuIcon/>
                            </IconButton>
                            ابر پرداز
                        </Typography>
                    </Grid>


                    <Grid item xs={3} sm={2} md={1}>
                        <div className={classes.sectionDesktop}>
                            <IconButton color="inherit" href={"/Notifications"}>
                                <Badge badgeContent={unreadCount} color="secondary">
                                    <NotificationsIcon/>
                                </Badge>
                            </IconButton>
                            <IconButton
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                            >
                                <AccountCircle/>
                            </IconButton>
                        </div>
                        <div className={classes.sectionMobile}>
                            <IconButton color="inherit" href={"/Notifications"}>
                                <Badge badgeContent={unreadCount} color="secondary">
                                    <NotificationsIcon/>
                                </Badge>
                            </IconButton>
                            <IconButton
                                aria-label="show more"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                color="inherit"
                            >
                                <MoreIcon/>
                            </IconButton>
                        </div>

                    </Grid>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}

            <nav>
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        variant="permanent"
                        className={clsx(classes.drawer, {
                            [classes.drawerOpen]: drawerFullWidth,
                            [classes.drawerClose]: !drawerFullWidth,
                        })}
                        classes={{
                            paper: clsx({
                                [classes.drawerOpen]: drawerFullWidth,
                                [classes.drawerClose]: !drawerFullWidth,
                            }),
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                <div className={classes.toolbar}/>
                {React.cloneElement(props.children, {setDrawerFullWidth: setDrawerFullWidth})}
            </main>
            <MessageBox response={response}/>
        </div>
    );
}

export default Layout;
