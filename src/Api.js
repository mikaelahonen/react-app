var host = 'localhost:8000';

export function isLoggedIn(){
	return !!localStorage.token
}

export function postData(endpoint, json) {
	console.log("Post data: ", endpoint);
	return fetch(host + endpoint,{
		method: "POST",
		body: json
	})
	.then(response => response.json())	
}

export function getData(endpoint) {
	console.log("Get data: ", endpoint);
	return fetch(host + endpoint)
	.then(response => response.json())	
}