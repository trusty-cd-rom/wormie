import { bindActionCreators } from 'redux';
import { connect } from 'react-redux/native';
import Signup from '../components/Signup';
import * as UpdateUserProfileActions from '../actions/updateUserProfile';

function mapStateToProps(state) {
  console.log('Signup state: ', state);
  return {
    updateProfile: state.userProfile.updateProfile,
    currentUser: state.userProfile.currentUser,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(UpdateUserProfileActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
