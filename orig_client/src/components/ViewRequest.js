import React, {
  Component,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  ScrollView,
} from 'react-native';

// import YouTube from 'react-native-youtube';
var YouTube = require('react-native-youtube');
var urls = require('../constants/urls');
var moment = require('moment');

// Mapbox
var Mapbox = require('react-native-mapbox-gl');
var mapboxConfig = require('../utils/mapboxConfig');
var mapRef = 'mapRef';

var ViewRequest = React.createClass({
  mixins: [Mapbox.Mixin],
  back() {
    this.props.navigator.pop();
  },
  render() {
    // var { increment, incrementIfOdd, incrementAsync, decrement, counter } = this.props;
    // console.log(this.props.currentWormhole);
    let { currentWormhole } = this.props;
    // console.log('currentWormhole.submissions[0].location', currentWormhole.submissions[0].location, typeof currentWormhole.submissions[0].location, typeof JSON.parse(currentWormhole.submissions[0].location));
    let locationData = JSON.parse(currentWormhole.submissions[0].location);
    console.log(locationData, typeof locationData, Array.isArray(locationData));
    let mapCenter = locationData.length>0 ? [locationData[locationData.length-1][0],locationData[locationData.length-1][1]] : [Number(currentWormhole.latitude),Number(currentWormhole.longitude)];
    console.log('mapCenter', mapCenter);

    let annotation;
    if(locationData.length>0) {
      annotation = [{
        "coordinates": locationData,
        "type": "polyline",
        "strokeColor": currentWormhole.submissions[0].submitter.wormie_color,
        "strokeWidth": 5,
        "strokeAlpha": 0.9,
        "id": "cameraPath"
      }, {
        coordinates: mapCenter,
        'type': 'point',
        title: 'Ouch!',
        annotationImage: {
          url: urls.getWormie + currentWormhole.submissions[0].submitter.wormie_color.slice(1) + '.png',
          height: 35,
          width: 25
        },
        id: 'marker1'
      }];
    } else {
      annotation = [{
        coordinates: mapCenter,
        'type': 'point',
        title: 'Ouch!',
        annotationImage: {
          url: urls.getWormie + currentWormhole.submissions[0].submitter.wormie_color.slice(1) + '.png',
          height: 35,
          width: 25
        },
        id: 'marker1'
      }];
    }

    return (

      <View style={styles.container}>

        <View style = {styles.headerContainer}>

          <TouchableHighlight
            style = {styles.backButton}
            onPress = {this.back.bind(this)}
            underlayColor = 'transparent'
          >
            <Text style = {styles.backText}> {'X'} </Text>
          </TouchableHighlight>
          
          <Text style={styles.backText}>
            {currentWormhole.requestor.username}
          </Text>
          <Image 
            style = {styles.requestorProfilePic}
            source = {{uri: currentWormhole.requestor.picture_url}}
          />

        </View>

        <View style={{flexDirection: 'row', flex: 10}}>
          
          <YouTube 
            ref="youtubePlayer"
            style={{flex: 1}}
            videoId={currentWormhole.submissions[0].video_url}
            play={false}
            hidden={false}
            playsInline={true}
            showinfo={false}
            modestbranding={true}
            onError={(e)=>{console.log('youtube error: ', e.error)}}
            onProgress={(e)=>{if((e.duration - e.currentTime) < 1) {this.refs.youtubePlayer.seekTo(0)}}}
          />
          
          <Mapbox
            style={{flex: 1, opacity: 0.7}}
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
            zoomLevel={13}
            annotations={annotation}
          />

        </View>

        <ScrollView style = {styles.contentContainer}>
          
          <Text style={[styles.text, styles.timeAgo]}>
            {moment(currentWormhole.submissions[0].created_at).fromNow()}
          </Text>

          <View style={{flexDirection: 'row'}}>
            <Image 
              style = {styles.submitterProfilePic}
              source = {{uri: currentWormhole.submissions[0].submitter.picture_url}}
            />
            <Text style={[{fontFamily: 'Lato-Bold', alignSelf: 'flex-end'}]}>
              {currentWormhole.submissions[0].submitter.username}
            </Text>
          </View>

          <Text style={styles.title}>
            {currentWormhole.title}
          </Text>

          <Text style={styles.text}>
            {`${currentWormhole.latitude} , ${currentWormhole.longitude}`}
          </Text>

          <Text style={styles.text}>
            {currentWormhole.notes}
          </Text>

        </ScrollView>

      </View>
    );
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  headerContainer: {
    paddingTop: 30,
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
  requestorProfilePic: {
    // marginTop: 10,
    marginLeft: 10,
    height: 30,
    width: 30,
    borderRadius: 15,
  },
  submitterProfilePic: {
    // marginTop: 10,
    marginRight: 3,
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
    paddingTop: 0,
    flexDirection: 'column',
  },
  text: {
    fontFamily: 'Lato-Bold',
    // fontSize: 20,
    marginBottom: 10,
  },
  timeAgo: {
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
});

export default ViewRequest;
