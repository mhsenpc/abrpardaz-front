import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import axios from "axios";
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {api_base, plansList} from "../../Api";
import {Box} from "@material-ui/core";


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


    React.useEffect(() => {
        axios.get(api_base + plansList)
            .then(res => {
                const list = res.data.list;

                setItems(list);
                if (list.length > 0) {
                    props.setPlanId(list[0].id)
                }
            })
    }, []);

    function selectPlan(id) {
        props.setPlanId(id)
    }

    function isActive(id) {
        if (id == props.planId) {
            return 'active';
        } else {
            return '';
        }
    }

    return (
        <Grid item xs={12} container spacing={2}>
            {items.map(row => (
                <Grid item xs={12} sm={6} md={3}>
                    <Paper>
                        <Box className={"boxItem planItem " + isActive(row.id)} key={row.id}
                             onClick={() => selectPlan(row.id)}>
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
                                ساعتی {row.hourly_price} تومان
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary">
                                Disk: {row.disk}GB
                            </Typography>
                            <Typography variant="body2" component="p">
                                ترافیک نا محدود
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>
            ))}
        </Grid>
    );
}

export default Plans;