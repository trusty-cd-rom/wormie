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
import Location from './Location';

class Signup extends Component {
  // constructor(props) {
  //   super(props);

    // this.state = {
    //   username: '',
    //   aboutMe: '',
    //   // isLoading: false,
    //   error: false
    // }
  // }

  goToLocation() {
    this.props.navigator.replace({
      component: Location
    });
  }
  // TODO: require updateinputtext from signup-containter.js
  handleInputChange(fieldName, event) {
    //input has the value nativeElement
    var { updateInputText } = this.props;
    updateInputText(fieldName, event.nativeEvent.text);
    this.setState({
      username: event.nativeEvent.text
    });
  }
  handleAboutMeChange(event) {
    //input has the value nativeElement
    this.setState({
      aboutMe: event.nativeEvent.text
    });
  }
  render() {
    // var { increment, incrementIfOdd, incrementAsync, decrement, counter } = this.props;
        // <View style = {styles.badgeContainer}>
        //   <Image 
        //     style = {styles.badgeImage}
        //     source = {{uri: currentUser['picture_url']}}
        //   />
        //   <View>
        //     <Text style = {styles.badgeName}> `${currentUser['first_name']} ${currentUser['last_name']}` </Text>
        //     <Text style = {styles.badgeHandle}> {currentUser.location} </Text>
        //   </View>
        // </View>
    var { currentUser } = this.props;
    return (
      <View style={styles.container}>
        <Badge currentUser={this.props.currentUser} />
        <Text style={styles.title}>
          Username
        </Text>
        <TextInput
          style = {styles.searchInput}
          value = {this.state.username}
          onChange = {this.handleUsernameChange.bind(this)}
        />

        <Text style={styles.title}>
          Tell us about yourself
        </Text>
        <TextInput
          style = {styles.searchInput}
          value = {this.state.aboutMe}
          onChange = {this.handleAboutMeChange.bind(this)}
        />


        <View style={styles.splashImage}>
          <Text style={styles.buttonText}> COLOR PICKER </Text>
        </View>

        <TouchableHighlight
          style = {styles.loginButton}
          onPress = {this.goToLocation.bind(this)}
          underlayColor = '#88D4f5'
        >
          <Text style = {styles.buttonText}> Explore </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
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
    backgroundColor: 'black'
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
