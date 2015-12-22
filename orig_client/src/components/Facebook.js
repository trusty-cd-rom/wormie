var React = require('react-native');
var FBSDKLogin = require('react-native-fbsdklogin');
var FBSDKCore = require('react-native-fbsdkcore');
import Signup from '../containers/Signup';


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

  convertToken(token){

    var tokenData = "grant_type=convert_token&client_id=LQBBAG7oJGNgdQyFyJg8TgZpNveL3d8PDkVgfgG2&client_secret=FjoMZbsjfuNJPEsuCgGFHTC0ABDh1KhM0odP7yJpDTAVvcrMzxFNSCU0seF6959ekTsCdB0FSbt2deHnHwM8U5GQfKW9WfrDyBlcHyViRxTF6vM0oavydUkByfUBK4HJ&backend=facebook&token=" + token;

    this.props.convertFacebookToken(tokenData, () => {
        console.log('convertFacebookToken');
        this.goToSignup();
    });
  }

  _removeStorage() {
    AsyncStorage.removeItem(STORAGE_KEY); 
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
