import React, {
  Component,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';
var Camera = require('react-native-camera');
import SubmitWormhole from '../containers/SubmitWormhole';

class CameraView extends Component {
  _switchCamera() {
    // console.log('someone is trying to switch the camera');
    let { switchCamera, cameraState } = this.props;
    let newCameraType = cameraState.cameraType === Camera.constants.Type.back
      ? Camera.constants.Type.front : Camera.constants.Type.back;
    switchCamera(newCameraType);
  }
  _takeVideo() {
    let { cameraState, toggleRecording, uploadVideo, updateSubmissionVideo } = this.props;
    if(!cameraState.isRecording) {
      console.log('starting the capture');
      
      this.refs.cam.capture((err, data) => {
        console.log('this is the data location from the camera: ', err, data);
        // youtube.postVideo(data);
        // .then((data) => {
        //   console.log(data);
        // })
        // .catch((err) => console.log(err))
        // ;
        // uploadVideo(data);
        updateSubmissionVideo(data);
        this.props.navigator.push({
          component: SubmitWormhole 
        });
      });
      toggleRecording();
    } else {
      console.log('stopping the capture');
      this.refs.cam.stopCapture();
      toggleRecording();
    }
  }
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    let { initCameraState } = this.props;
    
    initCameraState({
      cameraType: Camera.constants.Type.back,
      captureMode: Camera.constants.CaptureMode.video,
      captureTarget: Camera.constants.CaptureTarget.disk,
      isRecording: false,
      isUploading: false
    });
  }
  back() {
    this.props.navigator.pop();
  }
  render() {
    // var { increment, incrementIfOdd, incrementAsync, decrement, counter } = this.props;
    let { cameraState } = this.props;
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
          type = {cameraState.cameraType}
          captureMode = {cameraState.captureMode}
          captureTarget = {cameraState.captureTarget}
        >
        </Camera>
        <View
          style = {styles.buttonContainer}
        >
          <TouchableHighlight
            style = {this._makeBackground(1)}
            onPress={this._switchCamera.bind(this)}
            underlayColor = '#88D4f5'
          >
            <Text style={styles.instructions}>The old switcheroo</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style = {this._makeBackground(2)}
            onPress={this._takeVideo.bind(this)}
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
