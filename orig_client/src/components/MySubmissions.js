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
  list: {
    // textAlign: 'left',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  image: {
    height: 350
  },
  buttonText: {
    fontSize: 15,
    color: '#39247f',
    alignSelf: 'flex-start',
    flex: 1,
    fontWeight: 'bold'
  },
  submissionList: {
    flex: 1,
    width: 375,
    alignItems: 'stretch',
    padding: 5,
    // margin: 5,
  },
  submission: {
    flexDirection: 'column',
    color: '#444444',
    flex: 1,
    paddingLeft: 0,
    marginBottom: 5
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
      console.log(submission);
      return (
        <View 
          key={index}
          style={styles.submissionList}
        >
          <TouchableHighlight
            onPress = {this.viewRequest.bind(this, index)}
            underlayColor = 'rgba(125,125,125,0.2)'
            style={styles.submission}
          >
            <View>
              <Text style={styles.buttonText}>{submission.wormhole.title} </Text>
              <Text style={{fontWeight:'bold'}}>Requester's notes:</Text> 
              <Text>{submission.wormhole.notes} </Text>
              <Text style={{fontWeight:'bold'}}>My notes:</Text>
              <Text>{submission.notes} </Text>
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
        style={styles.list}
      >
        {this.createList()}
      </ScrollView>

    );
  }
};

export default MySubmissions;
