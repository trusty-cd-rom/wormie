var FileUpload = require('NativeModules').FileUpload;

var youtube = {

	postVideo(file){
		var url = 'https://www.googleapis.com/upload/youtube/v3/videos?part=snippet,status&access_token=';
		var body = {
			snippet: {
				title: 'my first wormie!',
				description: 'pleaseeeee wormie',
				tags: ['wormie']
			},
			status: {
				privacyStatus: 'public'
			}
		};
		var filename = file.split('/');
		filename = filename[filename.length-1];
		

    return this.refreshToken()
    .then((res) => {
    	console.log('about to do the post of the video to youtube: ', res);
    	url = url+res.access_token;
    	console.log('here is the url that i am going to use to make the post youtube with the access token', url);
			var obj = {
				uploadUrl: url,
				method: 'POST', // default 'POST',support 'POST' and 'PUT'
				headers: {
					'Accept': 'application/json',
				},
				fields: body,
				files: [
					{
						// name: 'one', // optional, if none then `filename` is used instead
						filename: filename, // require, file name
						filepath: file, // require, file absoluete path
						// filetype: 'audio/x-m4a', // options, if none, will get mimetype from `filepath` extension
					},
				]
	    };
	    return new Promise(function(resolve, reject) {
	    	FileUpload.upload(obj, function(err, result) {
		    	console.log('upload:', err, result);
		    	if(err) {
		    		reject();
		    	} else {
		    		resolve(res);
		    	}
		    })
		  });
    })
	},

	refreshToken(){
		let url = 'https://accounts.google.com/o/oauth2/token';
		console.log('about to fetch the new youtube token');
		return fetch(url, {
	    method: 'post',
	    header: {
	    	'Content-Type': 'application/x-www-form-urlencoded'
	    },
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
