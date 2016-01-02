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

import Badge from '../components/Badge';
// import updateUserProfile from '../actions/updateUserProfile.js';
import Location from './Location';
import Navbar from '../containers/Navbar';
import colorUtil from '../utils/color';

class Signup extends Component {

  componentWillMount() {
    var { updateProfile, currentUser } = this.props;
    
    updateProfile.wormie_red = colorUtil.hexToRGB(currentUser.wormie_color)[0];
    updateProfile.wormie_green = colorUtil.hexToRGB(currentUser.wormie_color)[1];
    updateProfile.wormie_blue = colorUtil.hexToRGB(currentUser.wormie_color)[2];

    currentUser.wormie_red = colorUtil.hexToRGB(currentUser.wormie_color)[0];
    currentUser.wormie_green = colorUtil.hexToRGB(currentUser.wormie_color)[1];
    currentUser.wormie_blue = colorUtil.hexToRGB(currentUser.wormie_color)[2];

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
 
    // Create single wormie
    createWormie(hex);

    // Create left wormie heart
    // TODO

    // Create right wormie heart
    // TODO

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

  render() {

    var { updateProfile, currentUser } = this.props;

    return (
      <View style={styles.container}>
        <Badge 
          currentUser={this.props.currentUser}
          updateProfile={this.props.updateProfile} />
        <Text style={styles.title}>
          Hi, {currentUser.first_name}! Choose your Wormie username:
        </Text>
        <TextInput
          style = {styles.searchInput}
          value = {currentUser.username}
          onChange = {this.handleInputChange.bind(this, 'username')}
        />
        <Text style={styles.title}>
          Add your bio:
        </Text>
        <TextInput
          style = {styles.searchInput}
          value = {currentUser.about_me}
          onChange = {this.handleInputChange.bind(this, 'about_me')}
        />
        <Text style={styles.title}> Design your Wormie's color:
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
            marginBottom: 30,
            flex: 1,
            }]}
          onPress = {this.handleSubmit.bind(this, () => {this.goToHome()})}
          underlayColor = '#88D4f5'>
          <Image 
            style={{height: 120, width: 85}}
            source = {require('../assets/clearwormie2.png')}
          />
        </TouchableHighlight>
      </View>
    );
  }

}

            //fontFamily: 'Lato-Bold',

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  slider: {
    flex: 1,
    width: 300,
    height: 10
  },
  text: {
    fontFamily: 'Lato-Regular',
    fontSize: 14,
    textAlign: 'center',
    margin: 10,
  },
  bottomButton: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'center',
    flex: 1
  },
  buttonText: {
    fontFamily: 'Lato-Regular',
    fontSize: 25,
    color: 'white',
    alignSelf: 'center'
  },
  title: {
    fontFamily: 'Lato-Regular',
    marginTop: 10,
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#4CC6EA'
  },
  searchInput: {
    fontFamily: 'Lato-Regular',
    height: 40,
    width: 350,
    padding: 4,
    textAlign: 'center',
    marginLeft: 10,
    marginBottom: 20,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#4CC6EA',
    borderRadius: 8,
    color: '#4CC6EA'
  },
});

export default Signup;
