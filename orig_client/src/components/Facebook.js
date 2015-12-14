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
} = React;


class FacebookLogin extends React.Component {

  goToSignup() {
    console.log(this.props);
    this.props.navigator.replace({
      component: Signup
    });
  }

  convertToken(token){

    var tokenData = "grant_type=convert_token&client_id=LQBBAG7oJGNgdQyFyJg8TgZpNveL3d8PDkVgfgG2&client_secret=FjoMZbsjfuNJPEsuCgGFHTC0ABDh1KhM0odP7yJpDTAVvcrMzxFNSCU0seF6959ekTsCdB0FSbt2deHnHwM8U5GQfKW9WfrDyBlcHyViRxTF6vM0oavydUkByfUBK4HJ&backend=facebook&token=" + token;

    // Use Facebook token to create new user in our database and return OAuth2 token
    this.props.convertFacebookToken(tokenData, () => {
      // Grab the user's Facebook id from Facebook and look up user in our database
      console.log("Time to fetchFacebookProfile");
      this.props.fetchFacebookProfile(() => {
        // Switch to the next screen after the client knows the user's info
        console.log("Now let's goToSignup page");
        this.goToSignup();
      });
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
                  this.convertToken(token.tokenString);
                });
              }
            }
          }}
          onLogooutFinished={() => alert('Logged out.')}
          readPermissions={[]}
          publishPermissions={['publish_actions']}/>
      </View>
    )
  }
}

module.exports = FacebookLogin;
