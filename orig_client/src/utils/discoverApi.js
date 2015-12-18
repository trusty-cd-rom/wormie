// // var request = require('request');
// // var oauthSignature = require('oauth-signature');
// // var n = require('./modules/nonce')();
// // var qs = require('querystring');

// var api = {
//   queryInfo: function(category, term, location) {
//     var query = 'http://api.yelp.com/v2/search';
//     // if (category === 'all') {
//     //   query += '';
//     // } else {
//     //   query += '?category_filter=' + category;
//     // }

//     // if (term !== undefined) {
//     //   if (query.length) {
//     //     query += '&';
//     //   } else {
//     //     query += '?';
//     //   }
//     //   query += 'term=' + term;
//     // }

//     // if (location !== undefined) {
//     //   if (query.length) {
//     //     query += '&';
//     //   } else {
//     //     query += '?';
//     //   }
//     //   query += 'location=' + location;
//     // }

//     // console.log(category, term, location);

//     return fetch(query, {
//       method: 'GET',
//       headers: {
//         oauth_consumer_key: '0l_3FmIyG-HLdYwKxmOibg',
//         oauth_consumer_secret: 'U0TxM7KazL21nLpLsB9uRL3aJdU',
//         oauth_token: 'depFrp5R6XneFPOOspXUG7kBn9zmzJIr',
//         oauth_token_secret: 'JgE6BjBzmSxcDzQEd-5CLXNYB04',
//         oauth_timestamp: Date.now(),
//         oauth_nonce: 'yqUguV',
//         category_filter: category,
//         term: term,
//         location: location
//       },
//     })
//     .then((res) => {
//       console.log('got this back from server on yelp request call', res);
//       return res.json();
//     })
//     ;
//   }
// }



// export default api;

//     // var params = {
//     //   term: term,
//     //   location: location,
//     //   category: category,
//     //   limit: "10"
//     // };

//     // // Config for Yelp oAuth Request
//     // // set_parameters: object with params to search
//     // // callback: callback(error, response, body)
//     // var request_yelp = function(set_parameters, callback) {
//     //   var httpMethod = 'GET';
//     //   var url = 'http://api.yelp.com/v2/search';

//     //   var default_parameters = {
//     //     location: 'San+Francisco',
//     //     sort: '0'
//     //   };

//     //   var required_parameters = {
//     //     oauth_consumer_key: '0l_3FmIyG-HLdYwKxmOibg',
//     //     oauth_token: 'reqzpzKogA1vBhN4NVAAG9h25F_dZ_e5',
//     //     oauth_nonce: n(),
//     //     oauth_timestamp: n().toString().substr(0, 10),
//     //     oauth_signature_method: 'HMAC-SHA1',
//     //     oauth_version: '1.0'
//     //   };

//     //   // Parameters combined in order of importance
//     //   var parameters = {
//     //     ...default_parameters,
//     //     ...set_parameters,
//     //     ...required_parameters
//     //   };
//     //   // _.assign(default_parameters, set_parameters, required_parameters);

//     //   var consumerSecret = 'U0TxM7KazL21nLpLsB9uRL3aJdU';
//     //   var tokenSecret = 'wC6KhijEaQ6IQ6iuVa3RYozOWmg';

//     //   /* Then we call Yelp's Oauth 1.0a server, and it returns a signature */
//     //   /* Note: This signature is only good for 300 seconds after the oauth_timestamp */
//     //   var signature = oauthSignature.generate(httpMethod, url, parameters, consumerSecret, tokenSecret, {
//     //     encodeSignature: false
//     //   });

//     //   parameters.oauth_signature = signature;
//     //   var paramURL = qs.stringify(parameters);
//     //   var apiURL = url + '?' + paramURL;

//     //   request(apiURL, function(error, response, body) {
//     //     return callback(error, response, body);
//     //   });
//     // };

//     // request_yelp(params, function(err, response, body) {
//     //   if (err) {
//     //     console.error("Error hitting Yelp's Search API: ", err);
//     //   } else {
//     //     res.send(JSON.parse(body).businesses);
//     //   }
//     // });
