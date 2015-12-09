import React, {
  Component,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TextInput,
  ActivityIndicatorIOS,
} from 'react-native';
import FeedList from '../containers/FeedList';

class CreateRequest extends Component {
  handleInuptChange(fieldName, event) {
    var { updateInputText } = this.props;
    updateInputText(fieldName, event.nativeEvent.text);
  }
  back() {
    this.props.navigator.pop();
  }
  submitRequest() {
    var { createRequest, currentUser, inputText } = this.props;
    var newRequestData = {
      title: inputText.title,
      location: inputText.location,
      deadline: inputText.deadline,
      notes: inputText.notes,
      user: currentUser
    };
    createRequest(newRequestData)
    this.props.navigator.replace({
      component: FeedList
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
          style = {styles.searchInput}
          value = {inputText.title}
          onChange = {this.handleInuptChange.bind(this,'title')}
        />

        <Text style={styles.title}>
          Location
        </Text>
        <TextInput
          style = {styles.searchInput}
          value = {inputText.location}
          onChange = {this.handleInuptChange.bind(this,'location')}
        />

        <Text style={styles.title}>
          Deadline
        </Text>
        <TextInput
          style = {styles.searchInput}
          value = {inputText.deadline}
          onChange = {this.handleInuptChange.bind(this,'deadline')}
        />

        <Text style={styles.title}>
          Description
        </Text>
        <TextInput
          style = {styles.searchInput}
          value = {inputText.notes}
          onChange = {this.handleInuptChange.bind(this,'notes')}
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
