import React, {
  Text,
  View,
  Image,
  StyleSheet,
} from 'react-native';

var styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'flex-start',
    flex: 1,
    paddingTop: 50,
    paddingBottom: 40
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
    marginTop: 10,
    alignSelf: 'center',
    marginLeft: 10,
    marginRight: 30
  }
});

var MOCK_USER = {
  name: 'Charlie',
  avatar_url: 'http://rack.0.mshcdn.com/media/ZgkyMDE0LzA0LzE0LzdhLzk1Y2hhcmxpZWtuLjk2MDdlLmpwZwpwCXRodW1iCTEyMDB4OTYwMD4/a54e8b13/64c/95-charlie-knewton.jpg',
  location: 'San Francisco, CA',
  description: 'I love tacos!'
}

class Badge extends React.Component{

  render() {
    return (
      // <View style = {styles.container}>
      //   <Image 
      //     style = {styles.image}
      //     source = {{uri: this.props.userInfo.avatar_url}}
      //   />
      //   <Text style = {styles.name}> {this.props.userInfo.name} </Text>
      //   <Text style = {styles.handle}> {this.props.userInfo.login} </Text>
      // </View>
      <View style = {styles.container}>
        <Image 
          style = {styles.image}
          source = {{uri: MOCK_USER.avatar_url}}
        />
        <View style={styles.infoContainer}>
          <Text style = {styles.name}> {MOCK_USER.name} </Text>
          <Text style = {styles.handle}> {MOCK_USER.location} </Text>
        </View>
      </View>
      
    );
  }
}

Badge.propTypes = {
  userInfo: React.PropTypes.object.isRequired
}

export default Badge;