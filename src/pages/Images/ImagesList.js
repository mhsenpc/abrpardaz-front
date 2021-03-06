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
import {api_base, imagesList, syncImagesPath} from "../../Api";
import MessageBox from "../MessageBox";
import {Box} from "@material-ui/core";
import swal from "sweetalert";
import Alert from "@material-ui/lab/Alert/Alert";
import Pagination from "@material-ui/lab/Pagination";
import SimpleModal from "../SimpleModal";
import CachedIcon from '@material-ui/icons/Cached';
import {admin_title_postfix} from "../../consts";
import {StyledMenu, StyledMenuItem, StyledTableCell, StyledTableRow} from "../../StyledComponents";

export default function ImagesList() {
    const [items, setItems] = React.useState([]);
    const [anchorEls, setAnchorEls] = React.useState([]);
    const [response, setResponse] = React.useState([]);
    const [count, setCount] = React.useState(0);
    const [page, setPage] = React.useState(1);
    const [open, setOpen] = React.useState(false);
    const [syncResult, setSyncResult] = React.useState('Loading...');

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

    const removeImage = (id, name) => {
        swal("?????? ???? ?????? " + name + " ?????????????? ????????????", {
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

    function syncImages() {
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
            <title>???????? ????????????{admin_title_postfix}</title>

            <Grid container>
                <Grid item xs={12}>

                    <Paper>
                        <Box p={1}>
                            <Grid container>
                                <Grid item xs={9}>
                                    <h2>
                                        ???????????? ???????? ??????
                                    </h2>
                                </Grid>
                                <Grid item xs={3}>
                                    {(localStorage.getItem('permissions') && localStorage.getItem('permissions').includes("Add Images")) &&
                                    <Button href={'/ImageAdd'} variant="contained" color="primary">
                                        <AddIcon/>
                                        ????????????
                                    </Button>
                                    }
                                    &nbsp;
                                    {(localStorage.getItem('permissions') && localStorage.getItem('permissions').includes("Sync Images")) &&
                                    <Button onClick={syncImages} variant="contained" color="default">
                                        <CachedIcon/>
                                        ?????????? ????????
                                    </Button>
                                    }
                                </Grid>
                            </Grid>


                            <p>
                                ?????? ?????????????????? ???????????? ?????????? ???? ?????????????? ???? ???????? ?????????? ???????? ??????. ???? ?????? ???? ???? ????????????
                                ??????????????
                                ???????????? ?????????? ???? ?????????? ????????
                            </p>
                            <p>
                                ???????? ???????? ???? ?????????? ???? ?????? ???????? ???? ???????? ?????????? ?????????????? ???? ???????? ???????? ?????? ????????
                            </p>

                            <TableContainer component={Paper}
                                            style={(items.length === 0) ? {display: 'none'} : {display: 'block'}}>
                                <Table aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell align="right">#</StyledTableCell>
                                            <StyledTableCell align="right">remote_id</StyledTableCell>
                                            <StyledTableCell align="right">??????</StyledTableCell>
                                            <StyledTableCell align="right">????????</StyledTableCell>
                                            <StyledTableCell align="right">?????????? ????????</StyledTableCell>
                                            <StyledTableCell align="right">?????????? ????</StyledTableCell>
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
                                                        {(localStorage.getItem('permissions') && localStorage.getItem('permissions').includes("Edit Images")) &&
                                                        <StyledMenuItem
                                                            onClick={() => window.location.href = '/ImageEdit/' + row.id}>
                                                            <ListItemIcon>
                                                                <EditIcon fontSize="small"/>
                                                            </ListItemIcon>
                                                            <ListItemText primary="????????????"/>
                                                        </StyledMenuItem>
                                                        }
                                                        {(localStorage.getItem('permissions') && localStorage.getItem('permissions').includes("Remove Images")) &&
                                                        <StyledMenuItem onClick={() => removeImage(row.id, row.name)}>
                                                            <ListItemIcon>
                                                                <DeleteIcon fontSize="small"/>
                                                            </ListItemIcon>
                                                            <ListItemText primary="??????"/>
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
                                ?????? ???????? ?????? ???????????? ???????????? ??????
                            </Alert>
                            }
                        </Box>
                    </Paper>
                </Grid>
            </Grid>

            <SimpleModal open={open} setOpen={setOpen}>
                <div className="content" dangerouslySetInnerHTML={{__html: syncResult}}></div>
            </SimpleModal>

            <MessageBox response={response}/>
        </div>

    )
}
