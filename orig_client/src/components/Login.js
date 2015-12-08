import React, {
  Component,
  StyleSheet,
  Text,
  View,
} from 'react-native';

class Login extends Component {
  render() {
    var { increment, incrementIfOdd, incrementAsync, decrement, counter } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.text}> This is the Login Page</Text>
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
});

export default Login;
