import React from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { banner } from '../../data';
import { ScrollDownButton, NavigationBarExtended, navigation } from '../../../shared'
import {styles} from "./styles"

export function Banner(props) {
    const { classes } = props;
    return (
        <div className={classes.bannerAndAppBar} >
            {NavigationBarExtended(props)}
            < div className={classes.banner} >
                <div style={styles.bannerTitle}>
                    <div>
                        <Typography variant="h1" component="h1" align="center" color="textPrimary" gutterBottom>
                            {banner.main}
                        </Typography>
                        <Typography variant="h6" align="center" color="textSecondary" component="p">
                            {banner.description}
                        </Typography>
                    </div>
                </div>
                <ScrollDownButton navigationTarget={navigation.pricing} />
            </div >
        </div >);
}

Banner.propTypes = {
    classes: PropTypes.shape({
        bannerAndAppBar: PropTypes.object.isRequired,
        banner: PropTypes.object.isRequired,
    })
};