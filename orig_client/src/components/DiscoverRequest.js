import React, {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  ListView,
  WebView,
} from 'react-native';

import CreateRequest from '../containers/CreateRequest';
import Topbar from './Topbar';


var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column', 
    alignItems: 'stretch'
  },
  icon: {
    width: 35,
    height: 35,
    paddingLeft: 30,
    alignSelf: 'center'
  },
  topbarContainer: {
    flex: 1,
    backgroundColor: 'purple'
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: '#8949E0', 
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'center'
  },
  request: {
    fontFamily: 'Lato-Regular',
    fontSize: 25,
    color: 'white',
  }
})

class DiscoverRequest extends React.Component{

  setTarget(data) {
    let { setCurrentTarget } = this.props;
    console.log(data);
    setCurrentTarget(data);
  } 

  render() {
    let { target } = this.props;
    console.log(target['mobile_url']);
    return (
      <View
        style={styles.container}
      >
        <View
          style={{position: 'absolute', backgroundColor: 'red', top: 33, right: 0, left: 0, bottom: 0}}
        >
          <WebView 
            url={target['mobile_url']}
          />
        </View>
        <View
          style={{
            position: 'absolute', 
            top: 0, 
            left: 0,
            right: 0,
            backgroundColor: '#4CC6EA'
          }}
        >
          <Topbar
            topbarTitle={this.props.topbarTitle}
            navigator={this.props.navigator}
          />
          <View 
            style={{
              position: 'absolute', 
              top: 20, 
              padding:5, 
              right: 5, 
              backgroundColor: '#4CC6EA'
            }}>
            <TouchableHighlight
              underlayColor={'#4CC6EA'}
              onPress={() => {
                this.props.navigator.push({
                  component: CreateRequest,
                  passProps: {'yelp': true}
                });
              }}
            >
              <Text style={{color: 'white', fontSize: 17, fontFamily: 'Lato-Regular', fontWeight: 'bold'}}>
                Create
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
}
              // style={{backgroundColor: 'blue', height: 100}}

DiscoverRequest.propTypes = {
  responseList: React.PropTypes.object.isRequired
}

export default DiscoverRequest;
