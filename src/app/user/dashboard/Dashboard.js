import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import image from '../../../images/chart.jpg';
import errorImage from '../../../images/error.png'
import { styles } from '../shared/styles';
import { getDashboardData } from './actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import { navigation } from '../../navigation'


class Dashboard extends React.Component {

  state = {
    isLoading: '',
    error: '',
    data: ''
  };

  componentDidMount() {
    this.props.getDashboardData(this.props.history.location.state.username)
    this.props.titleHandler("Dashboard")
  }

  openChannelPage = (id) => {
    this.props.history.push({
      pathname: navigation.channel + '/' + id,
      state: {
        channelId: id,
        username: this.props.history.location.state.username
      }
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <div className={classes.appBarSpacer} />
          <div styles={{ flexGrow: 1 }}>
            <Grid cols="4" container spacing={24}>
              {this.renderChannelsOrProgress()}
            </Grid>
          </div>

        </div>
      </React.Fragment>
    );
  }


  renderChannelsOrProgress() {
    const { classes } = this.props;
    if (this.props.isLoading)
      return (<CircularProgress className={classes.progress} size={100} />)
    if (this.props.error)
      return (<Card className={classes.errorCard}>
        <CardActionArea>
          <CardContent>
            <img src={errorImage} className={classes.errorImage} alt='error icon' />
            <Typography gutterBottom variant="h5" component="h2">
              Error while loading channels</Typography>
            <Typography component="p">
              {this.props.error}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>)

    let tiles = _.map(this.props.data.data, function (element) {
      return {
        title: element.name,
        id: element.id
      }
    });
    return tiles.map(tile => this.renderSingleTile(tile))
  }

  renderSingleTile = (tile) => {
    const { classes } = this.props;
    return (
      <Grid item xs={3}>
        <Card className={classes.card}  >
          <CardActionArea className={classes.card}>
            <CardMedia
              component="img"
              alt={tile.title}
              className={classes.media}
              image={image}
              title={tile.title}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {tile.title} </Typography>
              <Typography component="p">
                {tile.id}</Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary" onClick={() => this.openChannelPage(tile.id)}>Show</Button>
            <Button size="small" color="primary">Raw Data</Button>
          </CardActions>
        </Card>
      </Grid>
    )
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  titleHandler: PropTypes.func.isRequired
};

const mapStateToProps = state => {

  return {
    isLoading: state.dashboard.isLoading,
    error: state.dashboard.error,
    data: state.dashboard.data
  }
}

export default connect(mapStateToProps, { getDashboardData })(withStyles(styles)(withRouter(Dashboard)))