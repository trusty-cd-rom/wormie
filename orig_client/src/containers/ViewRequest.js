import { bindActionCreators } from 'redux';
import { connect } from 'react-redux/native';
import ViewRequest from '../components/ViewRequest';
import * as ViewRequestActions from '../actions/viewRequest';

function mapStateToProps(state) {
  return {
    // counter: state.counter
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ViewRequestActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewRequest);