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
// import Badge from '../containers/Badge';

var styles = StyleSheet.create({
  container:{
    marginTop: 20,
    flex: 1,
    backgroundColor: 'white',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  image: {
    height: 350
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
    alignSelf: 'center'
  },
  request: {
    flexDirection: 'row',
    // alignSelf: 'stretch',
    // justifyContent: 'center',
    flex: 1,
    backgroundColor: '#48BBEC'
  },
  submission: {
    flexDirection: 'row',
    // alignSelf: 'stretch',
    // justifyContent: 'center',
    flex: 1,
    backgroundColor: 'orange'
  },
});

class Profile extends Component{
  constructor(props) {
    super(props);
    console.log('props', props);
  }

  viewRequest(index) {
    var { currentUser, submissions, wormholes, updateCurrentWormhole } = this.props;
    console.log('trying to view request: ', index, feed[index]);
    
    // UPDATECURRENTWORMHOLE
    // this function is setting current Wormhole to set the top-state
    // top state will contain information about what the current wormhole is
    // current wormhole is the next page after user press current request
    updateCurrentWormhole(feed[index]);
    if(feed[index].status === 'open') {
      this.props.navigator.push({
        component: OpenWormhole,
      });
    } else {
      this.props.navigator.push({
        component: ViewRequest,
      });
    }
  }

  createRequest() {
    this.props.navigator.push({
      component: CreateRequest
    });
  }

  createList(array, styleButton) {
    return array.map((item, index) => {
      return (
        <View key = {index}>
          <TouchableHighlight
            style = {styleButton}
            onPress = {this.viewRequest.bind(this, index)}
            underlayColor = 'purple'
          >
            <View>
              <Text style = {styles.buttonText}>Request: {index} </Text>
              <Text > {item.title} </Text>
            </View>
          </TouchableHighlight>
        </View>
      );
    });
  }
  // viewRequest() {
  //   this.props.navigator.push({
  //     component: ViewRequest,
  //   });
  // }
        // <TouchableHighlight
        //   style = {styles.loginButton}
        //   onPress = {this.createRequest.bind(this)}
        //   underlayColor = '#88D4f5'
        // >
        //   <Text style = {styles.buttonText}> New Request </Text>
        // </TouchableHighlight>

        // <TouchableHighlight
        //   style = {[styles.loginButton,{backgroundColor: 'orange'}]}
        //   onPress = {this.viewRequest.bind(this)}
        //   underlayColor = 'purple'
        // >
        //   <Text style = {styles.buttonText}> View Request </Text>
        // </TouchableHighlight>
  
  render() {
    var { currentUser, submissions, wormholes, updateCurrentWormhole } = this.props;
    return (
      //use {} for anything that is not html or text. this allows you to run JS in JSX
      <View style={styles.container}>
        <View>
          <Text>My Requests</Text>
          {this.createList(wormholes, styles.request)}
        </View>
        <View>
          <Text>My Submissions</Text>
          {this.createList(submissions, styles.submission)}
        </View>
      </View>
    );
  }
};

export default Profile;
