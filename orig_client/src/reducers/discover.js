import { SET_QUERY_COORDS, SET_RESULT_LIST, SET_CURRENT_CATEGORY, SET_CURRENT_TERM, SET_CURRENT_LOCATION, SET_CURRENT_TARGET } from '../constants/actions';

var initialState = {
  category: '',
  term: '',
  location: '',
  responseList:  [
    {
      "is_claimed": "", 
      "rating": "", 
      "mobile_url": "https://www.google.com",  
      "rating_img_url": "", 
      "review_count": "", 
      "name": "default", 
      "rating_img_url_small": "", 
      "url": "", 
      "categories": [], 
      "phone": "", 
      "snippet_text": "", 
      "image_url": "", 
      "snippet_image_url": "", 
      "display_phone": "", 
      "rating_img_url_large": "", 
      "id": "", 
      "is_closed": "", 
      "location": {
        "cross_streets": "", 
        "city": "", 
        "display_address": ["default"], 
        "geo_accuracy": "", 
        "neighborhoods": [
          "", 
          ""
        ], 
        "postal_code": "", 
        "country_code": "", 
        "address": [
          ""
        ], 
        "coordinate": {
          "latitude": '37.7833', 
          "longitude": '122.4167'
        }, 
        "state_code": ""
      }
    }
  ]
};

function discover(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_CATEGORY:
      console.log('hit reducer');
      return {
        ...state,
        category: action.category
      }
    case SET_CURRENT_TERM:
      console.log('set current term from reducer');
      return {
        ...state,
        term: action.term
      }
    case SET_CURRENT_LOCATION:
      console.log('set current location reducer');
      return {
        ...state,
        location: action.location
      }
    case SET_QUERY_COORDS:
      return {
        ...state,
        coordinates: action.coordinates
      }
    case SET_RESULT_LIST:
      console.log('set result list');
      return {
        ...state,
        responseList: action.responseList
      }
    case SET_CURRENT_TARGET:
      console.log('set target');
      return {
        ...state,
        target: action.target
      }
    default:
      return state;
  }
  return state;
};

export default discover;
