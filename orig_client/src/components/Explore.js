import React, {
  Component,
  SegmentedControlIOS,
  Text,
  View,
  Image,
  StyleSheet,
  TouchableHighlight,
  AsyncStorage,
} from 'react-native';

import MapExplore from '../containers/MapExplore';
// import MapExample from '../components/MapExample';
import FeedList from '../containers/FeedList';
import Settings from '../containers/Settings';
import { Icon } from 'react-native-icons';

import api from '../utils/api';


import HeartFloater from '../components/Heart';

// var focus = <MapExample/>;

class Explore extends Component {
  
  constructor(props){
    super(props);
    console.log('hit Explore');
    this.state = {
      focus: <MapExplore navigator={this.props.navigator}/>
    }
  }

  componentWillMount() {
    let { refreshFeedAsyncStorage } = this.props;
    // console.log('coffeefrog Explorer mounted, and we about to call refresh from asycn storage', refreshFeedAsyncStorage);
    refreshFeedAsyncStorage(AsyncStorage);
  }

  componentDidMount() {
     let { setCurrentLocation, currentLocation} = this.props;

     if (!currentLocation) {
        console.log('CURRENT LOCATION DOES NOT EXIST')
        navigator.geolocation.getCurrentPosition(
          (position) => {
            var dist = [];
            let initialPosition = JSON.stringify(position);
            console.log(initialPosition);
            console.log(typeof position.coords.latitude);
            //replace with call to action function, update state via reducer
            setCurrentLocation(position.coords.longitude.toFixed(7), position.coords.latitude.toFixed(7));
          },
          (error) => alert(error.message),
          {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );
     }
  }

  goToSettings(){
    this.props.navigator.push({
      component: Settings,
    });
  }

  _renderControl() {
    let { currentFeedTab } = this.props;
      return <Text 
        style={{
          color: 'white',
          justifyContent: 'center',
          paddingTop: 3,
          fontFamily: 'Lato-Bold', 
          textAlign: 'center',
          fontSize: 18,
        }}>Explore</Text>
  }

  _onChangeSorting(event) {
    let { sortList, currentLocation } = this.props;

    var lat = currentLocation ? currentLocation.latitude : "0";
    var lon = currentLocation ? currentLocation.longitude : "0";
    // var touchEvent = event.nativeEvent.value;
    var criteria = event.nativeEvent.value.toLowerCase();
    console.log(criteria);
    sortList(criteria, lon, lat);
  }

  _onChangeFocus(value, event) {
    // debugger;
    let { setCurrentFeedTab } = this.props;
    var touchEvent = value;
    if ( touchEvent === "Map") {
      // setCurrentFeedTab('Map');
      this.setState({"currentTab": "Map"});
      this.setState({
        focus: <MapExplore navigator={this.props.navigator}/>
      });
    } else {
      // setCurrentFeedTab('List');
      this.setState({"currentTab": "List"});
      this.setState({
        focus: <FeedList navigator={this.props.navigator}/>
      });
    }
  }

  _renderPagination() {
    if (this.state.currentTab === 'List') {
      return (
        <SegmentedControlIOS 
          values={['Recent', 'Nearby', 'Popular']}
          style={[styles.segmentedControl, {flex: 0.005, width: 200, height: 15, margin: 5}]}
          tintColor="white"
          selectedIndex={0} 
          onChange={this._onChangeSorting.bind(this)}/>
      )
    } else {
      return <View />
    }
  }

  _onChange(event) {
    console.log("click:", event.nativeEvent.value);
    var touchEvent = event.nativeEvent.value;
    
    if ( touchEvent === "Map") {
      this.setState({"currentTab": "Map"});
      this.setState({
        focus: <MapExplore navigator={this.props.navigator}/>
      });
    } else {
      this.setState({"currentTab": "List"});
      this.setState({
        focus: <FeedList navigator={this.props.navigator}/>
      });
    }
  }
  render() {
    var { currentUser } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <TouchableHighlight
            onPress={() => {
              this.goToSettings();
            }}
            style={{flex: 4}}
            underlayColor='#4CC6EA'>
            <Image 
              style = {styles.profilePic}
              source = {{uri: currentUser['picture_url']}}
            />
          </TouchableHighlight>
          <View
            style={{flex:8}}
          >
            {this._renderControl()}
          </View>
          <View
            style={{flex: 4,}}
          >
            <SegmentedControlIOS 
              values={['Map', 'List']}
              style={styles.segmentedControlTwo}
              tintColor="white"
              selectedIndex={0} 
              onChange={this._onChange.bind(this)}/>
          </View>          
        </View>
        { this._renderPagination() }
        {this.state.focus}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#4CC6EA',
  },
  row: {
    paddingTop: 20,
    flex: 0.053,
    flexDirection: 'row',
    backgroundColor: '#4CC6EA',
    // height: 55
  },
  pagination: {
    flex: 0.03,
    flexDirection: 'row',
    backgroundColor: '#4CC6EA',
    // height: 5
  },
  mapIcon: {
    width: 30,
    height: 30,
    paddingBottom: 2,
    paddingLeft: 20,
    alignSelf: 'center'
  },
  listIcon: {
    width: 20,
    height: 20,
    padding: 20,
    paddingTop: 10,
    alignSelf: 'center'
  },
  sort: {
    flexDirection: 'row',
    backgroundColor: '#4CC6EA',
    height: 40,
    width: 80,
    position: 'absolute',
    top: 20,
    right: 0, 
  },
  profilePic: {
    marginLeft: 10,
    height: 30,
    width: 30,
    borderRadius: 15,
  },
  title:{
    fontFamily: 'Lato-Bold',
    marginTop: 4,
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    flex:1,
  },
  segmentedControl: {
    fontFamily: 'Lato-Bold',
    fontSize: 24,
    flex: 1,
    // marginBottom: 5,
    paddingBottom:25,
    marginLeft: 35,
    marginRight: 35,
    // width: 200,
    alignSelf: 'center',
  },
  segmentedControlTwo: {
    fontFamily: 'Lato-Bold',
    fontSize: 24,
    width: 70,
    height: 29,
    alignSelf: 'flex-end',
    marginRight: 3,
    marginBottom: 3
  }
});

export default Explore;
