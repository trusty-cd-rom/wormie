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

  fetchProfile(){

    var fetchProfileRequest = new FBSDKGraphRequest((error, result) => {
      if (error) {
        console.log('Error making request.');
      } else {
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        console.log("The user's details: ", result);
        
        var { getUserDataFromServer } = this.props;
        
        getUserDataFromServer(result.id, () => {
          console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
          console.log("I GOT THE USERS DATA FROM OUR SERVER");
          console.log("Time to move to next page");
          console.log(this.props);
          this.props.navigator.replace({
            component: Signup
          });
        });

      }
    }, '/me');

    // Note: Add parameters if you want more details from Facebook
    //       Here is an example to get the user's email address
    // fetchProfileRequest.addStringParameter('email', 'fields');

    fetchProfileRequest.start();
  }

  convertToken(token){

    var tokenData = "grant_type=convert_token&client_id=LQBBAG7oJGNgdQyFyJg8TgZpNveL3d8PDkVgfgG2&client_secret=FjoMZbsjfuNJPEsuCgGFHTC0ABDh1KhM0odP7yJpDTAVvcrMzxFNSCU0seF6959ekTsCdB0FSbt2deHnHwM8U5GQfKW9WfrDyBlcHyViRxTF6vM0oavydUkByfUBK4HJ&backend=facebook&token=" + token;

    this.props.convertFacebookToken(tokenData, () => {      
      this.fetchProfile();
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
                  console.log(token.tokenString);
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
