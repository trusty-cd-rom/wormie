import { bindActionCreators } from 'redux';
import { connect } from 'react-redux/native';
import DiscoverSearch from '../components/DiscoverSearch';
import * as DiscoverSearchActions from '../actions/discoverSearch';

function mapStateToProps(state) {
  return {
    // updateProfile: state.userProfile.updateProfile,
    category: state.discover.category,
    term: state.discover.term,
    location: state.discover.location,
    responseList: state.discover.responseList,
    coordinates: state.discover.coordinates,
  };
}

// 
function mapDispatchToProps(dispatch) {
  return bindActionCreators(DiscoverSearchActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DiscoverSearch);
