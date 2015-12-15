import { bindActionCreators } from 'redux';
import { connect } from 'react-redux/native';
import Profile from '../components/Profile';
import * as ProfileActions from '../actions/profile';

function mapStateToProps(state) {
  return {
    currentUser: state.userProfile.currentUser,
    updateProfile: state.userProfile.updateProfile,
    submissions: state.userProfile.currentUser.submissions,
    wormholes: state.userProfile.currentUser.wormholes,
    myCurrentSubmission: state.profile.myCurrentSubmission,
    myCurrentWormhole: state.profile.myCurrentWormhole,
    myCurrentWormholeSubmissions: state.profile.myCurrentWormholeSubmissions,
    isAnimating: state.profile.isAnimating,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ProfileActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
