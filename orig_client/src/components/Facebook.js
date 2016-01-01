var React = require('react-native');
var FBSDKLogin = require('react-native-fbsdklogin');
var FBSDKCore = require('react-native-fbsdkcore');
import Signup from '../containers/Signup';
import Login from '../containers/Login';


var {
  FBSDKAccessToken,
  FBSDKGraphRequest,
} = FBSDKCore;

var {
  FBSDKLoginButton
} = FBSDKLogin;

var {
  View,
  AsyncStorage,
} = React;

var STORAGE_KEY = 'facebook';

class FacebookLogin extends React.Component {

  goToSignup() {
    this.props.navigator.replace({
      component: Signup
    });
  }

  goToLogin() {
    this.props.navigator.replace({
      component: Login
    });
  }

  convertToken(token){

    // PYTHON(FIX)
    var tokenData = "grant_type=convert_token&client_id=LQBBAG7oJGNgdQyFyJg8TgZpNveL3d8PDkVgfgG2&client_secret=FjoMZbsjfuNJPEsuCgGFHTC0ABDh1KhM0odP7yJpDTAVvcrMzxFNSCU0seF6959ekTsCdB0FSbt2deHnHwM8U5GQfKW9WfrDyBlcHyViRxTF6vM0oavydUkByfUBK4HJ&backend=facebook&token=" + token;
    
    // Sun Local
    // var tokenData = "grant_type=convert_token&client_id=gxiQNqWEgSyWT5vXA3yiuU9T5d9y3YK4SrqEnypa&client_secret=0bSCwwYpb3jtDptLligyLL1ZOr1aSAHycxwA5WBEaENbo61mb1Zqg1MJgv3m16vth1j4vEUZnOuXyvJ85pfU2rmCzIkNYzdOODtK0mWphurSlIBs2HlapMhTgEvYJ4aUss&backend=facebook&token=" + token;
    
    // CH Local
    // var tokenData = "grant_type=convert_token&client_id=9Io8b0GliOFVeVLsHrUkW8C1ec5VXuoqkkHOGrzJ&client_secret=19dXiAqOr4Ei8atm25qjhfqkUUz8iBZj9siTxKBcWT0M6naKlT5hNW4kdjXMjedSqUgirlEi0euqxhQLVeUXRu8wk5WDyfoV7nzEKYz2xGEHYroGpZUkRdv4gjNjuAYu&backend=facebook&token=" + token;

    console.log('FACEBOOK LOGIN');
    this.props.convertFacebookToken(tokenData, () => {
        console.log('convertFacebookToken');
        this.goToSignup();
    });
  }

  _removeStorage() {
    AsyncStorage.removeItem(STORAGE_KEY, () => {
      this.goToLogin();
    });
  }

  render () {
    return (
      <View>
        <FBSDKLoginButton
          onLoginFinished={(error, result) => {
            if (error) {
              alert('Error logging in.');
            } else {
              if (result.isCancelled) {
                alert('Login cancelled.');
              } else {
                FBSDKAccessToken.getCurrentAccessToken((token) => {
                  console.log(token);
                  this.convertToken(token.tokenString);
                  AsyncStorage.setItem(STORAGE_KEY, token.tokenString);
                });
              }
            }
          }}
          onLogoutFinished={() => {
            // Remove from async storage
            this._removeStorage();
          }}
          readPermissions={[]}
          publishPermissions={['publish_actions']}/>
      </View>
    )
  }
}

module.exports = FacebookLogin;
