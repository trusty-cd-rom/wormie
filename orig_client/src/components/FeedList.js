/************ FEED *************/
import React, {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Component,
  TouchableHighlight,
  Image,
} from 'react-native';

import ViewRequest from '../containers/ViewRequest';
import OpenWormhole from '../containers/OpenWormhole';
var YouTube = require('react-native-youtube');
var Video = require('react-native-video');

class FeedList extends React.Component{
  componentWillMount() {
    let { refreshFeedData } = this.props;
    refreshFeedData();
  }
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
  }
  _renderVideo(item, index) {
    // console.log('rendering video', item.submissions[0]);
    if(item.submissions[0]) {
      return (
        <YouTube 
          videoId={item.submissions[0].video_url}
          play={false}
          hidden={false}
          playsInline={true}
          showinfo={false}
          modestbranding={true}
          onError={(e)=>{console.log('youtube error: ', e.error)}}
          style={{alignSelf: 'stretch', height: 220, backgroundColor: 'transparent', marginBottom: 0}}
        />
      );
    }else {
      return (
        <TouchableHighlight onPress={this.viewRequest.bind(this, index)}>
          <Image 
            style={{height: 220, width: 390, flex: 1}}
            source = {require('../assets/dsnWormhole.jpg')}
          />
        </TouchableHighlight>
      );
    }


  }
  _showRequestorOnCard(item) {
    if(item.submissions[0]) {
      return (
          <View style = {styles.row}>
          <Text style = {styles.cardSubmitter}> {item.submissions[0].submitter.username} </Text>
          <Image 
            style = {[styles.profilePic, styles.marginRight]}
            source = {{uri: item.submissions[0].submitter.picture_url}}
          />
        </View>
      );
    } else {
      return (<View />);
    }

  }
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
  }
  render() {
    var { feed } = this.props;
    var list = feed.map((item, index) => {
      // console.log(item);
      return (
        <View key = {index}>
          <TouchableHighlight
            style = {styles.loginButton}
            onPress = {this.viewRequest.bind(this, index)}
          >
            <View style={[styles.cardTitleContainer, styles.row]}>
              <Text style = {styles.cardTitle}> {item.title} </Text>
              <View style={styles.spaceBuffer} />
              <Text style = {styles.cardDate}> {this._timeSince(Date.parse(item.created_at))} </Text>
            </View>
          </TouchableHighlight> 
          {this._renderVideo(item, index)}
          <TouchableHighlight
            style = {styles.loginButton}
            onPress = {this.viewRequest.bind(this, index)}
          >
            <View style={styles.cardInfoContainer}>
              <View style = {styles.row}>
                <View style = {styles.row}>
                  <Image 
                    style = {[styles.profilePic, styles.marginLeft]}
                    source = {{uri: item.requestor.picture_url}}
                  />
                  <Text style = {styles.cardRequestor}> {item.requestor.username} </Text>
                </View>
                <View style={styles.spaceBuffer} />
                {this._showRequestorOnCard(item)}
              </View>
            </View>
          </TouchableHighlight> 
        </View>
      );
    });
    return (
      //use {} for anything that is not html or text. this allows you to run JS in JSX
      <ScrollView 
        automaticallyAdjustContentInsets={false}
        // onScroll={() => { console.log('onScroll!'); }}
        scrollEventThrottle={200}
        style={styles.container}>
        {list}
      </ScrollView>
    );
  }
};

var styles = StyleSheet.create({
  container:{
    marginTop: 20,
    marginBottom: 49,
    flex: 1,
    backgroundColor: 'white'
  },
  buttonText: {
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
    fontSize: 20,
    color: 'black',
  },
  cardLocation: {
    color: 'black',
  },
  cardRequestor: {
    marginLeft: 5,
    flex: 1,
    color: 'black',
  },
  cardSubmitter: {
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
