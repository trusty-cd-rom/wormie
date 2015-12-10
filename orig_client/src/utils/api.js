import urls from '../constants/urls';

var api = {

	createWormhole(wormholeData) {
	  // return fetch(urls.wormholes, {
	  //   method: 'post',
	  //   body: JSON.stringify(wormholeData)
	  // })
	  // .then((res) => res.json())
	  // ;
	  
	  //for testing
	  return setTimeout(() => {
      return wormholeData;
    }, 1000);
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

	updateWormholeDetails(wormholeData) {
		return fetch(`${urls.wormholes}/${wormholeData.id}`, {
	    method: 'put',
	    body: JSON.stringify(wormholeData)
	  })
	  .then((res) => res.json())
	  ;
	},

	createSubmission(submissionData) {
	  return fetch(urls.submissions, {
	    method: 'post',
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

	createUser(userData) {
		return fetch(urls.users, {
	    method: 'post',
	    body: JSON.stringify(userData)
	  })
	  .then((res) => res.json())
	  ;
	},

	updateUserDetails(userData) {
		return fetch(`${urls.users}/${userData.id}`, {
	    method: 'put',
	    body: JSON.stringify(userData)
	  })
	  .then((res) => res.json())
	  ;
	},

};

module.exports = api;