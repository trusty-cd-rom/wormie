import Facebook from '../containers/Facebook';

import React, {
  Component,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';
import Signup from '../containers/Signup';

class Login extends Component {
  goToSignup() {
    this.props.navigator.replace({
      component: Signup
    });
  }
  render() {
    // var { increment, incrementIfOdd, incrementAsync, decrement, counter } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.splashImage}>
          <Text style={styles.buttonText}>WORMIE</Text>
        </View>
        <Facebook navigator={this.props.navigator} style={styles.facebookButton}/>
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
    fontSize: 60,
    textAlign: 'center',
    margin: 10,
  },
  splashImage: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'center',
    flex: 4,
    backgroundColor: 'white'
  },
  facebookButton: {
    margin: 50,
    flex: 2
  },
  loginButton: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#39247F',
    color: 'white'
  },
  buttonText: {
    fontSize: 50,
    color: '#39247F',
    alignSelf: 'center'
  }
});

export default Login;
