import { INIT_LIVE_CAMERA, UPDATE_LIVE_CAMERA } from '../constants/actions';
// window.navigator.userAgent = "react-native";
// var io = require('socket.io-client/socket.io');
// var socket = io.connect('http://react-native-webrtc.herokuapp.com');
// var configuration = {"iceServers": [{"url": "stun:stun.l.google.com:19302"}]};
// var WebRTC = require('react-native-webrtc');
// var {
//   RTCPeerConnection,
//   RTCMediaStream,
//   RTCIceCandidate,
//   RTCSessionDescription,
// } = WebRTC;

// socket.on('exchange', function(data){
//   exchange(data);
// });
// socket.on('leave', function(socketId){
//   leave(socketId);
// });

export function initCameraState(cameraState) {
  console.log('hi from camera action, initCameraState')
  return {
    type: INIT_LIVE_CAMERA,
    cameraState
  };
};


export function updateCameraState(field, text) {
  return {
    type: UPDATE_LIVE_CAMERA,
    field,
    text
  };
};

// export function joinRoom(roomID) {
//   console.log('about to join a room', roomID);
//   return dispatch => {
//     return socket.emit('join', roomID, function(socketIds){
//       console.log('join', socketIds);
//       for (var i in socketIds) {
//         var socketId = socketIds[i];
//         createPC(socketId, true, dispatch, );
//       }
//       dispatch({
//         type: ''
//       })
//     });
//   }
// };

// function createPC(socketId, isOffer, dispatch) {
//   var pc = new RTCPeerConnection(configuration);
//   pcPeers[socketId] = pc;

//   pc.onicecandidate = function (event) {
//     console.log('onicecandidate', event.candidate);
//     if (event.candidate) {
//       socket.emit('exchange', {'to': socketId, 'candidate': event.candidate });
//     }
//   };

//   function createOffer() {
//     pc.createOffer(function(desc) {
//       console.log('createOffer', desc);
//       pc.setLocalDescription(desc, function () {
//         console.log('setLocalDescription', pc.localDescription);
//         socket.emit('exchange', {'to': socketId, 'sdp': pc.localDescription });
//       }, logError);
//     }, logError);
//   }

//   pc.onnegotiationneeded = function () {
//     console.log('onnegotiationneeded');
//     if (isOffer) {
//       createOffer();
//     }
//   }

//   pc.oniceconnectionstatechange = function(event) {
//     console.log('oniceconnectionstatechange', event.target.iceConnectionState);
//   };
//   pc.onsignalingstatechange = function(event) {
//     console.log('onsignalingstatechange', event.target.signalingState);
//   };

//   pc.onaddstream = function (event) {
//     console.log('onaddstream', event.stream);
//     dispatch(updateCameraState('info', 'One peer join!'));
//     peerConnected();

//     var remoteList = container.state.remoteList;
//     remoteList[socketId] = event.stream.toURL();
//     dispatch(updateCameraState('remoteList', remoteList));
//   };
//   pc.addStream(localStream);
//   return pc;
// }

// function peerConnected() {
//   RTCSetting.setAudioOutput('speaker');
//   RTCSetting.setKeepScreenOn(true);
//   RTCSetting.setProximityScreenOff(true);
// }