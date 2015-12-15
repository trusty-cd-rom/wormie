import { bindActionCreators } from 'redux';
import { connect } from 'react-redux/native';
import ViewMyWormhole from '../components/ViewMyWormhole';
import * as ProfileActions from '../actions/profile';

function mapStateToProps(state) {
  console.log('state:', state);
  return {
    myCurrentWormhole: state.myCurrentWormhole,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ProfileActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewMyWormhole);
