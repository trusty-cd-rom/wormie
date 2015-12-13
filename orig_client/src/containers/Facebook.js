import { bindActionCreators } from 'redux';
import { connect } from 'react-redux/native';
import Facebook from '../components/Facebook';
import * as FacebookActions from '../actions/facebook';

function mapStateToProps(state) {
  return {
    currentUser: state.userProfile.currentUser,
    facebookToken: state.userProfile.facebookToken,
    djangoToken: state.userProfile.djangoToken
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(FacebookActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Facebook);
