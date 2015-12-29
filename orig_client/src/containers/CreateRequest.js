import { bindActionCreators } from 'redux';
import { connect } from 'react-redux/native';
import CreateRequest from '../components/CreateRequest';
import * as CreateRequestActions from '../actions/createRequest';

function mapStateToProps(state) {
	// console.log('CreateRequest mapStateToProps: ', state);
	// console.log(state.userProfile.createRequest.keyboardSpace);
  return {
    currentUser: state.userProfile.currentUser,
    inputText: state.userProfile.createRequest,
    target: state.discover.target,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(CreateRequestActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateRequest);
