import React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import Background from '../../common/images/backgroundImage.jpg';
import { Pricing } from './sections/Pricing'
import { Banner } from './sections/Banner'
import { Footer } from './sections/Footer';

const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  appBar: {
    position: 'relative',
  },
  toolbarTitle: {
    flex: 1,

  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
      width: 900,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  banner: {
    width: '100%',
    backgroundSize: 'cover',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh'

  },

  bannerAndAppBar: {
    width: '100%',
    backgroundImage: `url(${Background})`,
    backgroundSize: 'cover',
    height: '100vh'
  },

  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  cardHeader: {
    backgroundColor: theme.palette.grey[200],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing.unit * 2,
  },
  cardActions: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing.unit * 2,
    },
  },
  footer: {
    marginTop: theme.spacing.unit * 8,
    borderTop: `1px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit * 6}px 0`,
  },
});


function WelcomePage(props) {
  const { classes } = props;

  return (
    <React.Fragment>
      <CssBaseline />
      {Banner(props)}
      <main className={classes.layout}>
        {Pricing(props)}
      </main>
      {Footer(props)}
    </React.Fragment>
  );
}

WelcomePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(WelcomePage);