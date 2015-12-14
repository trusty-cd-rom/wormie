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

import ViewRequest from '../containers/ViewRequest';
import OpenWormhole from '../containers/OpenWormhole.js';
import MySubmissions from './MySubmissions.js';
import MyWormholes from './MyWormholes.js';
import Badge from './Badge';
import ScrollableTabView from 'react-native-scrollable-tab-view';

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
    flex: 'flex',
    marginBottom: 49,
    flex: 3,
    backgroundColor: 'white',
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
    alignSelf: 'stretch',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#48BBEC'
  },
  submission: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'stretch',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'orange'
  },
});

class Profile extends Component{


        // <MyWormholes 
        //   wormholes = {this.props.wormholes}
        //   updateCurrentWormhole = {this.props.updateMyCurrentWormhole}
        //   updateMyCurrentWormhole = {this.props.updateMyCurrentWormhole}
        //   myCurrentWormhole = {this.props.myCurrentWormhole}
        //   navigator = {this.props.navigator}
        // />
        // <MySubmissions
        //   submissions = {this.props.submissions}
        //   updateMyCurrentSubmission = {this.props.updateMyCurrentSubmission}
        //   updateCurrentSubmission = {this.props.updateMyCurrentSubmission}
        //   myCurrentSubmission = {this.props.myCurrentSubmission}
        //   navigator = {this.props.navigator}
        // />
        // <ScrollableTabView renderTabBar={() => <CustomTabBar someProp={'here'} />}>

  render() {
    var { currentUser, submissions, wormholes, updateMyCurrentWormhole, updateMyCurrentSubmission } = this.props;
    return (
      //use {} for anything that is not html or text. this allows you to run JS in JSX
      <View style={styles.container}>
        <View style={{marginTop: 10, alignSelf: 'stretch', flexDirection: 'row'}}>
          <Badge 
            style={{flex: 3, flexDirection: 'row'}} 
            currentUser={this.props.currentUser} 
            navigator={this.props.navigator}
            profile="true"
            goToCreateRequest={this.goToCreateRequest}
          />
          
        </View>
        <ScrollableTabView>
          <MyWormholes 
            tabLabel="My Wormholes"
            wormholes = {this.props.wormholes}
            updateCurrentWormhole = {this.props.updateMyCurrentWormhole}
            updateMyCurrentWormhole = {this.props.updateMyCurrentWormhole}
            myCurrentWormhole = {this.props.myCurrentWormhole}
            navigator = {this.props.navigator}
          />
          <MySubmissions 
            tabLabel="My Submissions"
            submissions = {this.props.submissions}
            updateMyCurrentSubmission = {this.props.updateMyCurrentSubmission}
            updateCurrentSubmission = {this.props.updateMyCurrentSubmission}
            myCurrentSubmission = {this.props.myCurrentSubmission}
            navigator = {this.props.navigator}
          />
        </ScrollableTabView>
      </View>
    );
  }
};

export default Profile;
