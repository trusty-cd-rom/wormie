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

var styles = StyleSheet.create({
  handle: {
    alignSelf: 'center',
    fontSize: 16,
    color: 'white'
  },
  container:{

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
  buttonText: {
    fontSize: 18,
    color: '#00ADC7',
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
  },
  request: {
    flex: 1,
    flexDirection: 'column',
    marginBottom: 5,
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
    let { wormholes, isAnimating } = this.props;
    let requestor, submitList;

    if (wormholes) {
      return wormholes.map((wormhole, outerIndex) => {
        return (

          <View 
            style = {styles.requestList}
          >
            <TouchableHighlight
              onPress = {this.viewRequest.bind(this, wormhole)}
              underlayColor = 'rgba(125,125,125,0)'
              style={styles.request}
            >
              <View>
                <Text style={styles.buttonText}>{wormhole.title} </Text>
                <Text style={{fontWeight:'bold'}}>{this.showStatus(wormhole.status)}</Text>
                <Text style={{fontWeight:'bold'}}>Notes:</Text><Text>{wormhole.notes} </Text>
                <View style={styles.separator} />
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
