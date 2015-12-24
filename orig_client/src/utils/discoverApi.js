var api = {
  queryInfo: function(category, term, location) {
    var url = `http://wormie-4-dev.elasticbeanstalk.com/api/discover/?term=${term}&location=${location}`;
    if (category !== 'all') {
      url += `&category_filter=${category}`;
    }

    return fetch(url).then(function (res) {
      return res.json();
    });
  }
}

export default api;
