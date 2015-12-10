import React, {
  Component,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';
// import Signup from '../components/Signup';
import Navbar from './Navbar';

class Location extends Component {
  goToHome() {
    this.props.navigator.replace({
      component: Navbar
    });
  }
  render() {
    // var { increment, incrementIfOdd, incrementAsync, decrement, counter } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.splashImage}>
          <Text style={styles.buttonText}> Can i has location? </Text>
        </View>
        <TouchableHighlight
          style = {styles.loginButton}
          onPress = {this.goToHome.bind(this)}
          underlayColor = '#88D4f5'
        >
          <Text style = {styles.buttonText}> Location OK~! </Text>
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
    backgroundColor: '#F5FCFF',
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
  }
});

export default Location;
