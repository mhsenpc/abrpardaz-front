import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import Grid from '@material-ui/core/Grid';
import {items} from './FAQList';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    container: {
        display: 'flex',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        flex: '1 0 auto',
        margin: theme.spacing(1),
    },
}));


export default function FAQ(props) {
    const [searchTerm, setSearchTerm] = React.useState('');
    const [currentAnswer, setCurrentAnswer] = React.useState('پرسشی انتخاب کنید');
    const classes = useStyles();

    function search() {
        return items.filter(data => data.question.includes(searchTerm) || data.answer.includes(searchTerm));
    }

    return (
        <div className={classes.root}>
            <h2>پرسش و پاسخ</h2>
            <TextField
                id="outlined-full-width"
                label="جستجو"
                style={{margin: 8}}
                placeholder="چطورمیتونم ...؟"
                fullWidth
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
                variant="outlined"
                onInput={() => setCurrentAnswer('')}
                onChange={event =>setSearchTerm(event.target.value)}
            />


            <Grid container spacing={2}>
                <Grid  item xs={12} sm >
                    <List component="nav" className={classes.root} aria-label="contacts">
                        {search(items).map(item => (
                            <ListItem button onClick={() => setCurrentAnswer(item.answer)}>
                                <ListItemText inset primary={item.question}/>
                            </ListItem>
                        ))}
                        {search(items).length == 0 &&
                        <p>متاسفانه جستجوی شما نتیجه ای در بر نداشت</p>
                        }
                    </List>
                </Grid>
                <Grid item xs={12} sm >
                    <p >
                    {currentAnswer}
                    </p>
                </Grid>
            </Grid>
        </div>
    );
}