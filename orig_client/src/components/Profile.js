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
    backgroundColor: '#f4f4f4',
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
    // marginTop: 10, 
    // paddingTop: 20,
    marginBottom: -25, 
    alignSelf: 'stretch', 
    flexDirection: 'row'
  }
});

class Profile extends Component{
  componentWillMount() {
    let { peekClickedUser, setClickedProfile, currentUser } = this.props;
    // if there is no clicked user(friends/others)
    if (!peekClickedUser) {
      console.log('current username!!!!!!!!!!!!!!!', currentUser);
      // set currentUser to clickedUser
      setClickedProfile(currentUser);
    // this will be set from feedlist
    } 
  }

  // TODO: updateProfile
  topbar() {
    let { profile, currentUser, clickedUser, fromFeed } = this.props;
    // toggle peek_clicked_user(friends/others)
    console.log('current username: ',currentUser.username);
    console.log('clicked user: ', clickedUser.username);
    console.log('profile: ', profile)
    
    // if clicked user === current user
    // if the request is not from feedlist
    if ( (clickedUser && !fromFeed && (clickedUser.username == currentUser.username )) || (profile === 'true')) {
      return (
        <View>
          <Topbar 
            topbarTitle={'Profile'}
            noIcon={true}
            navigator={this.props.navigator}
          />
        </View>
      )

    // if the request if from feedList
    } else {
      console.log('topbar!!!')
      return (
        <View>
          <Topbar 
            topbarTitle={clickedUser.username}
            navigator={this.props.navigator}
          />
        </View>
      );
    }
  }

  badge() {
    if (this.props.fromFeed) {
      return (
        <Badge 
          clickedUser={this.props.clickedUser}
          currentUser={this.props.currentUser}
          updateProfile={this.props.updateProfile} 
          navigator={this.props.navigator}
          profile="true"
          fromFeed={this.props.fromFeed}
          goToCreateRequest={this.goToCreateRequest}
        />
      );
    } else {
      return (
        <Badge 
          clickedUser={this.props.clickedUser}
          currentUser={this.props.currentUser}
          updateProfile={this.props.updateProfile} 
          navigator={this.props.navigator}
          profile="true"
          goToCreateRequest={this.goToCreateRequest}
        />
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
        // { this.topbar() }
    return (
      //use {} for anything that is not html or text. this allows you to run JS in JSX
      <View style={styles.container}>
        <View 
          style={styles.badgeContainer}
        >
          { this.badge() }
        </View>
        <ScrollableTabView
          tabBarBackgroundColor='#4CC6EA'
          tabBarActiveTextColor='white'
          tabBarInactiveTextColor='#62ebff'
          tabBarUnderlineColor='#00ADC7'
          style={{flexWrap: 'wrap'}}
          >
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
