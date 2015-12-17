'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  TextInput,
} = React;

var WebRTC = require('react-native-webrtc');
var {
  RTCPeerConnection,
  RTCMediaStream,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  RTCSetting,
} = WebRTC;

function mapHash(hash, func) {
  var array = [];
  for (var key in hash) {
    var obj = hash[key];
    array.push(func(obj, key));
  }
  return array;
}

var LiveCamera = React.createClass({
  getInitialState: function() {
    return {info: 'Initializing', status: 'init', roomID: '', selfViewSrc: null, remoteList: {}};
  },
  componentWillMount: function() {
    let { initCameraState } = this.props;

    initCameraState({
      info: 'Initializing',
      status: 'init',
      roomID: '',
      selfViewSrc: null,
      remoteList: {}
    });
  },
  componentDidMount: function() {
    RTCSetting.setAudioOutput('speaker');
    RTCSetting.setKeepScreenOn(true);
    RTCSetting.setProximityScreenOff(true);
    this.getLocalStream();
  },
  _press(event) {
    let { liveCamera, updateCameraState } = this.props;
    // this.refs.roomID.blur();
    updateCameraState('status', 'connect');
    updateCameraState('info', 'Connecting');
    join(liveCamera.roomID);
  },
  getLocalStream() {
    let { updateCameraState } = this.props;
    console.log('getLocalStream');
    navigator.getUserMedia({ "audio": true, "video": true }, function (stream) {
      updateCameraState('selfViewSrc', stream.toURL());
      updateCameraState('status', 'ready');
      updateCameraState('info', 'Please enter or create room ID');
    }, (err) => console.log(err));
  },
  render: function() {
    let { liveCamera, updateCameraState } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          {liveCamera.info}
        </Text>
        { liveCamera.status == 'ready' ?
          (<View>
            <TextInput
              ref='roomID'
              autoCorrect={false}
              style={{width: 200, height: 40, borderColor: 'gray', borderWidth: 1}}
              onChangeText={(text) => updateCameraState('roomID', text)}
              value={liveCamera.roomID}
            />
            <TouchableHighlight
              onPress={this._press}>
              <Text>Enter room</Text>
            </TouchableHighlight>
          </View>) : null
        }
        <RTCView streamURL={liveCamera.selfViewSrc} style={styles.selfView}/>
        {
          mapHash(liveCamera.remoteList, function(remote, index) {
            return <RTCView key={index} streamURL={remote} style={styles.remoteView}/>
          })
        }
      </View>
    );
  }
});

var styles = StyleSheet.create({
  selfView: {
    width: 100,
    height: 100,
  },
  remoteView: {
    width: 100,
    height: 100,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

export default LiveCamera;