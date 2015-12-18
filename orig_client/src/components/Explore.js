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
          tintColor="white"
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
    backgroundColor: '#39247F'
  },
  segmentedControl:{
    marginTop: 10,
    marginBottom: 10,
    fontFamily: 'Lato-Regular',
    fontSize: 24,
    width: 100,
    alignSelf: 'center',
    justifyContent: 'center',
  }
});

export default Explore;
