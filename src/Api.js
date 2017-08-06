let api_url = '';
if(process.env.NODE_ENV === 'development'){
	api_url = 'http://localhost:8000';
	console.log("Environment: development");
}else if(process.env.NODE_ENV === 'production'){
	api_url = 'https://api.mikaelahonen.com'
	console.log("Environment: production");
}

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

export function getData(endpoint) {
	initApi();
	console.log("Get data: ", endpoint);
	
	var headers = {
	  'Accept': 'application/json',
	  'Content-Type': 'application/json',
	}
	
	if (!!localStorage.token){
		headers.Authorization = 'JWT ' + localStorage.token
	}
	
	return fetch(api_url + endpoint,{
		mode: "cors",
		headers: headers,
	})
	.then(response => response.json())	
}

//Refresh token
function initApi(){
	return true;	
}