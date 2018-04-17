import {Auth} from 'aws-amplify';

class Cognito {

  static signInRedirect = "/gym/workouts";
  static signOutRedirect = "/login-cognito";

  static authData = {
    // REQUIRED - Amazon Cognito Identity Pool ID
    identityPoolId: 'eu-west-1:273b2a61-4781-439d-b95e-913ee11a20a7',
    // REQUIRED - Amazon Cognito Region
    region: 'eu-west-1',
    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: 'eu-west-1_H5mb08BMU',
    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: '46bf3oa91k0ff16vduo7lolv82',
    // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
    mandatorySignIn: false
  };

  //Is user authenticated? Make static to make accessible without new instance.
  static isAuthenticated(){

    //returns promise
    var auth = Auth.currentAuthenticatedUser()
    .then(user => {
			return true
		})
    .catch(err => {
      return false
    })

    return auth;

  };

}

export default Cognito;
