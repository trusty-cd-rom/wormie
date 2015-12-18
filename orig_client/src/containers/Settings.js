// TODO
// change about_me
// change wormie_color
// Facebook logout

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux/native';
import Settings from '../components/Settings';
import * as UpdateUserProfileActions from '../actions/updateUserProfile';

function mapStateToProps(state) {
  return {
    updateProfile: state.userProfile.updateProfile,
    currentUser: state.userProfile.currentUser,
  };
}

// createUserInfo, updateInputText
function mapDispatchToProps(dispatch) {
  return bindActionCreators(UpdateUserProfileActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);

