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
import {api_base, logout, NotificationPath} from "../Api";
import MessageBox from "./MessageBox";
import Echo from "laravel-echo"
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreIcon from '@material-ui/icons/MoreVert';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircle from '@material-ui/icons/AccountCircle';
import {mainListItems, secondaryListItems} from "./MenuItems";
import Grid from "@material-ui/core/Grid";
import clsx from 'clsx';


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

    const [unreadCount, setUnreadCount] = React.useState([]);

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
        axios.get(api_base + NotificationPath)
            .then(res => {
                setUnreadCount(res.data.unread_count)
            })
    }, []);


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
            <div className={classes.toolbar}/>
            <Divider/>
            <List>{mainListItems}</List>

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


                    <Grid item xs={3} sm={2} md={1} >
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
