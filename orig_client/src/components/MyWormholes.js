/************ PROFILE *************/
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

var styles = StyleSheet.create({
  handle: {
    alignSelf: 'center',
    fontSize: 16,
    color: 'white'
  },
  container:{

  },
  list: {
    flex: 1
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
  },
  request: {
    flex: 1,
    flexDirection: 'column',
    marginBottom: 5,
    paddingLeft: 0
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
});

class MyWormholes extends Component{

  componentWillMount() {
    // this.setToggleTimeout();
  }

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

  setToggleTimeout() {
    let { isAnimating } = this.props;
    setTimeout(
      () => {
        this.setState({animating: !isAnimating});
        this.setToggleTimeout();
      },
      1200
    );
  }
  // if function returns jsx/array of jsx, it does not take .bind(this)
  createList() {
    let { wormholes, isAnimating } = this.props;
    let requestor, submitList;

    return wormholes.map((wormhole, outerIndex) => {
      return (
        <View 
          style = {styles.requestList}
        >
          <TouchableHighlight
            onPress = {this.viewRequest.bind(this, wormhole)}
            underlayColor = 'rgba(125,125,125,0.2)'
            style={styles.request}
          >
            <View>
              <Text style={styles.buttonText}>Title: {wormhole.title} </Text>
              <Text style={{fontWeight:'bold'}}>{this.showStatus(wormhole.status)}</Text>
              <Text style={{fontWeight:'bold'}}>Notes:</Text><Text>{wormhole.notes} </Text>
            </View>
          </TouchableHighlight>
        </View>
      );
    });
  }


  render() {
    let { updateMyCurrentWormhole, toggleAnimating, isAnimating } = this.props;
    console.log(toggleAnimating);
    return (
      //use {} for anything that is not html or text. this allows you to run JS in JSX
      <ScrollView
        automaticallyAdjustContentInsets={false}
        onScroll={() => { 
          console.log('onScroll!');
          toggleAnimating(isAnimating);
        }}
        scrollEventThrottle={200}
        style={styles.list}
      >
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-around'
        }}>
          <ActivityIndicatorIOS
            animating={true}
            style={[styles.centering, {height: 50}]}
            size="large"
          />
        </View>
        {this.createList()}
      </ScrollView>
    );
  }
};

export default MyWormholes;
