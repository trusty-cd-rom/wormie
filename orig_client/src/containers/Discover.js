import { bindActionCreators } from 'redux';
import { connect } from 'react-redux/native';
import Discover from '../components/Discover';
import * as DiscoverActions from '../actions/discover';

function mapStateToProps(state) {
  return {
    // updateProfile: state.userProfile.updateProfile,
    // currentUser: state.userProfile.currentUser,
  };
}

// 
function mapDispatchToProps(dispatch) {
  return bindActionCreators(DiscoverActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Discover);
