var yelp = 'https://api.yelp.com/v2/search/';
var api = {
  query(category, term, location) {
    var query = yelp;
    // if (category === 'all') {
    //   query += '';
    // } else {
    //   query += '?category_filter=' + category;
    // }

    // if (term !== undefined) {
    //   if (query.length) {
    //     query += '&';
    //   } else {
    //     query += '?';
    //   }
    //   query += 'term=' + term;
    // }

    // if (location !== undefined) {
    //   if (query.length) {
    //     query += '&';
    //   } else {
    //     query += '?';
    //   }
    //   query += 'location=' + location;
    // }

    console.log(category, term, location);

    return fetch(query, {
      method: 'GET',
      headers: {
        oauth_consumer_key: '0l_3FmIyG-HLdYwKxmOibg',
        oauth_consumer_secret: 'U0TxM7KazL21nLpLsB9uRL3aJdU',
        oauth_token: 'reqzpzKogA1vBhN4NVAAG9h25F_dZ_e5',
        oauth_token_secret: 'wC6KhijEaQ6IQ6iuVa3RYozOWmg',
        oauth_timestamp: Date.now(),
        oauth_nonce: 'A unique string randomly generated per request.',
        category_filter: category,
        term: term,
        location: location
      },
    })
    .then((res) => {
      console.log('got this back from server on yelp request call', res);
      return res.json();
    })
    ;
  }
}

export default api;
