import { bindActionCreators } from 'redux';
import { connect } from 'react-redux/native';
import DiscoverRequest from '../components/DiscoverRequest';
import * as DiscoverRequestActions from '../actions/discoverRequest';

function mapStateToProps(state) {
  return {
    target: state.discover.target,
  };
}

// 
function mapDispatchToProps(dispatch) {
  return bindActionCreators(DiscoverRequestActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DiscoverRequest);
