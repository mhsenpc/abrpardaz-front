import React, {useEffect} from 'react';
import Paper from '@material-ui/core/Paper';
import axios from "axios";
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {api_base, plansList} from "../../Api";
import {HtmlTooltip} from "../../Helpers";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";


const useStyles = makeStyles({
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

function Plans(props) {

    const classes = useStyles();
    const [items, setItems] = React.useState([]);

    useEffect(() => {
        axios.get(api_base + plansList)
            .then(res => {
                const list = res.data.pagination.data;

                setItems(list);
                if (list.length > 0) {
                    props.setPlanId(list[0].id)
                    props.setPlanName(list[0].name)
                }

            })
    }, []);

    function isSelectable(ram, disk) {
        if (!checkRam(ram) && !checkDisk(disk)) {
            return true;
        } else {
            return false;
        }
    }

    function selectPlan(id, name, ram, disk) {
        if (isSelectable(ram, disk)) {
            props.setPlanId(id);
            props.setPlanName(name);
        }
    }

    function isActive(id) {
        if (id === props.planId) {
            return 'active';

        } else {
            return '';
        }
    }

    function checkRam(ram) {
        if (ram < props.minRam) {
            return ' disable ';
        } else {
            return '';
        }
    }

    function checkDisk(disk) {
        if (disk < props.minDisk) {
            return ' disable ';

        } else {
            return '';
        }
    }

    return (
        <TableContainer dir={"ltr"} component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>VCPUS</TableCell>
                        <TableCell>RAM</TableCell>
                        <TableCell>SSD</TableCell>
                        <TableCell>Traffic</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Price</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map(row => (
                        <HtmlTooltip
                            disableHoverListener={isSelectable(row.ram, row.disk)}
                            title={

                                <React.Fragment>

                                    {(row.disk < props.minDisk && row.ram >= props.minRam) &&
                                    <div style={{direction: 'rtl'}}>
                                        <Typography color="textPrimary"> حداقل دیسک مورد نیاز </Typography>
                                        <Typography color="textSecondary">حداقل دیسک مورد
                                            نیازشما {props.minDisk} گیگابایت
                                            میباشد</Typography>
                                    </div>
                                    }

                                    {(row.ram < props.minRam && row.disk >= props.minDisk) &&
                                    <div style={{direction: 'rtl'}}>
                                        <Typography color="textPrimary"> حداقل رم مورد نیاز </Typography>
                                        <Typography color="textSecondary">حداقل رم مورد نیاز شما {props.minRam} گیگابایت
                                            میباشد.</Typography>
                                    </div>
                                    }
                                    {(row.ram < props.minRam && row.disk < props.minDisk) &&
                                    < div>
                                        < Typography color="textPrimary"> حداقل رم و دیسک مورد نیاز </Typography>
                                        <Typography color="textSecondary"> حداقل رم {props.minRam} گیگابایت و حداقل دیسک
                                            مورد نیاز شما {props.minDisk} گیگابایت میباشد.</Typography>
                                    </div>
                                    }
                                </React.Fragment>
                            }
                        >
                            <TableRow
                                className={"boxItem " + isActive(row.id) + checkRam(row.ram) + checkDisk(row.disk)}
                                key={row.id}
                                onClick={() => selectPlan(row.id, row.name, row.ram, row.disk)}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.vcpu}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.ram} GB
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.disk} GB
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.traffic} TB
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.hourly_price} Tomans
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.hourly_price * 24 * 30} T / Monthly
                                </TableCell>
                            </TableRow>
                        </HtmlTooltip>

                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default Plans;