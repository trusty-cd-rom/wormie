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


var styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignSelf: 'stretch',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    flex: 1,
    padding: 4,
    marginTop: 10,
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
  singleButton: {
    width: 172,
    height: 138,
    marginBottom: 10,
    backgroundColor: '#55378F',
  },
  buttonText: {
    fontFamily: 'Lato-Bold',
    textAlign: 'center',
    alignSelf: 'center',
    color: 'white',
    fontSize: 25,
  },
  icon: {
    width: 60,
    height: 60,
    marginTop: 20,
    paddingLeft: 20,
    alignSelf: 'center'
  },
  floatView: {
    position: 'absolute',
    width: 100,
    height: 100,
    top: 88,
    left: 0,
    backgroundColor: 'green',
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
    color: '#39247F',
    fontFamily: 'Lato-Bold',
    fontSize: 18,
    marginTop: 8,
  },
  separator: {
    height: 1,
    backgroundColor: '#E4E4E4',
    flex: 1,
    marginLeft: 15,
    marginTop: 10,
    marginRight: 15
  },
});

class DiscoverRequest extends React.Component{

  setTarget(data) {
    let { setCurrentTarget } = this.props;
    console.log(data);
    setCurrentTarget(data);
  } 

  // <View><Text> {rowData.location.coordinate.longitude || ''} </Text></View>
  // <View><Text> {rowData.location.coordinate.latitude || ''} </Text></View>


  render() {
    
    return (
      <View
        style={{marginTop: 20}}
      >
        <Topbar
          topbarTitle={this.props.topbarTitle}
          navigator={this.props.navigator}
        />
      </View>
    );
  }
}

DiscoverRequest.propTypes = {
  responseList: React.PropTypes.object.isRequired
}

export default DiscoverRequest;
