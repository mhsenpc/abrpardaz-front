import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
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


export default class Sshkeylist extends Component {
    state = {
        items: [],
        anchorEl: null,
        open: false
    };


    handleClick = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleClose = event => {
        this.setState({anchorEl: null})
    };

    componentDidMount() {
        axios.get(api_base + sshKeysList)
            .then(res => {
                const items = res.data.data.list;

                this.setState({items});
            })
    }

    removeSshKey = id => {
        axios.delete(api_base + 'sshKeys/' + id.toString() +'/remove'
        )
            .then(res => {
                const msg = res.data.data.message;

                alert(msg)
            })
    }

    render() {
        return (

            <div>
                <Paper>
                    <Grid item xs={12} container
                          direction="row"
                          justify="center"
                          alignItems="center">
                        <Grid item xs={6}>
                            <Paper>
                                <FormLabel>کلیدهای SSH</FormLabel>
                            </Paper>
                        </Grid>

                        <Grid item xs={6}>
                            <Paper>
                                <Button a href={'/SshKeyAdd'} variant="contained" color="primary">
                                    <AddIcon/>
                                    اضافه کردن کلید SSH
                                </Button>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} container
                              direction="row"
                              justify="center"
                              alignItems="center">


                            <Grid>
                                <Paper>

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
                                                {this.state.items.map(row => (
                                                    <StyledTableRow key={row.id}>
                                                        <StyledTableCell align="right">
                                                            <IconButton
                                                                aria-label="more"
                                                                aria-controls="long-menu"
                                                                aria-haspopup="true"
                                                                onClick={this.handleClick}
                                                            >
                                                                <MoreVertIcon/>
                                                            </IconButton>
                                                            <StyledMenu
                                                                id="customized-menu"
                                                                anchorEl={this.state.anchorEl}
                                                                keepMounted
                                                                open={Boolean(this.state.anchorEl)}
                                                                onClose={this.handleClose}
                                                            >
                                                                <StyledMenuItem>
                                                                    <ListItemIcon>
                                                                        <EditIcon fontSize="small"/>
                                                                    </ListItemIcon>
                                                                    <ListItemText primary="ویرایش"/>
                                                                </StyledMenuItem>
                                                                <StyledMenuItem onClick={() => this.removeSshKey(row.id)}>
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

                                </Paper>
                            </Grid>


                        </Grid>


                    </Grid>

                </Paper>
            </div>

        )
    }
    ;

}
