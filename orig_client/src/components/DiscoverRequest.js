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
import { Icon } from 'react-native-icons';
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
    backgroundColor: 'white'
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
          style={styles.topbarContainer}
        >
          <Topbar
            topbarTitle={this.props.topbarTitle}
            navigator={this.props.navigator}
          />
        </View>
        <View
          style={{flex: 10}}
        >
          <WebView 
            url={target['mobile_url']}
          />
        </View>
        <View
          style={styles.buttonContainer}
        >
          <TouchableHighlight
            underlayColor={'#39247F'}
            onPress={() => {
              this.props.navigator.push({
                component: CreateRequest,
                passProps: {'yelp': true}
              });
            }}
          >
            <View
              style={{
                flexDirection: 'row'
              }}
            >
              <Text
                style={styles.request}
              >{'CREATE REQUEST'}</Text>
              <Icon
                name='ion|location'
                size={35}
                color='white'
                style={styles.icon}
              />
            </View>
          </TouchableHighlight>
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
