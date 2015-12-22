import Facebook from '../containers/Facebook';

import React, {
  Component,
  StyleSheet,
  Image,
  Text,
  View,
  AsyncStorage,
  TouchableHighlight,
  ActivityIndicatorIOS,
} from 'react-native';
import Signup from '../containers/Signup';
import Navbar from '../containers/Navbar';

var STORAGE_KEY = 'facebook';

class Login extends Component {
  
  componentDidMount() {
      this._loadInitialState().done()  
  }

  async _loadInitialState() {
    var {storeToken} = this.props;
    var value = await AsyncStorage.getItem(STORAGE_KEY);
    if ( value !== null) {
      console.log("The value is: ", value);
      storeToken(value);

    } else {
      console.log("Nothing stored");
    }
  }

  _getCurrentUser() {
      var { getUserDetails, login } = this.props;

      console.log("login.facebook");

      getUserDetails(() => {
        this.goToHome();
      });
  }

  goToHome() {
    this.props.navigator.replace({
      component: Navbar
    });
  }

  _checkFacebookStatus() {
    
    var { login, getUserDetails } = this.props;

    if ( login.facebook !== "init" ) {

      this.goToHome();      

    } else if ( login.facebook === "init" ) {

      // show facebook login
      return (
        <Facebook navigator={this.props.navigator} style={styles.facebookButton}/>
      )

    } else {

      return (
        <ActivityIndicatorIOS
          animating = {true}
          color = 'white'
          size = 'large'
        ></ActivityIndicatorIOS>
      )
      
    }


  }

  render() {
    return (
      <View
        style={{
          flex:1, 
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#bfefff',
        }}
      >
        <View
          style={{
            alignSelf: 'stretch',
            flex: 2,
          }}
        >
        </View>
        <View
          style={{
            alignSelf: 'stretch',
            flex: 6,
          }}
        >
          <View
            style={{marginRight: 60, paddingRight: 60}}
          >
            <Image 
              source = {require('../assets/wormie1.png')}
              style={{flex: 1, alignSelf: 'stretch', width: 400, height: 350}}
            />
          </View>
        </View>
        <View
          style={{
            alignSelf: 'stretch',
            flex: 2,
          }}
        >
          <Text style={styles.logo}>WORMIE</Text>
        </View>
        <View
          style={{
            alignSelf: 'stretch',
            flex:1,
          }}
        >
        </View>
        <View
          style={{
            alignSelf: 'stretch',
            alignItems: 'center',
            flex:2,
          }}
        >
          <Text style={styles.subtitle}>LET'S GO EXPLORING</Text>
          {this._checkFacebookStatus()}
        </View>
        <View style={{ flex:2 }}>
        </View>
      </View>
    );
  }
}
        
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#bfefff'
  },
  logo: {
    fontSize: 50,
    fontFamily: 'Lato-Bold',
    textAlign: 'center',
    alignSelf: 'center',
    color: '#565656',
    margin: 10,
  },
  subtitle: {
    fontSize: 20,
    fontFamily: 'Lato-Semibold',
    textAlign: 'center',
    alignSelf: 'center',
    color: '#565656',
    flex: 1
  },
  splashImage: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'center',
    flex: 4,
    backgroundColor: '#bfefff'
  },
  facebookButton: {
    paddingBottom: 50,
    alignSelf: 'center',
    marginBottom: 30,
  },
  bottomLayer: {
    margin: 30
  }
});

export default Login;
