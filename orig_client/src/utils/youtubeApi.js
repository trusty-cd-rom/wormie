var FileUpload = require('NativeModules').FileUpload;

var youtube = {

	postVideo(file){
		var url = 'https://www.googleapis.com/upload/youtube/v3/videos?part=snippet';
		// var url = 'http://reqres.in/api/users';
		var body = {
			snippet: { 
				title: 'my first wormie!',
				description: 'pleaseeeee wormie',
				tags: ['wormie'],
				categoryId: '19'
			}
		};
			// status: {
			// 	privacyStatus: 'public'
			// },
			// recordingDetails: {
			// 	location: {
			// 		latitude: '37.7861400',
			// 		longitude: '-122.4057540'
			// 	},
			// 	recordingDate: '2015-12-14T05:52:25.345967Z',
			// 	locationDescription: 'hack reactor'
			// }
		var filename = file.split('/');
		filename = filename[filename.length-1];
		var youtubeVideoId;		

    return this.refreshToken()
    .then((res) => {
    	console.log('11111111111111111111');
    	// console.log('about to do the post of the video to youtube: ', res);
    	let currUrl = url+res.access_token;
    	// console.log('here is the url that i am going to use to make the post youtube with the access token', url);
			var obj = {
				uploadUrl: url,
				method: 'POST', // default 'POST',support 'POST' and 'PUT'
				headers: {
					'Authorization': `Bearer ${res.access_token}`,
					'accept': 'application/json'
				},
				fields: body,
				files: [
					{
						name: 'ahhhhhhhhhhhhhhhhhhh', // optional, if none then `filename` is used instead
						filename: filename, // require, file name
						filepath: file, // require, file absoluete path
						// filetype: 'audio/x-m4a', // options, if none, will get mimetype from `filepath` extension
					},
				]
	    };
	    console.log(obj);
	    return new Promise((resolve, reject) => {
	    	FileUpload.upload(obj, (err, result) => {
	    		console.log('22222222222222222222222');
		    	console.log('upload:', err, result);
		    	if(err) {
		    		reject();
		    	} else {
		    		resolve(result);
		    	}
		    })
		  });
    })
		// .then((res) => {
		// 	console.log('333333333333333333333333333');
		// 	youtubeVideoId = JSON.parse(res.data).id;
		// 	console.log('about to refresh my token for the update', youtubeVideoId);
		// 	//need to goback to update the video details b/c the file upload module is not sending the snippet in the post in a way readable to youtube
		// 	return new Promise((resolve, reject) => {
	 //    	this.refreshToken()
	 //    	.then((result) => {
	 //    		resolve(result);
	 //    	})
	 //    	.catch((err) => {
	 //    		reject();
	 //    	})
		//   });
		// })
		// .then((result) => {
		// 	console.log('4444444444444444444444444444');
		// 	console.log('this is reallllll', result, youtubeVideoId);
		// 	let updateUrl = 'https://www.googleapis.com/upload/youtube/v3/videos?part=snippet&access_token=';
  //   	updateUrl = updateUrl+result.access_token;
  //   	console.log('updateUrl', updateUrl);
		// 	var body = {
		// 		id: youtubeVideoId,
		// 		snippet: { 
		// 			title: 'my first wormie!',
		// 			description: 'pleaseeeee wormie',
		// 			tags: ['wormie'],
		// 			categoryId: '19'
		// 		}
		// 	};

		// 	// let stringBody = `{"id":"${id}",${JSON.stringify(body).slice(1)}`;

		// 	console.log('jsonStringify', JSON.stringify(body));

		// 	return fetch(updateUrl, {
		//     method: 'PUT',
		//     headers: {
		//     	'Content-Type': 'application/json; charset=utf-8'
		//     },
		//     body: JSON.stringify(body)
		//   });
		// })
		// .then((res) => {
		// 	console.log('55555555555555555555555555555');
		// 	console.log('this is what i heard back from the update', res);
		// 	return res.json()
		// })
		// .catch((err) => console.log(err))
		// ;
	},

	refreshToken(){
		let url = 'https://accounts.google.com/o/oauth2/token';
		console.log('about to fetch the new youtube token');
		return fetch(url, {
	    method: 'post',
	    body: 'refresh_token=1/SMgRcz3LhD075FCWHzTstlALQIaqW4O0OLlpXM8sI7A&client_id=934911620716-r9sjo3531jmot6k3vbsjgkjietjhcbna.apps.googleusercontent.com&client_secret=0jT8y-JIHsgLQMeyXloux8zC&grant_type=refresh_token'
	  })
	  .then((res) => {
	  	console.log('got my refresh token!', res);
	  	return res.json()
	  })
	  .catch((err) => console.log(err))
	  ;
		// return 'ya29.RgLqN8ZBApJ5YvLTEs8koCyGcls4A1U8R6-YWS1s6DKfZtc1xV9t7Crskqf8ZZ5rJLPILg';
	}

};

module.exports = youtube;


				// status: {
				// 	privacyStatus: 'public'
				// },
				// recordingDetails: {
				// 	location: {
				// 		latitude: '37.7861400',
				// 		longitude: '-122.4057540'
				// 	},
				// 	recordingDate: '2015-12-14T05:52:25.345967Z',
				// 	locationDescription: 'hack reactor'
				// }
