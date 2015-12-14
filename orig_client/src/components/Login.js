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
          <Text style={styles.logo}>WORMIE</Text>
        </View>
        <Text style={styles.subtitle}>LET'S GO EXPLORING</Text>
        <Facebook navigator={this.props.navigator} style={styles.facebookButton}/>
      <View style={styles.bottomLayer}>
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 60,
    textAlign: 'center',
    alignSelf: 'center',
    color: '#39247F',
    margin: 10,
  },
  subtitle: {
    fontSize: 20,
    textAlign: 'center',
    alignSelf: 'center',
    color: '#39247F',
    flex: 1
  },
  splashImage: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'center',
    flex: 4,
    backgroundColor: 'white'
  },
  facebookButton: {
    paddingBottom: 50
  },
  bottomLayer: {
    margin: 30
  }
});

export default Login;
