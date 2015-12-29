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
import api from '../utils/api';

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


  goToSettings(){
    this.props.navigator.push({
      component: Settings,
    });
  }

  render() {
    var { currentUser } = this.props;
    console.log(currentUser['picture_url']);
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
          <Text style={styles.title}>Explore</Text>
          <SegmentedControlIOS 
            values={['Map', 'List']}
            style={styles.segmentedControl}
            tintColor="white"
            selectedIndex={0} 
            onChange={this._onChange.bind(this)}/>
        </View>
        {this.state.focus}
      </View>
    );
  }

  _onChange(event) {
    // console.log("click:", event.nativeEvent.value);
    var touchEvent = event.nativeEvent.value;
    
    if ( touchEvent === "Map") {
      this.setState({
        focus: <MapExplore navigator={this.props.navigator}/>
      });
    } else {
      this.setState({
        focus: <FeedList navigator={this.props.navigator}/>
      });
    }
  }

};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#39247F',
  },
  row: {
    paddingTop: 20,
    flexDirection: 'row',
    backgroundColor: '#4CC6EA',
    height: 55
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
  segmentedControl:{
    marginRight: 10,
    fontFamily: 'Lato-Regular',
    fontSize: 24,
    width: 100,
  }
});

export default Explore;
