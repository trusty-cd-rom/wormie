import { bindActionCreators } from 'redux';
import { connect } from 'react-redux/native';
import FeedList from '../components/FeedList';
import * as FeedListActions from '../actions/feedList';

function mapStateToProps(state) {
  return {
    feed: state.feed.list,
    // object {latitude: , longitude: }
    currentLocation: state.feed.location,
    currentUser: state.userProfile.currentUser,
    peekClickedUser: state.profile.peekClickedUser,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(FeedListActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedList);
