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
import Topbar from './Topbar';
import { Icon } from 'react-native-icons';

var styles = StyleSheet.create({
  container:{
    marginTop: 20,
    flex:1
  },
  back: {
    flexDirection: 'row', 
    justifyContent: 'flex-start', 
    flex: 1, 
    alignSelf: 'center'
  },
  topbar: {
    color: '#39247f', 
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    flexDirection: 'row',
    flex: 1
  },
  topBarText: {
    flexDirection: 'row', 
    justifyContent: 'center', 
    flex: 10,
    alignSelf: 'center'
  },
  ionic: { 
    width: 30, 
    height: 30, 
    marginLeft: 5, 
    marginTop: 5,
  },
  buttonText: {
    fontSize: 15,
    color: '#39247f',
    alignSelf: 'flex-start',
    flex: 1,
    fontWeight: 'bold'
  },
  image: {
    height: 20,
    width: 20
  },
  submitterProfile: {
    flexDirection: 'row',
  },
  requestList: {
    width: 375,
    color: '#575757',
    padding: 5,
  },
});

class ViewMyWormholeList extends Component{
  back() {
    this.props.navigator.pop();
  }

  viewRequest(index) {
    var { updateMyCurrentWormholeList, myCurrentWormholeList } = this.props;
    console.log('trying to view request: ', myCurrentWormholeList);
    
    // UPDATECURRENTWORMHOLE
    // this function is setting current Wormhole to set the top-state
    // top state will contain information about what the current wormhole is
    // current wormhole is the next page after user press current request
    this.props.navigator.push({
      component: ViewMyWormhole,
      passProps: {wormhole: myCurrentWormholeList.submissions[index]}
    });
  }

  showStatus() {
    var { myCurrentWormholeList } = this.props;

    if (myCurrentWormholeList.submissions.length) {
      // return (
      //   <Text>There is a Match!</Text>
      // )
      return <View />          
    } else {
      return (
        <View
          style={{
            flex:1, 
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text>There is No Match Yet.</Text>
        </View>
      )
    }
  }


  // if function returns jsx/array of jsx, it does not take .bind(this)
  createList() {
    var { myCurrentWormholeList } = this.props;
    var submitList, submitters;
    console.log(myCurrentWormholeList.submissions.length);
    if (myCurrentWormholeList.submissions.length > 0) {
      console.log('working well');
      submitList = myCurrentWormholeList.submissions.map((submission, index) => {
        console.log(submission);
        return (
          <TouchableHighlight
            onPress = {this.viewRequest.bind(this, index)}
            underlayColor = 'rgba(125,125,125,0.2)'
            key={index}
          >
            <View
              style={{marginTop: 14}}
            >
              <View 
                style = {styles.submitterProfile}
              >
                <Image 
                  style = {styles.image}
                  source = {{uri: submission.submitter['picture_url']}}
                />
                <Text> Submitter: {submission.submitter.username} </Text>
              </View>
              <Text>Notes: { submission.notes }</Text>
            </View>
          </TouchableHighlight>
        );
      });

      submitters = (
        <View>
          { submitList }
        </View>
      )
    } else {
      submitters = <View />;
    }

    return (
      <View 
        style = {styles.requestList}
      >
        { submitters }
      </View>
    );
  }

  // topbar() {
  //   return (
  //     <View
  //       style={styles.topbar}
  //     >
  //       <TouchableHighlight
  //         onPress={this.back.bind(this)}
  //         underlayColor='white'
  //         color='white'
  //         style={styles.back}
  //       > 
  //         <Icon
  //           name='ion|chevron-left'
  //           size={30}
  //           color='#39247f'
  //           style={styles.ionic}
  //         />
  //       </TouchableHighlight>
  //       <View 
  //         style={styles.topBarText}
  //       >
  //         <Text
  //           style={{
  //             fontWeight: 'bold',
  //             color: '#39247f',
  //             fontSize: 15,
  //           }}
  //         >Wormholes      </Text>
  //       </View>
  //     </View>
  //   );
  // }

  render() {
    return (
      //use {} for anything that is not html or text. this allows you to run JS in JSX
      <View
        style={styles.container}
      >
        <Topbar 
          topbarTitle={"Wormholes"} 
          navigator={this.props.navigator}
        />
        <ScrollView
          automaticallyAdjustContentInsets={false}
          onScroll={() => { console.log('onScroll!'); }}
          scrollEventThrottle={200}
          style={{flex: 10}}
        >
          <View>
            {this.showStatus()}
          </View>
          {this.createList()}
        </ScrollView>
      </View>
    );
  }
};

export default ViewMyWormholeList;
