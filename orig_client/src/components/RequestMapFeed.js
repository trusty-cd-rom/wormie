var React = require('react-native');

// Mapbox
var Mapbox = require('react-native-mapbox-gl');
var mapboxConfig = require('../utils/mapboxConfig');
var mapRef = 'mapRef';

var {
  StyleSheet,
  Component,
  View,
  Image,
} = React;

var RequestMapFeed = React.createClass({

  mixins: [Mapbox.Mixin],
  
  getInitialState() {
    console.log('MAPFEED')
    // lat = this.props.lat ? this.props.lat : 37.7861400;
    // lon = this.props.lon ? this.props.lon : -122.4057540;
    return {
      zoom: 13,
    };
  },

  onRegionChange(location) {
    this.setState({ currentZoom: location.zoom });
  },

  onRegionWillChange(location) {
    console.log(location);
  },

  onUpdateUserLocation(location) {
    console.log(location);
  },

  onOpenAnnotation(annotation){
  },

  // 
  onRightAnnotationTapped(e) {
    console.log(e);
  },

  onLongPress(location){
    console.log('long pressed', location);
  },

  render: function() {
    console.log("Rendering map");
    console.log("state is:", this.state);
    console.log(this.props.lat);
    console.log(this.props.lon);
    var center = {
      latitude: this.props.lat,
      longitude: this.props.lon
    }
    var annotations = [{
      coordinates: [this.props.lat, this.props.lon],
      'type': 'point',
      title: 'Ouch!',
      subtitle: 'It has a rightCalloutAccessory too',
      rightCalloutAccessory: {
        url: 'https://cldup.com/9Lp0EaBw5s.png',
        height: 25,
        width: 25
      },
      annotationImage: {
        url: 'https://cldup.com/CnRLZem9k9.png',
        height: 25,
        width: 25
      },
      id: 'marker1'
    }]

    console.log(annotations);

    return (
      <View style={styles.container}>
        <Mapbox
          style={styles.map}
          direction={0}
          rotateEnabled={false}
          scrollEnabled={false}
          zoomEnabled={false}
          showsUserLocation={true}
          ref={mapRef}
          accessToken={mapboxConfig.accessToken}
          styleURL={mapboxConfig.styleURL}
          userTrackingMode={false}
          centerCoordinate={center}
          zoomLevel={this.state.zoom}
          onRegionChange={this.onRegionChange}
          onRegionWillChange={this.onRegionWillChange}
          annotations={annotations}
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
    flex: 1,
    height: 220
  },
  map: {
    flex: 1,
    height: 220
  },
});

export default RequestMapFeed;
  
