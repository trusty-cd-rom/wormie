import React, {
  Component,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TextInput,
} from 'react-native';
import Badge from '../components/Badge';
// import FeedList from './FeedList';
import Navbar from './Navbar';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      aboutMe: '',
      // isLoading: false,
      error: false
    }
  }
  goToFeed() {
    this.props.navigator.replace({
      component: Navbar
    });
  }
  handleUsernameChange(event) {
    //input has the value nativeElement
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
    return (
      <View style={styles.container}>

        <Badge />

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
          onPress = {this.goToFeed.bind(this)}
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
