import { bindActionCreators } from 'redux';
import { connect } from 'react-redux/native';
import ViewMyWormholeList from '../components/ViewMyWormholeList';
import * as ProfileActions from '../actions/profile';

function mapStateToProps(state) {
  return {
    // current wormhole with submissions
    myCurrentWormholeList: state.profile.submissionsForWormholes,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ProfileActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewMyWormholeList);
