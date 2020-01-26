import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {createStyles, makeStyles, Theme, withStyles} from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import axios from 'axios';
import {api_base, sshKeysList} from "../../Api";
import MessageBox from "../MessageBox";
import {Box} from "@material-ui/core";

const StyledTableCell = withStyles((theme: Theme) =>
    createStyles({
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


const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});


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


export default function SshkeyList() {
    const [items, setItems] = React.useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [response, setResponse] = React.useState([]);

    const handleClick = event => {
        setAnchorEl(event.currentTarget)
    };

    const handleClose = event => {
        setAnchorEl(null)
    };

    React.useEffect(() => {
        axios.get(api_base + sshKeysList)
            .then(res => {
                const items = res.data.list;

                setItems(items)
            })
    }, [])

    const removeSshKey = id => {
        axios.delete(api_base + 'SshKeys/' + id.toString() + '/remove'
        )
            .then(res => {
                setResponse(res.data)
            })
    }

    return (
        <div>

            <Grid item xs={12} container
                  direction="row"
                  justify="center"
                  alignItems="center">
                <Paper>
                    <Box>
                        <h1>
                            کلیدهای امنیتی
                        </h1>
                        <p>
                            استفاده از کلید امنیتی روشی برای احراز هویت شما به سرور است به طوری که بسیار امن تر و آسان تر از روش سنتی احراز هویت از طریق رمز عبور می باشد
                        </p>

                        <Button href={'/SshKeyAdd'} variant="contained" color="primary">
                            <AddIcon/>
                            افزودن کلید
                        </Button>


                        <TableContainer component={Paper}>
                            <Table aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell align="right">گزینه ها</StyledTableCell>

                                        <StyledTableCell align="right">نام&nbsp;</StyledTableCell>
                                        <StyledTableCell align="right">#&nbsp;</StyledTableCell>


                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {items.map(row => (
                                        <StyledTableRow key={row.id}>
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
                                                        onClick={() => window.location.href = '/SshKeyEdit/' + row.id}>
                                                        <ListItemIcon>
                                                            <EditIcon fontSize="small"/>
                                                        </ListItemIcon>
                                                        <ListItemText primary="ویرایش"/>
                                                    </StyledMenuItem>
                                                    <StyledMenuItem onClick={() => removeSshKey(row.id)}>
                                                        <ListItemIcon>
                                                            <DeleteIcon fontSize="small"/>
                                                        </ListItemIcon>
                                                        <ListItemText primary="حذف"/>
                                                    </StyledMenuItem>
                                                </StyledMenu>


                                            </StyledTableCell>

                                            <StyledTableCell component="th" scope="row">
                                                {row.name}
                                            </StyledTableCell>
                                            <StyledTableCell align="right">{row.id}


                                            </StyledTableCell>

                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Paper>
            </Grid>

            <MessageBox response={response}/>
        </div>

    )
}
