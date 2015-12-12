import { bindActionCreators } from 'redux';
import { connect } from 'react-redux/native';
import CreateRequest from '../components/CreateRequest';
import * as CreateRequestActions from '../actions/createRequest';

function mapStateToProps(state) {
	// console.log('CreateRequest mapStateToProps: ', state);
  return {
    currentUser: state.userProfile.currentUser,
    inputText: state.userProfile.createRequest,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(CreateRequestActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateRequest);