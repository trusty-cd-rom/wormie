import React, {
  Component,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';
import Navbar from '../containers/Navbar';
import CameraView from '../containers/Camera';
var LiveCamera = require('../containers/LiveCamera.js');

class OpenWormhole extends Component {
  back() {
    this.props.navigator.pop();
  }
  startSubmission(type) {
    let { currentWormhole, initPendingSubmission } = this.props;
    initPendingSubmission(currentWormhole);
    let nextView = type === 'live' ? LiveCamera : CameraView;
    this.props.navigator.push({
      component: nextView
    });
  }
  render() {
    let { currentWormhole } = this.props;
    console.log(currentWormhole);
    return (
      <View style={styles.container}>

        <TouchableHighlight
          style = {styles.backButton}
          onPress = {this.back.bind(this)}
        >
          <Text style = {styles.backText}> {'<'} </Text>
        </TouchableHighlight>
        <View style = {styles.contentContainer}>
          <Text style={styles.title}>
            Title
          </Text>
          <Text style={styles.text}>
            {currentWormhole.title}
          </Text>

          <Text style={styles.title}>
            Requester
          </Text>
          <Text style={styles.text}>
            {currentWormhole.requestor.username}
          </Text>

          <Text style={styles.title}>
            Location
          </Text>
          <Text style={styles.text}>
            {`${currentWormhole.latitude} , ${currentWormhole.longitude}`}
          </Text>

          <Text style={styles.title}>
            Deadline
          </Text>
          <Text style={styles.text}>
            {currentWormhole.deadline}
          </Text>

          <Text style={styles.title}>
            Notes
          </Text>
          <Text style={styles.text}>
            {currentWormhole.notes}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableHighlight
            style = {styles.liveButton}
            onPress = {this.startSubmission.bind(this, 'live')}
            underlayColor = '#88D4f5'
          >
            <Text style = {styles.buttonText}> Live </Text>
          </TouchableHighlight>
          <TouchableHighlight
            style = {styles.recordButton}
            onPress = {this.startSubmission.bind(this, 'record')}
            underlayColor = '#88D4f5'
          >
            <Text style = {styles.buttonText}> Record </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'black',
    marginTop: 20
  },
  contentContainer: {
    flex:15,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: 'black',
    // marginTop: 20
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 7,
    color: 'white',
  },
  splashImage: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'center',
    flex: 4,
    backgroundColor: 'black'
  },
  buttonContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'center',
    flex: 2,
  },
  liveButton: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'green'
  },
  recordButton: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'red'
  },
  backButton: {
    // flexDirection: 'row',
    // alignSelf: 'stretch',
    justifyContent: 'flex-start',
    flex: 1,
    backgroundColor: 'black'
  },
  backText: {
    fontSize: 30,
    color: 'white',
    alignSelf: 'flex-start',
    marginLeft: 5
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

export default OpenWormhole;
