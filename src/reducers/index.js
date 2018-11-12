import { combineReducers } from 'redux';
import LoginReducer from './login.reducers';
import DashboardReducer from './dashboard.reducers';
import ChannelReducers from './channel.reducers';

export default combineReducers({
    login: LoginReducer,
    dashboard: DashboardReducer,
    channel: ChannelReducers
  });