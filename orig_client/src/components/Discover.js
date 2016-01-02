import React, {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
} from 'react-native';

import DiscoverSearch from '../containers/DiscoverSearch';
import Topbar from './Topbar';
import { Icon } from 'react-native-icons';

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9f9f9',
    flexDirection: 'column',
    alignSelf: 'stretch',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    flex: 6,
    padding: 4,
    paddingTop: 8,
    marginBottom: 45,
  },
  infoContainer: {
    // color: 'black',
    alignSelf: 'flex-start'
  },
  name: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#3e3e3e',
    marginTop: 10,
    marginBottom: 5,
  },
  handle: {
    fontSize: 16,
    color: '#727272'
  },
  image: {
    height: 70,
    width: 70,
    borderRadius: 35,
    marginTop: 2,
    alignSelf: 'center',
    marginLeft: 8,
    marginRight: 10
  },
  button: {
    flex: 1,
    flexDirection:'column',
    alignItems:'flex-end',
    paddingRight: 7,
  },
  ionic: { 
    width: 30, 
    height: 30,
  },
  singleButton: {
    flex: 1,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: '#55378F',
    flexDirection: 'row', 
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: 'Lato-Bold',
    textAlign: 'center',
    alignSelf: 'center',
    color: 'white',
    fontSize: 25,
  },
  icon: {
    width: 60,
    height: 60,
    alignSelf: 'center'
  }
});

class Discover extends React.Component{

  // <Topbar
  //   topbarTitle={this.props.topbarTitle}
  //   navigator={this.props.navigator}
  // />
  setCategory(category) {
    let { setCurrentCategoty } = this.props;
    setCurrentCategoty(category);
    this.props.navigator.push({
      component: DiscoverSearch,
      passProps: { topbarTitle: 'Search', fromDiscover: true, responseList: [{name: "default"}]}
    });
  }

  render() {

    return (
      <View style={{flexDirection: 'column', flex: 1,}}>
        <Topbar 
          style={{flex: 2}}
          noIcon={true}
          topbarTitle={'Discover'}
        />
        <View style = {styles.container}>
          <View
            style={{flexDirection: 'row', flex: 1}}
          >
            <TouchableHighlight
              underlayColor = 'rgba(125,125,125,0.2)'
              onPress={() => this.setCategory('all')}
              style={[styles.singleButton, {backgroundColor: '#F888A4'}]}
            >
              <View
                style={{alignSelf: 'center'}}
              >
                <Icon
                  name='ion|search'
                  size={60}
                  color='white'
                  style={styles.icon}
                />
                <Text style={styles.buttonText}>ALL</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor = 'rgba(125,125,125,0.2)'
              onPress={() => this.setCategory('restaurants')}
              style={[styles.singleButton, {backgroundColor: '#5FB8FF'}]}
            >
              <View
                style={{alignSelf: 'center'}}
              >
                <Icon
                  name='ion|fork'
                  size={60}
                  color='white'
                  style={styles.icon}
                />
                <Text style={styles.buttonText}>Restaurants</Text>
              </View>
            </TouchableHighlight>
          </View>
          <View
            style={{flexDirection: 'row', flex: 1}}
          >
            <TouchableHighlight
              underlayColor='rgba(125,125,125,0.2)'
              onPress={() => this.setCategory('shopping')}
              style={[styles.singleButton, {backgroundColor: '#A88FFF'}]}
            >
              <View
                style={{alignSelf: 'center'}}
              >
                <Icon
                  name='ion|bag'
                  size={60}
                  color='white'
                  style={styles.icon}
                />
                <Text style={styles.buttonText}>Shopping</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor='rgba(125,125,125,0.2)'
              onPress={() => this.setCategory('beautysvc')}
              style={[styles.singleButton, {backgroundColor: '#fcbe87'}]}
            >
              <View
                style={{alignSelf: 'center'}}
              >
                <Icon
                  name='ion|scissors'
                  size={60}
                  color='white'
                  style={styles.icon}
                />
                <Text style={styles.buttonText}>Beauty</Text>
              </View>
            </TouchableHighlight>
          </View>
          <View
            style={{flexDirection: 'row', flex: 1}}
          >
            <TouchableHighlight
              underlayColor='rgba(125,125,125,0.2)'
              onPress={() => this.setCategory('nightlife')}
              style={[styles.singleButton, {backgroundColor: '#44E59F'}]}
            >
              <View
                style={{alignSelf: 'center'}}
              >
                <Icon
                  name='ion|wineglass'
                  size={60}
                  color='white'
                  style={styles.icon}
                />
                <Text style={styles.buttonText}>Nightlife</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor='rgba(125,125,125,0.2)'
              onPress={() => this.setCategory('hotelstravel')}
              style={[styles.singleButton, {backgroundColor: '#697EFF'}]}
            >
              <View
                style={{alignSelf: 'center'}}
              >
                <Icon
                  name='ion|plane'
                  size={60}
                  color='white'
                  style={styles.icon}
                />
                <Text style={styles.buttonText}>Travel</Text>
              </View>
            </TouchableHighlight>
          </View>
          <View
            style={{flexDirection: 'row', flex: 1}}
          >
            <TouchableHighlight
              underlayColor='rgba(125,125,125,0.2)'
              onPress={() => this.setCategory('arts')}
              style={[styles.singleButton, {backgroundColor: '#EE9B83'}]}
            >
              <View
                style={{alignSelf: 'center'}}
              >
                <Icon
                  name='ion|music-note'
                  size={60}
                  color='white'
                  style={styles.icon}
                />
                <Text style={styles.buttonText}>Arts</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor='rgba(125,125,125,0.2)'
              onPress={() => this.setCategory('food')}
              style={[styles.singleButton, {backgroundColor: '#ffd979'}]}
            >
              <View
                style={{alignSelf: 'center'}}
              >
                <Icon
                  name='ion|icecream'
                  size={60}
                  color='white'
                  style={styles.icon}
                />
                <Text style={styles.buttonText}>Food</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
}

// Discover.propTypes = {
//   userInfo: React.PropTypes.object.isRequired
// }

export default Discover;
