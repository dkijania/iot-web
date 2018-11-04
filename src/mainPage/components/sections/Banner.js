import React from 'react';
import Typography from '@material-ui/core/Typography';
import { NavigationBarExtended } from '../NavigationBar';
import { banner } from '../../model/data';
import { navigation } from '../../model/navigations';
import {ScrollDownButton} from '../../../common/components/NavigationsControls'


export function Banner(props) {
    const { classes } = props;
    return (
        <div className={classes.bannerAndAppBar} >
            {NavigationBarExtended(props)}
            < div className={classes.banner} >
                <div style={{ width: '80%', height: '45vh', marginTop: '25vh' }}>
                    <div>
                        <Typography component="h1" variant="h1" align="center" color="textPrimary" gutterBottom>
                            {banner.main}
                        </Typography>
                        <Typography variant="h6" align="center" color="textSecondary" component="p">
                            {banner.description}
                        </Typography>
                    </div>
                </div>
                <ScrollDownButton  navigationTarget={navigation.pricing} />
            </div >
        </div >);
}