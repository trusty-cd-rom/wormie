import { bindActionCreators } from 'redux';
import { connect } from 'react-redux/native';
import Login from '../components/Login';
import * as LoginActions from '../actions/login';

function mapStateToProps(state) {
  return {
    // counter: state.counter
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(LoginActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);