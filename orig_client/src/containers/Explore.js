import { bindActionCreators } from 'redux';
import { connect } from 'react-redux/native';
import Explore from '../components/Explore';
import * as ExploreActions from '../actions/explore';

function mapStateToProps(state) {
  return {
    feed: state.feed.list,
    // location of the user
    currentLocation: state.feed.location,
    // tab for map/list in the explore page
    currentFeedTab: state.feed.tab,
    currentUser: state.userProfile.currentUser,
    peekClickedUser: state.profile.peekClickedUser,
    currentWormhole: state.currentWormhole,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ExploreActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Explore);
