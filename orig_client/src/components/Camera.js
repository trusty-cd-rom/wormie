import React, {
  Component,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';
var Camera = require('react-native-camera');
import SubmitWormhole from '../containers/SubmitWormhole';

var canGoNext;

class CameraView extends Component {
  _switchCamera() {
    // console.log('someone is trying to switch the camera');
    let { switchCamera, cameraState } = this.props;
    let newCameraType = cameraState.cameraType === Camera.constants.Type.back
      ? Camera.constants.Type.front : Camera.constants.Type.back;
    switchCamera(newCameraType);
  }
  _takeVideo() {
    let { cameraState, toggleRecording, uploadVideo, updateSubmissionVideo, updateSubmissionCoordinates } = this.props;
    if(!cameraState.isRecording) {
      console.log('starting the capture');
      

      let locationWatch = navigator.geolocation.watchPosition(
        (position) => {
          let initialPosition = JSON.stringify(position);
          console.log(initialPosition);
          updateSubmissionCoordinates(position);
          //replace with call to action function, update state via reducer
          // console.log(typeof position.coords.latitude);
          // updateInputText('location', `${position.coords.latitude.toFixed(7)} , ${position.coords.longitude.toFixed(7)}`);
        },
        (error) => alert(error.message),
        {enableHighAccuracy: true}
      );
      this.refs.cam.capture((err, data) => {
        console.log('this is the data location from the camera: ', err, data);
        updateSubmissionVideo(data);
        navigator.geolocation.clearWatch(locationWatch);
        if(canGoNext) {
          this.props.navigator.push({
            component: SubmitWormhole 
          });
        }
      });
      toggleRecording();
    } else {
      console.log('stopping the capture');
      this.refs.cam.stopCapture();
      toggleRecording();
      canGoNext = true;
    }
  }
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    let { initCameraState, updateSubmissionCoordinates } = this.props;
    canGoNext = false;
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
    let { cameraState, pendingWormholeSubmission } = this.props;
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
        {pendingWormholeSubmission.locationData.map((val) => {
          return (
            <View style={styles.loginButton}>
              <Text style={styles.buttonText}>
                `${val.coords.latitude.toFixed(7)}, ${val.coords.longitude.toFixed(7)}`
              </Text>
            </View>
          );
        })}
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
  buttonText: {
    fontSize: 12,
    color: 'white',
    alignSelf: 'center'
  },
  loginButton: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'black'
  },
});

export default CameraView;

var geoLocationConfig = {
  desiredAccuracy: 0,
  stationaryRadius: 50,
  distanceFilter: 50,
  disableElasticity: false, // <-- [iOS] Default is 'false'.  Set true to disable speed-based distanceFilter elasticity
  locationUpdateInterval: 5000,
  minimumActivityRecognitionConfidence: 80,   // 0-100%.  Minimum activity-confidence for a state-change 
  fastestLocationUpdateInterval: 5000,
  activityRecognitionInterval: 10000,
  stopDetectionDelay: 1,  // <--  minutes to delay after motion stops before engaging stop-detection system
  stopTimeout: 2, // 2 minutes
  activityType: 'AutomotiveNavigation',

  // Application config
  debug: true, // <-- enable this hear sounds for background-geolocation life-cycle.
  forceReloadOnLocationChange: false,  // <-- [Android] If the user closes the app **while location-tracking is started** , reboot app when a new location is recorded (WARNING: possibly distruptive to user) 
  forceReloadOnMotionChange: false,    // <-- [Android] If the user closes the app **while location-tracking is started** , reboot app when device changes stationary-state (stationary->moving or vice-versa) --WARNING: possibly distruptive to user) 
  forceReloadOnGeofence: false,        // <-- [Android] If the user closes the app **while location-tracking is started** , reboot app when a geofence crossing occurs --WARNING: possibly distruptive to user) 
  stopOnTerminate: false,              // <-- [Android] Allow the background-service to run headless when user closes the app.
  startOnBoot: true,                   // <-- [Android] Auto start background-service in headless mode when device is powered-up.

  // HTTP / SQLite config
  url: 'http://posttestserver.com/post.php?dir=cordova-background-geolocation',
  batchSync: false,       // <-- [Default: false] Set true to sync locations to server in a single HTTP request.
  autoSync: true,         // <-- [Default: true] Set true to sync each location to server as it arrives.
  maxDaysToPersist: 1,    // <-- Maximum days to persist a location in plugin's SQLite database when HTTP fails
  headers: {
    "X-FOO": "bar"
  },
  params: {
    "auth_token": "maybe_your_server_authenticates_via_token_YES?"
  }
};

