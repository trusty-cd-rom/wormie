/************ FEED *************/
import React, {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Component,
  TouchableHighlight,
} from 'react-native';
import CreateRequest from '../containers/CreateRequest';
import ViewRequest from '../containers/ViewRequest';

var styles = StyleSheet.create({
  container:{
    marginTop: 20,
    flex: 1,
    backgroundColor: 'blue'
  },
  image: {
    height: 350
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
    alignSelf: 'center'
  },
  loginButton: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#48BBEC'
  },
});

class Profile extends Component{
  createRequest() {
    this.props.navigator.push({
      component: CreateRequest
    });
  }
  viewRequest() {
    this.props.navigator.push({
      component: ViewRequest,
    });
  }
  render() {
    return (
      //use {} for anything that is not html or text. this allows you to run JS in JSX
      <View style={styles.container}>
        <TouchableHighlight
          style = {styles.loginButton}
          onPress = {this.createRequest.bind(this)}
          underlayColor = '#88D4f5'
        >
          <Text style = {styles.buttonText}> New Request </Text>
        </TouchableHighlight>

        <TouchableHighlight
          style = {[styles.loginButton,{backgroundColor: 'orange'}]}
          onPress = {this.viewRequest.bind(this)}
          underlayColor = 'purple'
        >
          <Text style = {styles.buttonText}> View Request </Text>
        </TouchableHighlight>

      </View>
    );
  }
};

export default Profile;