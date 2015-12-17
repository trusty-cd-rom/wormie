import { bindActionCreators } from 'redux';
import { connect } from 'react-redux/native';
import MapExplore from '../components/MapExplore';
import * as MapExploreActions from '../actions/mapExplore';

function mapStateToProps(state) {
  return {
    feed: state.feed,
    currentUser: state.userProfile.currentUser,
    peekClickedUser: state.profile.peekClickedUser,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(MapExploreActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MapExplore);
