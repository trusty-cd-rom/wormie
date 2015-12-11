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
  handleInputChange(fieldName, event) {
    var { updateInputText } = this.props;
    updateInputText(fieldName, event.nativeEvent.text);
  }
  back() {
    this.props.navigator.pop();
  }
  submitRequest() {
    // debugger;
    console.log('about to submit request from create request screen');
    var { createRequest, currentUser, inputText } = this.props;
    var newRequestData = {
      title: inputText.title,
      latitude: 37.786140,
      longitude: -122.405754,
      deadline: '2015-12-09T23:37:58.271497Z',
      notes: inputText.notes,
      status: 'open',
      requestor: currentUser.id,
    };
    console.log(newRequestData);
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
          style = {styles.loginButton}
          onPress = {this.back.bind(this)}
          underlayColor = '#88D4f5'
        >
        <Text style = {styles.buttonText}> Back </Text>
        </TouchableHighlight>

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

        <TouchableHighlight
          style = {styles.loginButton}
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    marginTop: 20
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
    backgroundColor: 'black'
  },
  loginButton: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#48BBEC'
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
    alignSelf: 'center'
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
    color: '#fff'
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
});

export default CreateRequest;
