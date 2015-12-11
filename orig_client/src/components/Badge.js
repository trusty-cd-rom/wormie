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
  }
});

class Badge extends React.Component{
  componentWillMount() {
    console.log(this.props.currentUser);
  }
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
      </View>
      
    );
  }
}

// Badge.propTypes = {
//   userInfo: React.PropTypes.object.isRequired
// }

export default Badge;
