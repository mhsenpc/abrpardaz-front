import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { sizing } from '@material-ui/system';
import Snapshots from "./Snapshots";
import Applications from "./Applications";


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-force-tabpanel-${index}`}
            aria-labelledby={`scrollable-force-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `scrollable-force-tab-${index}`,
        'aria-controls': `scrollable-force-tabpanel-${index}`,
    };
}

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
}));


const SimplePaper = makeStyles(theme => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
            width: theme.spacing(16),
            height: theme.spacing(16),
        },
    },
}));


const cardpic = makeStyles(theme => ({
    cover: {
        width: 151,
        height:151
    }

}));





export default class SelectOS extends Component{

    state = {
        value:0,
        setValue:0,
        anchorEl:null,
        setAnchorEl:null

    };


     card = cardpic();

    /*const [value, setValue] = React.useState(0);*/

    handleChange = (event, newValue) => {
        this.state.setValue(newValue);
    };

/*
    const [anchorEl, setAnchorEl] = React.useState(null);
*/

     handleClick = event => {
         this.setState({anchorEl: event.currentTarget});
    };

     handleClose = () => {
         this.setState({anchorEl: null})
    };

     render(){



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

                      <Box textAlign="right" m={5}>
                          <FormLabel>لطفا سیستم عامل مورد نظر خود را انتخاب نمایید</FormLabel>
                      </Box>


          <AppBar position="static" color="default">
              <Tabs
                  value={this.state.value}
                  onChange={this.handleChange}
                  variant="scrollable"
                  scrollButtons="on"
                  indicatorColor="primary"
                  textColor="primary"
                  aria-label="scrollable force tabs example"
              >

                  <Tab label="نرم افزارهای آماده" icon={<ShoppingBasket />} {...a11yProps(0)} />
                  <Tab label="تصاویر آنی" icon={<ThumbDown />} {...a11yProps(1)} />
                  <Tab label="سیستم عامل" icon={<ThumbUp />} {...a11yProps(2)} />
              </Tabs>
          </AppBar>


          <TabPanel value={this.state.value} index={2}>

              <Box component="span" m={1} height="auto" width="auto" display="inline-block" >

                  <div>


                      <Paper variant="outlined" square >



                          <CardMedia
                              className={this.card.cover}
                              image="./images/live-from-space.jpg"
                              title="Live from space album cover"
                          />



                          <Paper>

                              <h3>Ubuntu 18.04</h3>
                              <Button aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick}>
                                  نسخه
                              </Button>


                              <Menu
                                  id="simple-menu"
                                  anchorEl={this.state.anchorEl}
                                  keepMounted
                                  open={Boolean(this.state.anchorEl)}
                                  onClose={this.handleClose}
                              >
                                  <MenuItem onClick={this.handleClose}>18.04 x64</MenuItem>
                                  <MenuItem onClick={this.handleClose}>19.04 x64</MenuItem>
                                  <MenuItem onClick={this.handleClose}>17.04 x64</MenuItem>
                              </Menu>



                          </Paper>

                      </Paper>


                  </div>

              </Box>

              <Box component="span" m={1} height="auto" width="auto" display="inline-block" >

                  <div>


                      <Paper variant="outlined" square >



                          <CardMedia
                              className={this.card.cover}
                              image="./images/live-from-space.jpg"
                              title="Live from space album cover"
                          />



                          <Paper>

                              <h3>Ubuntu 18.04</h3>
                              <Button aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick}>
                                  نسخه
                              </Button>


                              <Menu
                                  id="simple-menu"
                                  anchorEl={this.state.anchorEl}
                                  keepMounted
                                  open={Boolean(this.state.anchorEl)}
                                  onClose={this.handleClose}
                              >
                                  <MenuItem onClick={this.handleClose}>18.04 x64</MenuItem>
                                  <MenuItem onClick={this.handleClose}>19.04 x64</MenuItem>
                                  <MenuItem onClick={this.handleClose}>17.04 x64</MenuItem>
                              </Menu>



                          </Paper>

                      </Paper>


                  </div>

              </Box>



           </TabPanel>
          <TabPanel value={this.state.value} index={0}>

                <Applications />

          </TabPanel>
          <TabPanel value={this.state.value} index={1}>

                 <Snapshots />

          </TabPanel>


                  </Paper>
              </Grid>




          </Grid>

      </div>
    );

    }

}





























