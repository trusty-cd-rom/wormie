import { bindActionCreators } from 'redux';
import { connect } from 'react-redux/native';
import Login from '../components/Login';
import * as LoginActions from '../actions/login';

function mapStateToProps(state) {
  // console.log('Login state: ', state);
  return {
    login: state.login,
    feed: state.feed,
    currentUser: state.userProfile.currentUser,
    peekClickedUser: state.profile.peekClickedUser,
    currentWormhole: state.currentWormhole,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(LoginActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
