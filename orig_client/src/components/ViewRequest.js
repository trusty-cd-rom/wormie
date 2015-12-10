import React, {
  Component,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';
var YouTube = require('react-native-youtube');

class ViewRequest extends Component {
  back() {
    this.props.navigator.pop();
  }
  render() {
    // var { increment, incrementIfOdd, incrementAsync, decrement, counter } = this.props;
    let { currentWormhole } = this.props;
    return (
      <View style={styles.container}>

        <TouchableHighlight
          style = {styles.back}
          onPress = {this.back.bind(this)}
          underlayColor = 'purple'
        >
          <Text style = {styles.buttonText}> Back </Text>
        </TouchableHighlight>

        <YouTube 
          videoId={currentWormhole.submissions[0].video_url}
          play={false}
          hidden={false}
          playsInline={true}
          showinfo={false}
          modestbranding={true}
          onError={(e)=>{console.log('youtube error: ', e.error)}}
          style={{alignSelf: 'stretch', height: 220, backgroundColor: 'transparent', marginBottom: 0}}
        />

        <View style={styles.loginButton}>
          <Text style={styles.title}>
            {currentWormhole.title}
          </Text>
        </View>
        <View style={styles.loginButton}>
          <Text style={styles.title}>
            {currentWormhole.owner_name}
          </Text>
        </View>
        <View style={styles.loginButton}>
          <Text style={styles.title}>
            {currentWormhole.submissions[0].owner_name}
          </Text>
        </View>
        <View style={styles.loginButton}>
          <Text style={styles.title}>
            {currentWormhole.submissions[0].created_at}
          </Text>
        </View>
        <View style={styles.loginButton}>
          <Text style={styles.title}>
            {currentWormhole.notes}
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
  back: {
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
