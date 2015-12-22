import urls from '../constants/urls';
var api = {
  queryInfo: function(category, term, location) {
    var url = urls.discover + `?term=${term}&location=${location}`;
    if (category !== 'all') {
      url += `&category_filter=${category}`;
    }

    return fetch(url).then(function (res) {
      return res.json();
    });
  }
}

export default api;
