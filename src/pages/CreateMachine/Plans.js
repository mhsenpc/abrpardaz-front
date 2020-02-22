import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import axios from "axios";
import Box from '@material-ui/core/Box';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {api_base, plansList} from "../../Api";
import Button from "@material-ui/core/Button";


const useStyles = makeStyles({
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
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
            })
    }, []);

    return (
        <Grid item xs={12} container spacing={2}>
            {items.map(row => (
                <Grid item xs={12} sm={6} md={3}>
                    <Paper className={"boxItem planItem"} key={row.id} onClick={() => props.setPlanId(row.id)}>

                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            {row.name}
                        </Typography>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            vcpu: {row.vcpu}
                        </Typography>
                        <Typography variant="h5" component="h2">
                            Ram: {row.ram}GB
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                            Disk: {row.disk}GB
                        </Typography>
                        <Typography variant="body2" component="p">
                            ترافیک نا محدود
                        </Typography>
                    </Paper>
                </Grid>
            ))}
        </Grid>
    );
}

export default Plans;