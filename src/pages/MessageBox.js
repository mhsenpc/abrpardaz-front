import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {makeStyles} from '@material-ui/core/styles';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export default function MessageBox(props) {
    const classes = useStyles();
    const [messages, setMessages] = React.useState([]);
    const [type, setType] = React.useState('');
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        if (props.response.success) {
            setMessages([props.response.message])
            setType('success')
            setOpen(true);
        } else {
            if (props.response.code == 400) {
                setMessages([props.response.message])
                setType('error')
                setOpen(true);
            }
            if (props.response.code == -1) {
                let allmsg = [];
                Object.keys(props.response.errors).forEach(function (key) {
                    allmsg.push(props.response.errors[key]);
                });
                setMessages(allmsg)
                setType('error')
                setOpen(true);
            }
        }
    },[props.response]);


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                      anchorOrigin={{
                          vertical: 'top',
                          horizontal: 'left',
                      }}>
                <Alert onClose={handleClose} severity={type}>
                    {messages.map(message => (
                        <p key={message}>{message}</p>
                    ))}
                </Alert>
            </Snackbar>
        </div>
    );
}