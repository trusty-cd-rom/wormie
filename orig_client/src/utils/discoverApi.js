var yelp = 'https://api.yelp.com/v2/search/';
var api = {
  query(category, term, location) {
    var query = yelp;
    if (category === 'all') {
      query += '';
    } else {
      query += '?category_filter=' + category;
    }

    if (term !== undefined) {
      if (query.length) {
        query += '&';
      } else {
        query += '?';
      }
      query += 'term=' + term;
    }

    if (location !== undefined) {
      if (query.length) {
        query += '&';
      } else {
        query += '?';
      }
      query += 'location=' + location;
    }

    return fetch(query, {
      method: 'GET',
      headers: {
        'oauth_consumer_key': '0l_3FmIyG-HLdYwKxmOibg',
        'oauth_token': 'reqzpzKogA1vBhN4NVAAG9h25F_dZ_e5',
        'oauth_signature': 'wC6KhijEaQ6IQ6iuVa3RYozOWmg',
        'oauth_signature_method': 'hmac-sha1',
        'oauth_timestamp': 'Timestamp for the request in seconds since the Unix epoch.',
        'oauth_nonce': 'A unique string randomly generated per request.',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(wormholeData)
      // body: JSON.stringify({ "title": "fat ugly face party party at ikea", "latitude":50, "longitude": 35, "deadline":"2015-12-09T23:37:58.271497Z", "notes":"make it phat", "status": "zip line", "requestor": 2})
    })
    .then((res, a) => {
      // console.log('got this back from server on wormhole create post', res, a);
      return res.json();
    })
    ;

    fetch(query)
  }
}

export default api;
