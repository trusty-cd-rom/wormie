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
var YouTube = require('react-native-youtube');

var styles = StyleSheet.create({
  container:{
    // marginTop: 20,
    flex:1,
    alignItems: 'stretch',
  },
  submitterName: {
    fontSize: 18,
    color: '#00ADC7',
    alignSelf: 'flex-start',
    flex: 1,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  back: {
    flexDirection: 'row', 
    justifyContent: 'flex-start', 
    flex: 1, 
    alignSelf: 'center'
  },
  topbar: {
    color: '#4CC6EA', 
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
    color: '#4CC6EA',
    alignSelf: 'flex-start',
    flex: 1,
    fontWeight: 'bold'
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  submitterProfile: {
    flexDirection: 'row',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    backgroundColor: 'white',
  },
  requestList: {
    width: 375,
    color: '#575757',
  },
  noMatch: {
    margin: 8, 
    borderRadius: 10, 
    fontFamily: 'Lato-Bold',
    color: 'white',
    backgroundColor: '#00ADC7',
    // backgroundColor: '#A88FFF',
    fontSize: 20,
    padding: 10,
    alignSelf: 'center',
  },
  ouch: {color: '#ffa950', justifyContent: 'center', alignSelf: 'center', fontFamily: 'Lato-Bold', fontSize: 30}
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

  showWormhole() {
    var { myCurrentWormholeList } = this.props;

    if (myCurrentWormholeList.submissions.length) {
      return (
        <ScrollView
          automaticallyAdjustContentInsets={false}
          onScroll={() => { console.log('onScroll!'); }}
          scrollEventThrottle={200}
          style={{backgroundColor: 'white'}}
        >
          {this.createList()}
        </ScrollView>
      )       
    } else {
      return (
        <View
          style={{
            flex:1, 
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white'
          }}
        >
          <View
            style={{alignSelf: 'center'}}
          >
            <Text style={styles.ouch}>
              OUCH!
            </Text>
            <Image 
              source = {require('../assets/small-red-wormie.png')}
              style={{alignSelf: 'center', width: 150, height: 215}}
            />
            <Text style={styles.noMatch}>No Match Found</Text>
          </View>
        </View>
      )
    }

  }

  video() {
    let { myCurrentSubmission } = this.props;
    return (
      <YouTube 
        videoId={myCurrentSubmission.video_url}
        play={false}
        hidden={false}
        playsInline={true}
        showinfo={false}
        modestbranding={true}
        onError={(e)=>{console.log('youtube error: ', e.error)}}
        style={{alignSelf: 'stretch', height: 220, backgroundColor: 'transparent', marginBottom: 0}}
      />
    );
  }

                // <Image 
                //   source = {{uri: imageUrl}}
                //   style={{alignSelf: 'center', width: 150, height: 215}}
                // />

// return (
//           <TouchableHighlight
//             onPress = {this.viewRequest.bind(this, index)}
//             underlayColor = 'rgba(125,125,125,0.2)'
//             key={index}
//           >
//             <View
//               style={{marginTop: 14}}
//             >
//               <View 
//                 style = {styles.submitterProfile}
//               >
//                 <Image 
//                   style = {styles.image}
//                   source = {{uri: imageUrl}}
//                 />
//                 <Text> Submitter: {submission.submitter.username} </Text>
//               </View>
//               <Text>Notes: { submission.notes }</Text>
//               <View
//                 style={{alignSelf: 'center', backgroundColor: 'red', height: 400, width: 310, marginBottom: 30}}
//               >
//                 <YouTube 
//                   videoId={submission['video_url']}
//                   play={false}
//                   hidden={false}
//                   playsInline={true}
//                   showinfo={false}
//                   modestbranding={true}
//                   onError={(e)=>{console.log('youtube error: ', e.error)}}
//                   style={{height: 570, backgroundColor: 'white', }}
//                 />
//               </View>
//             </View>
//           </TouchableHighlight>
  // if function returns jsx/array of jsx, it does not take .bind(this)
  createList() {
    var { myCurrentWormholeList } = this.props;
    var submitList, submitters;
    console.log(myCurrentWormholeList.submissions.length);
    if (myCurrentWormholeList.submissions.length > 0) {
      console.log('working well');
      submitList = myCurrentWormholeList.submissions.map((submission, index) => {
        let imageUrl = `https://i.ytimg.com/vi/${submission['video_url']}/mqdefault.jpg`;
        console.log('submission', submission);
        return (
          <View
            style={{marginTop: 10, backgroundColor: '#f0f0f0'}}
          >
            <View 
              style = {styles.submitterProfile}
            >
              <Image 
                style = {styles.image}
                source = {{uri: submission.submitter.picture_url}}
              />
              <View>
                <Text style={styles.submitterName}> Submitter: {submission.submitter.username} </Text>
              </View>
            </View>
            <Text style={{marginLeft: 20,marginRight: 20,}}>Notes: { submission.notes }</Text>
            <View
              style={{alignSelf: 'center', height: 700, width: 350, marginTop: 20, marginBottom: 20}}
            >
              <YouTube 
                videoId={submission['video_url']}
                play={false}
                hidden={false}
                playsInline={true}
                showinfo={false}
                modestbranding={true}
                onError={(e)=>{console.log('youtube error: ', e.error)}}
                style={{height: 700, backgroundColor: 'white', }}
              />
            </View>
          </View>
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
        <View
          style={{flex: 1}}
        >
          {this.showWormhole()}
        </View>
      </View>
    );
  }
};

export default ViewMyWormholeList;
