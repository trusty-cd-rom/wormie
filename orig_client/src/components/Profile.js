/************ PROFILE *************/
import React, {
  Text,
  TabBarIOS,
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
import Topbar from './Topbar';
import ScrollableTabView from 'react-native-scrollable-tab-view';

var styles = StyleSheet.create({
  container:{
    marginBottom: 49,
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
  badgeContainer: {
    marginTop: 10, 
    marginBottom: -20, 
    alignSelf: 'stretch', 
    flexDirection: 'row'
  }
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
  componentWillMount() {
    let { getUserInfo, currentUser } = this.props;
    console.log('currentUser: ', currentUser);
    getUserInfo(currentUser.id);
  }

  topbar() {
    let { updateProfile, currentUser } = this.props;
    console.log(updateProfile);
    console.log(currentUser);
    if (updateProfile) {
      console.log(currentUser);
      return (
        <View
          style={{paddingTop: 20, flex:0.07}}
        >
          <Topbar 
            topbarTitle={currentUser.username}
            navigator={this.props.navigator}
          />
        </View>
      );
    } else {
      return <View />
    }
  }

  render() {
    var { currentUser, submissions, wormholes, updateMyCurrentWormhole, updateMyCurrentSubmission, updateProfile } = this.props;
    return (
      //use {} for anything that is not html or text. this allows you to run JS in JSX
      <View style={styles.container}>
        { this.topbar() }
        <View 
          style={styles.badgeContainer}
        >
          <Badge 
            currentUser={this.props.currentUser}
            updateProfile={this.props.updateProfile} 
            navigator={this.props.navigator}
            profile="true"
            goToCreateRequest={this.goToCreateRequest}
          />
          
        </View>
        <ScrollableTabView
          style={{flexWrap: 'wrap'}}>
          <MyWormholes 
            tabLabel="Wormholes"
            {...this.props}
          />
          <MySubmissions 
            tabLabel="Connections"
            {...this.props}
          />
        </ScrollableTabView>
      </View>
    );
  }
};

export default Profile;
