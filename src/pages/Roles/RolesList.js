import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/AddBox';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import axios from 'axios';
import {api_base, rolesList} from "../../Api";
import MessageBox from "../MessageBox";
import {Box} from "@material-ui/core";
import swal from "sweetalert";
import Alert from "@material-ui/lab/Alert/Alert";
import Pagination from "@material-ui/lab/Pagination";
import {admin_title_postfix} from "../../consts";
import {StyledMenu, StyledMenuItem, StyledTableCell, StyledTableRow} from "../../StyledComponents";


export default function RolesList() {
    const [items, setItems] = React.useState([]);
    const [anchorEls, setAnchorEls] = React.useState([]);
    const [response, setResponse] = React.useState([]);
    const [count, setCount] = React.useState(0);
    const [page, setPage] = React.useState(1);
    const JDate = require('jalali-date');


    const handleClick = (id, event) => {
        let newArr = [...anchorEls];
        newArr[id] = event.currentTarget;
        setAnchorEls(newArr);
    };

    const handleClose = (id, event) => {
        let newArr = [...anchorEls];
        newArr[id] = null;

        setAnchorEls(newArr);
    };

    React.useEffect(() => {
        loadRoles();
    }, [page])

    function loadRoles() {
        axios.get(api_base + rolesList)
            .then(res => {
                const items = res.data.pagination.data;

                setItems(items)
                setCount(res.data.pagination.last_page);
            })
    }

    function handleChangePagination(event, newPage) {
        setPage(newPage);
    }

    const removeRole = (id, name) => {
        swal("آیا از حذف نقش کاربری " + name + " اطمینان دارید؟", {
            dangerMode: true,
            buttons: true,
            icon: "warning",
        }).then(function (isConfirm) {
            if (isConfirm) {
                axios.delete(api_base + 'roles/' + id.toString() + '/remove')
                    .then(res => {
                        setResponse(res.data)
                        loadRoles();
                    })
            }
        });
    }

    return (
        <div>
            <title>لیست نقش های کاربری{admin_title_postfix}</title>

            <Grid container>
                <Grid item xs={12}>
                    <Paper>
                        <Box p={1}>
                            <Grid container>
                                <Grid item xs={10}>
                                    <h2>
                                        نقش های کاربری سیستم
                                    </h2>
                                </Grid>
                                <Grid item xs={2}>
                                    {(sessionStorage.getItem('permissions') && sessionStorage.getItem('permissions').includes("Add Roles")) &&
                                    <Button href={'/RoleAdd'} variant="contained" color="primary">
                                        <AddIcon/>
                                        افزودن
                                    </Button>
                                    }
                                </Grid>
                            </Grid>


                            <p>
                                نقش های مختلف به شما اجازه می دهد که اختیارات قابل تقویض به کاربران را در دسته های
                                معنادار
                                گروه بندی کنید
                            </p>

                            <TableContainer component={Paper}
                                            style={(items.length === 0) ? {display: 'none'} : {display: 'block'}}>
                                <Table aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell align="right">#</StyledTableCell>
                                            <StyledTableCell align="right">نام</StyledTableCell>
                                            <StyledTableCell align="right">تاریخ ایجاد</StyledTableCell>
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
                                                    {row.name}
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
                                                        onClick={(e) => handleClick(row.id, e)}
                                                    >
                                                        <MoreVertIcon/>
                                                    </IconButton>
                                                    <StyledMenu
                                                        id="customized-menu"
                                                        anchorEl={anchorEls[row.id]}
                                                        keepMounted
                                                        open={Boolean(anchorEls[row.id])}
                                                        onClose={(e) => handleClose(row.id, e)}
                                                    >
                                                        {(sessionStorage.getItem('permissions') && sessionStorage.getItem('permissions').includes("Edit Roles")) &&
                                                        <StyledMenuItem
                                                            onClick={() => window.location.href = '/RoleEdit/' + row.id}>
                                                            <ListItemIcon>
                                                                <EditIcon fontSize="small"/>
                                                            </ListItemIcon>
                                                            <ListItemText primary="ویرایش"/>
                                                        </StyledMenuItem>
                                                        }
                                                        {(sessionStorage.getItem('permissions') && sessionStorage.getItem('permissions').includes("Remove Roles")) &&
                                                        <StyledMenuItem onClick={() => removeRole(row.id, row.name)}>
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
                                نقش وجود ندارد
                            </Alert>
                            }
                        </Box>
                    </Paper>
                </Grid>
            </Grid>

            <MessageBox response={response}/>
        </div>

    )
}
