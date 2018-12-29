import React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import { Pricing } from './subcomponents/sections/Pricing'
import { Banner } from './subcomponents/sections/Banner'
import { Footer } from './subcomponents/sections/Footer';
import { styles } from './styles';

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
  classes: PropTypes.shape({
    layout: PropTypes.object.isRequired
  })
};

export default withStyles(styles)(WelcomePage);