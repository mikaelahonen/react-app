import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import {Auth} from 'aws-amplify';
import Cognito from 'functions/Cognito';

class LogoutCognito extends Component {

  state = {
    signout: false
  }

  async componentDidMount(){
    try{
      var signout = await Auth.signOut()
      this.setState({signout: true})
    }
    catch(e){
      //pass
    }
  }

  render() {

    if(this.state.signout){
      return <Redirect to={Cognito.signOutRedirect} />
    }else{
      return <p>Signing out...</p>
    }

  }
}

export default LogoutCognito;
