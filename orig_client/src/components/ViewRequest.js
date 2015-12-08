import React, {
  Component,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

class ViewRequest extends Component {
  back() {
    this.props.navigator.pop();
  }
  render() {
    // var { increment, incrementIfOdd, incrementAsync, decrement, counter } = this.props;
    return (
      <View style={styles.container}>

        <TouchableHighlight
          style = {styles.loginButton}
          onPress = {this.back.bind(this)}
          underlayColor = 'purple'
        >
          <Text style = {styles.buttonText}> Back </Text>
        </TouchableHighlight>

        <View style={[styles.loginButton,{backgroundColor:'red'}]}>
          <Text style={styles.title}>
            Video
          </Text>
        </View>

        <View style={styles.loginButton}>
          <Text style={styles.title}>
            Details
          </Text>
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
    backgroundColor: 'black',
    marginTop: 20
  },
  loginButton: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#48BBEC'
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
    color: '#fff'
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
    alignSelf: 'center'
  },
});

export default ViewRequest;
