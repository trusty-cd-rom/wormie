import { bindActionCreators } from 'redux';
import { connect } from 'react-redux/native';
import SubmitWormhole from '../components/SubmitWormhole';
import * as SubmitWormholeActions from '../actions/submitWormhole';

function mapStateToProps(state) {
  return {
    currentWormhole: state.currentWormhole,
    currentUser: state.userProfile.currentUser,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(SubmitWormholeActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmitWormhole);