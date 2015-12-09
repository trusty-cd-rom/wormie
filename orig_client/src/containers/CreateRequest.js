import { bindActionCreators } from 'redux';
import { connect } from 'react-redux/native';
import CreateRequest from '../components/CreateRequest';
import * as CreateRequestActions from '../actions/createRequest';

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    isFetching: state.isFetching
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(CreateRequestActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateRequest);