import React, {
  Component,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  TextInput,
  ActivityIndicatorIOS,
  DatePickerIOS,
} from 'react-native';
import Navbar from '../containers/Navbar';
import { MKTextField } from 'react-native-material-kit';
var Accordion = require('react-native-collapsible/Accordion');
import MapFeed from './MapFeed';
var moment = require('moment');

var SECTIONS = [
  {
    title: 'First',
    content: 'Lorem ipsum...',
  }
];

class CreateRequest extends Component {
  /**************************************
   target is available as this.props.requestedTarget
   it has same structure with yelp data
   let coords = this.props.requestedTarget.location.coordinate;
   name: this.props.requestedTarget.name
   latitude: this.props.requestedTarget.location.coordinate.latitude
   longitude: this.props.requestedTarget.location.coordinate.longitude
   *************************************/

  componentWillMount() {
    let { updateInputText } = this.props;
    // navigator.geolocation.getCurrentPosition(
    //   (position) => {
    //     let initialPosition = JSON.stringify(position);
    //     console.log(initialPosition);
    //     //replace with call to action function, update state via reducer
    //     console.log(typeof position.coords.latitude);
    //     updateInputText('location', `${position.coords.latitude.toFixed(7)} , ${position.coords.longitude.toFixed(7)}`);
    //   },
    //   (error) => alert(error.message),
    //   {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    // );

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    updateInputText('deadline', tomorrow);
  }
  handleInputChange(fieldName, event) {
    let { updateInputText } = this.props;
    updateInputText(fieldName, event.nativeEvent.text);
  }
  updateDate(date) {
    let { updateInputText } = this.props;
    console.log(date);
    updateInputText('deadline', date);
  }
  back() {
    this.props.navigator.pop();
  }
  submitRequest() {
    // debugger;
    console.log('about to submit request from create request screen');
    let { createRequest, currentUser, inputText } = this.props;
    let newRequestData = {
      title: inputText.title,
      latitude: inputText.location ? inputText.location.split(',')[0].trim() : 37.786140,
      longitude: inputText.location ? inputText.location.split(',')[1].trim() : -122.405754,
      deadline: inputText.deadline,
      notes: inputText.notes,
      status: 'open',
      requestor: currentUser.id,
    };
    // console.log(newRequestData);
    createRequest(newRequestData, () => {
      this.props.navigator.replace({
        component: Navbar
      });
    });
  }

  _renderYelpLocation() {
    if (this.props.requestedTarget) {
      return (
        <Text style={styles.title}>
          {this.props.requestedTarget.location.coordinate.latitude} {this.props.requestedTarget.location.coordinate.longitude}
        </Text>
      );
    } else {
      return <View />
    }
  }

  _renderHeader(section) {
    let { inputText } = this.props;
    console.log(inputText.deadline, typeof inputText.deadline);
    return (
      <View>
        <Text style = {styles.datePicker} > Due {moment(inputText.deadline).fromNow()} </Text>
        <View style = {styles.seperator} />
      </View>
    );
  }

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
  }

  _renderMapBox() {
    // if target from yelp exist
    var target = this.props.requestedTarget || '';
    // if (this.props.requestedTarget) {
    //   this.setState({center: target.location.coordinate})
    // }
    return <MapFeed />
  }

  render() {
    let { inputText } = this.props;
    return (
      <View style={styles.container}>

        <View style = {styles.headerContainer}>

          <TouchableHighlight
            style = {styles.backButton}
            onPress = {this.back.bind(this)}
          >
            <Text style = {styles.backText}> {'X'} </Text>
          </TouchableHighlight>

          <Text style = {styles.headerTitle}> New Wormhole </Text>

          <TouchableHighlight
            style = {styles.createButton}
            onPress = {this.submitRequest.bind(this)}
            underlayColor = '#88D4f5'
          >
            <Text style = {styles.createText}> Create </Text>
          </TouchableHighlight>

        </View>

        <ScrollView style = {styles.contentContainer}>
          {this._renderMapBox.bind(this)()}
          
          <View style = {styles.inputField}>
            <TitleField
              value = {inputText.title}
              placeholder={this.props.requestedTarget.name || ''}
              onEndEditing = {this.handleInputChange.bind(this,'title')}
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
              onEndEditing = {this.handleInputChange.bind(this,'notes')}
            />
          </View>


          {this._renderYelpLocation.bind(this)()}


          <ActivityIndicatorIOS
            animating = {inputText.isFetching==='true'}
            color = 'white'
            size = 'large'
          ></ActivityIndicatorIOS>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    flex: 12,
  },
  headerContainer: {
    height: 60,
    flexDirection: 'row',
    backgroundColor: '#39247F',
    padding: 10,
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
});

const TitleField = MKTextField.textfieldWithFloatingLabel()
  .withPlaceholder('Enter Title')
  .withStyle(styles.textfieldWithFloatingLabel)
  .withFloatingLabelFont({
    fontSize: 15,
    fontStyle: 'italic',
    fontWeight: '200',
  })
  .build();

const NoteField = MKTextField.textfieldWithFloatingLabel()
  .withPlaceholder('Add Note')
  .withStyle(styles.textfieldWithFloatingLabel)
  .withFloatingLabelFont({
    fontSize: 15,
    fontStyle: 'italic',
    fontWeight: '200',
  })
  .build();



export default CreateRequest;
