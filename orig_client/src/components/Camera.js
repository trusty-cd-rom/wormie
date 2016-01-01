import React, {
  Component,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';
var Camera = require('react-native-camera');
import SubmitWormhole from '../containers/SubmitWormhole';
import { Icon } from 'react-native-icons';
import colorUtil from '../utils/color';

// Mapbox
var Mapbox = require('react-native-mapbox-gl');
var mapboxConfig = require('../utils/mapboxConfig');
var mapRef = 'mapRef';

var canGoNext;
var locationWatch;

var CameraView = React.createClass({
  
  mixins: [Mapbox.Mixin],

  _switchCamera() {
    // console.log('someone is trying to switch the camera');
    let { switchCamera, cameraState } = this.props;
    let newCameraType = cameraState.cameraType === Camera.constants.Type.back
      ? Camera.constants.Type.front : Camera.constants.Type.back;
    switchCamera(newCameraType);
  },

  _takeVideo() {
    let { cameraState, toggleRecording, uploadVideo, updateSubmissionVideo, updateSubmissionCoordinates } = this.props;
    if(!cameraState.isRecording) {
      console.log('starting the capture');
      
      //inital location pull
      navigator.geolocation.getCurrentPosition(
        (position) => {
          updateSubmissionCoordinates(position);
        },
        (error) => alert(error.message),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
      );

      //set a interval to grab location every 5 seconds
      locationWatch = setInterval(() => {navigator.geolocation.getCurrentPosition(
        (position) => {
          updateSubmissionCoordinates(position);
        },
        (error) => alert(error.message),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
      )}, 5000);
      this.refs.cam.capture((err, data) => {
        console.log('this is the data location from the camera: ', err, data);
        updateSubmissionVideo(data);
        clearInterval(locationWatch);
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
    }
  },

  componentWillMount() {
    let { initCameraState, updateSubmissionCoordinates, currentUser } = this.props;
    console.log(currentUser.wormie_color);
    canGoNext = true;
    initCameraState({
      cameraType: Camera.constants.Type.back,
      captureMode: Camera.constants.CaptureMode.video,
      captureTarget: Camera.constants.CaptureTarget.disk,
      isRecording: false,
      isUploading: false,
    });

  }
  ,
  back() {
    let { initSubmissionCoordinates, cameraState } = this.props;
    canGoNext = false;
    // navigator.geolocation.clearWatch(locationWatch);
    if(cameraState.isRecording) {this._takeVideo()};
    initSubmissionCoordinates();
    // clearInterval(locationWatch);
    this.props.navigator.pop();
  },

  render() {
    let { cameraState, pendingWormholeSubmission, currentUser } = this.props;
    console.log(pendingWormholeSubmission.locationData);
    return (
      <Camera
        ref="cam"
        style = {styles.camera}
        type = {cameraState.cameraType}
        captureMode = {cameraState.captureMode}
        captureTarget = {cameraState.captureTarget}
      >

        <View
          style = {styles.headerContainer}
        >
          <TouchableHighlight
            style = {styles.backButton}
            onPress = {this.back}
            underlayColor = 'transparent'
          >
            <Text style = {styles.backText}> X </Text>
          </TouchableHighlight>

          <View style = {{flex: 4}} />

          <TouchableHighlight
            style = {styles.cameraSwitchButton}
            onPress={this._switchCamera}
            underlayColor = 'transparent'
          >
            <Icon
              name='ion|ios-reverse-camera'
              size={40}
              color='white'
              style={styles.ionic}
            />
          </TouchableHighlight>
        </View>
        
        <Mapbox
          style={{flex: 4, opacity: 0.7}}
          direction={0}
          rotateEnabled={true}
          scrollEnabled={true}
          zoomEnabled={true}
          showsUserLocation={false}
          attributionButtonIsHidden={true}
          logoIsHidden={true}
          compassIsHidden={true}
          ref={mapRef}
          accessToken={mapboxConfig.accessToken}
          styleURL={mapboxConfig.styleURL}
          userTrackingMode={this.userTrackingMode.followWithHeading}
          zoomLevel={15}
          annotations={[{
            "coordinates": pendingWormholeSubmission.locationData,
            "type": "polyline",
            "strokeColor": currentUser.wormie_color,
            "strokeWidth": 5,
            "strokeAlpha": 0.9,
            "id": "cameraPath"
          }]}
        />
        
        <View style={{flex: 6}} />

        <View style={{flex: 2, alignItems: 'center'}}>
          <TouchableHighlight
            style = {styles.cameraToggleButton}
            onPress={this._takeVideo}
            underlayColor = 'transparent'
          >
            <Icon
              name= {cameraState.isRecording ? 'ion|stop' : 'ion|ios-circle-filled'}
              size={90}
              color='red'
              style={styles.cameraToggleIcon}
            />
          </TouchableHighlight>
        </View>

      </Camera>
    );
  }
});

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'transparent',
    flexDirection: 'column',
  },
  headerContainer: {
    paddingTop: 20,
    flexDirection: 'row',
    backgroundColor: '#4CC6EA',
    paddingRight: 10,
    paddingLeft: 10,
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    flex: 1,
    marginTop: 2,
  },
  backText: {
    color: 'white',
    fontFamily: 'Lato-Bold',
    fontSize: 25,
  },
  cameraToggleButton: {
    flex: 1
  },
  loginButton: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'black'
  },
  buttonText: {
    fontSize: 12,
    color: 'white',
    alignSelf: 'center',
  },
  cameraSwitchButton: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  ionic: {
    height: 40,
    width: 40,
    textAlign: 'right',
  },
  cameraToggleIcon: {
    height: 100,
    width: 100,
  }
});

export default CameraView;

// var geoLocationConfig = {
//   desiredAccuracy: 0,
//   stationaryRadius: 50,
//   distanceFilter: 50,
//   disableElasticity: false, // <-- [iOS] Default is 'false'.  Set true to disable speed-based distanceFilter elasticity
//   locationUpdateInterval: 5000,
//   minimumActivityRecognitionConfidence: 80,   // 0-100%.  Minimum activity-confidence for a state-change 
//   fastestLocationUpdateInterval: 5000,
//   activityRecognitionInterval: 10000,
//   stopDetectionDelay: 1,  // <--  minutes to delay after motion stops before engaging stop-detection system
//   stopTimeout: 2, // 2 minutes
//   activityType: 'AutomotiveNavigation',

//   // Application config
//   debug: true, // <-- enable this hear sounds for background-geolocation life-cycle.
//   forceReloadOnLocationChange: false,  // <-- [Android] If the user closes the app **while location-tracking is started** , reboot app when a new location is recorded (WARNING: possibly distruptive to user) 
//   forceReloadOnMotionChange: false,    // <-- [Android] If the user closes the app **while location-tracking is started** , reboot app when device changes stationary-state (stationary->moving or vice-versa) --WARNING: possibly distruptive to user) 
//   forceReloadOnGeofence: false,        // <-- [Android] If the user closes the app **while location-tracking is started** , reboot app when a geofence crossing occurs --WARNING: possibly distruptive to user) 
//   stopOnTerminate: false,              // <-- [Android] Allow the background-service to run headless when user closes the app.
//   startOnBoot: true,                   // <-- [Android] Auto start background-service in headless mode when device is powered-up.

//   // HTTP / SQLite config
//   url: 'http://posttestserver.com/post.php?dir=cordova-background-geolocation',
//   batchSync: false,       // <-- [Default: false] Set true to sync locations to server in a single HTTP request.
//   autoSync: true,         // <-- [Default: true] Set true to sync each location to server as it arrives.
//   maxDaysToPersist: 1,    // <-- Maximum days to persist a location in plugin's SQLite database when HTTP fails
//   headers: {
//     "X-FOO": "bar"
//   },
//   params: {
//     "auth_token": "maybe_your_server_authenticates_via_token_YES?"
//   }
// };


          // {pendingWormholeSubmission.locationData.map((val) => {
          //   return (
          //     <View style={styles.loginButton}>
          //       <Text style={styles.buttonText}>
          //         `${val.coords.latitude.toFixed(7)}, ${val.coords.longitude.toFixed(7)}`
          //       </Text>
          //     </View>
          //   );
          // })}
