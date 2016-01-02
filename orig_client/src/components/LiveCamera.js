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
  LayoutAnimation,
  ScrollView,
} = React;

window.navigator.userAgent = "react-native";
var io = require('socket.io-client/socket.io');
var socket = io.connect('http://52.53.249.61:8083');
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

import { Icon } from 'react-native-icons';

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


var LiveCamera = React.createClass({

  getInitialState() {
    return {
      chatText: ''
    };
  },

  initStream() {
    let { initCameraState, currentWormhole, updateCameraState, newChatMessage, removeOldestMessage } = this.props;

    updateCameraState('roomID', `wormhole${currentWormhole.id}`);

    socket.on('exchange', (data) => {
      this.exchange(data);
    });
    socket.on('leave', (socketId) => {
      this.leave(socketId);
    });
    socket.on('message', (data) => {
      console.log('newmessage', data);
      LayoutAnimation.configureNext(animations.layout.spring);
      newChatMessage(data, () => {
        console.log('lkasjdljkgnalskjdngjklasbdljkvansdjkgnalsjkdbgjklasdgn');
        LayoutAnimation.configureNext(animations.layout.sping)
        removeOldestMessage();
      });
    });
  },
  componentWillMount() {
    this.initStream();
  },
  componentDidMount() {
    let { liveCamera, updateCameraState, currentWormhole } = this.props;
    setTimeout(() => {
      RTCSetting.setAudioOutput('speaker');
      RTCSetting.setKeepScreenOn(true);
      RTCSetting.setProximityScreenOff(true);
      this.getLocalStream();
      updateCameraState('status', 'connect');
      updateCameraState('info', 'Connecting');
      console.log(liveCamera, this.joinRoom);
      this.joinRoom.call(this,`wormhole${currentWormhole.id}`);
    }, 500);
  },
  getLocalStream() {
    let { liveCamera, updateCameraState } = this.props;
    console.log('getLocalStream', liveCamera.selfViewSrc);
    if(liveCamera.selfViewSrc === null) {
      navigator.getUserMedia({ "audio": true, "video": true, "videoType": "front" }, function (stream) {
        updateCameraState('localStream', stream);
        updateCameraState('selfViewSrc', stream.toURL());
        updateCameraState('status', 'ready');
        // updateCameraState('info', 'Please enter or create room ID');
      }, (err) => console.log(err));
    } else {
      updateCameraState('status', 'ready');
    }
  },
  joinRoom(roomID) {
    let { updateCameraState } = this.props;
    console.log('about to joing room', roomID);
    socket.emit('join', roomID, (socketIds) => {
      console.log('join', socketIds);
      if(socketIds.length === 0) {
        updateCameraState('streamMaster', true);
      }
      for (var i in socketIds) {
        var socketId = socketIds[i];
        console.log(this);
        this.createPC(socketId, true);
      }
    });
  },
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
  },
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
  },
  leave(socketId) {
    let { liveCamera, updateCameraState } = this.props;
    console.log('leave', socketId);
    var pc = liveCamera.pcPeers[socketId];
    console.log('leave data: ', liveCamera.pcPeers.length, Object.keys(liveCamera.pcPeers));
    // var viewIndex = pc.viewIndex;
    pc.close();
    var tempPcPeers = liveCamera.pcPeers;
    delete tempPcPeers[socketId];
    updateCameraState('pcPeers', tempPcPeers );


    var remoteList = liveCamera.remoteList;
    delete remoteList[socketId]
    updateCameraState('remoteList', remoteList );
    updateCameraState('info', 'One peer leave!');
  },
  back() {
    socket.disconnect();
    this.props.navigator.pop();
  },
  renderCameras() {
    let { liveCamera } = this.props;
    let streamURL = liveCamera.selfViewSrc;
    console.log('rendering the camera section', liveCamera.streamMaster, liveCamera.remoteList, liveCamera.selfViewSrc);
    if(!liveCamera.streamMaster) {
      let masterKey = Object.keys(liveCamera.remoteList).reduce((accum, key) => {
        console.log('this is the value', liveCamera.remoteList[key]);
        return liveCamera.remoteList[key] === 1 ? key : accum;
      }, undefined);
      console.log('masterkey ', masterKey, liveCamera.remoteList[masterKey]);
      //streamURL = masterKey === undefined ? streamURL : liveCamera.remoteList[masterKey];
      return (
        <RTCView streamURL={liveCamera.remoteList[masterKey]} style={styles.camera}/>
      );
    } else {
      console.log(streamURL);
      return (
        <RTCView streamURL={liveCamera.selfViewSrc} style={styles.camera}/>
      );
    }
  },
  _switchCamera() {
    //this is where the new logic will go that will allow us to swap between the front camera view and the rear camera view
  },
  newMessage(event) {
    let { newChatMessage, currentUser } = this.props;
    let messageData = {
      user: {
        username: currentUser.username,
        picture_url: currentUser.picture_url
      },
      text:event.nativeEvent.text
    };
    console.log('messageData', messageData);
    socket.emit('message',messageData);
    this.setState({chatText: ''});
  },
  render() {
    let { liveCamera } = this.props;

    let chatList = liveCamera.liveChatMessages.map((item, index) => {
      
      return (
        <View style={styles.chatMessageContainer}>
          <Text style = {styles.chatMessage}> {item.user.username} - {item.text} </Text>
        </View>
      );

    });
    return (
      <View style={styles.container}>

        {this.renderCameras()}

        <View
          style = {styles.headerContainer}
        >
          <TouchableHighlight
            style = {styles.backButton}
            onPress = {this.back.bind(this)}
            underlayColor = 'transparent'
          >
            <Text style = {styles.backText}> X </Text>
          </TouchableHighlight>

          <Text style={styles.headerStatus}>
            {liveCamera.info}
          </Text>

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
        <TextInput
          style = {[styles.searchInput]}
          value = {this.state.chatText}
          onChange = {(event) => this.setState({chatText: event.nativeEvent.text})}
          placeholder = ' Say something...'
          placeholderTextColor = 'white'
          onSubmitEditing = {this.newMessage}
          returnKeyType = 'send'
        />
        <View style={{flex: 12}}>
          {chatList}
        </View>

      </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'transparent',
    // paddingTop: 20
  },
  headerStatus: {
    flex: 4,
    color: 'white',
    fontFamily: 'Lato-Bold',
    fontSize: 20,
    textAlign: 'center'
  },
  camera: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
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
  },
  searchInput: {
    fontFamily: 'Lato-Regular',
    height: 35,
    width: 350,
    padding: 4,
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white',
    marginLeft: 12,
    marginTop: 7,
    backgroundColor: 'black',
    opacity: 0.5,
  },
  chatMessage: {
    fontFamily: 'Lato-Regular',
    color: 'black',
  },
  chatMessageContainer: {
    height: 35,
    padding: 4,
    width: 350,
    fontSize: 16,
    borderRadius: 8,
    marginLeft: 12,
    marginTop: 7,
    backgroundColor: 'white',
    opacity: 0.8,
  },
});

export default LiveCamera;

// From: https://medium.com/man-moon/writing-modern-react-native-ui-e317ff956f02
const animations = {
    layout: {
        spring: {
            duration: 500,
            create: {
                duration: 300,
                type: LayoutAnimation.Types.easeInEaseOut,
                property: LayoutAnimation.Properties.opacity
            },
            update: {
                type: LayoutAnimation.Types.spring,
                springDamping: 200
            }
        },
        easeInEaseOut: {
            duration: 300,
            create: {
                type: LayoutAnimation.Types.easeInEaseOut,
                property: LayoutAnimation.Properties.scaleXY
            },
            update: {
                delay: 100,
                type: LayoutAnimation.Types.easeInEaseOut
            }
        }
    }
};
