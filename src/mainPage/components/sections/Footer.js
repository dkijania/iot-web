import React from 'react';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { footers } from '../../model/data'



export function Footer(props) {
    const { classes } = props;
    return (<footer className={classNames(classes.footer, classes.layout)}>
        <Grid container spacing={32} justify="space-evenly">
            {footers.map(footer => (
                <Grid item xs key={footer.title}>
                    <Typography variant="h6" color="textPrimary" gutterBottom>
                        {footer.title}
                    </Typography>
                    {footer.description.map(item => (
                        <Typography key={item} variant="subtitle1" color="textSecondary">
                            {item}
                        </Typography>
                    ))}
                </Grid>
            ))}
        </Grid>
    </footer>);
}
