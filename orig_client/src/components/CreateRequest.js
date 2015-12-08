import React, {
  Component,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TextInput,
} from 'react-native';

class CreateRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      aboutMe: '',
      // isLoading: false,
      error: false
    }
  }
  submitRequest() {
    this.props.navigator.pop();
  }
  handleTitleChange(event) {
    //input has the value nativeElement
    this.setState({
      title: event.nativeEvent.text
    });
  }
  handleLocationChange(event) {
    //input has the value nativeElement
    this.setState({
      location: event.nativeEvent.text
    });
  }
  handleDeadlineChange(event) {
    //input has the value nativeElement
    this.setState({
      deadline: event.nativeEvent.text
    });
  }
  handleNotesChange(event) {
    //input has the value nativeElement
    this.setState({
      notes: event.nativeEvent.text
    });
  }
  back() {
    this.props.navigator.pop();
  }
  render() {
    // var { increment, incrementIfOdd, incrementAsync, decrement, counter } = this.props;
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
          value = {this.state.title}
          onChange = {this.handleTitleChange.bind(this)}
        />

        <Text style={styles.title}>
          Location
        </Text>
        <TextInput
          style = {styles.searchInput}
          value = {this.state.location}
          onChange = {this.handleLocationChange.bind(this)}
        />

        <Text style={styles.title}>
          Deadline
        </Text>
        <TextInput
          style = {styles.searchInput}
          value = {this.state.deadline}
          onChange = {this.handleDeadlineChange.bind(this)}
        />

        <Text style={styles.title}>
          Description
        </Text>
        <TextInput
          style = {styles.searchInput}
          value = {this.state.notes}
          onChange = {this.handleNotesChange.bind(this)}
        />

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
