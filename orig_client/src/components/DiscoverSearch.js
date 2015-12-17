import React, {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
} from 'react-native';

import { Icon } from 'react-native-icons';
import Topbar from './Topbar';
import SearchLocation from './SearchLocation';

var styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignSelf: 'stretch',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    flex: 1,
    padding: 4,
    marginTop: 20,
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
    width: 172,
    height: 138,
    marginBottom: 10,
    backgroundColor: '#55378F',
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
    marginTop: 20,
    paddingLeft: 20,
    alignSelf: 'center'
  }
});

class DiscoverSearch extends React.Component{

  // setCategory(category) {
  //   let { setCurrentCategoty } = this.props;
  //   debugger;
  //   setCurrentCategoty(category);
  //   this.props.navigator.push({
  //     component: DiscoverSearch
  //   });

  // }

  render() {
    console.log(this.props.category);
    return (
      <View
        style={{marginTop: 20}}
      >
        <Topbar
          topbarTitle={this.props.topbarTitle}
          navigator={this.props.navigator}
        />
        <View>
          <SearchLocation />
        </View>
        <View style = {styles.container}>
          <TouchableHighlight
            underlayColor = 'rgba(125,125,125,0.2)'
            style={[styles.singleButton, {backgroundColor: '#EEC583'}]}
          >
            <View>
              <Icon
                name='ion|search'
                size={60}
                color='white'
                style={styles.icon}
              />
              <Text style={styles.buttonText}>{this.props.category}</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

// Discover.propTypes = {
//   userInfo: React.PropTypes.object.isRequired
// }

export default DiscoverSearch;
