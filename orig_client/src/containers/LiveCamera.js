import { bindActionCreators } from 'redux';
import { connect } from 'react-redux/native';
import LiveCamera from '../components/LiveCamera';
import * as LiveCameraActions from '../actions/liveCamera';

function mapStateToProps(state) {
	console.log('livecamera state', state.currentWormhole);
	console.log('livecamera state camera', state.liveCamera);
  return {
  	liveCamera: state.liveCamera,
  	currentWormhole: state.currentWormhole,
  	currentUser: state.userProfile.currentUser
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(LiveCameraActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LiveCamera);
