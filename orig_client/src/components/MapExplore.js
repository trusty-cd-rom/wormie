var React = require('react-native');
var Mapbox = require('react-native-mapbox-gl');
var mapboxConfig = require('../utils/mapboxConfig');
var mapRef = 'mapRef';
var {
  StyleSheet,
  Component,
  Text,
  View,
  StatusBarIOS
} = React;

var MapExplore = React.createClass({

  mixins: [Mapbox.Mixin],

  componentWillMount() {
    let { refreshFeedData } = this.props;
    refreshFeedData(() => {
      this.getWormholeAnnotations();
    });
  },

  getWormholeAnnotations() {

    var { feed } = this.props;

    var annotations = [];

    for ( var wormhole in feed ) {

     annotations.push({
        coordinates: [ parseFloat(feed[wormhole].latitude), parseFloat(feed[wormhole].longitude)],
        'type': 'point',
        // title: feed[wormhole].title,
        title: feed[wormhole].latitude + ": " + feed[wormhole].longitude,
        subtitle: feed[wormhole].notes,
        rightCalloutAccessory: {
          url: 'https://cldup.com/9Lp0EaBw5s.png',
          height: 25,
          width: 25
        },
        annotationImage: {
          url: 'https://cldup.com/7NLZklp8zS.png',
          height: 25,
          width: 25
        },
        id: 'marker' + wormhole
      });

    }

    this.addAnnotations(mapRef, annotations);
    console.log("Done adding wormhole annotations");

  },
  
  getInitialState() {

    var { feed, refreshFeedData } = this.props;

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
    console.log(location);
    // let { refreshFeedData } = this.props;
    // refreshFeedData();
    // this.getWormholeAnnotations();
  },

  onUpdateUserLocation(location) {
    console.log(location);
  },

  onOpenAnnotation(annotation){
    console.log(annotation);
  },

  onRightAnnotationTapped(e) {
    console.log(e);
  },

  onLongPress(location){
    console.log('long pressed', location);
  },

  render: function() {
    StatusBarIOS.setHidden(true);
    return (
      <View style={styles.container}>
        <Mapbox
          style={styles.map}
          direction={0}
          rotateEnabled={true}
          scrollEnabled={true}
          zoomEnabled={true}
          showsUserLocation={true}
          ref={mapRef}
          accessToken={mapboxConfig.accessToken}
          styleURL={mapboxConfig.styleURL}
          userTrackingMode={this.userTrackingMode.none}
          centerCoordinate={this.state.center}
          zoomLevel={this.state.zoom}
          onRegionChange={this.onRegionChange}
          onRegionWillChange={this.onRegionWillChange}
          annotations={this.state.annotations}
          onOpenAnnotation={this.onOpenAnnotation}
          onRightAnnotationTapped={this.onRightAnnotationTapped}
          onUpdateUserLocation={this.onUpdateUserLocation}
          onLongPress={this.onLongPress} />
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    flex: 1
  }
});

export default MapExplore;
