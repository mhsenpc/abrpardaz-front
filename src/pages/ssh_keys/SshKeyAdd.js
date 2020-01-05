import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { useSpring, animated } from 'react-spring/web.cjs'; // web.cjs is required for IE 11 support
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import NavigationIcon from '@material-ui/icons/Navigation';
import CancelIcon from '@material-ui/icons/Cancel';

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const Fade = React.forwardRef(function Fade(props, ref) {
    const { in: open, children, onEnter, onExited, ...other } = props;
    const style = useSpring({
        from: { opacity: 0 },
        to: { opacity: open ? 1 : 0 },
        onStart: () => {
            if (open && onEnter) {
                onEnter();
            }
        },
        onRest: () => {
            if (!open && onExited) {
                onExited();
            }
        },
    });

    return (
        <animated.div ref={ref} style={style} {...other}>
            {children}
        </animated.div>
    );
});

Fade.propTypes = {
    children: PropTypes.element,
    in: PropTypes.bool.isRequired,
    onEnter: PropTypes.func,
    onExited: PropTypes.func,
};

export default function SshKeyAdd() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleAddOpen = () => {
        setOpen(true);
    };

    const handleAddClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Grid item xs={12} container
                  direction="row"
                  justify="center"
                  alignItems="center">
                <Grid item xs={6} container
                      direction="row"
                      justify="center"
                      alignItems="center">
                    <Paper>
                        <Button type="button" variant="contained" color="primary" onClick={handleAddOpen}>
                            برای اضافه کردن SSHK ضربه بزنید
                        </Button>
                        <Fab color="primary" aria-label="add">
                            <AddIcon />
                        </Fab>
                        <Modal
                            aria-labelledby="spring-modal-title"
                            aria-describedby="spring-modal-description"
                            className={classes.modal}
                            open={open}
                            onClose={handleAddClose}
                            closeAfterTransition
                            BackdropComponent={Backdrop}
                            BackdropProps={{
                                timeout: 500,
                            }}
                        >
                            <Fade in={open}>
                                <div className={classes.paper}>

                                    <FormLabel>کلید SSH جدید</FormLabel>

                                    <hr/>
                                    <TextField
                                        placeholder="کلید SSH جدید"
                                        multiline={true}
                                        rows={29}
                                        rowsMax={7}
                                    />
                                    <Grid item>
                                        <Button variant="contained" color="primary" disableElevation>
                                            اضافه کردن کلید SSHK جدید
                                        </Button>
                                    </Grid>

                                </div>
                            </Fade>
                        </Modal>

                    </Paper>
                </Grid>
            </Grid>

        </div>
    );
}
