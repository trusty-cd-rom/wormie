import { bindActionCreators } from 'redux';
import { connect } from 'react-redux/native';
import ViewMySubmission from '../components/ViewMySubmission';
import * as ProfileActions from '../actions/profile';

function mapStateToProps(state) {
  return {
    currentUser: state.userProfile.currentUser,
    myCurrentSubmission: state.profile.submission,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ProfileActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewMySubmission);
