import React, {
  Component,
  SegmentedControlIOS,
  Text,
  View,
  StyleSheet,
} from 'react-native';

import MapExplore from '../containers/MapExplore';
// import MapExample from '../components/MapExample';
import FeedList from '../containers/FeedList';

// var focus = <MapExample/>;

class Explore extends Component {
  
  constructor(){
    super();
    this.state = {
      focus: <MapExplore/>
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <SegmentedControlIOS 
          values={['Map', 'List']}
          style={styles.segmentedControl}
          tintColor="#39247F"
          selectedIndex={0} 
          onChange={this._onChange.bind(this)}/>
        {this.state.focus}
      </View>
    );
  }

  _onChange(event) {
    console.log("click:", event.nativeEvent.value);
    var touchEvent = event.nativeEvent.value;
    
    if ( touchEvent === "Map") {
      this.setState({
        focus: <MapExplore/>
      });
    } else {
      this.setState({
        focus: <FeedList/>
      });
    }
  }

};

const styles = StyleSheet.create({
  container:{
    marginTop: 20,
    marginBottom: 49,
    flex: 1,
    backgroundColor: 'white'
  },
  segmentedControl:{
    fontFamily: 'Lato-Regular',
    fontSize: 24,
    width: 100,
    alignSelf: 'center',
    justifyContent: 'center',
  }
});

export default Explore;
