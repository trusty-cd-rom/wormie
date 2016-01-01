import React, {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';

import { Icon } from 'react-native-icons';
import CreateRequest from '../containers/CreateRequest';

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#4CC6EA',
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'flex-start',
    flex: 1,
    padding: 8,
    marginBottom: 23
  },
  infoContainer: {
    // color: 'black',
    paddingTop: 20,
    alignSelf: 'flex-start'
  },
  name: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
    marginBottom: 5,
  },
  handle: {
    fontSize: 16,
    color: '#b8f6ff'
  },
  image: {
    height: 70,
    width: 70,
    borderRadius: 35,
    marginTop: 22,
    alignSelf: 'center',
    marginLeft: 8,
    marginRight: 10
  },
  button: {
    paddingTop: 15,
    flex: 1,
    flexDirection:'column',
    alignItems:'flex-end',
    paddingRight: 7,
  },
  ionic: { 
    width: 40, 
    height: 40,
  }
});

class Badge extends React.Component{

  componentWillMount() {
    var {clickedUser,currentUser,updateProfile,} = this.props;
    console.log('clickedUser', clickedUser);
    console.log('currentUser', currentUser);
    console.log('updateProfile', updateProfile);
  }

  goToCreateRequest() {
    var { navigator } = this.props;
    this.props.navigator.push({
      component: CreateRequest
    })
  }

  image() {
    var { currentUser, clickedUser } = this.props;
    if ( !clickedUser ) {
      return (
        <Image 
          style = {styles.image}
          source = {{uri: currentUser['picture_url']}}
        />
      );    
    // clicked user exist
    } else {
      return (
        <Image 
          style = {styles.image}
          source = {{uri: clickedUser['picture_url']}}
        />
      );
    }
  }

  info() {
    var { currentUser, updateProfile, profile, clickedUser, } = this.props;
    if ( clickedUser ) {
      return (
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{clickedUser['username']}</Text>
          <Text style={styles.handle}>{clickedUser['about_me']}</Text>
        </View>
      );
    } else if ( updateProfile.username.length > 0 || updateProfile.about_me.length > 0 ){
      return (
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{updateProfile['username'] || currentUser['username'] }</Text>
          <Text style={styles.handle}>{updateProfile['about_me'] || currentUser['about_me'] }</Text>
        </View>
      );
    // clicked user exist
    } else if ( currentUser ) {
      return (
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{currentUser['username']}</Text>
          <Text style={styles.handle}>{currentUser['about_me']}</Text>
        </View>
      );
    }
  }

  button() {
    var { profile, currentUser, clickedUser, fromFeed } = this.props;
    console.log('current username: ',currentUser.username);
    if ((fromFeed === undefined) && (clickedUser && (clickedUser.username == currentUser.username )) && profile === 'true') {
      return (
        <View style={ styles.button }>
          <TouchableHighlight
            onPress = { this.goToCreateRequest.bind(this)}
            underlayColor='#4CC6EA'
            style={{flex:1, marginTop: 20, marginRight: 6}}
          >
            <Icon
              name='ion|plus-round'
              size={40}
              color='white'
              style={styles.ionic}
            />
          </TouchableHighlight>
        </View>
      );
    } else {
      return <View />
    }
  }

  render() {
    return (
      <View style = {styles.container}>
        { this.image() }
        { this.info() }
        { this.button() }
      </View>
      
    );
  }
}

// Badge.propTypes = {
//   userInfo: React.PropTypes.object.isRequired
// }

export default Badge;
