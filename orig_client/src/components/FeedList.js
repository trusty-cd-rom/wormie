/************ FEED *************/
import React, {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Component,
  TouchableHighlight,
} from 'react-native';
import ViewRequest from '../containers/ViewRequest';
import OpenWormhole from '../containers/OpenWormhole';
// import Separator from './seperator';

var styles = StyleSheet.create({
  container:{
    marginTop: 20,
    flex: 1,
    backgroundColor: 'red'
  },
  image: {
    height: 350
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
    alignSelf: 'center'
  },
  loginButton: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#48BBEC'
  },
});

class FeedList extends React.Component{
  viewRequest(index) {
    var { feed, updateCurrentWormhole } = this.props;
    console.log('trying to view request: ', index, feed[index]);
    updateCurrentWormhole(feed[index]);
    if(feed[index].status === 'open') {
      this.props.navigator.push({
        component: OpenWormhole,
      });
    } else {
      this.props.navigator.push({
        component: ViewRequest,
      });
    }
  }
  render() {
    var { feed } = this.props;
    var list = feed.map((item, index) => {
      // console.log(item);
      return (
        <View key = {index}>
          <TouchableHighlight
            style = {styles.loginButton}
            onPress = {this.viewRequest.bind(this, index)}
            underlayColor = 'purple'
          >
            <View>
              <Text style = {styles.buttonText}> Request: {index} </Text>
              <Text > {item.title} </Text>
            </View>
          </TouchableHighlight>
        </View>
      );
    });
    return (
      //use {} for anything that is not html or text. this allows you to run JS in JSX
      <View style={styles.container}>
        {list}
      </View>
    );
  }
};

export default FeedList;