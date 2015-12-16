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
    let { peekClickedUser, setClickedProfile, currentUser } = this.props;
    // if there is no clicked user(friends/others)
    if (!peekClickedUser) {
      console.log('current username!!!!!!!!!!!!!!!', currentUser);
      // set currentUser to clickedUser
      setClickedProfile(currentUser);
    // this will be set from feedlist
    } 
    // else {
    //   setClickedProfile(clickedUser);
    // }
  }

  // TODO: updateProfile

  // TODO: updateProfile
  topbar() {
    let { profile, stopClickedUser, currentUser, clickedUser } = this.props;
    // toggle peek_clicked_user(friends/others)
    console.log('current username: ',currentUser.username);
    console.log('clicked user: ', clickedUser.username);
    console.log('profile: ', profile)
    if ((clickedUser && (clickedUser.username == currentUser.username )) || profile === 'true') {
      return <View />
    } else {
      console.log('topbar!!!')
      return (
        <View
          style={{paddingTop: 20, flex:0.07}}
        >
          <Topbar 
            topbarTitle={clickedUser.username}
            navigator={this.props.navigator}
            stopClickedUser={this.props.stopClickedUser}
          />
        </View>
      );
    }
  }

  // TODO: spinner isAnimating, toggleAnimating
  render() {
    var { 
      submissions, 
      wormholes, 
      updateMyCurrentWormhole, 
      updateMyCurrentSubmission, 
      updateProfile,
      clickedUser,
      submissions
    } = this.props;
    return (
      //use {} for anything that is not html or text. this allows you to run JS in JSX
      <View style={styles.container}>
        { this.topbar() }
        <View 
          style={styles.badgeContainer}
        >
          <Badge 
            clickedUser={this.props.clickedUser}
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
            wormholes = {this.props.wormholes}
            updateMyCurrentWormholeList = {this.props.updateMyCurrentWormholeList}
            myCurrentWormhole = {this.props.myCurrentWormhole}
            navigator = {this.props.navigator}
          />
          <MySubmissions 
            tabLabel="Connections"
            {...this.props}
            submissions = {this.props.submissions}
            updateMyCurrentSubmission = {this.props.updateMyCurrentSubmission}
            myCurrentSubmission = {this.props.myCurrentSubmission}
          />
        </ScrollableTabView>
      </View>
    );
  }
};

export default Profile;
