import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const columns = [
    { id: 'name', label: 'عنوان', minWidth: 170 },
    { id: 'code', label: 'تاریخ', minWidth: 100 },
    {
        id: 'population',
        label: 'درگاه پرداخت',
        minWidth: 170,
        align: 'right',
        format: value => value.toLocaleString(),
    },
    {
        id: 'size',
        label: 'نوع عملیات',
        minWidth: 170,
        align: 'right',
        format: value => value.toLocaleString(),
    },
    {
        id: 'density',
        label: 'وضعیت',
        minWidth: 170,
        align: 'right',
        format: value => value.toFixed(2),
    },
    {
        id: 'density',
        label: 'مبلغ (تومان)',
        minWidth: 170,
        align: 'right',
        format: value => value.toFixed(2),
    },
];

function createData(name, code, population, size) {
    const density = population / size;
    return { name, code, population, size, density };
}

const rows = [
    createData('افزایش موجودی حساب', '2019-12-25 7:28', 'پاسارگاد', 'واریز'),
    createData('افزایش موجودی حساب', '2019-12-25 7:28', 'پاسارگاد', 'واریز'),
    createData('افزایش موجودی حساب', '2019-12-25 7:28', 'پاسارگاد', 'واریز'),
    createData('افزایش موجودی حساب', '2019-12-25 7:28', 'پاسارگاد', 'واریز'),
    createData('افزایش موجودی حساب', '2019-12-25 7:28', 'پاسارگاد', 'واریز'),
    createData('افزایش موجودی حساب', '2019-12-25 7:28', 'پاسارگاد', 'واریز'),
    createData('افزایش موجودی حساب', '2019-12-25 7:28', 'پاسارگاد', 'واریز'),
    createData('افزایش موجودی حساب', '2019-12-25 7:28', 'پاسارگاد', 'واریز'),
    createData('افزایش موجودی حساب', '2019-12-25 7:28', 'پاسارگاد', 'واریز'),
    createData('افزایش موجودی حساب', '2019-12-25 7:28', 'پاسارگاد', 'واریز'),
    createData('افزایش موجودی حساب', '2019-12-25 7:28', 'پاسارگاد', 'واریز'),
    createData('افزایش موجودی حساب', '2019-12-25 7:28', 'پاسارگاد', 'واریز'),
    createData('افزایش موجودی حساب', '2019-12-25 7:28', 'پاسارگاد', 'واریز'),
    createData('افزایش موجودی حساب', '2019-12-25 7:28', 'پاسارگاد', 'واریز'),
    createData('افزایش موجودی حساب', '2019-12-25 7:28', 'پاسارگاد', 'واریز'),
];

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
});

export default function PaymentList() {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map(column => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                    {columns.map(column => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {column.format && typeof value === 'number' ? column.format(value) : value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
