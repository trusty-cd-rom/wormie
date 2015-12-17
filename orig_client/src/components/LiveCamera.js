'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  TextInput,
  Component,
} = React;

window.navigator.userAgent = "react-native";
var io = require('socket.io-client/socket.io');
var socket = io.connect('http://react-native-webrtc.herokuapp.com');
var configuration = {"iceServers": [{"url": "stun:stun.l.google.com:19302"}]};
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

function logError(error) {
  console.log("logError", error);
}

function peerConnected() {
  RTCSetting.setAudioOutput('speaker');
  RTCSetting.setKeepScreenOn(true);
  RTCSetting.setProximityScreenOff(true);
}


class LiveCamera extends Component{
  getInitialState() {
    return {info: 'Initializing', status: 'init', roomID: '', selfViewSrc: null, remoteList: {}};
  }
  componentWillMount() {
    let { initCameraState } = this.props;

    initCameraState({
      info: 'Initializing',
      status: 'init',
      roomID: '',
      selfViewSrc: null,
      remoteList: {},
      pcPeers: {}
    });

    socket.on('exchange', (data) => {
      this.exchange(data);
    });
    socket.on('leave', (socketId) => {
      this.leave(socketId);
    });
  }
  componentDidMount() {
    RTCSetting.setAudioOutput('speaker');
    RTCSetting.setKeepScreenOn(true);
    RTCSetting.setProximityScreenOff(true);
    this.getLocalStream();
  }
  _press(event) {
    let { liveCamera, updateCameraState } = this.props;
    // this.refs.roomID.blur();
    updateCameraState('status', 'connect');
    updateCameraState('info', 'Connecting');
    console.log(liveCamera, this.joinRoom);
    this.joinRoom.call(this,liveCamera.roomID);
  }
  getLocalStream() {
    let { updateCameraState } = this.props;
    console.log('getLocalStream');
    navigator.getUserMedia({ "audio": true, "video": true }, function (stream) {
      updateCameraState('localStream', stream);
      updateCameraState('selfViewSrc', stream.toURL());
      updateCameraState('status', 'ready');
      updateCameraState('info', 'Please enter or create room ID');
    }, (err) => console.log(err));
  }
  joinRoom(roomID) {
    socket.emit('join', roomID, (socketIds) => {
      console.log('join', socketIds);
      for (var i in socketIds) {
        var socketId = socketIds[i];
        console.log(this);
        this.createPC(socketId, true);
      }
    });
  }
  createPC(socketId, isOffer) {
    let { liveCamera, updateCameraState } = this.props;
    var pc = new RTCPeerConnection(configuration);
    let tempPcPeers = liveCamera.pcPeers;
    tempPcPeers[socketId] = pc;
    updateCameraState('pcPeers', tempPcPeers);

    pc.onicecandidate = function (event) {
      console.log('onicecandidate', event.candidate);
      if (event.candidate) {
        socket.emit('exchange', {'to': socketId, 'candidate': event.candidate });
      }
    };

    function createOffer() {
      pc.createOffer(function(desc) {
        console.log('createOffer', desc);
        pc.setLocalDescription(desc, function () {
          console.log('setLocalDescription', pc.localDescription);
          socket.emit('exchange', {'to': socketId, 'sdp': pc.localDescription });
        }, logError);
      }, logError);
    }

    pc.onnegotiationneeded = function () {
      console.log('onnegotiationneeded');
      if (isOffer) {
        createOffer();
      }
    }

    pc.oniceconnectionstatechange = function(event) {
      console.log('oniceconnectionstatechange', event.target.iceConnectionState);
    };
    pc.onsignalingstatechange = function(event) {
      console.log('onsignalingstatechange', event.target.signalingState);
    };

    pc.onaddstream = function (event) {
      console.log('onaddstream', event.stream);
      updateCameraState('info', 'One peer join!');
      peerConnected();

      var remoteList = liveCamera.remoteList;
      remoteList[socketId] = event.stream.toURL();
      updateCameraState('remoteList', remoteList);
    };
    pc.addStream(liveCamera.localStream);
    return pc;
  }
  exchange(data) {
    let { liveCamera, updateCameraState } = this.props;
    var fromId = data.from;
    var pc;
    if (fromId in liveCamera.pcPeers) {
      pc = liveCamera.pcPeers[fromId];
    } else {
      pc = this.createPC(fromId, false);
    }

    if (data.sdp) {
      console.log('exchange sdp', data);
      pc.setRemoteDescription(new RTCSessionDescription(data.sdp), function () {
        if (pc.remoteDescription.type == "offer")
          pc.createAnswer(function(desc) {
            console.log('createAnswer', desc);
            pc.setLocalDescription(desc, function () {
              console.log('setLocalDescription', pc.localDescription);
              socket.emit('exchange', {'to': fromId, 'sdp': pc.localDescription });
            }, logError);
          }, logError);
      }, logError);
    } else {
      console.log('exchange candidate', data);
      pc.addIceCandidate(new RTCIceCandidate(data.candidate));
    }
  }
  leave(socketId) {
    let { liveCamera, updateCameraState } = this.props;
    console.log('leave', socketId);
    var pc = liveCamera.pcPeers[socketId];
    var viewIndex = pc.viewIndex;
    pc.close();
    var tempPcPeers = liveCamera.pcPeers;
    delete tempPcPeers[socketId];
    updateCameraState('pcPeers', tempPcPeers );


    var remoteList = liveCamera.remoteList;
    delete remoteList[socketId]
    updateCameraState('remoteList', remoteList );
    updateCameraState('info', 'One peer leave!');
  }
  render() {
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
              onPress={this._press.bind(this)}>
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
};

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