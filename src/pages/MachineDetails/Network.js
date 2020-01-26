import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from "@material-ui/core/Paper/Paper";
import Box from '@material-ui/core/Box';
import {makeStyles, Table} from "@material-ui/core";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export default function Network() {
    const classes = useStyles();

    return (
        <div>
            <Grid item xs={12}
                  direction="row"
                  alignItems="center"
                  style={{direction: "rtl"}}
            >
                <Paper>
                    <Box width={700}>
                        <h1>شبکه</h1>
                        <Table>
                            <TableContainer component={Paper}>
                                <Table className={classes.table} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="right">IP</TableCell>
                                            <TableCell align="right">Reverse DNS</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell component="th" scope="row">
                                                195.201.37.23
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                static.195.201.37.23.clients.your-server.com
                                            </TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell component="th" scope="row">
                                                2a01:4f8:1c0c:6b9f::/64
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                0 Entries
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Table>

                    </Box>
                </Paper>
            </Grid>

        </div>
    )
}