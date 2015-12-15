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
    fontSize: 15,
    color: '#39247f',
    alignSelf: 'flex-start',
    flex: 1,
    fontWeight: 'bold'
  },
  requestList: {
    flex: 1,
    width: 375,
    color: '#575757',
    // margin: 5,
    padding: 5,
    textAlign: 'left',
    // alignItems: 'stretch',
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    // flexDirection: 'row',
    // flexWrap: 'wrap',
  },
  request: {
    flex: 1,
    flexDirection: 'column',
    // flex: 1,
    // alignSelf: 'stretch',
    textAlign: 'left',
    marginBottom: 5,
    paddingLeft: 0
  },
});

class ViewMyWormholeList extends Component{

  viewRequest(index) {
    var { updateMyCurrentWormholeList, wormholes } = this.props;
    console.log('trying to view request: ', wormholes);
    
    // UPDATECURRENTWORMHOLE
    // this function is setting current Wormhole to set the top-state
    // top state will contain information about what the current wormhole is
    // current wormhole is the next page after user press current request
    console.log(currentWormholeList.submissions[index]);
    updateMyCurrentWormholeList(currentWormholeList.submissions[index]);
    this.props.navigator.push({
      component: ViewMyWormhole,
    });
  }

  showStatus(status) {
    if (status === 'completed') {
      return (
        <Text>There is a Match!</Text>
      )          
    } else if (status === 'open') {
      return (
        <Text>There is no Match Yet.</Text>
      )
    }
  }


  // if function returns jsx/array of jsx, it does not take .bind(this)
  createList() {
    var { myCurrentWormholeList } = this.props;
    var submitList, submitters;

    console.log(myCurrentWormholeList.submissions);
    if (myCurrentWormholeList.submissions.length > 0) {
      console.log('yeah')
      debugger;
      submitList = myCurrentWormholeList.submissions.map((submission, index) => {
        return (
          <TouchableHighlight
            onPress = {this.viewRequest.bind(this, index)}
            underlayColor = 'rgba(125,125,125,0.2)'
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
          // <View
          //   style={styles.request}
          // >
            // onPress = {this.viewRequest.bind(this, index)}

              // <Text style={styles.buttonText}> Title: {wormhole.title} </Text>
              // <Text> {this.showStatus(wormhole.status)} </Text>
              // <Text style={{flex: 1}}> Notes: {wormhole.notes} </Text>

    return (
      <View 
        style = {styles.requestList}
      >
        { submitters }
      </View>
    );
  }


  render() {
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

export default ViewMyWormholeList;
