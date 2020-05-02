import React, {useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import axios from "axios";
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {api_base, plansList} from "../../Api";
import {Box} from "@material-ui/core";
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';



const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
    },
}))(Tooltip);


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
                }

            })
    }, []);

    function selectPlan(id , ram , disk) {
        if(!checkRam(ram)  && !checkDisk(disk)){
            props.setPlanId(id)
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

        <Grid item xs={12} container spacing={2}>

            {items.map(row => (

                <Grid item xs={12} sm={6} md={3} key={row.id}>
                    <HtmlTooltip
                        title={

                            <React.Fragment>

                                {(row.disk < props.minDisk && row.ram >= props.minRam)&&
                                <div style={{direction: 'rtl'}}>
                                <Typography color="textPrimary"> حداقل دیسک مورد نیاز </Typography>
                                <Typography color="textSecondary">حداقل دیسک مورد نیازشما {props.minDisk} گیگابایت میباشد</Typography>
                                </div>
                                }

                                {(row.ram < props.minRam && row.disk >= props.minDisk ) &&
                                <div style={{direction: 'rtl'}}>
                                    <Typography color="textPrimary"> حداقل رم مورد نیاز </Typography>
                                    <Typography color="textSecondary">حداقل رم مورد نیاز شما {props.minRam} گیگابایت میباشد.</Typography>
                                </div>
                                }
                                {(row.ram < props.minRam && row.disk < props.minDisk)&&
                                < div >
                                < Typography color="textPrimary"> حداقل رم و دیسک مورد نیاز </Typography>
                                    <Typography color="textSecondary">  حداقل رم  {props.minRam} گیگابایت و حداقل دیسک مورد نیاز شما {props.minDisk}    گیگابایت  میباشد.</Typography>
                                    </div>
                                }
                                    </React.Fragment>
                }
                    >



                    <Paper>
                        <Box
                            className={"boxItem planItem " + isActive(row.id) + checkRam(row.ram) + checkDisk(row.disk)}
                            key={row.id}
                            onClick={() => selectPlan(row.id , row.ram , row.disk)}>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                {row.name}
                            </Typography>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                vcpu: {row.vcpu}
                            </Typography>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Ram: {row.ram}GB
                            </Typography>
                            <Typography variant="h5" component="h2">
                                ساعتی {row.hourly_price}
                            </Typography>تومان
                            <Typography className={classes.pos} color="textSecondary">
                                Disk: {row.disk}GB
                            </Typography>
                            <Typography variant="body2" component="p">
                                ترافیک نا محدود
                            </Typography>

                        </Box>
                    </Paper>
                    </HtmlTooltip>
                </Grid>

            ))}

        </Grid>
    );
}

export default Plans;