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
import ViewMySubmission from '../containers/ViewMySubmission';

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
    height: 350
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
    alignSelf: 'center'
  },
  submission: {
    flexDirection: 'row',
    // alignSelf: 'stretch',
    // justifyContent: 'center',
    flex: 1,
    backgroundColor: 'orange'
  },
});

class MySubmissions extends Component{
  viewRequest(index) {
    var { submissions, updateMyCurrentSubmission } = this.props;
    console.log('trying to view request: ', submissions, submissions[index]);
    
    // UPDATECURRENTWORMHOLE
    // this function is setting current Wormhole to set the top-state
    // top state will contain information about what the current wormhole is
    // current wormhole is the next page after user press current request

    updateMyCurrentSubmission(submissions[index]);
    this.props.navigator.push({
      component: ViewMySubmission,
    });
  }

  // if function returns jsx/array of jsx, it does not take .bind(this)
  createList() {
    var { submissions } = this.props;
    return submissions.map((submission, index) => {
      return (
        <View key = {index}>
          <TouchableHighlight
            style = {styles.submission}
            onPress = {this.viewRequest.bind(this, index)}
            underlayColor = 'purple'
          >
            <View>
              <Text style = {styles.buttonText}>Request: {index} Status: {submission.status} </Text>
              <Text > Title: {submission.wormhole.title} </Text>
              <Text > Notes: {submission.notes} </Text>
            </View>
          </TouchableHighlight>
        </View>
      );
    });
  }

  render() {
    var { submissions, updateMyCurrentSubmission } = this.props;
    return (
      //use {} for anything that is not html or text. this allows you to run JS in JSX
      <ScrollView
        automaticallyAdjustContentInsets={false}
        onScroll={() => { console.log('onScroll!'); }}
        scrollEventThrottle={200}
        style={styles.list}>
        <Text style = {{color: 'white'}}>My Submissions</Text>
        {this.createList()}
      </ScrollView>

    );
  }
};

export default MySubmissions;
