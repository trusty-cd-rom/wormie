import React, {
  Component,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';
import Navbar from './Navbar';
import CameraView from '../containers/Camera';
var YouTube = require('react-native-youtube');

class ViewMySubmission extends Component {
  back() {
    this.props.navigator.pop();
  }
  startSubmission() {
    let { myCurrentSubmission } = this.props;
    initPendingSubmission(myCurrentSubmission);
    this.props.navigator.push({
      component: CameraView
    });
  }

  video() {
    return (
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
    );
  }
  render() {
    let { myCurrentSubmission } = this.props;
    console.log('myCurrentSubmission: ', myCurrentSubmission);

    return (
      <View style={styles.container}>
        <TouchableHighlight
          style = {styles.loginButton}
          onPress = {this.back.bind(this)}
          underlayColor = '#88D4f5'
        >
          <Text style = {styles.buttonText}> Back </Text>
        </TouchableHighlight>

        <Text style={styles.title}>
          Title: {myCurrentSubmission.wormhole.title}
        </Text>
        <Text style={styles.text}>
          Requester: {myCurrentSubmission.submitter.username}
        </Text>
        <Text style={styles.text}>
          Deadline: {myCurrentSubmission.wormhole.deadline}
        </Text>
        <Text style={styles.text}>
          Status: {myCurrentSubmission.wormhole.status}
        </Text>
        <Text style={styles.title}>
          Notes
        </Text>
        <Text style={styles.text}>
          {myCurrentSubmission.notes}
        </Text>
        
        <TouchableHighlight
          style = {styles.loginButton}
          onPress = {this.startSubmission.bind(this)}
          underlayColor = '#88D4f5'
        >
          <Text style = {styles.buttonText}> Request! </Text>
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
    marginTop: 20
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'grey',
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

export default ViewMySubmission;
