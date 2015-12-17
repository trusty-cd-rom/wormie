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
  
  getInitialState() {
    return {
      center: {
        latitude: 40.72052634,
        longitude: -73.97686958312988
      },
      zoom: 11,
    };
  },

  onRegionChange(location) {
    this.setState({ currentZoom: location.zoom });
  },

  onRegionWillChange(location) {
    console.log(location);
  },

  onUpdateUserLoocation(location) {
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
          styleURL={this.mapStyles.emerald}
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
