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
    paddingBottom: 20
  },
  infoContainer: {
  },
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
  image: {
    height: 100,
    width: 100,
    borderRadius: 50,
    marginTop: 2,
    alignSelf: 'center',
    marginLeft: 10,
    marginRight: 30
  },
  button: {
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'flex-end'
  },
  ionic: { 
    width: 50, 
    height: 50, 
    marginLeft: 15, 
    marginTop: 15, 
    color: '#5c5b9d', 
  }
});

class Badge extends React.Component{

  goToCreateRequest() {
    var { navigator } = this.props;
    this.props.navigator.push({
      component: CreateRequest
    })
  }

  // <Text style={{marginTop: 30, backgroundColor: "purple", color: "black"}}> + </Text>
  button() {
    var { profile } = this.props;
    if (profile === 'true') {
      return (
        <View style={ styles.button }>
          <TouchableHighlight
            onPress = { this.goToCreateRequest.bind(this) }
          >
            <Icon
              name='ion|plus-circled'
              size={50}
              color='#5c5b9d'
              style={styles.ionic}
            />
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
          <Text style = {styles.name}> {currentUser.username}  </Text>
          <Text style = {styles.handle}> {currentUser['about_me']} </Text>
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
