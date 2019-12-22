import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite';
import NavigationIcon from '@material-ui/icons/Navigation';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {withStyles, Theme, createStyles, makeStyles} from '@material-ui/core/styles';
import Menu, {MenuProps} from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SendIcon from '@material-ui/icons/Send';



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


function createData(name: string, calories: number, fat: number, carbs: number) {
    return {name, calories, fat, carbs};
}

const rows = [
    createData('mhmdx07@yahoo.com', 159, 'd:50,c::60d:50,c::60d:50,c::60d:50,c::60d:50,c::60', 1,),
    createData('@mhmdx07', 237, 'd:50,c::60d:50,c::60d:50,c::60d:50,c::60d:50,c::60', 2,)
];

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});




export default function Sshklist() {



    return (

        <div>

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
                        <Fab variant="extended">
                            <NavigationIcon/>
                            اضافه کردن کلید SSH
                        </Fab>
                    </Paper>
                </Grid>
                <Grid item xs={12} container
                      direction="row"
                      justify="center"
                      alignItems="center">

                    <paper>

                        <Grid>
                            <Paper>

                                <TableContainer component={Paper}>
                                    <Table aria-label="customized table">
                                        <TableHead>
                                            <TableRow>
                                                <StyledTableCell  align="right">

                                                </StyledTableCell>

    <StyledTableCell align="right">Finger Point&nbsp;</StyledTableCell>
    <StyledTableCell align="right">نام&nbsp;</StyledTableCell>
    <StyledTableCell align="right">#&nbsp;</StyledTableCell>


</TableRow>
</TableHead>
    <TableBody>
        {rows.map(row => (
            <StyledTableRow key={row.name}>
                <StyledTableCell align="right">{row.calories}</StyledTableCell>
                <StyledTableCell align="right">{row.fat}</StyledTableCell>

                <StyledTableCell component="th" scope="row">
                    {row.name}
                </StyledTableCell>
                <StyledTableCell align="right">{row.carbs}</StyledTableCell>
            </StyledTableRow>
        ))}
    </TableBody>
</Table>
</TableContainer>

</Paper>
</Grid>


</paper>

</Grid>



</Grid>





    </div>

)
    ;

}









