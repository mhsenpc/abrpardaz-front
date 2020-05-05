import React from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import axios from "axios";
import {api_base} from "../../Api";
import MessageBox from "../MessageBox";
import {createStyles, makeStyles, Theme} from "@material-ui/core";
import {admin_title_postfix} from "../../consts";


const paperStyle = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            margin: 'auto',
            maxWidth: 700,
            marginTop: 12

        },
        image: {
            width: 128,
            height: 128,
        },
        img: {
            margin: 'auto',
            display: 'block',
            maxWidth: '100%',
            maxHeight: '100%',
        },
        alignText: {
            textAlign: 'right'
        }
    }),
);

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));


function PlanEdit(props) {
    const [response, setResponse] = React.useState([]);
    const [item, setItem] = React.useState({name: '', content: ''});
    const paper = paperStyle();
    const classes = useStyles();

    React.useEffect(() => {
        let id = props.match.params.id;
        axios.get(api_base + 'plans/' + id.toString() + '/show')
            .then(res => {
                const plan = res.data.item;

                setItem(plan);


            })
    }, [])

    function requestEditPlan(event) {
        let id = props.match.params.id;
        event.preventDefault();
        const {remote_id, name, disk, ram, vcpu, hourly_price} = event.currentTarget.elements;
        axios.post(api_base + 'plans/' + id.toString() + '/edit', {
            remote_id: remote_id.value,
            name: name.value,
            disk: disk.value,
            ram: ram.value,
            vcpu: vcpu.value,
            hourly_price: hourly_price.value,
        })
            .then(res => {
                setResponse(res.data)
                if (res.data.success)
                    window.location.href = '/PlansList';
            })
    }


    return (
        <div className={classes.root}>
            <title>ویرایش پلن{admin_title_postfix}</title>

            <Grid container
                  direction="row"
                  justify="center"
                  alignItems="center">

                <Grid item xs>

                    <Paper className={paper.paper}>
                        <h2>ویرایش پلن</h2>

                        <form onSubmit={requestEditPlan}>
                            <TextField
                                name='remote_id'
                                className={paper.alignText}
                                label="remote_id "
                                variant="filled"
                                onChange={event => setItem({remote_id: event.target.value})}
                                value={item.remote_id}
                                required
                            />
                            <br/><br/>
                            <TextField
                                name='name'
                                className={paper.alignText}
                                label="نام"
                                variant="filled"
                                onChange={event => setItem({name: event.target.value})}
                                value={item.name}
                                required
                            />
                            <br/><br/>
                            <TextField
                                name='disk'
                                className={paper.alignText}
                                label="دیسک "
                                variant="filled"
                                onChange={event => setItem({disk: event.target.value})}
                                value={item.disk}
                                required
                            />
                            <br/><br/>
                            <TextField
                                name='ram'
                                className={paper.alignText}
                                label=" رم"
                                variant="filled"
                                onChange={event => setItem({ram: event.target.value})}
                                value={item.ram}
                                required
                            />
                            <br/><br/>
                            <TextField
                                name='vcpu'
                                className={paper.alignText}
                                label=" vcpu"
                                variant="filled"
                                onChange={event => setItem({vcpu: event.target.value})}
                                value={item.vcpu}
                                required
                            />
                            <br/><br/>
                            <TextField
                                name='hourly_price'
                                className={paper.alignText}
                                label=" هزینه ساعتی"
                                variant="filled"
                                onChange={event => setItem({hourly_price: event.target.value})}
                                value={item.hourly_price}
                                required
                            />
                            <br/><br/>

                            <Button type="submit" variant="contained" color="primary">
                                ذخیره
                            </Button>

                        </form>

                    </Paper>
                </Grid>

            </Grid>
            <MessageBox response={response}/>
        </div>
    );

}

export default PlanEdit;