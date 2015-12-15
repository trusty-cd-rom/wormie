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
    var { currentUser } = this.props;
    console.log(currentUser);
    if (currentUser.username && currentUser.username !== '.') {
      return <Text style = {styles.name}>{currentUser['username']}</Text>
    } else {
      return <Text style = {styles.name}>{currentUser['first_name']} {currentUser['last_name']}  </Text>    
    }

  }

  // <Text style={{marginTop: 30, backgroundColor: "purple", color: "black"}}> + </Text>
  button() {
    var { profile } = this.props;
    if (profile === 'true') {
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
                height: 30
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

  // ion-plus-circled
  // var { Icon, } = require('react-native-icons');
  render() {
    var { currentUser } = this.props;
    return (
      <View style = {styles.container}>
        <Image 
          style = {styles.image}
          source = {{uri: currentUser['picture_url']}}
        />
        <View style={styles.infoContainer}>
          {this.name()}
          <Text style = {styles.handle}>{currentUser['about_me']}</Text>
        </View>
        { this.button() }
      </View>
      
    );
  }
}

// Badge.propTypes = {
//   userInfo: React.PropTypes.object.isRequired
// }

export default Badge;
