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
import {api_base, imagesList, syncImagesPath} from "../../Api";
import MessageBox from "../MessageBox";
import {Box, makeStyles} from "@material-ui/core";
import swal from "sweetalert";
import Alert from "@material-ui/lab/Alert/Alert";
import Pagination from "@material-ui/lab/Pagination";
import SimpleModal from "../SimpleModal";
import CachedIcon from '@material-ui/icons/Cached';

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

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 700,
        marginTop: 12

    },
}));


export default function ImagesList() {
    const [items, setItems] = React.useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [response, setResponse] = React.useState([]);
    const [count, setCount] = React.useState(0);
    const [page, setPage] = React.useState(1);
    const [open, setOpen] = React.useState(false);
    const [syncResult, setSyncResult] = React.useState('Loading...');

    const handleClick = event => {
        setAnchorEl(event.currentTarget)
    };

    const handleClose = event => {
        setAnchorEl(null)
    };

    React.useEffect(() => {
        loadImages();
    }, [page])

    function loadImages() {
        axios.get(api_base + imagesList)
            .then(res => {
                const items = res.data.pagination.data;

                setItems(items)
                setCount(res.data.pagination.last_page);
            })
    }

    function handleChangePagination(event, newPage) {
        setPage(newPage);
    }

    const removeImage = (id,name) => {
        swal("آیا از حذف "+name+" اطمینان دارید؟", {
            dangerMode: true,
            buttons: true,
            icon: "warning",
        }).then(function (isConfirm) {
            if (isConfirm) {
                axios.delete(api_base + 'images/' + id.toString() + '/remove')
                    .then(res => {
                        setResponse(res.data)
                        loadImages();
                    })
            }
        });
    }

    function syncImages(){
        setOpen(true)
        setSyncResult("Loading...")
        axios.put(api_base + syncImagesPath)
            .then(res => {
                setSyncResult(res.data.message)
                loadImages()
            })
    }

    return (
        <div>

            <Grid item xs={12} container>

                <Paper className={useStyles.paper} style={{padding: 10}}>
                    <Box>
                        <Grid container>
                            <Grid item xs={8}>
                                <h2>
                                    تصاویر قابل نصب
                                </h2>
                            </Grid>
                            <Grid item xs={4}>
                                {sessionStorage.getItem('permissions').includes("Add Images") &&
                                <Button href={'/ImageAdd'} variant="contained" color="primary">
                                    <AddIcon/>
                                    افزودن
                                </Button>
                                }
                                {sessionStorage.getItem('permissions').includes("Sync Images") &&
                                <Button onClick={syncImages} variant="contained" color="default">
                                    <CachedIcon/>
                                    همسان سازی
                                </Button>
                                }
                            </Grid>
                        </Grid>


                        <p>
                            روش استاندارد افزودن تصویر با استفاده از دکمه همگام سازی است. هر چند که می توانید اطلاعات
                            تصاویر موجود را تغییر دهید
                        </p>
                        <p>
                            توجه کنید که تغییر در این صفحه به معنی تغییر اطلاعات در اوپن استک نمی باشد
                        </p>

                        <TableContainer component={Paper}
                                        style={(items.length === 0) ? {display: 'none'} : {display: 'block'}}>
                            <Table aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell align="right">#</StyledTableCell>
                                        <StyledTableCell align="right">remote_id</StyledTableCell>
                                        <StyledTableCell align="right">نام</StyledTableCell>
                                        <StyledTableCell align="right">نسخه</StyledTableCell>
                                        <StyledTableCell align="right">حداقل دیسک</StyledTableCell>
                                        <StyledTableCell align="right">حداقل رم</StyledTableCell>
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
                                                {row.remote_id}
                                            </StyledTableCell>

                                            <StyledTableCell align="right" component="th" scope="row">
                                                {row.name}
                                            </StyledTableCell>

                                            <StyledTableCell align="right" component="th" scope="row">
                                                {row.version}
                                            </StyledTableCell>

                                            <StyledTableCell align="right" component="th" scope="row">
                                                {row.min_disk} GB
                                            </StyledTableCell>

                                            <StyledTableCell align="right" component="th" scope="row">
                                                {row.min_ram} GB
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
                                                    {sessionStorage.getItem('permissions').includes("Edit Images") &&
                                                    <StyledMenuItem
                                                        onClick={() => window.location.href = '/ImageEdit/' + row.id}>
                                                        <ListItemIcon>
                                                            <EditIcon fontSize="small"/>
                                                        </ListItemIcon>
                                                        <ListItemText primary="ویرایش"/>
                                                    </StyledMenuItem>
                                                    }
                                                    {sessionStorage.getItem('permissions').includes("Remove Images") &&
                                                    <StyledMenuItem onClick={() => removeImage(row.id,row.name)}>
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
                            شما هنوز هیچ تصویری نساخته اید
                        </Alert>
                        }
                    </Box>
                </Paper>
            </Grid>

            <SimpleModal open={open} setOpen={setOpen}>
                <div className="content" dangerouslySetInnerHTML={{__html: syncResult}}></div>
            </SimpleModal>

            <MessageBox response={response}/>
        </div>

    )
}
