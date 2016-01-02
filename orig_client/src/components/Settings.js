import React, {
  Component,
  StyleSheet,
  Text,
  Image,
  View,
  ScrollView,
  TouchableHighlight,
  SliderIOS,
  TextInput,
} from 'react-native';

import Facebook from '../containers/Facebook';
import Navbar from '../containers/Navbar';
import colorUtil from '../utils/color';
import SafariView from 'react-native-safari-view';

class Settings extends Component{

  componentWillMount() {
    var { currentUser, updateProfile } = this.props;
    currentUser.wormie_red = colorUtil.hexToRGB(currentUser.wormie_color)[0];
    currentUser.wormie_green = colorUtil.hexToRGB(currentUser.wormie_color)[1];
    currentUser.wormie_blue = colorUtil.hexToRGB(currentUser.wormie_color)[2];

    updateProfile.wormie_red = colorUtil.hexToRGB(currentUser.wormie_color)[0];
    updateProfile.wormie_green = colorUtil.hexToRGB(currentUser.wormie_color)[1];
    updateProfile.wormie_blue = colorUtil.hexToRGB(currentUser.wormie_color)[2];
  } 

  goToHome() {
    this.props.navigator.replace({
      component: Navbar
    });
  }

  handleSubmit(cb) {

    var { updateProfile, updateUserProfile, currentUser, createWormie } = this.props;

    username = updateProfile.username || currentUser.username;
    about_me = updateProfile.about_me || currentUser.about_me;

    wormie_color = colorUtil.rgbToHex(Math.floor(updateProfile.wormie_red), Math.floor(updateProfile.wormie_green), Math.floor(updateProfile.wormie_blue)) || currentUser.wormie_color;

    var accountUpdate = {
      user_id: currentUser.id,
      account_id: currentUser.account_id,
      username: username,
      wormie_red: Math.floor(updateProfile.wormie_red),
      wormie_green: Math.floor(updateProfile.wormie_green),
      wormie_blue: Math.floor(updateProfile.wormie_blue),
      wormie_color: wormie_color,
      about_me: about_me
    };

    var hex = accountUpdate.wormie_color.slice(1);
 
    // Create wormie images
    createWormie(hex);

    updateUserProfile(accountUpdate, cb);

  }

  handleInputChange(fieldName, event) {
    var { updateSignUpInputText } = this.props;
    updateSignUpInputText(fieldName, event.nativeEvent.text);
  }

  handleSliderChange(data) {
    var { updateSignUpSlider, updateProfile } = this.props;
    updateSignUpSlider(data.field, data.value);
  }

  safariOpen() {
    SafariView.isAvailable()
      .then(SafariView.show({
        url: "http://www.wormieapp.com"
      }))
      .catch(error => {
        console.log("Link didn't work");
      });
  }

  sunyoung() {
    SafariView.isAvailable()
      .then(SafariView.show({
        url: "https://github.com/SunyoungKim508"
      }))
      .catch(error => {
        console.log("Link didn't work");
      });
  }

  nick() {
    SafariView.isAvailable()
      .then(SafariView.show({
        url: "http://www.nickfujita.com"
      }))
      .catch(error => {
        console.log("Link didn't work");
      });
  }

  charlie() {
    SafariView.isAvailable()
      .then(SafariView.show({
        url: "http://www.whatrocks.org"
      }))
      .catch(error => {
        console.log("Link didn't work");
      });
  }

  render() {
    var {updateProfile, currentUser} = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.topBar}>
          <Text style={styles.title}>Settings</Text>      
        </View>
        <ScrollView contentContainerStyle={styles.body}>
          <Text style={styles.titleBase}>
            Update your Wormie username:
          </Text>
          <TextInput
            style = {styles.searchInput}
            value = {currentUser.username}
            onChange = {this.handleInputChange.bind(this, 'username')}
          />
          <Text style={styles.titleBase}>
            Edit your bio:
          </Text>
          <TextInput
            style = {styles.searchInput}
            value = {currentUser.about_me}
            onChange = {this.handleInputChange.bind(this, 'about_me')}
          />
          <Text style={styles.titleBase}> Change your Wormie's color:
          </Text>
          <SliderIOS
            style={styles.slider}
            value = {currentUser.wormie_red}
            minimumValue={0.0}
            maximumValue={255.0}
            onValueChange={(value) => this.handleSliderChange({field: 'wormie_red', value: value})}/>
          <SliderIOS
            style={styles.slider}
            value = {currentUser.wormie_green}
            minimumValue={0.0}
            maximumValue={255.0}
            onValueChange={(value) => this.handleSliderChange({field: 'wormie_green', value: value})}/>
          <SliderIOS
            style={styles.slider}
            value = {currentUser.wormie_blue}
            minimumValue={0.0}
            maximumValue={255.0}
            onValueChange={(value) => this.handleSliderChange({field: 'wormie_blue', value: value})}/>
          <TouchableHighlight
            style={[styles.container, { 
              backgroundColor: colorUtil.rgbToHex(updateProfile.wormie_red, updateProfile.wormie_green, updateProfile.wormie_blue),
              flexDirection: 'row',
              justifyContent: 'center',
              height: 90,
              width: 75,
              borderRadius: 10,
              borderColor: 'white',
              marginBottom: 120,
              flex: 1,
              }]}
            onPress = {this.handleSubmit.bind(this, () => {this.goToHome()})}
            underlayColor = '#88D4f5'>
            <Image 
              style={{height: 120, width: 85}}
              source = {require('../assets/clearwormie2.png')}
            />
          </TouchableHighlight>
          <Facebook navigator={this.props.navigator} style={styles.facebookButton}/>
          <Text style={styles.titleText}> WORMIE 1.0.0 </Text>
          <View style={styles.row}>
            <Text style={styles.aboutText}>By </Text>
            <TouchableHighlight
              onPress = {this.sunyoung.bind(this)}
              underlayColor='white'>
              <Text style={styles.link}>Sunyoung Kim</Text>
            </TouchableHighlight>
            <Text style={styles.aboutText}>, </Text>
            <TouchableHighlight
              onPress = {this.nick.bind(this)}
              underlayColor='white'>
              <Text style={styles.link}>Nick Fujita</Text>
            </TouchableHighlight>
            <Text style={styles.aboutText}>, & </Text>
            <TouchableHighlight
              onPress = {this.charlie.bind(this)}
              underlayColor='white'>
              <Text style={styles.link}>Charlie Harrington</Text>
            </TouchableHighlight>
          </View>
          <Text style={styles.aboutText}> © 2015-2016 </Text>
          <TouchableHighlight
            onPress = {this.safariOpen.bind(this)}
            underlayColor='white'>
            <Text style={styles.link}>wormieapp.com</Text>
          </TouchableHighlight>
          <Text style={styles.aboutText}> Made in San Francisco </Text>
        </ScrollView>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
  },
  topBar: {
    paddingTop: 20,
    flexDirection: 'row',
    backgroundColor: '#4CC6EA',
    height:50,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Lato-Bold',
    textAlign: 'center',
  },
  facebookButton: {
    marginTop: 10,
    paddingBottom: 20
  },
  titleText: {
    fontSize: 14,
    marginTop: 20,
    marginBottom: 10,
    color: '#3e3e3e',
    fontFamily: 'Lato-Semibold',
  },
  aboutText: {
    color: '#727272',
    marginBottom: 5,
    fontSize: 12,
    fontFamily: 'Lato-Semibold',
  },
  link: {
    color: '#727272',
    fontSize: 12,
    marginBottom: 5,
    fontFamily: 'Lato-Semibold',
    textDecorationLine: 'underline',
  },
  slider: {
    flex: 1,
    width: 300,
    height: 20,
    marginTop:10,
    marginBottom:10,
  },
  bottomButton: {
    justifyContent: 'center',
    borderRadius: 5,
    borderColor: 'white',
    marginTop: 10,
    marginBottom: 15,
    width: 150,
    flex: 1,
  },
  buttonText: {
    fontFamily: 'Lato-Regular',
    fontSize: 20,
    color: 'white',
    alignSelf: 'center'
  },
  titleBase: {
    fontFamily: 'Lato-Regular',
    marginTop: 10,
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#3e3e3e'
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Lato-Regular',
    height: 60,
    width: 350,
    padding: 4,
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: 'center',
    marginLeft: 10,
    marginBottom: 5,
    fontSize: 16,
    borderWidth: 2,
    borderColor: '#4CC6EA',
    justifyContent: 'center',
    borderRadius: 8,
    color: '#727272'
  },
});

export default Settings;

