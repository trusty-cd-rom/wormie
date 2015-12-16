import { bindActionCreators } from 'redux';
import { connect } from 'react-redux/native';
import Profile from '../components/Profile';
import * as ProfileActions from '../actions/profile';

function mapStateToProps(state) {
  return {
    currentUser: state.userProfile.currentUser,
    updateProfile: state.userProfile.updateProfile,
    // submissions: state.userProfile.currentUser.submissions,
    // wormholes: state.userProfile.currentUser.wormholes,
    
    clickedUser: state.profile.clickedUser,
    submissions: state.profile.clickedUser.submissions,
    wormholes: state.profile.clickedUser.wormholes,
    
    peekClickedUser: state.profile.peekClickedUser,

    myCurrentSubmission: state.profile.myCurrentSubmission,
    myCurrentWormhole: state.profile.myCurrentWormhole,
    myCurrentWormholeSubmissions: state.profile.myCurrentWormholeSubmissions,
    isAnimating: state.profile.isAnimating,
    otherUser: state.profile.otherUser
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ProfileActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
