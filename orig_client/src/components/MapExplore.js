var React = require('react-native');

// Mapbox
var Mapbox = require('react-native-mapbox-gl');
var mapboxConfig = require('../utils/mapboxConfig');
var mapRef = 'mapRef';

// Random number util
var randomInRange = require('../utils/random');

// urls
var urls = require('../constants/urls');

// Youtube
var YouTube = require('react-native-youtube');
var Video = require('react-native-video');

// Potential clicked pages
import ViewRequest from '../containers/ViewRequest';
import OpenWormhole from '../containers/OpenWormhole';
import Profile from '../containers/Profile';


var {
  StyleSheet,
  Component,
  Text,
  View,
  Image,
  AsyncStorage,
} = React;

var MapExplore = React.createClass({

  mixins: [Mapbox.Mixin],

  componentDidMount() {
    var { refreshFeedData, currentWormhole, feed, updateCurrentWormhole, refreshFeedData_fromAsyncStorage } = this.props;
    // refreshFeedData_fromAsyncStorage(AsyncStorage, () => {
      // this.getWormholeAnnotations();
    // });
  },

  getWormholeAnnotations() {

    var { feed } = this.props;

    var annotations = [];

    for ( var wormhole in feed ) {

     // SAMPLE POLYLINES!
     // annotations.push({

     //    coordinates: [ [parseFloat(feed[wormhole].latitude), parseFloat(feed[wormhole].longitude)], [parseFloat(feed[wormhole].latitude) + randomInRange(0.01), parseFloat(feed[wormhole].longitude) + randomInRange(0.01)]],
     //    'type': 'polyline',
     //    'strokeColor': feed[wormhole].requestor.wormie_color,
     //    'strokeWidth': 4,
     //    'strokeAlpha': 0.9,
     //    id: wormhole + "_trail"
     //  });

     annotations.push({

        coordinates: [ parseFloat(feed[wormhole].latitude), parseFloat(feed[wormhole].longitude)],
        'type': 'point',     
        title: feed[wormhole].status,
        rightCalloutAccessory: {
          url: 'https://cldup.com/9Lp0EaBw5s.png',
          height: 25,
          width: 25
        },
        annotationImage: {
          url: urls.getWormie + feed[wormhole].requestor.wormie_color.slice(1) + '.png',
          height: 35,
          width: 25
        },
        // id is the index of the wormhole in the feed
        id: wormhole
      });

    }

    this.addAnnotations(mapRef, annotations);

  },
  
  getInitialState() {

    return {
      center: {
        latitude: 37.7861400,
        longitude: -122.4057540
      },
      zoom: 11,
      annotations: [],
    };
  },

  onRegionChange(location) {
    this.setState({ currentZoom: location.zoom });
  },

  onRegionWillChange(location) {
    // console.log(location);
  },

  onUpdateUserLocation(location) {
    // console.log(location);
  },

  onOpenAnnotation(annotation){
    // console.log(this.props);
    var {feed, updateCurrentWormhole} = this.props;
    updateCurrentWormhole(feed[annotation.id]);
  },

  // 
  onRightAnnotationTapped(e) {
    // console.log(e);
    this.viewRequest();
  },

  onLongPress(location){
    // console.log('long pressed', location);
  },

  viewRequest() {
    var { currentWormhole, navigator } = this.props;
    if(currentWormhole.status === 'completed') {
      navigator.push({
        component: ViewRequest,
      });
    } else {
      navigator.push({
        component: OpenWormhole,
      });
    }
  },

  _renderYoutube(){
    
    var { currentWormhole } = this.props;

    var currentWorm = (currentWormhole.requestor) ? currentWormhole : false;

    if ( currentWorm && currentWorm.submissions.length ) {
      return (
        <YouTube 
          videoId={currentWorm.submissions[0].video_url}
          play={false}
          hidden={false}
          playsInline={false}
          showinfo={false}
          modestbranding={true}
          onError={(e)=>{console.log('youtube error: ', e.error)}}
          style={{height: 121, width: 121, marginRight: 10}}
        />

      );
    } else {
      return (
        <Image 
          style={{height: 121, width: 121, marginRight: 5}}
          source = {require('../assets/dsnWormhole.jpg')}
        />

      );
    }
  },

  _renderSubmitterDetails(){
    
    var { currentWormhole } = this.props;

    var currentWorm = (currentWormhole.requestor) ? currentWormhole : false;

    if ( currentWorm && currentWorm.submissions.length ) {
      return (
        <View style={styles.littleRow}>
          <Image 
                style = {styles.profilePic}
                source = {{uri: (currentWormhole.submissions) ? currentWormhole.submissions[0].submitter.picture_url : ""}}
              />
          <Text style={styles.cardRequestor}>{ (currentWormhole.submissions) ? currentWormhole.submissions[0].submitter.username : ""}</Text>
        </View>
      );
    } else {
      
      return (
        <View style={styles.littleRow}>
        </View>
      );
    }

  },

  _timeSince(date) {

      var seconds = Math.floor((new Date() - date) / 1000);

      var interval = Math.floor(seconds / 31536000);

      if (interval > 1) {
          return interval + "y";
      }
      interval = Math.floor(seconds / 2592000);
      if (interval > 1) {
          return interval + "mo";
      }
      interval = Math.floor(seconds / 86400);
      if (interval > 1) {
          return interval + "d";
      }
      interval = Math.floor(seconds / 3600);
      if (interval > 1) {
          return interval + "h";
      }
      interval = Math.floor(seconds / 60);
      if (interval > 1) {
          return interval + "m";
      }
      return Math.floor(seconds) + "s";
  },

  _renderHeartDetails(){
    
    var { currentWormhole } = this.props;

    var currentWorm = (currentWormhole.requestor) ? currentWormhole : false;

    if ( currentWorm && currentWorm.submissions.length ) {
      return (
        <View style={styles.littleRow}>
          <Image 
                style = {styles.heart}
                source = {{uri: urls.getHeart + currentWormhole.requestor.wormie_color.slice(1) + "_" + currentWormhole.submissions[0].submitter.wormie_color.slice(1) + ".png" }}
              />
          <Text style={styles.cardRequestor}> Wormhole opened {this._timeSince(Date.parse(currentWormhole.submissions[0].created_at))} ago</Text>
        </View>
      );
    } else {
      
      return (
        <View style={styles.littleRow}>
        </View>
      );
    }

  },

  render: function() {
    var {feed, currentWormhole } = this.props;
    return (
      <View style={styles.container}>
        <Mapbox
          style={styles.map}
          direction={0}
          rotateEnabled={false}
          scrollEnabled={true}
          zoomEnabled={true}
          showsUserLocation={true}
          ref={mapRef}
          accessToken={mapboxConfig.accessToken}
          styleURL={mapboxConfig.styleURL}
          userTrackingMode={this.userTrackingMode.follow}
          centerCoordinate={this.state.center}
          zoomLevel={this.state.zoom}
          onRegionChange={this.onRegionChange}
          onRegionWillChange={this.onRegionWillChange}
          annotations={this.state.annotations}
          onOpenAnnotation={this.onOpenAnnotation}
          onRightAnnotationTapped={this.onRightAnnotationTapped}
          onUpdateUserLocation={this.onUpdateUserLocation}
          onLongPress={this.onLongPress} />
        <View style={styles.row}>
          {this._renderYoutube()}
          <View>
            <Text style={styles.cardTitle}>{currentWormhole.title}</Text>
            <View style={styles.littleRow}>
              <Image 
                    style = {styles.profilePic}
                    source = {{uri: (currentWormhole.requestor) ? currentWormhole.requestor.picture_url : ""}}
                  />
              <Text style={styles.cardRequestor}>{ (currentWormhole.requestor) ? currentWormhole.requestor.username : ""}</Text>
              {this._renderSubmitterDetails()}
            </View>
            {this._renderHeartDetails()}
          </View>
        </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  topBorder: {
    marginTop: 15,
    height: 1,
    backgroundColor: '#E4E4E4',
  },
  bottomBorder: {
    height: 1,
    backgroundColor: '#E4E4E4',
  },
  map: {
    flex: 1
  },
  row: {
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 170
  },
  littleRow: {
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 50
  },
  cardTitle: {
    marginTop: 5,
    marginBottom: 10,
    fontFamily: 'Lato-Semibold',
    fontSize: 16,
    color: '#3e3e3e',
  },
  cardRequestor: {
    fontFamily: 'Lato-Regular',
    fontSize: 12,
    color: '#727272',
    marginLeft: 5,
    marginTop: 5,
    marginRight: 5,
  },
  cardLikes: {
    marginTop: 5,
    marginBottom: 10,
    fontFamily: 'Lato-Semibold',
    fontSize: 12,
    color: '#727272',
  },
  profilePic: {
    height: 30,
    width: 30,
    borderRadius: 15,
  },
  heart: {
    height: 28,
    width: 35,
  },

});

export default MapExplore;
