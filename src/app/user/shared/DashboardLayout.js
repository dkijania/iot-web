import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { mainListItems, secondaryListItems } from './DashboardSideMenu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Link } from 'react-router-dom';
import { styles } from './styles';
import firebase from "firebase";
import { ToastContainer, toast } from 'react-toastify';
import Dashboard from '../dashboard/Dashboard';
import Channel from '../channel/ChannelPage';
import { Route, Switch } from 'react-router-dom';
import { navigation } from '../../navigation';

class DashboardComponent extends React.Component {
  constructor(props) {
    super(props)
    this.initializePush();
  }

  initializePush() {
    const messaging = firebase.messaging();

    messaging.onMessage(payload => {
      console.log("Notification Received", payload);
      this.setState({ badges: this.state.badges + 1 });
      toast.success("Success Notification !", {
        position: toast.POSITION.BOTTOM_RIGHT,
        type: toast.TYPE.INFO
      });

    });
  }

  state = {
    title: '',
    anchorEl: null,
    mobileMoreAnchorEl: null,
    badges: 0
  };

  setTitle = newTitle => (this.setState({ title: newTitle }));

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const isMenuOpen = Boolean(anchorEl);

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
        <Link to={navigation.main} style={{ textDecoration: 'none' }}>
          <MenuItem onClick={this.handleMenuClose}>
            Sign out</MenuItem>
        </Link>
      </Menu>
    );

    const appBar = (
      <AppBar
        position="absolute"
        className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
      >
        <Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={this.handleDrawerOpen}
            className={classNames(
              classes.menuButton,
              this.state.open && classes.menuButtonHidden,
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            {this.state.title}
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton color="inherit">
              <Badge badgeContent={4} invisible="true" color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>

            <IconButton color="inherit">
              {
                this.state.badges > 0 ?
                  <Badge badgeContent={this.state.badges} color="secondary">
                    <NotificationsIcon />
                  </Badge>
                  :
                  <NotificationsIcon />
              }

            </IconButton>
            <IconButton
              aria-owns={isMenuOpen ? 'material-appbar' : undefined}
              aria-haspopup="true"
              onClick={this.handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    )

    const drawer = (
      <Drawer
        variant="permanent"
        classes={{
          paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
        }}
        open={this.state.open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={this.handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems(this.props)}</List>
        <Divider />
        <List>{secondaryListItems(this.props)}</List>
      </Drawer>
    )

    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.root}>
          {appBar}
          {renderMenu}
          {drawer}
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Switch>
              <Route path={navigation.channelId}
                render={() => <Channel titleHandler={this.setTitle} />} />
              <Route path={navigation.dashboard}
                render={() => <Dashboard titleHandler={this.setTitle} />} />
            </Switch>
            <ToastContainer autoClose={8000} />
          </main>
        </div>

      </React.Fragment>
    );
  }
}

DashboardComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default (withStyles(styles)(DashboardComponent))