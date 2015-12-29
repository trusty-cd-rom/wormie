import { bindActionCreators } from 'redux';
import { connect } from 'react-redux/native';
import CameraView from '../components/Camera';
import * as CameraActions from '../actions/camera';

function mapStateToProps(state) {
  return {
  	cameraState: state.camera,
  	pendingWormholeSubmission: state.pendingWormholeSubmission,
  	currentUser: state.userProfile.currentUser,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(CameraActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CameraView);