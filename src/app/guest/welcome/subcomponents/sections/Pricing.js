import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarBorder';
import Typography from '@material-ui/core/Typography';
import { pricing, tiers } from '../../data';


export function Pricing(props) {
    const { classes } = props;
    return (

        <section id='pricing'>
            <div>
                <div className={classes.heroContent}>
                    <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                        {pricing.main}
                    </Typography>
                    <Typography variant="h6" align="center" color="textSecondary" component="p">
                        {pricing.description}
                    </Typography>
                </div>
                {PricingCards(props)}
            </div>
        </section>
    );
}

Pricing.propTypes = {
    classes: PropTypes.shape({
        heroContent: PropTypes.object.isRequired,
    })
};

export function PricingCards(props) {
    const { classes } = props;
    return (<Grid container spacing={40} alignItems="flex-end">
        {tiers.map(tier => (
            <Grid item key={tier.title} xs={12} sm={tier.title === 'Enterprise' ? 12 : 6} md={4}>
                <Card>
                    <CardHeader
                        title={tier.title}
                        subheader={tier.subheader}
                        titleTypographyProps={{ align: 'center' }}
                        subheaderTypographyProps={{ align: 'center' }}
                        action={tier.title === 'Pro' ? <StarIcon /> : null}
                        className={classes.cardHeader}
                    />
                    <CardContent>
                        <div className={classes.cardPricing}>
                            <Typography component="h2" variant="h3" color="textPrimary">
                                ${tier.price}
                            </Typography>
                            <Typography variant="h6" color="textSecondary">
                                /mo
                            </Typography>
                        </div>
                        {tier.description.map(line => (
                            <Typography variant="subtitle1" align="center" key={line}>
                                {line}
                            </Typography>
                        ))}
                    </CardContent>
                    <CardActions className={classes.cardActions}>
                        <Button fullWidth variant={tier.buttonVariant} color="primary">
                            {tier.buttonText}
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        ))}
    </Grid>);
}

Pricing.propTypes = {
    classes: PropTypes.shape({
        cardHeader: PropTypes.object.isRequired,
        cardPricing: PropTypes.object.isRequired,
        cardActions: PropTypes.object.isRequired
    })
};