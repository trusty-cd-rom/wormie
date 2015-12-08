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
// import Separator from './separator';

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
  viewRequest() {
    this.props.navigator.push({
      component: ViewRequest,
    });
  }
  render() {
    // var { wormholes } = this.props;
    // var list = wormholes.map((item, index) => {
    //   // console.log(item);
    //   return (
    //     <View key = {index}>
    //       <TouchableHighlight
    //         style = {styles.loginButton}
    //         onPress = {this.viewRequest.bind(this)}
    //         underlayColor = 'purple'
    //       >
    //         <Text style = {styles.buttonText}> Request: {index} </Text>
    //       </TouchableHighlight>
    //       <Separator />
    //     </View>
    //   );
    // });
    return (
      //use {} for anything that is not html or text. this allows you to run JS in JSX
      <View style={styles.container}> 
        <TouchableHighlight
            style = {styles.loginButton}
            onPress = {this.viewRequest.bind(this)}
            underlayColor = 'purple'
          >
            <Text style = {styles.buttonText}> View Request</Text>
          </TouchableHighlight>
      </View>
    );
  }
};

export default FeedList;