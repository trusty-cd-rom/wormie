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
        <View style={styles.topBar}>
          <Text style={styles.title}>Settings</Text>      
        </View>
        <View style={styles.body}>
          <Facebook navigator={this.props.navigator} style={styles.facebookButton}/>
          <Image 
            style={{height: 125, width: 150, marginTop: 10, marginBottom: 10}}
            source = {require('../assets/wormie-logo2.png')}
          />
          <Text style={styles.titleText}> WORMIE 1.0.0 </Text>
          <Text style={styles.aboutText}> By Sun, Nick, & Charlie </Text>
          <Text style={styles.aboutText}> © 2015-2016 @wormieapp </Text>
          <Text style={styles.aboutText}> wormieapp.com </Text>
          <Text style={styles.aboutText}> Made in San Francisco </Text>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    paddingTop: 20,
    flexDirection: 'row',
    backgroundColor: '#39247F',
    height:50,
    alignSelf: 'stretch',
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Lato-Bold',
    textAlign: 'center',
  },
  body: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  facebookButton: {
    paddingBottom: 50
  },
  titleText: {
    fontSize: 16,
    color: '#3e3e3e',
    fontFamily: 'Lato-Semibold',
  },
  aboutText: {
    color: '#727272',
    fontSize: 14,
    fontFamily: 'Lato-Semibold',
  }
});

export default Settings;

