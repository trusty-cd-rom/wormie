import React, {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  ListView,
} from 'react-native';

import { Icon } from 'react-native-icons';
import Topbar from './Topbar';
import SearchLocation from './SearchLocation';
import DiscoverRequest from '../containers/DiscoverRequest';
import CreateRequest from '../containers/CreateRequest';


var styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignSelf: 'stretch',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    flex: 1,
    padding: 4,
    marginTop: 4,
    fontFamily: 'Lato-Regular',
  },
  infoContainer: {
    // color: 'black',
    alignSelf: 'flex-start'
  },
  name: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#3e3e3e',
    marginTop: 10,
    marginBottom: 5,
  },
  handle: {
    fontSize: 16,
    color: '#727272'
  },
  image: {
    height: 70,
    width: 70,
    borderRadius: 40,
    marginTop: 2,
    alignSelf: 'center',
    marginLeft: 8,
    marginRight: 10
  },
  button: {
    flex: 1,
    flexDirection:'column',
    alignItems:'flex-end',
    paddingRight: 7,
  },
  ionic: { 
    width: 30, 
    height: 30,
  },
  image: {
    height: 120,
    width: 120,
    borderRadius: 20,
    marginTop: 2,
    alignSelf: 'flex-start',
    marginLeft: 5,
    marginRight: 10
  },
  ratingImage: {
    height: 20,
    width: 100,
    paddingLeft: 5,
    margin: 5,
  },
  name: {
    color: '#4CC6EA',
    fontFamily: 'Lato-Bold',
    fontSize: 18,
    marginTop: 8,
  },
  separator: {
    height: 1,
    backgroundColor: '#E4E4E4',
    flex: 1,
    marginLeft: 15,
    marginTop: 4,
    marginRight: 15
  },
  noMatch: {
    margin: 8, 
    borderRadius: 10, 
    fontFamily: 'Lato-Bold',
    color: 'white',
    backgroundColor: '#00ADC7',
    // backgroundColor: '#A88FFF',
    fontSize: 20,
    padding: 10,
    alignSelf: 'center',
  },
  warning: {
    margin: 8, 
    borderRadius: 10, 
    fontFamily: 'Lato-Bold',
    color: 'white',
    backgroundColor: '#F888A4',
    // backgroundColor: '#A88FFF',
    fontSize: 20,
    padding: 10,
    alignSelf: 'center',
  },
  click: {
    padding: 10,
    alignSelf: 'center',
    fontFamily: 'Lato-Bold',
  },
  ouch: {
    color: '#ffa950', 
    justifyContent: 'center', 
    alignSelf: 'center', 
    fontFamily: 'Lato-Bold', 
    fontSize: 30
  },
});

class DiscoverSearch extends React.Component{

  componentWillMount() {
    let { setResultList } = this.props;
    setResultList([{"name": "default", "location":{ "display_address": [""]}}]);  
  }

  setTarget(data) {
    let { setCurrentTarget } = this.props;
    setCurrentTarget(data);
    let name = data.name;
    this.props.navigator.push({
      component: DiscoverRequest,
      passProps: {topbarTitle: name}
    });
  } 

  separator(){
    let { responseList } = this.props;
    if (responseList[0].location['display_address'].length === 0) {
      return (
        <View />
      )
    } else {
      return (
        <View style={styles.separator} />
      );      
    }
  }

  _renderRow(rowData){
    let list = rowData.location['display_address'].map((address, index) => {
      return (
        <Text key={index} style={{fontFamily: 'Lato-Regular'}}> { address } </Text>
      );
    })

    // when just get the page ( user did not search the location)
    if (rowData.name === 'default') {
      return (
        <View style={{top: 90, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={{alignSelf: 'center'}}
          >
            <Text style={styles.ouch}>
              YAY!
            </Text>
            <Image 
              source = {require('../assets/small-red-wormie.png')}
              style={{alignSelf: 'center', width: 150, height: 215}}
            />
            <Text style={styles.noMatch}>Search Place with Wormie!</Text>
          </View>
        </View>
      )
    } else {
      return (
        <View>
          <TouchableHighlight
            style={styles.container}
            onPress={this.setTarget.bind(this, rowData)}
            underlayColor = 'rgba(76,198,234,0.1)'
          >
            <View style={{flex: 1, flexDirection: 'row'}}>
              <Image 
                source = {{uri: rowData['image_url']}} 
                style={styles.image}
              />
              <View>
                <View
                  style={{alignSelf: 'flex-end'}}
                >
                  <Text style={styles.name}> {rowData.name || ''} </Text>
                  <Image 
                    source = {{uri: rowData['rating_img_url']}} 
                    style={styles.ratingImage}
                  />
                  { list }
                </View>
              </View>
            </View>
          </TouchableHighlight>
          { this.separator() }
        </View>
      )    
    }
  }

  _renderList(ds) {
    let { responseList } = this.props;
    console.log(responseList);

    // if location parameter is missing
    if (responseList.id == "MISSING_PARAMETER" || responseList.id == "UNAVAILABLE_FOR_LOCATION") {
      return (
        <View />
      )

    // if yelp has list for the requested params
    } else if (responseList) {
      return (
        <ListView
          dataSource={ds.cloneWithRows(responseList)}
          renderRow={this._renderRow.bind(this)}
          style={{
            backgroundColor:'white',
            position: 'absolute',
            top: 133,
            order: 99,
            width: 380,
            height: 523,
          }}
        />
      );
    }
  }

  _renderMapWormie(ds) {
    let { responseList } = this.props;
    var rows = responseList;

    // when location param is missing
    if (responseList.id == "MISSING_PARAMETER") {
      console.log(responseList.id);
      var message = responseList.field.slice(0, 1).toUpperCase() + responseList.field.slice(1);
      return (
        <View style={{top: 90, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={{alignSelf: 'center'}}
          >
            <Text style={styles.ouch}>
              OUCH!
            </Text>
            <Image 
              source = {require('../assets/small-red-wormie.png')}
              style={{alignSelf: 'center', width: 150, height: 215}}
            />
            <Text style={styles.warning}>Please, Fill {message}</Text>
          </View>
        </View>
      )

    // if yelp does not have data
    } else if (responseList.length == 0 || responseList.id == "UNAVAILABLE_FOR_LOCATION") {
      console.log("MAP WORMHOLE!!!!!!!!!!!!!!!!!!!!");
      console.log(responseList.id);
      return (
        <View style={{top: 90, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={{alignSelf: 'center'}}
          >
            <Text style={[styles.ouch, {marginBottom: 10}]}>
              Don't Panic
            </Text>
            <Image 
              source = {require('../assets/small-red-wormie.png')}
              style={{alignSelf: 'center', width: 150, height: 215}}
            />
            <TouchableHighlight
              underlayColor='white'
              onPress={() => {
                this.props.navigator.push({
                  component: CreateRequest,
                  passProps: {coords: this.props.coordinates, google: true}
                })
              }}
              style={{alignSelf: 'center', backgroundColor: 'white'}}
            >
              <Text style={[styles.noMatch, {backgroundColor: '#A88FFF'}]}>Open Wormhole!</Text>
            </TouchableHighlight>
          </View>
        </View>
      )
    } else {
      return <View />
    }
    
  }

  render() {
    let { responseList, setCurrentTerm, setCurrentLocation } = this.props;
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    
    return (
      <View>
        <Topbar
          topbarTitle={this.props.topbarTitle}
          navigator={this.props.navigator}
        />
        { this._renderList(ds) }
        <SearchLocation
          setCurrentTerm={this.props.setCurrentTerm} 
          setCurrentLocation={this.props.setCurrentLocation}
          setCoords={this.props.setCoords}
          searchInfo={this.props.searchInfo}
          category={this.props.category}
          term={this.props.term}
          location={this.props.location}
          style={{
            position: 'absolute',
            top: 20,
          }}
        />
        { this._renderMapWormie(ds) }
      </View>
    );
  }
}

DiscoverSearch.propTypes = {
  responseList: React.PropTypes.object.isRequired
}

export default DiscoverSearch;
