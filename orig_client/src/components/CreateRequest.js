import React, {
  Component,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TextInput,
  ActivityIndicatorIOS,
} from 'react-native';
import Navbar from './Navbar';

class CreateRequest extends Component {
  componentWillMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let initialPosition = JSON.stringify(position);
        console.log(initialPosition);
        //replace with call to action function, update state via reducer
        // this.setState({initialPosition});
      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }
  handleInputChange(fieldName, event) {
    let { updateInputText } = this.props;
    updateInputText(fieldName, event.nativeEvent.text);
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
      latitude: 37.786140,
      longitude: -122.405754,
      deadline: '2015-12-09T23:37:58.271497Z',
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
  render() {
    let { inputText } = this.props;
    return (
      <View style={styles.container}>
        <TouchableHighlight
          style = {styles.backButton}
          onPress = {this.back.bind(this)}
        >
          <Text style = {styles.backText}> {'<'} </Text>
        </TouchableHighlight>
        <View style = {styles.contentContainer}>
          <Text style={styles.title}>
            Title
          </Text>
          <TextInput
            ref='a'
            style = {styles.searchInput}
            value = {inputText.title}
            onChange = {this.handleInputChange.bind(this,'title')}
          />

          <Text style={styles.title}>
            Location
          </Text>
          <TextInput
            style = {styles.searchInput}
            value = {inputText.location}
            onChange = {this.handleInputChange.bind(this,'location')}
          />
          <Text style={styles.title}>
            Deadline
          </Text>
          <TextInput
            style = {styles.searchInput}
            value = {inputText.deadline}
            onChange = {this.handleInputChange.bind(this,'deadline')}
          />

          <Text style={styles.title}>
            Description
          </Text>
          <TextInput
            style = {styles.searchInput}
            value = {inputText.notes}
            onChange = {this.handleInputChange.bind(this,'notes')}
          />

          <ActivityIndicatorIOS
            animating = {inputText.isFetching==='true'}
            color = 'white'
            size = 'large'
          ></ActivityIndicatorIOS>
        </View>
        <TouchableHighlight
          style = {styles.requestButton}
          onPress = {this.submitRequest.bind(this)}
          underlayColor = '#88D4f5'
        >
          <Text style = {styles.buttonText}> Request! </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 20
  },
  contentContainer: {
    flex:15,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  splashImage: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'center',
    flex: 4,
    backgroundColor: 'white'
  },
  requestButton: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'center',
    flex: 2,
    backgroundColor: '#48BBEC'
  },
  requestButton: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'center',
    flex: 2,
    backgroundColor: '#48BBEC'
  },
  loginButton: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#48BBEC'
  },
  backButton: {
    // flexDirection: 'row',
    // alignSelf: 'stretch',
    justifyContent: 'flex-start',
    flex: 1,
    backgroundColor: 'white'
  },
  backText: {
    fontSize: 30,
    color: 'black',
    alignSelf: 'flex-start',
    marginLeft: 5
  },
  buttonText: {
    fontSize: 24,
    color: 'black',
    alignSelf: 'center'
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
});

export default CreateRequest;
