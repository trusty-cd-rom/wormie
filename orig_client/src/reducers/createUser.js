import { ADD_USER_INFO } from '../constants/actions';;
import data from '../testData/data';

var initialState = {
  "id": 2,
  "user": {
    "username": "",
    "first_name": "charlie",
    "last_name": "harrington",
    "email": "chdude@gmail.com",
    "wormholes": [
      {
        "id": 3,
        "title": "McDonalds line right now",
        "latitude": "50.0000000",
        "longitude": "60.0000000",
        "deadline": "2015-12-07T19:03:50.702834Z",
        "notes": "now!",
        "status": "open",
        "owner": 1,
        "owner_name": "wormieadmin",
        "submissions": []
      },
      {
        "id": 4,
        "title": "hiking trail",
        "latitude": "50.0000000",
        "longitude": "60.0000000",
        "deadline": "2015-12-07T20:04:58.456637Z",
        "notes": "hahahahaha",
        "status": "forever and ever",
        "owner": 1,
        "owner_name": "wormieadmin",
        "submissions": []
      },
      {
        "id": 6,
        "title": "golden gate",
        "latitude": "20.0000000",
        "longitude": "20.0000000",
        "deadline": "2015-12-07T20:04:58.456637Z",
        "notes": "can you walk backwards?",
        "status": "OPEN!!!",
        "owner": 1,
        "owner_name": "wormieadmin",
        "submissions": []
      }
    ],
    "submissions": [{
        "id": 3,
        "title": "McDonalds line right now",
        "latitude": "50.0000000",
        "longitude": "60.0000000",
        "deadline": "2015-12-07T19:03:50.702834Z",
        "notes": "now!",
        "status": "open",
        "owner": 1,
        "owner_name": "wormieadmin",
        "submissions": []
      },
      {
        "id": 4,
        "title": "hiking trail",
        "latitude": "50.0000000",
        "longitude": "60.0000000",
        "deadline": "2015-12-07T20:04:58.456637Z",
        "notes": "hahahahaha",
        "status": "forever and ever",
        "owner": 1,
        "owner_name": "wormieadmin",
        "submissions": []
      },
      {
        "id": 6,
        "title": "golden gate",
        "latitude": "20.0000000",
        "longitude": "20.0000000",
        "deadline": "2015-12-07T20:04:58.456637Z",
        "notes": "can you walk backwards?",
        "status": "OPEN!!!",
        "owner": 1,
        "owner_name": "wormieadmin",
        "submissions": []
      }]
  },
  "created_at": "",
  "updated_at": "",
  "picture_url": "http://innovateelt.com/wp/wp-content/uploads/2015/09/charlie-harrington-headshot-330x330.jpg",
  "location": "",
  "about_me": "",
  "wormie_color": ""
}

function creareUserProfile(state = initialState, action) {
  switch(action.type) {
    case ADD_USER_INFO:
      return {
        ...state,
        about_me: action["about_me"],
        user: updateName(state.user, action)
      }
    default:
      return state;
  }
}

function updateName(state = initialState2, action) {
  switch(action.type) {
    case ADD_USER_INFO:
      return {
        ...state,
        username: action.username
      }
    default:
      return state;
  }
}

export default createUserProfile;
