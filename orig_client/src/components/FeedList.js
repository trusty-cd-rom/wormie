/************ FEED *************/
import React, {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Component,
  TouchableHighlight,
  Image,
  AsyncStorage,
} from 'react-native';

// var GoogleStaticMap = require('../utils/GoogleStaticMap');

import ViewRequest from '../containers/ViewRequest';
import OpenWormhole from '../containers/OpenWormhole';
import Profile from '../containers/Profile';

// import MapFeed from './MapFeed';
// Mapbox
var Mapbox = require('react-native-mapbox-gl');
var mapboxConfig = require('../utils/mapboxConfig');
var mapRef = 'mapRef';

var YouTube = require('react-native-youtube');
var Video = require('react-native-video');

var FeedList = React.createClass({

  mixins: [Mapbox.Mixin],

  componentWillMount() {
    let { peekClickedUser, setClickedProfile, currentUser, refreshFeedData_fromAsyncStorage } = this.props;
    // refreshFeedData();
    // refreshFeedData_fromAsyncStorage(AsyncStorage);
    // if there is no clicked user(friends/others)
    if (!peekClickedUser) {
      // console.log('hit feed list no peekClickedUser', currentUser);
      // set currentUser to clickedUser
      setClickedProfile(currentUser);
    }
  },
  componentDidMount() {
    let { refreshFeedData_fromAsyncStorage } = this.props;
    // refreshFeedData_fromAsyncStorage(AsyncStorage);
  },
  viewRequest(index) {
    var { feed, updateCurrentWormhole } = this.props;
    // console.log('trying to view request: ', index, feed[index]);
    updateCurrentWormhole(feed[index]);
    if(feed[index].status === 'completed') {
      this.props.navigator.push({
        component: ViewRequest,
      });
    } else {
      this.props.navigator.push({
        component: OpenWormhole,
      });
    }
  },
  _renderVideo(item, index) {
    // console.log('rendering video', item.submissions[0]);
    let imageUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${item.latitude},${item.longitude}&zoom=13&size=400x300&markers=color:red%7C${item.latitude},${item.longitude}&key=AIzaSyAwp0Qycaz0CVQfNaNd4FtWew4tK3DRY9w`;
    return (
      <Image 
        style = {{alignSelf: 'stretch', height: 220, backgroundColor: 'transparent', marginBottom: 0}}
        source = {{uri: imageUrl}}
      />
    );
    // return (
    //   <MapView
    //     style={{height: 220}}
    //     region={{
    //       latitude: Number(item.latitude),
    //       longitude: Number(item.longitude),
    //       latitudeDelta: 0.1,
    //       longitudeDelta: 0.1,
    //     }}
    //     annotations={[]}
    //   />
    // );
    // if(item.submissions[0]) {
    //   let imageUrl = `https://i.ytimg.com/vi/${item.submissions[0].video_url}/mqdefault.jpg`;
    //   return (
    //     <Image 
    //       style = {{alignSelf: 'stretch', height: 220, backgroundColor: 'transparent', marginBottom: 0}}
    //       source = {{uri: imageUrl}}
    //     />
    //   );
    // }else {
    //   return (
    //     <Mapbox
    //       style={{height: 220}}
    //       direction={0}
    //       rotateEnabled={false}
    //       scrollEnabled={false}
    //       zoomEnabled={true}
    //       showsUserLocation={false}
    //       ref={mapRef}
    //       accessToken={mapboxConfig.accessToken}
    //       styleURL={mapboxConfig.styleURL}
    //       centerCoordinate={{
    //         latitude: Number(item.latitude),
    //         longitude: Number(item.longitude)
    //       }}
    //       zoomLevel={10}
    //       annotations={[{
    //         "coordinates": [Number(item.latitude), Number(item.longitude)],
    //         "type": "point",
    //         "strokeColor": "black",
    //         "strokeWidth": 10,
    //         "strokeAlpha": 0.9,
    //         "annotationImage": {
    //           url: 'http://emoji.fileformat.info/gemoji/bear.png',
    //           height: 25,
    //           width: 25
    //         },
    //         "id": `feedMap ${index}`
    //       }]}
    //     />
    //   );
    // }
  },
              // this.viewProfile.bind(this)
  _showRequestorOnCard(item) {
    let { getUserInfo } = this.props;
    if(item.submissions[0]) {
      return (
        <View style = {styles.row}>
          <TouchableHighlight
            onPress={()=>{
              var id = item.submissions[0].submitter['account_id'] + 1;
              getUserInfo(id, () => {
                this.props.navigator.push({
                  component: Profile,
                  passProps: { fromFeed: true }
                });
              })
            }}
            underlayColor='white'
          >
            <View style={{flex:1, flexDirection: 'row'}}>
              <Text style = {styles.cardSubmitter}> {item.submissions[0].submitter.username} </Text>
              <Image 
                style = {[styles.profilePic, styles.marginRight]}
                source = {{uri: item.submissions[0].submitter.picture_url}}
              />
            </View>
          </TouchableHighlight>
        </View>
      );
    } else {
      return (<View />);
    }

  },
  _timeSince(date) {

      var seconds = Math.floor((new Date() - date) / 1000);

      var interval = Math.floor(seconds / 31536000);

      if (interval > 1) {
          return interval + "y";
      }
      interval = Math.floor(seconds / 2592000);
      if (interval > 1) {
          return interval + "mo";
      }
      interval = Math.floor(seconds / 86400);
      if (interval > 1) {
          return interval + "d";
      }
      interval = Math.floor(seconds / 3600);
      if (interval > 1) {
          return interval + "h";
      }
      interval = Math.floor(seconds / 60);
      if (interval > 1) {
          return interval + "m";
      }
      return Math.floor(seconds) + "s";
  },

  render() {
    var { feed, getUserInfo, filterByStatus, sortList } = this.props;
    var list = feed.slice(feed.length-10,feed.length).reverse().map((item, index) => {
      // console.log(item);
      return (
        <View key = {feed.length - 1 - index}>
          <TouchableHighlight
            style = {styles.loginButton}
            onPress = {this.viewRequest.bind(this, feed.length - 1 - index)}
          >
            <View style = {{flex: 1}}>
              <View style={[styles.cardTitleContainer, styles.row]}>
                <Text style = {styles.cardTitle}> {item.title} </Text>
                <View style={styles.spaceBuffer} />
                <Text style = {styles.cardDate}> {this._timeSince(Date.parse(item.created_at))} </Text>
              </View>
              {this._renderVideo(item, feed.length - 1 - index)}
            </View>
          </TouchableHighlight> 
          <View style={styles.cardInfoContainer}>
            <View style = {styles.row}>
              <TouchableHighlight
                onPress={()=>{
                  // console.log('requests', item);
                  // get submisster account_id
                  // id(in database) = account_id + 1
                  // console.log('requestor id', item.requestor['account_id'] + 1);
                  var id = item.requestor['account_id'] + 1;
                  getUserInfo(id, () => {
                    this.props.navigator.push({
                      component: Profile,
                      passProps: { fromFeed: true }
                    });
                  })
                }}
                underlayColor='white'
              >
                <View style = {styles.row}>
                  <Image 
                    style = {[styles.profilePic, styles.marginLeft]}
                    source = {{uri: item.requestor.picture_url}}
                  />
                  <Text style = {styles.cardRequestor}> {item.requestor.username} </Text>
                </View>
              </TouchableHighlight>
              <View style={styles.spaceBuffer} />
              {this._showRequestorOnCard(item)}
            </View>
          </View>
        </View>
      );
    });

    // <View style = {styles.row}>
    //             <Image 
    //               style = {[styles.profilePic, styles.marginLeft]}
    //               source = {{uri: item.requestor.picture_url}}
    //             />
    //             <Text style = {styles.cardRequestor}> {item.requestor.username} </Text>
    //           </View>
    return (
      //use {} for anything that is not html or text. this allows you to run JS in JSX
      <ScrollView 
        automaticallyAdjustContentInsets={false}
        scrollEventThrottle={200}
        style={styles.container}>
        {list}
        <View
          style={{
            position: 'absolute',
            flex: 1,
            top: 30,
            left: 5,
            backgroundColor: '#494949',
          }}
        >
          <TouchableHighlight
            onPress={() => { 
              filterByStatus('completed');
            }}
          >
            <Text style={{color: 'white', fontSize: 20}}>Complete</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => { filterByStatus('open') }}
          >
            <Text style={{color: 'white', fontSize: 20}}>Open</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => { sortList('nearby') }}
          >
            <Text style={{color: 'white', fontSize: 20}}>Nearby</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => { sortList('recent') }}
          >
            <Text style={{color: 'white', fontSize: 20}}>Recent</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    );
  },
});

var styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: 'white',
    marginBottom: 50,
  },
  buttonText: {
    fontFamily: 'Lato-Regular',
    fontSize: 24,
    color: 'black',
    alignSelf: 'center'
  },
  loginButton: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'white'
  },
  cardTitle: {
    fontFamily: 'Lato-Semibold',
    fontSize: 18,
    color: 'black',
  },
  cardLocation: {
    color: 'black',
  },
  cardRequestor: {
    fontFamily: 'Lato-Regular',
    marginLeft: 5,
    flex: 1,
    color: 'black',
  },
  cardSubmitter: {
    fontFamily: 'Lato-Regular',
    marginRight: 5,
    flex: 1,
    color: 'black',
  },
  cardDate: {
    color: 'black',
  },
  cardInfoContainer: {
    paddingTop: 5,
    paddingBottom: 15,
    marginBottom: 15,
    flex: 1,
    backgroundColor: 'white',
    borderColor: 'grey',
    borderBottomWidth: 0.25
  },
  cardTitleContainer: {
    paddingTop: 0,
    paddingBottom: 5,
    flex: 1,
    backgroundColor: 'white'
  },
  row: {
    flexDirection: 'row',
  },
  profilePic: {
    height: 20,
    width: 20
  },
  marginLeft: {
    marginLeft: 7,
  },
  marginRight: {
    marginRight: 7,
  },
  spaceBuffer: {
    flex: 2
  },
  backgroundVideo: {
    alignSelf: 'stretch',
    height: 220,
    backgroundColor: 'transparent',
    marginBottom: 0
  }
});

export default FeedList;

        // <YouTube 
        //   videoId={item.submissions[0].video_url}
        //   play={false}
        //   hidden={false}
        //   playsInline={false}
        //   showinfo={false}
        //   modestbranding={true}
        //   onError={(e)=>{console.log('youtube error: ', e.error)}}
        //   style={{alignSelf: 'stretch', height: 220, backgroundColor: 'transparent', marginBottom: 0}}
        // />
