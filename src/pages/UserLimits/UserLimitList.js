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
import {api_base, userLimitList} from "../../Api";
import MessageBox from "../MessageBox";
import {Box} from "@material-ui/core";
import swal from "sweetalert";
import Alert from "@material-ui/lab/Alert/Alert";
import Pagination from "@material-ui/lab/Pagination";
import StarIcon from '@material-ui/icons/Star';

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


export default function UserLimitList() {
    const [items, setItems] = React.useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [response, setResponse] = React.useState([]);
    const [count, setCount] = React.useState(0);
    const [page, setPage] = React.useState(1);

    const handleClick = event => {
        setAnchorEl(event.currentTarget)
    };

    const handleClose = event => {
        setAnchorEl(null)
    };

    React.useEffect(() => {
        loadUserLimits();
    }, [page])

    function loadUserLimits() {
        axios.get(api_base + userLimitList)
            .then(res => {
                const items = res.data.pagination.data;

                setItems(items)
                setCount(res.data.pagination.last_page);
            })
    }

    function handleChangePagination(event, newPage) {
        setPage(newPage);
    }

    const removeUserLimit = (id,name) => {
        swal("آیا از حذف محدودیت کاربری "+name+" اطمینان دارید؟", {
            dangerMode: true,
            buttons: true,
            icon: "warning",
        }).then(function (isConfirm) {
            if (isConfirm) {
                axios.delete(api_base + 'user_limits/' + id.toString() + '/remove')
                    .then(res => {
                        setResponse(res.data)
                        loadUserLimits();
                    })
            }
        });
    }

    function setAsDefault(id){
        axios.put(api_base + 'user_limits/' + id.toString() + '/setAsDefault')
            .then(res => {
                setResponse(res.data)
                loadUserLimits()
            })
    }

    return (
        <div>

            <Grid item xs={12} container>

                <Paper style={{padding: 10}}>
                    <Box>
                        <Grid container>
                            <Grid item xs={8} md={10}>
                                <h2>
                                    محدودیت های کاربری
                                </h2>
                            </Grid>
                            <Grid item xs={4} md={2}>
                                {sessionStorage.getItem('permissions').includes("Add User Limits") &&
                                <Button href={'/UserLimitAdd'} variant="contained" color="primary">
                                    <AddIcon/>
                                    افزودن
                                </Button>
                                }
                            </Grid>
                        </Grid>

                        <p>
                            گروه های کاربری به شما امکان می دهند که برای کاربران مختلف محدودیت های مختلف تعیین کنید.
                        </p>

                        <TableContainer component={Paper}
                                        style={(items.length === 0) ? {display: 'none'} : {display: 'block'}}>
                            <Table aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell align="right">#</StyledTableCell>
                                        <StyledTableCell align="right">نام</StyledTableCell>
                                        <StyledTableCell align="right">حداکثر سرور</StyledTableCell>
                                        <StyledTableCell align="right">حداکثر تصویر آنی</StyledTableCell>
                                        <StyledTableCell align="right">حداکثر volume</StyledTableCell>
                                        <StyledTableCell align="right">پیش فرض</StyledTableCell>
                                        <StyledTableCell align="right">&nbsp;</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {items.map((row,i) => (
                                        <StyledTableRow key={i}>
                                            <StyledTableCell align="right">
                                                {row.id}
                                            </StyledTableCell>

                                            <StyledTableCell align="right" component="th" scope="row">
                                                {row.name}
                                            </StyledTableCell>

                                            <StyledTableCell align="right" component="th" scope="row">
                                                {row.max_machines}
                                            </StyledTableCell>

                                            <StyledTableCell align="right" component="th" scope="row">
                                                {row.max_snapshots}
                                            </StyledTableCell>

                                            <StyledTableCell align="right" component="th" scope="row">
                                                {row.max_volumes_usage} GB
                                            </StyledTableCell>

                                            <StyledTableCell align="right" component="th" scope="row">
                                                {row.default === true &&
                                                    <StarIcon style={{color:'yellow'}} />
                                                }
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
                                                    {sessionStorage.getItem('permissions').includes("Edit User Limits") &&
                                                    <StyledMenuItem
                                                        onClick={() => setAsDefault(row.id)}>
                                                        <ListItemIcon>
                                                            <StarIcon fontSize="small"/>
                                                        </ListItemIcon>
                                                        <ListItemText primary="انتخاب بعنوان پیش فرض"/>
                                                    </StyledMenuItem>
                                                    }
                                                    {sessionStorage.getItem('permissions').includes("Edit User Limits") &&
                                                    <StyledMenuItem
                                                        onClick={() => window.location.href = '/UserLimitEdit/' + row.id}>
                                                        <ListItemIcon>
                                                        <EditIcon fontSize="small"/>
                                                        </ListItemIcon>
                                                        <ListItemText primary="ویرایش"/>
                                                        </StyledMenuItem>
                                                    }
                                                    {sessionStorage.getItem('permissions').includes("Remove User Limits") &&
                                                    <StyledMenuItem onClick={() => removeUserLimit(row.id,row.name)}>
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
                            هیچ محدودیت کاربری وجود ندارد
                        </Alert>
                        }
                    </Box>
                </Paper>
            </Grid>

            <MessageBox response={response}/>
        </div>

    )
}
