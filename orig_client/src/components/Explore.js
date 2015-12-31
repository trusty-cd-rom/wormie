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
      component: HeartFloater,
    });
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
            underlayColor='#4CC6EA'>
            <Image 
              style = {styles.profilePic}
              source = {{uri: currentUser['picture_url']}}
            />
          </TouchableHighlight>
          <View
            style={{flex:10}}
          >
            {this._renderControl()}
          </View>
          {this._renderTabButton()}
          
        </View>
        {this.state.focus}
      </View>
    );
  }

  _renderTabButton() {
    let { currentFeedTab } = this.props;
    if (currentFeedTab === 'List') {
      return (
        <TouchableHighlight
          onPress={this._onChangeFocus.bind(this, 'Map')}
          underlayColor='#4CC6EA'>
          <Icon
            name='ion|ios-navigate-outline'
            size={30}
            color='white'
            style={styles.listIcon}
          />
        </TouchableHighlight>
      )
    } else {
      return (
        <TouchableHighlight
          onPress={this._onChangeFocus.bind(this, 'List')}
          underlayColor='#4CC6EA'>
          <Icon
            name='ion|android-menu'
            size={30}
            color='white'
            style={styles.listIcon}
          />
        </TouchableHighlight>
      )
    }
  }

  _renderControl() {
    let { currentFeedTab } = this.props;
    if (currentFeedTab === 'List') {
      return (
        <View style={styles.sort}>
          <SegmentedControlIOS 
            values={['Recent', 'Nearby', 'Popular']}
            style={styles.segmentedControl}
            tintColor="white"
            selectedIndex={0} 
            onChange={this._onChangeSorting.bind(this)}/>
        </View>    
      )
    } else {
      return <Text 
        style={{
          color: 'white',
          justifyContent: 'center',
          paddingTop: 3,
          fontFamily: 'Lato-Bold', 
          textAlign: 'center',
          fontSize: 18
        }}>Explore</Text>
    }
  }

  _onChangeSorting(event) {
    let { sortList, currentLocation } = this.props;

    var lat = currentLocation ? currentLocation.latitude : "0";
    var lon = currentLocation ? currentLocation.longitude : "0";

    var touchEvent = event.nativeEvent.value;
    if ( touchEvent === "Recent") {
      sortList('recent');
    } else if ( touchEvent === "Nearby") {
      sortList('nearby', lon, lat);
    } else if ( touchEvent === "Popular") {
      sortList('recent');
    }
  }

  _onChangeFocus(value, event) {
    // debugger;
    let { setCurrentFeedTab } = this.props;
    var touchEvent = value;
    if ( touchEvent === "Map") {
      setCurrentFeedTab('Map');
      this.setState({
        focus: <MapExplore navigator={this.props.navigator}/>
      });
    } else {
      setCurrentFeedTab('List');
      this.setState({
        focus: <FeedList navigator={this.props.navigator}/>
      });
    }
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
    height: 55
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
    height: 40
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
    paddingBottom:15,
    marginLeft: 35,
    marginRight: 35,
    // width: 200,
  }
});

export default Explore;
