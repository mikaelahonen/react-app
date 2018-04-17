import {Auth} from 'aws-amplify';

class DataApi{

  static test_host = 'https://15abnao3m1.execute-api.eu-west-1.amazonaws.com';
  static prod_host = 'https://15abnao3m1.execute-api.eu-west-1.amazonaws.com';
  static stage = 'v1';
  static resource = 'data';
  static defaultHeaders = {
    Accept: 'application/json',
  }

  static async getToken(){
    var session = await Auth.currentSession();
    return session.idToken.jwtToken;
  }

  static async get(endpoint){
    var data = await this.request(endpoint, "GET");
    return data;
  }

  static async delete(endpoint){
    var data = await this.request(endpoint, "DELETE");
    return data;
  }

  static async request(endpoint="/", method="GET", body="", headers=this.defaultHeaders){

    //Setup according to environment
    if(process.env.NODE_ENV === 'development'){
      var host = this.test_host;
    }else if(process.env.NODE_ENV === 'production'){
      var host = this.prod_host;
    }

    //Get id token for current user
    var idToken = await this.getToken();
    headers.Authorization = idToken;

    //Set request parameters
    var payload = {
      method: method,
      mode: "cors",
      headers: headers,
    }

    //If request has body (get doesn't accpet it)
    if(body){
      payload.body = JSON.stringify(body)
    }

    //Get response as json
    var url = host + "/" + this.stage + "/" + this.resource + endpoint;
    console.log(method + ": " + url)
    var response = await fetch(url, payload);
    var data = response.json();
    //Return data
    return data

  }

}

export default DataApi;
