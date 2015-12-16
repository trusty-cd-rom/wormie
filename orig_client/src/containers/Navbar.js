import { bindActionCreators } from 'redux';
import { connect } from 'react-redux/native';
import Navbar from '../components/Navbar';
import * as ProfileActions from '../actions/profile';

function mapStateToProps(state) {
  // console.log('feed state!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!: ', state);
  return {
    currentUser: state.userProfile.currentUser,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ProfileActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
