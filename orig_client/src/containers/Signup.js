import { bindActionCreators } from 'redux';
import { connect } from 'react-redux/native';
import Signup from '../components/Signup';
import * as UpdateUserProfileActions from '../actions/updateUserProfile';

function mapStateToProps(state) {
  console.log('feed state: ', state);
  return {
    currentUser: state.userProfile.currentUser,
  };
}

  // return {
  //   onClick: function (id) {
  //     dispatch(toggleTodo(id));
  //   } 
  // }

// createUserInfo, updateInputText
function mapDispatchToProps(dispatch) {
  return bindActionCreators(UpdateUserProfileActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
