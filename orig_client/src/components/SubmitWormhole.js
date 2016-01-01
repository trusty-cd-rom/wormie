import React, {
  Component,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TextInput,
  ActivityIndicatorIOS,
  Image,
  ScrollView,
} from 'react-native';
// var YouTube = require('react-native-youtube');
import Navbar from '../containers/Navbar';
var Video = require('react-native-video');
var moment = require('moment');
var urls = require('../constants/urls');

// Mapbox
var Mapbox = require('react-native-mapbox-gl');
var mapboxConfig = require('../utils/mapboxConfig');
var mapRef = 'mapRef';


var SubmitWormhole = React.createClass({

  mixins: [Mapbox.Mixin],

  componentWillMount() {
    let { pendingWormholeSubmission, updateInputText } = this.props;
    // let route = pendingWormholeSubmission.locationData.map((val) => {
    //   return [val.coords.latitude.toFixed(7), val.coords.longitude.toFixed(7)];
    // });
    // console.log(JSON.stringify(route));
    updateInputText('location', JSON.stringify(pendingWormholeSubmission.locationData));
  },
  back() {
    let {initSubmissionCoordinates} = this.props;
    initSubmissionCoordinates();
    this.props.navigator.pop();
  },
  submit() {
    let { pendingWormholeSubmission, currentUser, uploadWormholeSubmission, initSubmissionCoordinates } = this.props;
    uploadWormholeSubmission(pendingWormholeSubmission, currentUser, () => {
      initSubmissionCoordinates();
      this.props.navigator.replace({
        component: Navbar
      });
    });
  },
  _renderSubmitButton() {
    let { pendingWormholeSubmission } = this.props;
    if(!pendingWormholeSubmission.isUploading) {
      return (
        <View style={styles.buttonContainer}>
          <TouchableHighlight
            style = {styles.submitButton}
            onPress = {this.submit.bind(this)}
            underlayColor = 'transparent'
          >
            <Text style = {styles.buttonText}> Submit </Text>
          </TouchableHighlight>
        </View>
      )
    } else {
      return (
        <ActivityIndicatorIOS
          animating = {true}
          color = 'white'
          size = 'large'
        ></ActivityIndicatorIOS>
      )
    }
  },
  handleInputChange(fieldName, event) {
    let { updateInputText } = this.props;
    updateInputText(fieldName, event.nativeEvent.text);
  },
  render() {
    // var { increment, incrementIfOdd, incrementAsync, decrement, counter } = this.props;
    let { pendingWormholeSubmission, currentUser } = this.props;
    let locationData = pendingWormholeSubmission.locationData;
    // console.log(locationData, typeof locationData, Array.isArray(locationData));
    let mapCenter = locationData.length>0 ? [locationData[locationData.length-1][0],locationData[locationData.length-1][1]] : [Number(pendingWormholeSubmission.wormhole.latitude),Number(pendingWormholeSubmission.wormhole.longitude)];
    console.log('mapCenter', mapCenter);

    let annotation;
    if(locationData.length>0) {
      console.log('annotating a path', locationData);
      annotation = [{
        "coordinates": locationData,
        "type": "polyline",
        "strokeColor": currentUser.wormie_color,
        "strokeWidth": 5,
        "strokeAlpha": 0.9,
        "id": "cameraPath"
      }, {
        coordinates: mapCenter,
        'type': 'point',
        title: 'Ouch!',
        annotationImage: {
          url: urls.getWormie + currentUser.wormie_color.slice(1) + '.png',
          height: 35,
          width: 25
        },
        id: 'marker1'
      }];
    } else {
      console.log('annotating a point', locationData);
      annotation = [{
        coordinates: mapCenter,
        'type': 'point',
        title: 'Ouch!',
        annotationImage: {
          url: urls.getWormie + currentUser.wormie_color.slice(1) + '.png',
          height: 35,
          width: 25
        },
        id: 'marker1'
      }];
    }
    return (
      <View style={styles.container}>
        <Video source={{uri: pendingWormholeSubmission.video}}
               rate={1.5}
               volume={1.0}
               muted={false}
               paused={false}
               resizeMode="cover"
               repeat={true}
               onError={console.log('error in video playback load')}
               style={styles.backgroundVideo} />
        <View style={styles.backgroundOverlay} />

        <View style = {styles.headerContainer}>

          <TouchableHighlight
            style = {styles.backButton}
            onPress = {this.back.bind(this)}
            underlayColor = 'transparent'
          >
            <Text style = {styles.backText}> {'X'} </Text>
          </TouchableHighlight>
          
          <Text style={styles.backText}>
            {pendingWormholeSubmission.wormhole.requestor.username}
          </Text>
          <Image 
            style = {styles.profilePic}
            source = {{uri: (pendingWormholeSubmission.wormhole.requestor) ? pendingWormholeSubmission.wormhole.requestor.picture_url : ""}}
          />

        </View>

        <Mapbox
          style={[styles.mapContainer, {opacity: 0.7}]}
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
          userTrackingMode={this.userTrackingMode.none}
          centerCoordinate={{latitude: mapCenter[0], longitude: mapCenter[1]}}
          zoomLevel={15}
          annotations={annotation}
        />

        <ScrollView style = {styles.contentContainer}>
          
          <Text style={[styles.text, styles.alignLeft]}>
            Due {moment(pendingWormholeSubmission.wormhole.deadline).fromNow()}
          </Text>

          <Text style={styles.title}>
            {pendingWormholeSubmission.wormhole.title}
          </Text>

          <Text style={styles.text}>
            {`${pendingWormholeSubmission.wormhole.latitude} , ${pendingWormholeSubmission.wormhole.longitude}`}
          </Text>

          <Text style={styles.text}>
            {pendingWormholeSubmission.wormhole.notes}
          </Text>

        </ScrollView>

        {this._renderSubmitButton()}
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  headerContainer: {
    paddingTop: 20,
    flexDirection: 'row',
    backgroundColor: '#4CC6EA',
    paddingRight: 10,
    paddingLeft: 10,
    alignItems: 'flex-start',
    flex: 1,
  },
  backButton: {
    flex: 1,
  },
  backText: {
    color: 'white',
    fontFamily: 'Lato-Bold',
    fontSize: 20,
  },
  profilePic: {
    // marginTop: 10,
    marginLeft: 10,
    height: 30,
    width: 30,
    borderRadius: 15,
  },
  backgroundOverlay: {
    opacity: 0.5,
    backgroundColor: '#ffffff',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  mapContainer: {
    flex: 6,
  },
  contentContainer: {
    flex: 7,
    padding: 20,
    paddingTop: 5,
    flexDirection: 'column',
  },
  text: {
    fontFamily: 'Lato-Bold',
    // fontSize: 20,
    marginBottom: 10,
  },
  alignLeft: {
    textAlign: 'right',
  },
  title: {
    fontFamily: 'Lato-Bold',
    fontSize: 30,
    marginBottom: 10,
  },
  submitButton: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'center',
    flex: 1,
    // backgroundColor: 'green'
  },
  buttonText: {
    fontSize: 27,
    fontFamily: 'Lato-Bold',
    color: '#4CC6EA',
    // alignSelf: 'center'
  },
  buttonContainer: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    flex: 1,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  }
});

export default SubmitWormhole;
