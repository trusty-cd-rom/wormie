const host = 'http://wormie-4-dev.elasticbeanstalk.com/api';
const authHost = 'http://wormie-4-dev.elasticbeanstalk.com/auth';
const wormieHost = 'http://52.53.249.61';

// const host = 'http://localhost:8000/api';
// const authHost = 'http://localhost:8000/auth';

// http://localhost:8000/api/sort_by/?sort_by=nearby&logitude=23.12312&latitude=29.32304
const urls = {
  wormholes: `${host}/wormholes/`,
  submissions: `${host}/submissions/`,
  users: `${host}/users/`,
  
  // Main
  // usersByFacebookID: `${host}/users/fb`,

  // Local
  usersByFacebookID: `${host}/users/fb/`,
  
  accounts: `${host}/accounts/`,
  convertToken: `${authHost}/convert\-token/`,
  discover: `${host}/discover/`,
  sortBy: `${host}/sort_by/`,
  createWormie: `${wormieHost}/wormie/`,
  createHeart: `${wormieHost}/heart/`,
  getWormie: `${wormieHost}/static/`,
  getHeart: `${wormieHost}/static/heart/`,
  getLeftHeart: `${wormieHost}/static/left/`,
  getRightHeart: `${wormieHost}/static/right/`,
}

export default urls;
