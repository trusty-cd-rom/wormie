import { bindActionCreators } from 'redux';
import { connect } from 'react-redux/native';
import OpenWormhole from '../components/OpenWormhole';
import * as OpenWormholeActions from '../actions/openWormhole';

function mapStateToProps(state) {
  return {
    currentWormhole: state.currentWormhole,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(OpenWormholeActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(OpenWormhole);