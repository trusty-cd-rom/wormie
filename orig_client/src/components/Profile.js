/************ PROFILE *************/
import React, {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Component,
  Image,
  TouchableHighlight,
} from 'react-native';
import CreateRequest from '../containers/CreateRequest';
import ViewRequest from '../containers/ViewRequest';
import OpenWormhole from '../containers/OpenWormhole.js';
import Badge from './Badge';

var styles = StyleSheet.create({
  name: {
    alignSelf: 'center',
    justifyContent: 'flex-start',
    fontSize: 21,
    marginTop: 10,
    marginBottom: 5,
    color: 'white'
  },
  handle: {
    alignSelf: 'center',
    fontSize: 16,
    color: 'white'
  },
  container:{
    marginTop: 0,
    flex: 3,
    backgroundColor: 'black',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  list: {
    flex: 3
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

  goToCreateRequest() {
    this.props.navigator.push({
      component: CreateRequest
    })
  }

  viewRequest(index, array, type) {
    var { currentUser, submissions, wormholes, updateCurrentWormhole } = this.props;
    console.log('trying to view request: ', wormholes, wormholes[index]);
    
    // UPDATECURRENTWORMHOLE
    // this function is setting current Wormhole to set the top-state
    // top state will contain information about what the current wormhole is
    // current wormhole is the next page after user press current request

    // TODO: after datastructure change
    if (type === 'wormholes') {
      list = wormholes;
      updateCurrentWormhole({submissions: [list[index]]});
    } else {
      list = submissions;
      updateCurrentWormhole({submissions: [list[index]]});
    }

    // debugger;
    if(list[index].status === 'open') {
      this.props.navigator.push({
        component: OpenWormhole,
      });
    } else {
      this.props.navigator.push({
        component: ViewRequest,
      });
    }
  }


  createList(array, styleButton, type) {
    return array.map((item, index) => {
      return (
        <View key = {index}>
          <TouchableHighlight
            style = {styleButton}
            onPress = {this.viewRequest.bind(this, index, array, type)}
            underlayColor = 'purple'
          >
            <View>
              <Text style = {styles.buttonText}>Request: {index} Status: {item.status} </Text>
              <Text > {item.title} </Text>
            </View>
          </TouchableHighlight>
        </View>
      );
    });
  }

  render() {
    var { currentUser, submissions, wormholes, updateCurrentWormhole } = this.props;
    return (
      //use {} for anything that is not html or text. this allows you to run JS in JSX
      <View style={styles.container}>
        <View style={{alignSelf: 'stretch', flexDirection: 'row'}}>
          <Badge style={{flex: 3}} currentUser={this.props.currentUser} />
          <TouchableHighlight
            onPress = { this.goToCreateRequest.bind(this) }
          >
            <Text style={{flex: 1, marginTop: 30, alignSelf: "center", backgroundColor: "purple", color: "black"}}> + </Text>
          </TouchableHighlight>
        </View>
        <View style = {styles.list}>
          <Text style = {{color: 'white'}}>My Requests</Text>
          {this.createList(wormholes, styles.request, 'wormholes')}
        </View>
        <View style = {styles.list}>
          <Text style = {{color: 'white'}}>My Submissions</Text>
          {this.createList(submissions, styles.submission, 'submissions')}
        </View>
      </View>
    );
  }
};

export default Profile;
