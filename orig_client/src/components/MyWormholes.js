import React, {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Component,
  Image,
  TouchableHighlight,
  ActivityIndicatorIOS,
} from 'react-native';
import ViewMyWormholeList from '../containers/ViewMyWormholeList';
import Spinner from './Spinner';
var urls = require('../constants/urls');
var styles = StyleSheet.create({
  handle: {
    alignSelf: 'center',
    fontSize: 16,
    color: 'white'
  },
  list: {
    flex: 1,
  },
  image: {
    height: 20,
    width: 20
  },
  submitterProfile: {
    flexDirection: 'row',
  },
  myNote: {
    margin: 8, 
    borderRadius: 5, 
    fontFamily: 'Lato-Bold',
    color: '#0090a5', 
    fontSize: 15, 
    paddingLeft: 2,
  },
  notes: {
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
    paddingBottom: 10,
  },
  requestList: {
    flex: 1,
    width: 375,
    color: '#575757',
    // margin: 5,
    padding: 5,
  },
  request: {
    flex: 1,
    flexDirection: 'column',
    marginBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  gray: {
    backgroundColor: '#cccccc',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  separator: {
    height: 1,
    backgroundColor: '#E4E4E4',
    flex: 1,
    marginLeft: 5,
    marginTop: 15,
    marginBottom: 4,
    marginRight: 5
  },
});

class MyWormholes extends Component{


  viewRequest(currentWormholeList) {
    var { updateMyCurrentWormholeList, wormholes } = this.props;
    console.log('trying to view request: ', wormholes);
    
    // UPDATECURRENTWORMHOLE
    // this function is setting current Wormhole to set the top-state
    // top state will contain information about what the current wormhole is
    // current wormhole is the next page after user press current request
    console.log('currentWormholeList: ', currentWormholeList);
    updateMyCurrentWormholeList(currentWormholeList);
    this.props.navigator.push({
      component: ViewMyWormholeList,
    });
  }

  _renderVideo(item, index) {
    if(item.submissions[0]) {
      let imageUrl = `https://i.ytimg.com/vi/${item.submissions[0].video_url}/mqdefault.jpg`;
      return (
        <Image 
          style = {{alignSelf: 'stretch', height: 220, backgroundColor: 'transparent', marginBottom: 0}}
          source = {{uri: imageUrl}}
        />
      );
    }else {
      let imageUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${item.latitude},${item.longitude}&zoom=13&size=400x280&markers=icon:${encodeURIComponent(urls.getWormie+item.requestor.wormie_color.slice(1)+'.png')}%7C${item.latitude},${item.longitude}&key=AIzaSyAwp0Qycaz0CVQfNaNd4FtWew4tK3DRY9w`;
      return (
        <Image 
          style = {{height: 220}}
          source = {{uri: imageUrl}}
        />
      );
    }
  }

  // if function returns jsx/array of jsx, it does not take .bind(this)
  createList() {
    let { wormholes, isAnimating } = this.props;
    let requestor, submitList;

    if (wormholes) {
      return wormholes.map((wormhole, outerIndex) => {
        return (

          <View
            key={outerIndex}
            style = {styles.requestList}
          >
            <TouchableHighlight
              onPress = {this.viewRequest.bind(this, wormhole)}
              underlayColor = 'rgba(125,125,125,0)'
              style={styles.request}
            >
              <View>
                <Text style={styles.buttonText}>{wormhole.title} </Text>
                {this._renderVideo(wormhole, outerIndex)}
                <View style={{ backgroundColor: '#f0f0f0', flex:1, flexDirection: 'row'}}>
                  <Text style={styles.myNote}>My Notes</Text>
                </View>
                <Text style={styles.notes}>
                  {wormhole.notes}
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
    var { isAnimating, getUserInfo, clickedUser } = this.props;
    var scrollY = e.nativeEvent.contentInset.top + e.nativeEvent.contentOffset.y
    this.lastScrollY = scrollY;
    this.lastContentInsetTop = e.nativeEvent.contentInset.top;
    this.lastContentOffsetX = e.nativeEvent.contentOffset.x;
    this.minPulldownDistance = 40;

    console.log('onScroll!');

    if (scrollY < -this.minPulldownDistance) {
      if (!isAnimating) {
        getUserInfo(clickedUser.id);
      }
    }
  }

  render() {
    let { isAnimating, toggleAnimating } = this.props;
    return (
      //use {} for anything that is not html or text. this allows you to run JS in JSX
      <View>
        <View
          style={styles.requestList}
        >
          <Spinner 
            isAnimating={this.props.isAnimating}
            getUserInfo={this.props.getUserInfo}
            clickedUser={this.props.clickedUser} 
          />
        </View>
        <ScrollView
          automaticallyAdjustContentInsets={false}
          onScroll={(e) => {
            this.handleScroll(e);
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

export default MyWormholes;
