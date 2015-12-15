import React, {
  Component,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableHighlight,
  TextInput,
} from 'react-native';
import Badge from '../components/Badge';
// import updateUserProfile from '../actions/updateUserProfile.js';
import Location from './Location';

class Signup extends Component {

  // componentWillMount() {
  //   var { getUserDataFromFB } = this.props;
  //   getUserDataFromFB();
  // }

  goToLocation() {
    this.props.navigator.replace({
      component: Location
    });
  }

  handleSubmit(cb) {

    console.log("handling submit!");
    
    var { updateProfile, updateUserProfile, currentUser } = this.props;

    var accountUpdate = {
      user_id: currentUser.id,
      account_id: currentUser.account_id,
      username: updateProfile.username,
      wormie_color: updateProfile.wormie_color,
      about_me: updateProfile.about_me
    };
    // Not dealing with username yet


    console.log(accountUpdate);

    updateUserProfile(accountUpdate, cb);
  };

  // TODO: require updateinputtext from signup-containter.js
  handleInputChange(fieldName, event) {
    //input has the value nativeElement
    var { updateSignUpInputText } = this.props;
    updateSignUpInputText(fieldName, event.nativeEvent.text);
  }

  render() {
    var { updateProfile, currentUser } = this.props;

    return (
      <View style={styles.container}>
        <Badge currentUser={this.props.currentUser} />
        <Text style={styles.title}>
          Choose a Wormie username:
        </Text>
        <TextInput
          style = {styles.searchInput}
          value = {currentUser.username}
          onChange = {this.handleInputChange.bind(this, 'username')}
        />
        <Text style={styles.title}>
          Say something to the world:
        </Text>
        <TextInput
          style = {styles.searchInput}
          value = {currentUser.about_me}
          onChange = {this.handleInputChange.bind(this, 'about_me')}
        />
        <View style={styles.splashImage}>
          <Text style={styles.buttonText}> COLOR PICKER </Text>
        </View>
        <TouchableHighlight
          style = {styles.loginButton}
          onPress = {this.handleSubmit.bind(this, () => {this.goToLocation()})}
          underlayColor = '#88D4f5'>
          <Text style = {styles.buttonText}> Explore </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#39247F',
  },
  badgeContainer: {
    backgroundColor: 'black',
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'flex-start',
    flex: 1,
    paddingTop: 50,
    paddingBottom: 40
  },
  badgeInfoContainer: {

  },
  badgeName: {
    alignSelf: 'center',
    justifyContent: 'flex-start',
    fontSize: 21,
    marginTop: 10,
    marginBottom: 5,
    color: 'white'
  },
  badgeHandle: {
    alignSelf: 'center',
    fontSize: 16,
    color: 'white'
  },
  badgeImage: {
    height: 100,
    width: 100,
    borderRadius: 50,
    marginTop: 10,
    alignSelf: 'center',
    marginLeft: 10,
    marginRight: 30
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  splashImage: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'center',
    flex: 4,
    backgroundColor: '#39247F'
  },
  loginButton: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#48BBEC'
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
    alignSelf: 'center'
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
    color: '#fff'
  },
  searchInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white'
  },
});

export default Signup;
