import { bindActionCreators } from 'redux';
import { connect } from 'react-redux/native';
import Facebook from '../components/Facebook';
import * as FacebookActions from '../actions/facebook';

function mapStateToProps(state) {
  console.log("Facebook state is: ", state);
  return {
    currentUser: state.userProfile.currentUser,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(FacebookActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Facebook);
