import { combineReducers } from 'redux';
import LoginReducer from './guest/login/reducers';
import DashboardReducer from './user/dashboard/reducers';
import ChannelReducers from './user/channel/reducers';

export default combineReducers({
    login: LoginReducer,
    dashboard: DashboardReducer,
    channel: ChannelReducers
  });