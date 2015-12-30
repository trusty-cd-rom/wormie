import React, {
  Component,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  ScrollView,
} from 'react-native';

// import YouTube from 'react-native-youtube';
var YouTube = require('react-native-youtube');

var moment = require('moment');

// Mapbox
var Mapbox = require('react-native-mapbox-gl');
var mapboxConfig = require('../utils/mapboxConfig');
var mapRef = 'mapRef';

var ViewRequest = React.createClass({
  mixins: [Mapbox.Mixin],
  back() {
    this.props.navigator.pop();
  },
  render() {
    // var { increment, incrementIfOdd, incrementAsync, decrement, counter } = this.props;
    // console.log(this.props.currentWormhole);
    let { currentWormhole } = this.props;
    return (

      <View style={styles.container}>

        <View style = {styles.headerContainer}>

          <TouchableHighlight
            style = {styles.backButton}
            onPress = {this.back.bind(this)}
            underlayColor = 'transparent'
          >
            <Text style = {styles.backText}> {'X'} </Text>
          </TouchableHighlight>
          
          <Text style={styles.backText}>
            {currentWormhole.requestor.username}
          </Text>
          <Image 
            style = {styles.requestorProfilePic}
            source = {{uri: currentWormhole.requestor.picture_url}}
          />

        </View>

        <View style={{flexDirection: 'row', flex: 10}}>
          
          <YouTube 
            videoId={currentWormhole.submissions[0].video_url}
            play={false}
            hidden={false}
            playsInline={true}
            showinfo={false}
            modestbranding={true}
            onError={(e)=>{console.log('youtube error: ', e.error)}}
            style={{flex: 1}}
          />
          
          <Mapbox
            style={{flex: 1, opacity: 0.7}}
            direction={0}
            rotateEnabled={true}
            scrollEnabled={true}
            zoomEnabled={true}
            showsUserLocation={false}
            attributionButtonIsHidden={true}
            logoIsHidden={true}
            compassIsHidden={true}
            ref={mapRef}
            accessToken={mapboxConfig.accessToken}
            styleURL={mapboxConfig.styleURL}
            userTrackingMode={this.userTrackingMode.follow}
            zoomLevel={15}
            annotations={[]}
          />

        </View>

        <ScrollView style = {styles.contentContainer}>
          
          <Text style={[styles.text, styles.timeAgo]}>
            {moment(currentWormhole.submissions[0].created_at).fromNow()}
          </Text>

          <View style={{flexDirection: 'row'}}>
            <Image 
              style = {styles.submitterProfilePic}
              source = {{uri: currentWormhole.submissions[0].submitter.picture_url}}
            />
            <Text style={[{fontFamily: 'Lato-Bold', alignSelf: 'flex-end'}]}>
              {currentWormhole.submissions[0].submitter.username}
            </Text>
          </View>

          <Text style={styles.title}>
            {currentWormhole.title}
          </Text>

          <Text style={styles.text}>
            {`${currentWormhole.latitude} , ${currentWormhole.longitude}`}
          </Text>

          <Text style={styles.text}>
            {currentWormhole.notes}
          </Text>

        </ScrollView>

      </View>
    );
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  headerContainer: {
    paddingTop: 30,
    flexDirection: 'row',
    backgroundColor: '#4CC6EA',
    paddingRight: 10,
    paddingLeft: 10,
    alignItems: 'flex-start',
    flex: 1,
  },
  backButton: {
    flex: 1,
  },
  backText: {
    color: 'white',
    fontFamily: 'Lato-Bold',
    fontSize: 20,
  },
  requestorProfilePic: {
    // marginTop: 10,
    marginLeft: 10,
    height: 30,
    width: 30,
    borderRadius: 15,
  },
  submitterProfilePic: {
    // marginTop: 10,
    marginRight: 3,
    height: 30,
    width: 30,
    borderRadius: 15,
  },
  backgroundOverlay: {
    opacity: 0.5,
    backgroundColor: '#ffffff',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  mapContainer: {
    flex: 6,
  },
  contentContainer: {
    flex: 7,
    padding: 20,
    paddingTop: 0,
    flexDirection: 'column',
  },
  text: {
    fontFamily: 'Lato-Bold',
    // fontSize: 20,
    marginBottom: 10,
  },
  timeAgo: {
    textAlign: 'right',
  },
  title: {
    fontFamily: 'Lato-Bold',
    fontSize: 30,
    marginBottom: 10,
  },
  submitButton: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'center',
    flex: 1,
    // backgroundColor: 'green'
  },
  buttonText: {
    fontSize: 27,
    fontFamily: 'Lato-Bold',
    color: '#4CC6EA',
    // alignSelf: 'center'
  },
  buttonContainer: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    flex: 1,
  },
});

export default ViewRequest;

            // <View style={{flexDirection: 'column', alignContent: 'flex-end', justifyContent: 'flex-end', alignSelf: 'flex-end'}}>


      // <View style={styles.container}>

      //   <TouchableHighlight
      //     style = {styles.back}
      //     onPress = {this.back.bind(this)}
      //     underlayColor = 'purple'
      //   >
      //     <Text style = {styles.buttonText}> Back </Text>
      //   </TouchableHighlight>


      //   <View style={styles.loginButton}>
      //     <Text style={styles.title}>
      //       {currentWormhole.title}
      //     </Text>
      //   </View>
      //   <View style={styles.loginButton}>
      //     <Text style={styles.title}>
      //       {currentWormhole.owner_name}
      //     </Text>
      //   </View>
      //   <View style={styles.loginButton}>
      //     <Text style={styles.title}>
      //       {currentWormhole.submissions[0].owner_name}
      //     </Text>
      //   </View>
      //   <View style={styles.loginButton}>
      //     <Text style={styles.title}>
      //       {currentWormhole.submissions[0].created_at}
      //     </Text>
      //   </View>
      //   <View style={styles.loginButton}>
      //     <Text style={styles.title}>
      //       {currentWormhole.notes}
      //     </Text>
      //   </View>
      // </View>

  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: 'black',
  //   marginTop: 20
  // },
  // buttonText: {
  //   fontFamily: 'Lato-Regular',
  //   fontSize: 25,
  //   color: 'white',
  //   alignSelf: 'center'
  // },
  // loginButton: {
  //   flexDirection: 'row',
  //   alignSelf: 'stretch',
  //   justifyContent: 'center',
  //   flex: 1,
  //   backgroundColor: '#48BBEC'
  // },
  // back: {
  //   flexDirection: 'row',
  //   alignSelf: 'stretch',
  //   justifyContent: 'center',
  //   flex: 1,
  //   backgroundColor: '#48BBEC'
  // },
  // title: {
  //   marginBottom: 20,
  //   fontSize: 25,
  //   textAlign: 'center',
  //   color: '#fff'
  // },
  // buttonText: {
  //   fontSize: 24,
  //   color: 'white',
  //   alignSelf: 'center'
  // },