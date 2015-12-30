import React, {
  Component,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import Navbar from '../containers/Navbar';
import CameraView from '../containers/Camera';
var LiveCamera = require('../containers/LiveCamera.js');
import MapFeed from './MapFeed';
var moment = require('moment');
import { Icon } from 'react-native-icons';


class OpenWormhole extends Component {
  back() {
    this.props.navigator.pop();
  }
  startSubmission(type) {
    let { currentWormhole, initPendingSubmission } = this.props;
    initPendingSubmission(currentWormhole);
    let nextView = type === 'live' ? LiveCamera : CameraView;
    this.props.navigator.push({
      component: nextView
    });
  }
  render() {
    let { currentWormhole } = this.props;
    console.log(currentWormhole);
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
            style = {styles.profilePic}
            source = {{uri: (currentWormhole.requestor) ? currentWormhole.requestor.picture_url : ""}}
          />

        </View>

        <View style = {styles.mapContainer}>
          <MapFeed wormhole={currentWormhole} />
        </View>

        <ScrollView style = {styles.contentContainer}>
          
          <Text style={[styles.text, styles.alignLeft]}>
            Due {moment(currentWormhole.deadline).fromNow()}
          </Text>

          <Text style={styles.headerTitle}>
            {currentWormhole.title}
          </Text>

          <Text style={styles.text}>
            {`${currentWormhole.latitude} , ${currentWormhole.longitude}`}
          </Text>

          <Text style={styles.text}>
            {currentWormhole.notes}
          </Text>

        </ScrollView>

        <View style={styles.buttonContainer}>
          <TouchableHighlight
            style = {styles.liveButton}
            onPress = {this.startSubmission.bind(this, 'live')}
            underlayColor = 'transparent'
          >
            <Text style = {styles.buttonText}> LIVE! </Text>
          </TouchableHighlight>
          <TouchableHighlight
            style = {styles.recordButton}
            onPress = {this.startSubmission.bind(this, 'record')}
            underlayColor = 'transparent'
          >
            <Icon
              name='fontawesome|video-camera'
              size={30}
              color='#4CC6EA'
              style={styles.ionic}
            />
          </TouchableHighlight>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    paddingTop: 25,
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
  mapContainer: {
    flex: 6,
  },
  contentContainer: {
    flex: 7,
    padding: 20,
    paddingTop: 5,
    flexDirection: 'column',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'center',
    flex: 1,
  },
  headerTitle: {
    flex: 8,
    fontFamily: 'Lato-Bold',
    fontSize: 30,
    marginBottom: 10,
  },
  text: {
    fontFamily: 'Lato-Bold',
    // fontSize: 20,
    marginBottom: 10,
  },
  alignLeft: {
    textAlign: 'right',
  },
  liveButton: {
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
  recordButton: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'center',
    flex: 1,
    // backgroundColor: 'red'
  },
  searchInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white'
  },
  profilePic: {
    // marginTop: 10,
    marginLeft: 10,
    height: 30,
    width: 30,
    borderRadius: 15,
  },
  ionic: { 
    width: 30, 
    height: 30,
  },
});

export default OpenWormhole;



// <TouchableHighlight
//           style = {styles.backButton}
//           onPress = {this.back.bind(this)}
//         >
//           <Text style = {styles.backText}> {'<'} </Text>
//         </TouchableHighlight>
//         <View style = {styles.contentContainer}>
//           <Text style={styles.title}>
//             Title
//           </Text>
//           <Text style={styles.text}>
//             {'currentWormhole.title'}
//           </Text>

//           <Text style={styles.title}>
//             Requester
//           </Text>
//           <Text style={styles.text}>
//             {'currentWormhole.requestor.username'}
//           </Text>

//           <Text style={styles.title}>
//             Location
//           </Text>
//           <Text style={styles.text}>
//             {`${'currentWormhole.latitude'} , ${'currentWormhole.longitude'}`}
//           </Text>

//           <Text style={styles.title}>
//             Deadline
//           </Text>
//           <Text style={styles.text}>
//             {'currentWormhole.deadline'}
//           </Text>

//           <Text style={styles.title}>
//             Notes
//           </Text>
//           <Text style={styles.text}>
//             {'currentWormhole.notes'}
//           </Text>
//         </View>
//         <View style={styles.buttonContainer}>
//           <TouchableHighlight
//             style = {styles.liveButton}
//             onPress = {this.startSubmission.bind(this, 'live')}
//             underlayColor = '#88D4f5'
//           >
//             <Text style = {styles.buttonText}> Live </Text>
//           </TouchableHighlight>
//           <TouchableHighlight
//             style = {styles.recordButton}
//             onPress = {this.startSubmission.bind(this, 'record')}
//             underlayColor = '#88D4f5'
//           >
//             <Text style = {styles.buttonText}> Record </Text>
//           </TouchableHighlight>
//         </View>
