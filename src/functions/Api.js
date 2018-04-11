import { Auth } from 'aws-amplify';

let api_url = '';
if(process.env.NODE_ENV === 'development'){
	api_url = 'http://localhost:8000';
	console.log("Environment: development");
}else if(process.env.NODE_ENV === 'production'){
	api_url = 'https://api.mikaelahonen.com'
	console.log("Environment: production");
}

export function isLoggedIn(){
	var pass = false;

	//Cognito login
	//let session = Auth.currentSession();

	//Django login
	if(!!localStorage.token){
		var msToken = getTokenExpMs();
		var date = new Date();
		var msNow = date.getTime();
		if(msToken > msNow){
			pass = true;
			console.log("Django login ok")
		}
	}


	console.log('Logged In: ', pass);
	return pass;
}

//HTTP OPTIONS
export function optionsData(endpoint) {
	initApi();
	console.log("Options request: ", endpoint);

	var headers = {
	  'Accept': 'application/json',
	  //'Content-Type': 'application/json',
	}

	if (!!localStorage.token){
		headers.Authorization = 'JWT ' + localStorage.token
	}

	var payload = {
		method: "OPTIONS",
		mode: "cors",
		headers: headers,
	}

	var promise = fetch(api_url + endpoint, payload)
	.then((response) => {
		return response.json()
	});

	return promise
}

//HTTP POST
export function postData(endpoint, json) {
	initApi();
	console.log("Post data: ", endpoint);

	var headers = {
	  'Accept': 'application/json',
	  'Content-Type': 'application/json',
	}

	if (!!localStorage.token){
		headers.Authorization = 'JWT ' + localStorage.token
	}

	return fetch(api_url + endpoint,{
		method: "POST",
		mode: "cors",
		headers: headers,
		body: JSON.stringify(json),
	})
	.then(response => response.json())
}

//HTTP GET
export function getData(endpoint) {
	initApi();
	console.log("Get data: ", endpoint);

	var headers = {
	  'Accept': 'application/json',
	  //'Content-Type': 'application/json',
	}

	if (!!localStorage.token){
		headers.Authorization = 'JWT ' + localStorage.token
	}

	var payload = {
		mode: "cors",
		headers: headers,
	}

	var promise = fetch(api_url + endpoint, payload)
	.then((response) => {
		return response.json()
	});

	return promise
}

//HTTP DELETE
export function deleteData(endpoint){
	initApi();
	console.log("Delete data: ", endpoint);

	var headers = {};
	if (!!localStorage.token){
		headers.Authorization = 'JWT ' + localStorage.token
	}

	return fetch(api_url + endpoint,{
		method: "DELETE",
		mode: "cors",
		headers: headers,
	})
	.then(response => response)
}

//HTTP PUT
//PUT updates the whole object, PATCH can modify only part of an object
export function putData(endpoint, json) {
	initApi();
	console.log("Put data: ", endpoint);

	var headers = {
	  'Accept': 'application/json',
	  'Content-Type': 'application/json',
	}

	if (!!localStorage.token){
		headers.Authorization = 'JWT ' + localStorage.token
	}

	return fetch(api_url + endpoint,{
		method: "PUT",
		mode: "cors",
		headers: headers,
		body: JSON.stringify(json),
	})
	.then(response => response.json())
}

export function patchData(endpoint, json) {
	initApi();
	console.log("Patch data: ", endpoint);

	var headers = {
	  'Accept': 'application/json',
	  'Content-Type': 'application/json',
	}

	if (!!localStorage.token){
		headers.Authorization = 'JWT ' + localStorage.token
	}

	return fetch(api_url + endpoint,{
		method: "PATCH",
		mode: "cors",
		headers: headers,
		body: JSON.stringify(json),
	})
	.then(response => response.json())
}

export function getPayload(){
	//Base64 encoded payload
	var payloadBase64 = localStorage.token.split(".")[1];
	var payloadStr = atob(payloadBase64);
	var payloadJson = JSON.parse(payloadStr);
	return payloadJson;
}

export function getTokenExpMs(){
	var payload = getPayload();
	var ms = payload.exp*1000;
	return ms;
}

export function getTokenExpDate(){
	var ms = getTokenExpMs();
	var date = new Date(ms);
	return date;
}



//Refresh token
function initApi(){
	return true;
}
