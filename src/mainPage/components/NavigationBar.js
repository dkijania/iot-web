import React from 'react';
import AppBar from '@material-ui/core/AppBar';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { navigation } from '../model/navigations'
import { LoginLink, SectionLink} from '../../common/components/NavigationsControls'



export function NavigationBarExtended(props) {
    const { classes } = props;
    return (
        <AppBar style={{ background: 'transparent', boxShadow: 'none' }} position="static" color="default" className={classes.appBar}>
            <Toolbar>
                {/* just a placeholder */}
                <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle} />

                <SectionLink to={navigation.pricing} label='Pricing' />
                <LoginLink to={navigation.singIn} label ='Login' />
            </Toolbar>
        </AppBar>
    );
}

export function NavigationBarSimple(props) {
    const { classes } = props;
    return (
        <AppBar style={{ background: 'transparent', boxShadow: 'none' }} position="static" color="default" className={classes.appBar}>
            <Toolbar>
            </Toolbar>
        </AppBar>
    );
}