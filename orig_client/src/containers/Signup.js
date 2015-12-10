import { bindActionCreators } from 'redux';
import { connect } from 'react-redux/native';
import Signup from '../components/Signup';
import * as CreateRequestActions from '../actions/createRequest';

function mapStateToProps(state) {
  console.log('feed state: ', state);
  return {
    currentUser: state.userProfile.currentUser,
    inputText: state.userProfile.createUser,
  };
}

  // return {
  //   onClick: function (id) {
  //     dispatch(toggleTodo(id));
  //   } 
  // }

// createUserInfo, updateInputText
function mapDispatchToProps(dispatch) {
  return bindActionCreators(CreateRequestActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
