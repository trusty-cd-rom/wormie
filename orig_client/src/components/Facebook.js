var React = require('react-native');
var FBSDKLogin = require('react-native-fbsdklogin');
var FBSDKCore = require('react-native-fbsdkcore');

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

  fetchProfile(){

    var fetchProfileRequest = new FBSDKGraphRequest((error, result) => {
      if (error) {
        console.log('Error making request.');
      } else {
        // Data from request is in result
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        console.log("The user's email is: ", result.email);
        // Need to save this as the current user's email
        // TODO!
      }
    }, '/me');

    fetchProfileRequest.addStringParameter('email', 'fields');

    fetchProfileRequest.start();
  }

  convertToken(token){

    var tokenData = "grant_type=convert_token&client_id=WEU2sT6tm9M7tsTUaV9CZGgYBL3TZBmYWUhRPVxA&client_secret=cckcY9UnOcHp04zTrVUODdvQJan0v7ZwGg891FlWW2TZheC6xNNm0Gb7WTig3VYEk2ziNWhX35CRo3vOU3sZOZzVmkjOSXXLzEmbxa6LbVApuS5p62DTK5wgMds5HS76&backend=facebook&token=" + token;

    this.props.convertFacebookToken(tokenData, () => {
      
      console.log("I need to get the users email ");
      this.fetchProfile();
      console.log("I need to save the token somewhere");
      console.log("I should probably switch to next page");
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
