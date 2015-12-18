var api = {
  queryInfo: function(category, term, location) {
    var url = `http://localhost:8000/api/discover/?term=${term}&location=${location}`;
    if (category !== 'all') {
      url += `&category_filter=${category}`;
    }

    return fetch(url).then(function (res) {
      return res.json();
    });
    // return fetch(url, {
    //   method: 'GET'
    //   // headers: {
    //   //   'Content-Type': 'application/json',
    //   //   'Accept': 'application/json',
    //   // }
    //   // body: JSON.stringify(query)
    // }).then(function (res) {
    //   return res.json();
    // })
  }
}

export default api;
