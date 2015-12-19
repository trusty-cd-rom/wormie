import React, {
  Component,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableHighlight,
  SliderIOS,
  TextInput,
} from 'react-native';

import Facebook from '../containers/Facebook';

class Settings extends Component{
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>I am settings page</Text>      
        <Facebook navigator={this.props.navigator} style={styles.facebookButton}/>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#39247F',
  },
  title: {
    color: 'white',
    fontSize: 24
  },
  facebookButton: {
    paddingBottom: 50
  },
});

export default Settings;

