import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import SimpleLineChart from './ChannelChart';
import CircularProgress from '@material-ui/core/CircularProgress';
import SimpleTable from './ChannelDataTable';
import { styles } from '../shared/styles';
import { getChannelData } from './actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Channel extends React.Component {

  state = {
    isLoading: false,
    error: '',
    data: '',
  };

  componentDidMount() {
    this.props.getChannelData(this.props.history.location.state.channelId)
    this.props.titleHandler("Channel")
  }

  render() {
    const { classes } = this.props;

    if (this.props.isLoading || !this.props.chartData) {
      return this.renderProgressComponent()
    }

    var data = this.convertDataToChartData();

    return (
      <React.Fragment>
        <Typography component="div" className={classes.chartContainer}>
          <SimpleLineChart chartData={data} />
        </Typography>
        <div className={classes.tableContainer}>
          <SimpleTable chartData={data} />
        </div>
      </React.Fragment>
    );
  }

  convertDataToChartData() {
    return this.props.chartData.map(
      measurement => (
        {
          name: new Date(measurement.timestamp).toLocaleString("en-US"),
          Value: measurement.value
        }));
  }

  renderProgressComponent() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <CircularProgress className={classes.progress} size={100} />
      </React.Fragment>)
  }
}

Channel.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    chartData: state.channel.data.data,
    error: state.channel.error,
    isLoading: state.channel.isLoading
  }
}

export default connect(mapStateToProps, { getChannelData })(withStyles(styles)(withRouter(Channel)))