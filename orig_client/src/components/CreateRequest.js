import React, {
  Component,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  TextInput,
  Image,
  ActivityIndicatorIOS,
  DatePickerIOS,
  DeviceEventEmitter,
  LayoutAnimation,
} from 'react-native';
import Navbar from '../containers/Navbar';
import Topbar from './Topbar';
import Profile from '../containers/Profile';
import { MKTextField, MKButton } from 'react-native-material-kit';
var Accordion = require('react-native-collapsible/Accordion');
import RequestMapFeed from './RequestMapFeed';
import { Icon } from 'react-native-icons';
var moment = require('moment');

var urls = require('../constants/urls');


var SECTIONS = [
  {
    title: 'First',
    content: 'Lorem ipsum...',
  }
];

var CreateRequest = React.createClass({
  /**************************************
   target is available as this.props.target
   it has same structure with yelp data
   let coords = this.props.target.location.coordinate;
   name: this.props.target.name
   latitude: this.props.target.location.coordinate.latitude
   longitude: this.props.target.location.coordinate.longitude
   *************************************/

  componentWillMount() {
    let { updateInputText, inputText, target } = this.props;

    /*
     Get location from phone
     */
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let initialPosition = JSON.stringify(position);
        console.log(initialPosition);
        //replace with call to action function, update state via reducer
        console.log(typeof position.coords.latitude);
        updateInputText('location', `${position.coords.latitude.toFixed(7)} , ${position.coords.longitude.toFixed(7)}`);
      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    updateInputText('deadline', tomorrow);

    if (target) {
      updateInputText('title', target.name);
    }

  },
  componentDidMount() {
    DeviceEventEmitter.addListener('keyboardWillShow', this.updateKeyboardSpace),
    DeviceEventEmitter.addListener('keyboardWillHide', this.resetKeyboardSpace)  
  },
  updateKeyboardSpace(frames) {
    let { updateInputText } = this.props;
    console.log('this is frames', frames);
    if (!frames.endCoordinates)
      return;
    LayoutAnimation.configureNext(animations.layout.easeInEaseOut);
    updateInputText('keyboardSpace', frames.endCoordinates.height - 100);
  },
  resetKeyboardSpace() {
    let { updateInputText } = this.props;
    LayoutAnimation.configureNext(animations.layout.easeInEaseOut);
    updateInputText('keyboardSpace', 0);
  },
  handleInputChange(fieldName, event) {
    let { updateInputText } = this.props;
    updateInputText(fieldName, event.nativeEvent.text);
  },
  updateDate(date) {
    let { updateInputText } = this.props;
    updateInputText('deadline', date);
  },
  back() {
    let { updateInputText, setResultList } = this.props;
    setResultList([{"name": "default", "location":{ "display_address": [""]}}]);  
    this.props.navigator.pop();
    updateInputText('notes', '');
    updateInputText('title', '');
  },
  submitRequest() {
    console.log('about to submit request from create request screen');
    let { createRequest, currentUser, inputText, setCurrentTarget, updateInputText, setResultList } = this.props;

    let coords = this._getLatLong();
    console.log('frogmog',coords);
    
    let newRequestData = {
      title: inputText.title,
      latitude: coords.lat.toFixed(7),
      longitude: coords.lon.toFixed(7),
      deadline: inputText.deadline,
      notes: inputText.notes,
      status: 'open',
      requestor: currentUser.id,
    };

    createRequest(newRequestData, () => {
      setCurrentTarget({location: {coordinate: {longitude: '', latitude: ''}}});
      this.props.updateInputText('notes', '');
      this.props.updateInputText('title', '');
      this.props.navigator.replace({
        component: Navbar
      });
    });

    // reset the responseList

  },

  _renderHeader(section) {
    let { inputText } = this.props;
    console.log(inputText.deadline, typeof inputText.deadline);
    return (
      <View>
        <Text style = {styles.datePicker} > Due {moment(inputText.deadline).fromNow()} </Text>
        <View style = {styles.seperator} />
      </View>
    );
  },

  _renderContent(section) {
    let { inputText } = this.props;
    return (
      <DatePickerIOS
        date={new Date(inputText.deadline)}
        mode="datetime"
        minimumDate={new Date()}
        minuteInterval= {15}
        onDateChange = {this.updateDate.bind(this)}
      />
    );
  },

  _getLatLong() {
    let { inputText, target, coords } = this.props;
    
    // have data from yelp API
    if (this.props.yelp) {
      console.log('from yelp');
      var lat = target.location.coordinate.latitude;
      var lon = target.location.coordinate.longitude;
    // need to get location from google API
    } else if(this.props.google) {
      var lat = coords.lat;
      var lon = coords.lng;
    // from profile page: this will use the current location of user
    } else {
      if (inputText.location) {
        var lat = Number(inputText.location.split(',')[0].trim());
        var lon = Number(inputText.location.split(',')[1].trim());
      } else {
        var lat = 37.786140;
        var lon = -122.405754;
      }
    }
    console.log('frogdog', lat, lon);
    return {lat, lon};
  },

  _renderMapBox() {
    let { currentUser } = this.props;
    let coords = this._getLatLong();
    let wormie_color = currentUser.wormie_color;
    var imageUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${coords.lat},${coords.lon}&zoom=13&size=400x280&markers=icon:${encodeURIComponent(urls.getWormie+wormie_color.slice(1)+'.png')}%7C${coords.lat},${coords.lon}&key=AIzaSyAwp0Qycaz0CVQfNaNd4FtWew4tK3DRY9w`;
    return (
      <View style={{top: -20}}>
        <Image 
          style = {{height: 265}}
          source = {{uri: imageUrl}}
        />
      </View>
    )
  },

  render() {
    let { inputText, setCurrentTarget } = this.props;
    var title = inputText.title || 'Required';
    var notes = inputText.notes || 'Optional';
    return (
      <View style={styles.container}>

        <View style = {styles.headerContainer}>

          <TouchableHighlight
            style = {styles.backButton}
            underlayColor='#4CC6EA'
            onPress = {this.back.bind(this)}
          >
            <Text style = {styles.backText}> {'X'} </Text>
          </TouchableHighlight>

          <Text style = {styles.headerTitle}> New Wormhole </Text>

          <TouchableHighlight
            style = {styles.createButton}
            underlayColor = '#4CC6EA'
            
            onPress = {() => {
              
              this.submitRequest.bind(this)();
            }}
            underlayColor = '#4CC6EA'
          >
            <Text style = {styles.createText}> Create </Text>
          </TouchableHighlight>

        </View>
        <ScrollView 
          style = {styles.contentContainer}
          contentOffset = {{x: 0, y: inputText.keyboardSpace}}
        >
          {this._renderMapBox.bind(this)()}
          <View style = {styles.inputField}>
            <TitleField
              value = {inputText.title}
              placeHolder = {'Required'}
              onEndEditing = {this.handleInputChange.bind(this,'title')}
              onChange = {this.handleInputChange.bind(this,'title')}
            />
          </View>
          
          <View style = {styles.inputField}>
            <Accordion
              sections={SECTIONS}
              renderHeader={this._renderHeader.bind(this)}
              renderContent={this._renderContent.bind(this)}
              underlayColor='transparent'
            />
          </View>

          <View style = {styles.inputField}>
            <NoteField
              value = {inputText.notes}
              placeHolder = {'Optional'}
              onEndEditing = {this.handleInputChange.bind(this,'notes')}
              onChange = {this.handleInputChange.bind(this,'notes')}
            />
          </View>


          <View style={{height: inputText.keyboardSpace, left: 0, right: 0, bottom: 0}}/>

          <ActivityIndicatorIOS
            animating = {inputText.isFetching==='true'}
            color = 'white'
            size = 'large'
          ></ActivityIndicatorIOS>
        </ScrollView>
      </View>
    );
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    flex: 7,
  },
  headerContainer: {
    height: 60,
    flexDirection: 'row',
    backgroundColor: '#4CC6EA',
    padding: 10,
    paddingTop: 20,
    alignItems: 'center',
  },
  backButton: {
    flex: 1,
    color: 'white',
  },
  backText: {
    color: 'white',
    fontFamily: 'Lato-Bold',
    fontSize: 18,
  },
  headerTitle: {
    flex: 4,
    color: 'white',
    fontFamily: 'Lato-Bold',
    fontSize: 20,
  },
  createButton: {
    flex: 2,
    color: 'white',
  },
  createText: {
    color: 'white',
    fontFamily: 'Lato-Bold',
    fontSize: 18,
    textAlign: 'right',
    // paddingRight: 10,
  },

  textfieldWithFloatingLabel: {
    height: 50,  // have to do it on iOS
    marginTop: 5,
    marginLeft: 9,
    marginRight: 9,
    fontSize: 18
  },
  datePicker: {
    marginTop: 25,
    marginLeft: 5,
    marginBottom: 7,
    fontSize: 17,
    color: '#757575'
  },
  inputField: {
    paddingTop: 10,
    // paddingLeft: 10,
    // paddingRight: 10,
  },

  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  loginButton: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#48BBEC'
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
    color: 'black'
  },
  searchInput: {
    alignSelf: 'stretch',
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    color: 'black'
  },
  seperator: {
    height: 1,
    backgroundColor: '#E4E4E4',
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: '#4CC6EA', 
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'center',
    margin: 50,
    marginTop: 50
  },
});

const TitleField = MKTextField.textfieldWithFloatingLabel()
  .withPlaceholder('Enter Title (Required)')
  .withStyle(styles.textfieldWithFloatingLabel)
  .withFloatingLabelFont({
    fontSize: 15,
    fontStyle: 'italic',
    fontWeight: '200',
  })
  .build();

const NoteField = MKTextField.textfieldWithFloatingLabel()
  .withPlaceholder('Add Notes (Optional)')
  .withStyle(styles.textfieldWithFloatingLabel)
  .withFloatingLabelFont({
    fontSize: 15,
    fontStyle: 'italic',
    fontWeight: '200',
  })
  .build();

// const SendRequest = new MKButton.Builder()
//   .withBackgroundColor('#4CC6EA')
//   // .withShadowRadius(2)
//   .withShadowOffset({width:0, height:2})
//   .withShadowOpacity(.7)
//   .withShadowColor('black')
//   .withOnPress(() => {
//     console.log('hi, raised button!');
//   })
//   .withTextStyle({
//     color: 'white',
//     fontWeight: 'bold',
//   })
//   .withText('Send Request')
//   .build();


export default CreateRequest;


// From: https://medium.com/man-moon/writing-modern-react-native-ui-e317ff956f02
const animations = {
    layout: {
        spring: {
            duration: 500,
            create: {
                duration: 300,
                type: LayoutAnimation.Types.easeInEaseOut,
                property: LayoutAnimation.Properties.opacity
            },
            update: {
                type: LayoutAnimation.Types.spring,
                springDamping: 200
            }
        },
        easeInEaseOut: {
            duration: 300,
            create: {
                type: LayoutAnimation.Types.easeInEaseOut,
                property: LayoutAnimation.Properties.scaleXY
            },
            update: {
                delay: 100,
                type: LayoutAnimation.Types.easeInEaseOut
            }
        }
    }
};
