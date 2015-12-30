import urls from '../constants/urls';

// Facebook requests
var FBSDKCore = require('react-native-fbsdkcore');
var {
  FBSDKGraphRequest,
} = FBSDKCore;



var api = {
	createWormhole(wormholeData) {
		// debugger;
		// wormholeData = '{ "title": "hiking", "latitude":50, "longitude": 35, "deadline":"2015-12-09T23:37:58.271497Z", "notes":"foxboy", "status": "open", "requestor": 2}';
		// console.log('about to post to the server from util api', wormholeData);
	  return fetch(urls.wormholes, {
	    method: 'POST',
	    headers: {
	    	'Content-Type': 'application/json',
	    },
	    body: JSON.stringify(wormholeData)
	    // body: JSON.stringify({ "title": "fat ugly face party party at ikea", "latitude":50, "longitude": 35, "deadline":"2015-12-09T23:37:58.271497Z", "notes":"make it phat", "status": "zip line", "requestor": 2})
	  })
	  .then((res, a) => {
	  	console.log('catdog got this back from server on wormhole create post', res, a);
	  	return res.json();
	  })
	  ;
	  
	  //for testing
	  // return setTimeout(() => {
   //    return wormholeData;
   //  }, 1000);
	},

	getWormholeList() {
		return fetch(urls.wormholes)
		.then((res) => res.json())
		;
	},

	getWormholeDetails(id) {
		return fetch(`${urls.wormholes}/${id}`)
		.then((res) => res.json())
		;
	},

	updateWormholeDetails(wormholeId, wormholeData) {
		// console.log('about to send put to update submit from api file, id: ', wormholeId, wormholeData );
		return fetch(`${urls.wormholes}/${wormholeId}/`, {
	    method: 'put',
	    headers: {
	    	'Content-Type': 'application/json',
	    	'Accept': 'application/json',
	    },
	    body: JSON.stringify(wormholeData)
	  })
	  .then((res) => {
	  	// console.log('just head back from the put, and they said: ', res);
	  	res
	  })
	  ;
	},

	createSubmission(submissionData) {
		console.log('about to submit against request');
	  return fetch(urls.submissions, {
	    method: 'post',
	    headers: {
	    	'Content-Type': 'application/json',
	    },
	    body: JSON.stringify(submissionData)
	  })
	  .then((res) => res.json())
	  ;
	},

	getSubmissionList() {
		return fetch(urls.submissions)
		.then((res) => res.json())
		;
	},

	getSubmissionDetails(id) {
		return fetch(`${urls.submissions}/${id}`)
		.then((res) => res.json())
		;
	},

	updateSubmissionDetails(submissionData) {
		return fetch(`${urls.submissions}/${submissionData.id}`, {
	    method: 'put',
	    body: JSON.stringify(submissionData)
	  })
	  .then((res) => res.json())
	  ;
	},

	getUserList() {
		return fetch(urls.users)
		.then((res) => res.json())
		;
	},

	getUserDetails(id) {
		return fetch(`${urls.users}/${id}`)
		.then((res) => res.json())
		;
	},

	getUserDetailsByFacebookID(fb_id) {
		console.log("getUserDetailsByFacebookID");
		console.log(`${urls.usersByFacebookID}/${fb_id}`);
		return fetch(`${urls.usersByFacebookID}/${fb_id}`)
		.then((res) => res.json())
		;
	},

	createUser(userData) {
		return fetch(urls.users, {
	    method: 'POST',
	    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
   		},
	    body: JSON.stringify(userData)
	  })
	  .then((res) => {
	  	res.json();
	  	// console.log(res);
	  })
	  ;
	},

	/*
	/	 Update user's details (e.g. 'username', 'email') 
	*/
	updateUserDetails(userData) {
		return fetch(`${urls.users}${userData.id}/`, {
	    method: 'put',
	    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
   		},
	    body: JSON.stringify(userData)
	  })
	  .then((res) => {
	  	res.json();
	  })
	  ;
	},

	/*
	/	 Update user's "account" details (e.g. 'wormie_color', 'about_me') 
	*/
	updateAccountDetails(accountData) {
		var data = {
			"about_me": accountData["about_me"],
			"wormie_color": accountData["wormie_color"]
		}
		return fetch(`${urls.accounts}${accountData.account_id}/`, {
			method: 'put',
			headers: {
	    	'Content-Type': 'application/json',
	    },
			body: JSON.stringify(data)
		})
		.then((res) => {
			console.log(res);
			res.json();
		})
	},

	/*
	/	 Convert facebook token to Oauth2, create new User in database
	*/
	convertToken(tokenData) {
		return fetch(urls.convertToken, {
			method: 'POST',
			headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: tokenData
		})
		.then((res) => {
			console.log("Success! Token converted", res);
			// TODO: Save the django token somewhere
			res.json();
		})
		.catch((err) => {
			console.log("Error converting token");
			console.error(err);
		});

	},

	/*
	/	 Get user's Facebook profile (specifically, we want the user's FB id)
	*/
	fetchFacebookProfileFromFacebook(cb) {
		var fetchProfileRequest = new FBSDKGraphRequest((error, result) => {
      if (error) {
        console.log('Error making request.');
        cb(error);
      } else {
      	console.log("Result: ", result);
      	cb(result);
      }
    }, '/me');

		// Invoke the fetchProfileRequest
    return fetchProfileRequest.start();
	
	},

	/*
	 Sorting and filtering
	 */

	filterByStatus(status) {
		var url = urls.filter + '?status=' + status;
		return fetch(urls.filterByStatus, {
			method: 'GET'
		})
		.then(function (data) {
			res.json();
		})
		.catch(function (err) {
			console.log(err);
		})
	},

	sortList(criteria) {
		var url = urls.sortBy + '?sort_by=' + criteria;
		return fetch(urls.sortList, {
			method: 'GET'
		})
		.then(function (data) {
			res.json();
		})
		.catch(function (err) {
			console.log(err);
		})
	}

	// TODO: Add a refresh token API call using the stored refresh OAuth2 token

};

module.exports = api;
