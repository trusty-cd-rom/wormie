/************ PROFILE *************/
import React, {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Component,
  Image,
  TouchableHighlight,
} from 'react-native';
import ViewMyWormhole from '../containers/ViewMyWormhole';

var styles = StyleSheet.create({
  handle: {
    alignSelf: 'center',
    fontSize: 16,
    color: 'white'
  },
  container:{
    marginTop: 0,
    flex: 3,
    backgroundColor: 'black',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  list: {
    flex: 3
  },
  image: {
    height: 20,
    width: 20
  },
  submitterProfile: {
    flexDirection: 'row',
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
    alignSelf: 'center'
  },
  request: {
    flexDirection: 'row',
    // alignSelf: 'stretch',
    // justifyContent: 'center',
    flex: 1,
    backgroundColor: '#48BBEC'
  },
});

class MyWormholes extends Component{

  viewRequest(outerIndex, index) {
    var { updateMyCurrentWormhole, wormholes } = this.props;
    console.log('trying to view request: ', wormholes, wormholes[index]);
    
    // UPDATECURRENTWORMHOLE
    // this function is setting current Wormhole to set the top-state
    // top state will contain information about what the current wormhole is
    // current wormhole is the next page after user press current request
    console.log(wormholes[outerIndex].submissions[index]);
    updateMyCurrentWormhole(wormholes[outerIndex].submissions[index]);
    this.props.navigator.push({
      component: ViewMyWormhole,
    });
  }

  // if function returns jsx/array of jsx, it does not take .bind(this)
  createList() {
    var { wormholes } = this.props;
    var requestor, submitList;

    return wormholes.map((wormhole, outerIndex) => {
      // if submission for this wormhole exists
      if (wormhole.submissions.length > 0) {
        submitList = wormhole.submissions.map((submission, index) => {
          return (
            <TouchableHighlight
              onPress = {this.viewRequest.bind(this, outerIndex, index)}
              underlayColor = 'purple'
            >
              <View>
                <View 
                  key={index} 
                  style = {styles.submitterProfile}
                >
                  <Image 
                    style = {styles.image}
                    source = {{uri: submission.submitter['picture_url']}}
                  />
                  <Text> Requestor: {submission.submitter.username} </Text>
                </View>
                <Text>Notes: { submission.notes }</Text>
              </View>
            </TouchableHighlight>
          );
        });
  
        submitters = (
          <View>
            <Text> submitters</Text>
            { submitList }
          </View>
        )
      } else {
        submitters = <View />;
      }
      return (
        <View key = {outerIndex}>
          <View
            style = {styles.request}
          >
            <View>
              <Text style = {styles.buttonText}> Request: {outerIndex+1} Status: {wormhole.status} </Text>
              <Text > Title: {wormhole.title} </Text>
              <Text > Notes: {wormhole.notes} </Text>
              { submitters }
            </View>
          </View>
        </View>
      );
    });
  }

  render() {
    var { updateMyCurrentWormhole } = this.props;
    return (
      //use {} for anything that is not html or text. this allows you to run JS in JSX
      <ScrollView
        automaticallyAdjustContentInsets={false}
        onScroll={() => { console.log('onScroll!'); }}
        scrollEventThrottle={200}
        style={styles.list}
      >
        <Text style = {{color: 'white'}}>My Wormholes</Text>
        {this.createList()}
      </ScrollView>
    );
  }
};

export default MyWormholes;
