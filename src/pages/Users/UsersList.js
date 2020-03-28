import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/AddBox';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {createStyles, Theme, withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import axios from 'axios';
import {activateUserPath, api_base, deactivateUserPath, usersList} from "../../Api";
import MessageBox from "../MessageBox";
import {Box, makeStyles} from "@material-ui/core";
import swal from "sweetalert";
import Alert from "@material-ui/lab/Alert/Alert";
import Pagination from "@material-ui/lab/Pagination";
import AssignmentIcon from '@material-ui/icons/Assignment';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';

const StyledTableCell = withStyles((theme: Theme) =>
    createStyles({
        margin: {
            marginTop: 25
        },
        head: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        body: {
            fontSize: 14,
        },
    }),
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
    createStyles({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.background.default,
            },
        },
    }),
)(TableRow);


const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})(props => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles(theme => ({
    root: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);

const paperStyle = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            margin: 'auto',
            maxWidth: 700,
            marginTop: 12

        },
    }),
);

export default function UsersList() {
    const [items, setItems] = React.useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [response, setResponse] = React.useState([]);
    const [count, setCount] = React.useState(0);
    const [page, setPage] = React.useState(1);
    const JDate = require('jalali-date');

    const handleClick = event => {
        setAnchorEl(event.currentTarget)
    };

    const handleClose = event => {
        setAnchorEl(null)
    };

    React.useEffect(() => {
        loadUsers();
    }, [page])

    function loadUsers() {
        axios.get(api_base + usersList)
            .then(res => {
                const items = res.data.pagination.data;

                setItems(items)
                setCount(res.data.pagination.last_page);
            })
    }

    function handleChangePagination(event, newPage) {
        setPage(newPage);
    }

    const removeUser =( id,email )=> {
        swal("آیا از حذف " + email +" اطمینان دارید؟", {
            dangerMode: true,
            buttons: true,
            icon: "warning",
        }).then(function (isConfirm) {
            if (isConfirm) {
                axios.delete(api_base + 'users/' + id.toString() + '/remove')
                    .then(res => {
                        setResponse(res.data)
                        loadUsers();
                    })
            }
        });
    }

    function unsuspendUser(id) {
        axios.put(api_base + 'users/' + id.toString() + '/unsuspend' )
            .then(res => {
                setResponse(res.data)
                loadUsers();
            })
    }

    function suspendUser(id) {
        axios.put(api_base + 'users/' + id.toString() + '/suspend' )
            .then(res => {
                setResponse(res.data)
                loadUsers();
            })
    }

    return (
        <div className={paperStyle.root}>

            <Grid item xs={12} container>
                <Paper className={paperStyle.paper} >
                    <Box p={1}>
                        <Grid container>
                            <Grid item xs={8} md={10}>
                                <h2>
                                    کاربران
                                </h2>
                            </Grid>
                            <Grid item xs={4} md={2}>
                                {sessionStorage.getItem('permissions').includes("Add Users") &&
                                <Button href={'/UserAdd'} variant="contained" color="primary">
                                    <AddIcon/>
                                    افزودن
                                </Button>
                                }
                            </Grid>
                        </Grid>


                        <p>
                            شما می توانید کاربران سیستم را در این صفحه مدیریت کنید
                        </p>

                        <TableContainer component={Paper}
                                        style={(items.length === 0) ? {display: 'none'} : {display: 'block'}}>
                            <Table aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell align="right">#</StyledTableCell>
                                        <StyledTableCell align="right">email</StyledTableCell>
                                        <StyledTableCell align="right">نام</StyledTableCell>
                                        <StyledTableCell align="right">نام خانوادگی</StyledTableCell>
                                        <StyledTableCell align="right">محدودیت</StyledTableCell>
                                        <StyledTableCell align="right">نقش</StyledTableCell>
                                        <StyledTableCell align="right">وضعیت</StyledTableCell>
                                        <StyledTableCell align="right">تاریخ ثبت</StyledTableCell>
                                        <StyledTableCell align="right">&nbsp;</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {items.map(row => (
                                        <StyledTableRow key={row.id}>
                                            <StyledTableCell align="right">
                                                {row.id}
                                            </StyledTableCell>

                                            <StyledTableCell align="right" component="th" scope="row">
                                                <a href={'/UserProfile/' + row.id}>
                                                {row.email}
                                                </a>
                                            </StyledTableCell>

                                            <StyledTableCell align="right" component="th" scope="row">
                                                {row.profile.first_name}
                                            </StyledTableCell>

                                            <StyledTableCell align="right" component="th" scope="row">
                                                {row.profile.last_name}
                                            </StyledTableCell>

                                            <StyledTableCell align="right" component="th" scope="row">
                                                {row.user_limit.name}
                                            </StyledTableCell>

                                            <StyledTableCell align="right" component="th" scope="row">
                                                {row.roles[0].name}
                                            </StyledTableCell>

                                            <StyledTableCell align="right" component="th" scope="row">
                                                {row.suspend === false &&
                                                <Alert severity="success" onClick={() => suspendUser(row.id)} style={{cursor:'pointer'}}>
                                                    فعال
                                                </Alert>
                                                }
                                                {row.suspend === true &&
                                                <Alert severity="error" onClick={() => unsuspendUser(row.id)} style={{cursor:'pointer'}}>
                                                    مسدود
                                                </Alert>
                                                }
                                            </StyledTableCell>

                                            <StyledTableCell align="right" component="th" scope="row">
                                                {(new JDate(new Date(row.created_at))).format('YYYY/MM/DD')}&nbsp;
                                                {new Date(row.created_at).toLocaleTimeString()}
                                            </StyledTableCell>

                                            <StyledTableCell align="right">
                                                <IconButton
                                                    aria-label="more"
                                                    aria-controls="long-menu"
                                                    aria-haspopup="true"
                                                    onClick={handleClick}
                                                >
                                                    <MoreVertIcon/>
                                                </IconButton>
                                                <StyledMenu
                                                    id="customized-menu"
                                                    anchorEl={anchorEl}
                                                    keepMounted
                                                    open={Boolean(anchorEl)}
                                                    onClose={handleClose}
                                                >
                                                    <StyledMenuItem
                                                        onClick={() => window.location.href = '/UserProfile/' + row.id}>
                                                        <ListItemIcon>
                                                            <AssignmentIndIcon fontSize="small"/>
                                                        </ListItemIcon>
                                                        <ListItemText primary="نمایش پروفایل"/>
                                                    </StyledMenuItem>
                                                    {sessionStorage.getItem('permissions').includes("Change User Limit") &&
                                                    <StyledMenuItem
                                                        onClick={() => window.location.href = '/ChangeUserLimit/' + row.id}>
                                                        <ListItemIcon>
                                                            <AssignmentIcon fontSize="small"/>
                                                        </ListItemIcon>
                                                        <ListItemText primary="تغییر محدودیت"/>
                                                    </StyledMenuItem>
                                                    }
                                                    {sessionStorage.getItem('permissions').includes("Change User Role") &&
                                                    <StyledMenuItem
                                                        onClick={() => window.location.href = '/ChangeUserRole/' + row.id}>
                                                        <ListItemIcon>
                                                            <AssignmentIcon fontSize="small"/>
                                                        </ListItemIcon>
                                                        <ListItemText primary="تغییر نقش کاربری"/>
                                                    </StyledMenuItem>
                                                    }
                                                    {sessionStorage.getItem('permissions').includes("Remove Users") &&
                                                    <StyledMenuItem onClick={() => removeUser(row.id,row.email)}>
                                                        <ListItemIcon>
                                                            <DeleteIcon fontSize="small"/>
                                                        </ListItemIcon>
                                                        <ListItemText primary="حذف"/>
                                                    </StyledMenuItem>
                                                    }
                                                </StyledMenu>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        {items.length > 0 &&
                        <Pagination page={page} count={count} onChange={handleChangePagination} color="primary"
                                    className={'ltr'}/>
                        }

                        {items.length === 0 &&
                        <Alert severity="warning">
                            کاربری وجود ندارد
                        </Alert>
                        }
                    </Box>
                </Paper>
            </Grid>

            <MessageBox response={response}/>
        </div>

    )
}
