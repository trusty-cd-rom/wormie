import { bindActionCreators } from 'redux';
import { connect } from 'react-redux/native';
import Explore from '../components/Explore';
import * as ExploreActions from '../actions/explore';

function mapStateToProps(state) {
  return {
    feed: state.feed,
    currentUser: state.userProfile.currentUser,
    peekClickedUser: state.profile.peekClickedUser,
    currentWormhole: state.currentWormhole,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ExploreActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Explore);
