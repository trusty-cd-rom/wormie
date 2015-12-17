import { bindActionCreators } from 'redux';
import { connect } from 'react-redux/native';
import Yelp from '../components/Yelp';
import * as YelpActions from '../actions/yelp';

function mapStateToProps(state) {
  return {
    // updateProfile: state.userProfile.updateProfile,
    // currentUser: state.userProfile.currentUser,
  };
}

// 
function mapDispatchToProps(dispatch) {
  return bindActionCreators(YelpActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Yelp);
