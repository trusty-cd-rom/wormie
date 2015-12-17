import React, {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  ListView,
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
    justifyContent: 'center',
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
  },
  floatView: {
    position: 'absolute',
    width: 100,
    height: 100,
    top: 88,
    left: 0,
    backgroundColor: 'green',
  },
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

          // <TouchableHighlight
          //   underlayColor = 'rgba(125,125,125,0.2)'
          //   style={[styles.singleButton, {backgroundColor: '#EEC583'}]}
          // >
          //   <View>
          //     <Icon
          //       name='ion|search'
          //       size={60}
          //       color='white'
          //       style={styles.icon}
          //     />
          //     <Text style={styles.buttonText}>{this.props.category}</Text>
          //   </View>
          // </TouchableHighlight>
        // <View style = {styles.floatView}>
        // </View>
  componentWillMount() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    // TODO: change it to this.props.responseList
    var rows = [{title: 'NY', name: 'sun'}, {title: 'NY1', name: 'sun1'}, {title: 'NY2', name: 'sun2'}];
    return {
      dataSource: ds.cloneWithRows(rows),
    };
  }
  getInitialState() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var rows = [{title: 'NY', name: 'sun'}, {title: 'NY1', name: 'sun1'}, {title: 'NY2', name: 'sun2'}];
  }
  // _pressRow(rowID: number) {
  //   this._pressData[rowID] = !this._pressData[rowID];
  //   this.setState({dataSource: this.state.dataSource.cloneWithRows(
  //     this._genRows(this._pressData)
  //   )});
  // }

  // _renderRow(rowData: string, sectionID: number, rowID: number) {
  //   var imgSource = {
  //     uri: THUMB_URLS[rowHash % THUMB_URLS.length],
  //   };

  //   return (
  //     <TouchableHighlight onPress={() => this._pressRow(rowID)}>
  //       <View>
  //         <View style={styles.row}>
  //           <Image style={styles.thumb} source={imgSource} />
  //           <Text style={styles.text}>
  //             {rowData + ' - ' + LOREM_IPSUM.substr(0, rowHash % 301 + 10)}
  //           </Text>
  //         </View>
  //         <View style={styles.separator} />
  //       </View>
  //     </TouchableHighlight>
  //   );
  // }

  _renderRow(rowData){
    return (
      <View>
        <View style={styles.container}>
          <Text> {rowData.title} </Text>
          <Text> {rowData.name} </Text>
        </View>
      </View>
    )
  }

        // <View
        //   style={{
        //     backgroundColor:'red',
        //     position: 'absolute',
        //     top: 130,
        //     order: 99,
        //     width: 280,
        //     height: 200,
        //   }}
        // >
        // </View>
  // dataSource={this.props.responseList}
  //dataSource={ds.cloneWithRows(rows)}
  // change rows to this.responseList

  // TODO: searchlocation is a module actually
  // that is why it does not pass the props
  // I need to fix it
  render() {
    console.log(this.props.category);
    let { responseList, setCurrentTerm, setCurrentLocation } = this.props;
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var rows = [{title: 'NY', name: 'sun'}, {title: 'NY1', name: 'sun1'}, {title: 'NY2', name: 'sun2'}];
    return (
      <View
        style={{marginTop: 20}}
      >
        <Topbar
          topbarTitle={this.props.topbarTitle}
          navigator={this.props.navigator}
        />
        <ListView
          dataSource={ds.cloneWithRows(rows)}
          renderRow={this._renderRow}
          style={{
            backgroundColor:'red',
            position: 'absolute',
            top: 130,
            order: 99,
            width: 280,
            height: 200,
          }}
        />
        <SearchLocation
          setCurrentTerm={this.props.setCurrentTerm} 
          setCurrentLocation={this.props.setCurrentLocation}
          style={{
            position: 'absolute',
            top: 20,
          }}
        />
      </View>
    );
  }
}

// Discover.propTypes = {
//   userInfo: React.PropTypes.object.isRequired
// }

export default DiscoverSearch;
