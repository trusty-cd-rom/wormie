import { bindActionCreators } from 'redux';
import { connect } from 'react-redux/native';
import Signup from '../components/Signup';
import * as FeedListActions from '../actions/feedList';

function mapStateToProps(state) {
  console.log('feed state: ', state);
  return {
    currentUser: state.userProfile.currentUser
  };
}

function mapDispatchToProps(dispatch) {
  // return {
  //   onClick: function (id) {
  //     dispatch(toggleTodo(id));
  //   } 
  // }
  return bindActionCreators(FeedListActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
