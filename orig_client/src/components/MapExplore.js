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

////////////////////////////////////////////////
// Hearts
////////////////////////////////////////////////
var Dimensions = require('Dimensions');
var {
  width: deviceWidth,
  height: deviceHeight
} = Dimensions.get('window');

var ANIMATION_END_Y = Math.ceil(deviceHeight * .5);
var NEGATIVE_END_Y = ANIMATION_END_Y * -1;
var startCount = 1;


function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

// Native components
var {
  StyleSheet,
  Component,
  Animated,
  TouchableWithoutFeedback,
  Text,
  View,
  Image,
  AsyncStorage,
} = React;

////////////////////////////////////////////////
// Heart classes
////////////////////////////////////////////////

var Heart = React.createClass({
  
  render: function() {

    var { currentWormhole } = this.props;
    
    return (
      <View {...this.props} style={[this.props.style]}>
        <View style={styles.littleHeartRow}>
          <Image 
                style = {styles.heart}
                source = {{uri: urls.getLeftHeart + currentWormhole.requestor.wormie_color.slice(1) + ".png" }}
              />
          <Image 
                style = {styles.heart}
                source = {{uri: urls.getRightHeart + currentWormhole.submissions[0].submitter.wormie_color.slice(1) + ".png" }}
              />
        </View>
      </View>
    )
  }
});

var AnimatedHeart = React.createClass({
  getDefaultProps: function() {
      return {
          onComplete: function() {}  
      };
  },
  getInitialState: function() {

      var {currentWormhole} = this.props;

      return {
          position: new Animated.Value(0)  
      };
  },
  componentWillMount: function() {
      this._yAnimation = this.state.position.interpolate({
        inputRange: [NEGATIVE_END_Y, 0],
        outputRange: [ANIMATION_END_Y, 0]
      });

      this._opacityAnimation = this._yAnimation.interpolate({
        inputRange: [0, ANIMATION_END_Y],
        outputRange: [1, 0]
      });

      this._scaleAnimation = this._yAnimation.interpolate({
        inputRange: [0, 15, 30],
        outputRange: [0, 1.2, 1],
        extrapolate: 'clamp'
      });

      this._xAnimation = this._yAnimation.interpolate({
        inputRange: [0, ANIMATION_END_Y/2, ANIMATION_END_Y],
        outputRange: [0, 15, 0]
      });

      this._rotateAnimation = this._yAnimation.interpolate({
        inputRange: [0, ANIMATION_END_Y/4, ANIMATION_END_Y/3, ANIMATION_END_Y/2, ANIMATION_END_Y ],
        outputRange: ['0deg', '-2deg', '0deg', '2deg', '0deg']
      });
  },
  componentDidMount: function() {
      Animated.timing(this.state.position, {
        duration: 2000,
        toValue: NEGATIVE_END_Y
      }).start(this.props.onComplete);
  },
  getHeartAnimationStyle: function() {
    return {
      transform: [
        {translateY: this.state.position},
        {translateX: this._xAnimation},
        {scale: this._scaleAnimation},
        {rotate: this._rotateAnimation}
      ],
      opacity: this._opacityAnimation
    }
  },
  render: function() {

    var {currentWormhole} = this.props;

    return (
      <Animated.View style={[styles.heartWrap, this.getHeartAnimationStyle(), this.props.style]}>
        <Heart currentWormhole={currentWormhole}/>
      </Animated.View>
    )
  }
});


////////////////////////////////////////////////
// MapExplore component - the main view of page
////////////////////////////////////////////////

var MapExplore = React.createClass({

  mixins: [Mapbox.Mixin],

  componentDidMount() {
    var { refreshFeedData, currentWormhole, feed, updateCurrentWormhole, refreshFeedData_fromAsyncStorage } = this.props;
    refreshFeedData_fromAsyncStorage(AsyncStorage, () => {
      setTimeout(() => {this.getWormholeAnnotations()},300);
    });
  },

  addHeart() {

    // If the user hasn't already liked the submission, then this will fire off a like!
    var { currentWormhole, currentUser, updateLikes} = this.props;
    
    var currentWorm = (currentWormhole.requestor) ? currentWormhole : false;

    if ( currentWorm && currentWorm.submissions.length ) {

      startCount += 1;
      this.state.hearts.push({
        id: startCount,
        right: getRandomNumber(50, 150)
      });
      this.setState(this.state);

      if ( currentWormhole.submissions[0].likers.indexOf(currentUser.account_id) === -1 ) {

        updateLikes(currentUser, currentWormhole);
      }

    }

  },

  removeHeart(v) {
    var index = this.state.hearts.findIndex(function(heart) {
      return heart.id === v;
    });
    this.state.hearts.splice(index, 1);
    this.setState(this.state);
  },

  getWormholeAnnotations() {

    var { feed } = this.props;

    var annotations = [];

    for ( var wormhole in feed ) {

      let annotation;
      let thisWormhole = feed[wormhole];


      if(feed[wormhole].submissions.length>0 && feed[wormhole].submissions[0].location && feed[wormhole].submissions[0].location !== '[]') {
        console.log('aaaaaa', feed[wormhole].submissions[0].location);
        let locationData = JSON.parse(feed[wormhole].submissions[0].location);
        // console.log(locationData, typeof locationData, Array.isArray(locationData));
        let mapCenter = [locationData[locationData.length-1][0],locationData[locationData.length-1][1]];
        console.log('mapCenter', mapCenter);
        annotations.push({
          "coordinates": locationData,
          "type": "polyline",
          "strokeColor": feed[wormhole].submissions[0].submitter.wormie_color,
          "strokeWidth": 5,
          "strokeAlpha": 0.9,
          "id": `${wormhole}path`
        });
        annotations.push({
          coordinates: mapCenter,
          'type': 'point',
          title: 'Ouch!',
          annotationImage: {
            url: urls.getWormie + feed[wormhole].submissions[0].submitter.wormie_color.slice(1) + '.png',
            height: 35,
            width: 25
          },
          id: wormhole
        });
      } else {
        annotations.push({
          coordinates: [ parseFloat(feed[wormhole].latitude), parseFloat(feed[wormhole].longitude)],
          'type': 'point',
          annotationImage: {
            url: urls.getWormie + feed[wormhole].requestor.wormie_color.slice(1) + '.png',
            height: 35,
            width: 25
          },
          // id is the index of the wormhole in the feed
          id: wormhole
        });
      }

     // SAMPLE POLYLINES!
     // annotations.push({

     //    coordinates: [ [parseFloat(feed[wormhole].latitude), parseFloat(feed[wormhole].longitude)], [parseFloat(feed[wormhole].latitude) + randomInRange(0.01), parseFloat(feed[wormhole].longitude) + randomInRange(0.01)]],
     //    'type': 'polyline',
     //    'strokeColor': feed[wormhole].requestor.wormie_color,
     //    'strokeWidth': 4,
     //    'strokeAlpha': 0.9,
     //    id: wormhole + "_trail"
     //  });

     // annotations.push(annotation);

    }
    console.log(annotations);

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
      hearts: []
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
          style={{height: 50, width: 65, marginTop: 40, marginLeft: 5, marginRight: 5}}
          source = {require('../assets/wormie-logo2.png')}
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
        <View style={styles.container}>
          {
            this.state.hearts.map(function (v, i) {
              return (
                <AnimatedHeart
                  key={v.id}
                  onComplete={this.removeHeart.bind(this, v.id)}
                  style={{right: this.state.hearts[i].right}}
                  currentWormhole={currentWormhole}
                />
              )
            }, this)
          }
          <View style={styles.littleRow}>
            <Image 
                  style = {styles.heart}
                  source = {{uri: urls.getLeftHeart + currentWormhole.requestor.wormie_color.slice(1) + ".png" }}
                />
            <Image 
                  style = {styles.heart}
                  source = {{uri: urls.getRightHeart + currentWormhole.submissions[0].submitter.wormie_color.slice(1) + ".png" }}
                />
            <Text style={styles.cardRequestor}> { currentWormhole.submissions[0].likers.length === 1 ? currentWormhole.submissions[0].likers.length + " like" : currentWormhole.submissions[0].likers.length + " likes"} </Text>
            <Text style={styles.date}> Opened {this._timeSince(Date.parse(currentWormhole.submissions[0].created_at))} ago</Text>
          </View>
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
    currentWormhole = currentWormhole || feed[0];
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
          <View style={styles.container}>
            <TouchableWithoutFeedback style={styles.container} onPress={this.addHeart}>
              <View style={styles.container}>
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
            </TouchableWithoutFeedback>
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
    height: 50,
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
  littleHeartRow: {
    flexDirection: 'row',
    height: 170,
  },
  heartWrap: {
    position: 'absolute',
    bottom: 30,
    backgroundColor: 'transparent'
  },
  heart: {
    height: 28,
    width: 18,
  },
  date: {
    fontFamily: 'Lato-Regular',
    fontSize: 12,
    color: '#727272',
    marginLeft: 5,
    marginTop: 5,
    marginRight: 5,
  },

});

export default MapExplore;
