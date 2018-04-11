import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import {Auth} from 'aws-amplify';
import Cognito from 'functions/Cognito';

class LogoutCognito extends Component {

  state = {
    signout: false
  }

  async componentWillMount(){
    await Auth.signOut()
    .then(data => {
      this.setState({signout: true})
    })
    .catch(err => {
      //this.setState({signout: true})
    });
  }

  render() {

    if(this.state.signout){
      return <Redirect to={Cognito.signOutPath} />
    }else{
      return <p>Signing out...</p>
    }

  }
}

export default LogoutCognito;
