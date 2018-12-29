import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { NavigationBarSimple } from '../shared';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { authenticate } from './actions.js';
import { styles } from './styles';

class LoginComponent extends React.Component {

    onSubmit = (e) => {
        e.preventDefault();
        const { login, password } = this.state
        this.props.authenticate(login, password)
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    componentWillReceiveProps(newProps) {
        if (newProps.isAuthenticated) {
            newProps.history.push({
                pathname: '/Dashboard',
                state: { username: newProps.username}});
        }
      }

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <CssBaseline />
                <div className={classes.main}>
                    {NavigationBarSimple(this.props)}
                    <div className={classes.layout}>
                        <Paper className={classes.paper}>
                            {this.renderErrorIfNeeded(classes)}
                            {this.renderSingInHeader(classes)}
                            {this.renderForm(classes)}
                        </Paper>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    renderErrorIfNeeded() {
        const { classes } = this.props;
        if (this.props.error)
            return (
                <div className={classes.errorDiv}>
                    <p className={classes.errorText}>{this.props.error.message}</p></div>)
    }

    renderSingInHeader() {
        const { classes } = this.props;
        return (
            <div>
                <Avatar className={classes.avatar}>
                    <LockIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
            </div>
        )
    }

    renderForm(classes) {
        return (
            <form className={classes.form} onSubmit={this.onSubmit.bind(this)}>
                <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="login">Login</InputLabel>
                    <Input id="login" name="login" autoComplete="login" autoFocus  value={this.props.login.login}
                    placeholder="login" onChange={this.handleChange.bind(this)}/>
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input
                        name="password"
                        type="password"
                        id="password"
                        value={this.props.password}
                        autoComplete="current-password"
                        onChange={this.handleChange.bind(this)}
                    />
                </FormControl>
                <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me" />
                {this.renderButton()}
            </form>);
    }

    renderButton() {
        const { classes } = this.props;
        return (<Button
            type="submit"
            fullWidth
            variant="contained"
            color={ this.props.isLoading ? "secondary" : "primary"}
            disabled= { this.props.isLoading}
            className={ classes.submit}
            > Sign in</Button>)
    }
}

LoginComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {

    return {
        username: state.login.username,
        password: state.password,
        isLoading: state.login.isLoading,
        error: state.login.error,
        isAuthenticated: state.login.isAuthenticated,
        login: state.login.login,
    }
}

export default connect(mapStateToProps, { authenticate })(withStyles(styles)(withRouter(LoginComponent)))