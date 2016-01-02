import React, {
  Component,
  View,
  TextInput,
  StyleSheet,
} from 'react-native';
var {GooglePlacesAutocomplete} = require('react-native-google-places-autocomplete');

// const homePlace = {description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
// const workPlace = {description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInputContainer: {
    backgroundColor: 'white',
    height: 44,
    borderTopColor: 'white',
    borderBottomColor: 'white',
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  textInput: {
    backgroundColor: 'rgba(125,125,125,0.1)',
    height: 33,
    borderRadius: 7,
    paddingTop: 4.5,
    paddingBottom: 1,
    paddingLeft: 6,
    paddingRight: 6,
    marginTop: 7.5,
    marginLeft: 8,
    marginRight: 8,
    fontSize: 15,
  },
})

class SearchLocation extends React.Component{
  constructor(props) {
    super(props);
    this.running = false;
    this.currentTimeout;
  }
  
  setTerm(text) {
    console.log(this.running);
    let { setCurrentTerm } = this.props;
    setCurrentTerm(text);
  }

  setLocation(location) {
    let { setCurrentLocation } = this.props;
    setCurrentLocation(location);
  }

  // THROTTLE
  time() {
    if (this.running) {
      clearTimeout(this.currentTimeout);
    }
    this.running = true;
    this.currentTimeout = setTimeout(() => {
      this.sendInfo();
      this.running = false;
    }, 500);
  }

  sendInfo() {
    console.log('sendInfo is working');
    let { category, term, location, searchInfo } = this.props;
    searchInfo(category, term, location);
  }  

  render() {
    return (
      <View>
        <View
          style={styles.container}
        >
          <View
            style={styles.textInputContainer}
          >
            <TextInput 
              style={styles.textInput} 
              onChangeText={(text) => {
                this.setTerm(text);
                this.time();
              }}
              placeholder={'tacos, cheap dinner, Max\'s'}
              autoFocus={true}
            />
          </View>
        </View>
        <GooglePlacesAutocomplete
          placeholder='city, please!'
          minLength={2} // minimum length of text to search
          autoFocus={false}
          enablePoweredByContainer={false}
          fetchDetails={true}
          onPress={(data, details) => { // 'details' is provided when fetchDetails = true
            console.log(details['formatted_address']);
            this.setLocation(details['formatted_address']);
            this.props.setCoords(details.geometry.location);
            this.time();
          }}
          getDefaultValue={() => {
            return ''; // text input default value
          }}
          query={{
            // available options: https://developers.google.com/places/web-service/autocomplete
            key: 'AIzaSyCNsbBETvV4YWKJED_pBZ_9UKJVwYXcHSs',
            language: 'en', // language of the results
            types: '(cities)', // default: 'geocode'
          }}
          styles={{
            description: {
              fontWeight: 'bold',
            },
            predefinedPlacesDescription: {
              color: '#1faadb',
            },
            textInputContainer: {
              backgroundColor: 'white',
              height: 44,
              borderTopColor: 'white',
              borderBottomColor: 'white',
              borderTopWidth: 0,
              borderBottomWidth: 0,
            },
            textInput: {
              backgroundColor: 'rgba(125,125,125,0.1)',
              height: 33,
              borderRadius: 7,
              paddingTop: 1,
              paddingBottom: 1,
              paddingLeft: 6,
              paddingRight: 6,
              marginTop: 3,
              marginLeft: 8,
              marginRight: 8,
              fontSize: 15,
            },
          }}

          currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
          currentLocationLabel="Current location"
          nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
          GoogleReverseGeocodingQuery={{
            // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
          }}
          GooglePlacesSearchQuery={{
            // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
            rankby: 'distance',
            types: 'food',
          }}


          filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities

          // predefinedPlaces={[homePlace, workPlace]}
        />
      </View>
    );
  }
};
export default SearchLocation
