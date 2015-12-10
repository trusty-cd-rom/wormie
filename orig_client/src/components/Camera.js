import React, {
  Component,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';
var Camera = require('react-native-camera');

class CameraView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cameraType: Camera.constants.Type.back,
      captureMode: Camera.constants.CaptureMode.video,
      captureTarget: Camera.constants.CaptureTarget.disk,
      isRecording: false
    }
  }
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
        <Camera
          ref="cam"
          style = {this._makeBackground(0)}
          type = {this.state.cameraType}
          captureMode = {this.state.captureMode}
          captureTarget = {this.state.captureTarget}
        >
        </Camera>
        <View
          style = {styles.buttonContainer}
        >
          <TouchableHighlight
            style = {this._makeBackground(1)}
            onPress={this._switchCamera}
            underlayColor = '#88D4f5'
          >
            <Text style={styles.instructions}>The old switcheroo</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style = {this._makeBackground(2)}
            onPress={this._takeVideo}
            underlayColor = '#88D4f5'
          >
            <Text style={styles.instructions}>Take Video</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
  _makeBackground(btn) {
    var obj = {
      flexDirection: 'row',
      alignSelf: 'stretch',
      justifyContent: 'center',
      flex: 1
    }

    if(btn === 0) {
      obj.backgroundColor = 'transparent';
      obj.flex = 7;
    } else if(btn === 1) {
      obj.backgroundColor = '#E77AAE';
    } else {
      obj.backgroundColor = '#758BF4';
    }

    return obj;

  }
  _switchCamera() {
    var state = this.state;
    state.cameraType = state.cameraType === Camera.constants.Type.back
      ? Camera.constants.Type.front : Camera.constants.Type.back;
    this.setState(state);
  }
  _takeVideo() {
    var state = this.state;
    if(!state.isRecording) {
      console.log('starting the capture');
      
      this.refs.cam.capture(function(err, data) {
        console.log(err, data);
        youtube.postVideo(data);
        // .then((data) => {
        //   console.log(data);
        // })
        // .catch((err) => console.log(err))
        // ;
      });
      state.isRecording = true;
    } else {
      console.log('stopping the capture');
      this.refs.cam.stopCapture();
      state.isRecording = false;
    }
    this.setState(state);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginTop: 20
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'white'
  },
  instructions: {
    textAlign: 'center',
    color: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'center',
    flex: 1
  },
  back: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#48BBEC'
  },
});

export default CameraView;
