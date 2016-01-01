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
import Spinner from './Spinner';

var styles = StyleSheet.create({
  list: {
    // textAlign: 'left',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  notes: {
    margin: 8, 
    borderRadius: 5, 
    fontFamily: 'Lato-Bold',
    color: '#0090a5', 
    fontSize: 15, 
    paddingLeft: 2,
  },
  image: {
    height: 350
  },
  noteContent: {
    backgroundColor: '#f0f0f0', 
    color: '#585858', 
    fontSize: 15, 
    fontFamily: 'Lato-Regular', 
    padding: 10, 
    paddingTop: -3
  },
  buttonText: {
    fontSize: 18,
    color: '#00ADC7',
    alignSelf: 'flex-start',
    flex: 1,
    fontWeight: 'bold',
    marginBottom: 10,
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
    marginBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
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
    if (submissions) {
      return submissions.map((submission, index) => {
        console.log(submission);
        let imageUrl = `https://i.ytimg.com/vi/${submission.video_url}/mqdefault.jpg`;      
        return (
          <View 
            key={index}
            style={styles.submissionList}
          >
            <TouchableHighlight
              onPress = {this.viewRequest.bind(this, index)}
              underlayColor = 'rgba(125,125,125,0)'
              style={styles.submission}
            >
              <View>
                <Text style={styles.buttonText}>{submission.wormhole.title} </Text>
                <Image 
                  style = {{alignSelf: 'stretch', height: 220, backgroundColor: 'transparent', marginBottom: 0}}
                  source = {{uri: imageUrl}}
                />
                <View style={{ backgroundColor: '#f0f0f0', flex:1, flexDirection: 'row'}}>
                  <Text style={styles.notes}>Requester's Notes</Text>
                </View>
                <Text style={styles.noteContent}>
                  {submission.wormhole.notes}
                </Text>
                <View style={{ backgroundColor: '#f0f0f0', flex:1, flexDirection: 'row'}}>
                  <Text style={styles.notes}>My Notes</Text>
                </View>
                <Text style={styles.noteContent}>
                  {submission.notes}
                </Text>
              </View>
            </TouchableHighlight>
          </View>
        );
      });
    }
    return <View />
  }

  handleScroll(e) {
    var { isAnimating, getUserInfo, currentUser } = this.props;
    var scrollY = e.nativeEvent.contentInset.top + e.nativeEvent.contentOffset.y
    this.lastScrollY = scrollY;
    this.lastContentInsetTop = e.nativeEvent.contentInset.top;
    this.lastContentOffsetX = e.nativeEvent.contentOffset.x;
    this.minPulldownDistance = 40;

    console.log('onScroll!');

    if (scrollY < -this.minPulldownDistance) {
      if (!isAnimating) {
        getUserInfo(currentUser.id);
      }
    }
  }

  render() {
    var { toggleAnimating, isAnimating } = this.props;
    return (
      //use {} for anything that is not html or text. this allows you to run JS in JSX
      <View>
        <View
          style={styles.submissionList}
        >
          <Spinner 
            isAnimating={this.props.isAnimating}
            getUserInfo={this.props.getUserInfo}
            currentUser={this.props.currentUser} 
          />
        </View>
        <ScrollView
          automaticallyAdjustContentInsets={false}
          onScroll={(e) => {
            this.handleScroll(e)
            toggleAnimating(isAnimating);
          }}
          scrollEventThrottle={200}
          style={styles.list}
        >
          {this.createList()}
        </ScrollView>
      </View>
    );
  }
};

export default MySubmissions;
