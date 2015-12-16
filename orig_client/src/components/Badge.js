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
    backgroundColor: 'white',
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'flex-start',
    flex: 1,
    paddingTop: 20,
    marginBottom: 23
  },
  infoContainer: {
    // color: 'black',
    alignSelf: 'flex-start'
  },
  name: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#3e3e3e',
    marginTop: 10,
    marginBottom: 5,
  },
  handle: {
    fontSize: 16,
    color: '#727272'
  },
  image: {
    height: 70,
    width: 70,
    borderRadius: 35,
    marginTop: 2,
    alignSelf: 'center',
    marginLeft: 8,
    marginRight: 10
  },
  button: {
    flex: 1,
    flexDirection:'column',
    alignItems:'flex-end',
    paddingRight: 7,
  },
  ionic: { 
    width: 30, 
    height: 30,
  }
});

class Badge extends React.Component{

  goToCreateRequest() {
    var { navigator } = this.props;
    this.props.navigator.push({
      component: CreateRequest
    })
  }

  name() {
    var { currentUser, updateProfile, profile, clickedUser, } = this.props;
    if ( updateProfile.username.length > 0 ){
      return <Text style={styles.name}>{updateProfile['username']}</Text>
    // clicked user exist
    } else if ( clickedUser ) {
      return <Text style={styles.name}>{clickedUser['username']}</Text>
    } else if ( currentUser ) {
      return <Text style={styles.name}>{currentUser['username']}</Text>
    }
  }

  about_me() {
    var { currentUser, updateProfile, profile, clickedUser} = this.props;
    if ( updateProfile.about_me.length > 0 ){
      return <Text style={styles.handle}>{updateProfile['about_me']}</Text>
    // clicked user exist
    } else if ( clickedUser ) {
      return <Text style={styles.handle}>{clickedUser['about_me']}</Text>
    } else if ( currentUser ) {
      return <Text style={styles.handle}>{currentUser['about_me']}</Text>
    }
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
    if ( updateProfile.username.length > 0 ){
      return (
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{updateProfile['username']}</Text>
          <Text style={styles.handle}>{updateProfile['about_me']}</Text>
        </View>
      );
    // clicked user exist
    } else if ( clickedUser ) {
      return (
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{clickedUser['username']}</Text>
          <Text style={styles.handle}>{clickedUser['about_me']}</Text>
        </View>
      );
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
    var { profile, currentUser, clickedUser } = this.props;
    console.log('current username: ',currentUser.username);
    if ((clickedUser && (clickedUser.username == currentUser.username )) && profile === 'true') {
      return (
        <View style={ styles.button }>
          <TouchableHighlight
            onPress = { this.goToCreateRequest.bind(this)}
            style={{flex:1, marginTop: 20, marginRight: 6}}
          >
            <View
              style={{
                backgroundColor:'#39247f',
                width: 30,
                height: 30,
              }}>
              <Icon
                name='ion|plus-round'
                size={30}
                color='white'
                style={styles.ionic}
              />
            </View>
          </TouchableHighlight>
        </View>
      );
    } else {
      return <View />
    }
  }

  render() {
    var { currentUser, updateProfile } = this.props;
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
