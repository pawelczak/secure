/// <reference lib="webworker" />

let accessToken: any;

addEventListener('message', ({ data }) => {

	if (data === 'LOGIN') {

		fetch('http://localhost:4000/login', {
			method: 'POST', // or 'PUT'
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username: 'Lukasz'
			})
		})
			.then(response => response.json())
			.then(data => {
				// console.log('Success:', data);
				accessToken = data.accessToken;
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	}

	if (data === 'POSTS') {


		fetch('http://localhost:3000/posts', {
			method: 'GET', // or 'PUT'
			headers: {
				'Authorization': 'Bearer ' + accessToken
			}
		})
			.then(response => response.json())
			.then(data => {
				// console.log('Success:', data);
				accessToken = data;
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	}

});
