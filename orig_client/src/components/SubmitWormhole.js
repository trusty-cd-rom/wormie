import React, {
  Component,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TextInput,
  ScrollView
} from 'react-native';
var YouTube = require('react-native-youtube');
import Navbar from './Navbar';

class SubmitWormhole extends Component {
  back() {
    this.props.navigator.pop();
  }
  submit() {
    this.props.navigator.replace({
      component: Navbar
    });
  }
  render() {
    // var { increment, incrementIfOdd, incrementAsync, decrement, counter } = this.props;
    let { currentWormhole, currentUser } = this.props;
    return (
      <ScrollView 
        automaticallyAdjustContentInsets={false}
        onScroll={() => { console.log('onScroll!'); }}
        scrollEventThrottle={200}
        style={styles.container}>
        <TouchableHighlight
          style = {styles.back}
          onPress = {this.back.bind(this)}
          underlayColor = 'purple'
        >
          <Text style = {styles.buttonText}> Back </Text>
        </TouchableHighlight>
        <YouTube 
          videoId={currentWormhole.submissions[0] ? currentWormhole.submissions[0].video_url : ''}
          play={false}
          hidden={!Boolean(currentWormhole.submissions[0])}
          playsInline={true}
          showinfo={true}
          // modestbranding={true}
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
            {currentUser.user.username}
          </Text>
        </View>
        <View style={styles.loginButton}>
          <Text style={styles.title}>
            {new Date().toJSON().slice(0,10)}
          </Text>
        </View>
        <View style={styles.loginButton}>
          <Text style={styles.title}>
            {currentWormhole.notes}
          </Text>
        </View>
        <TextInput
          style = {styles.searchInput}
          value = {''}
          // onChange = {this.handleInuptChange.bind(this,'location')}
        />
        <TouchableHighlight
          style = {styles.back}
          onPress = {this.submit.bind(this)}
          underlayColor = 'purple'
        >
          <Text style = {styles.buttonText}> Submit </Text>
        </TouchableHighlight>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  searchInput: {
    height: 200,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white'
  },
});

export default SubmitWormhole;
