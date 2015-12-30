const host = 'http://wormie-4-dev.elasticbeanstalk.com/api';
const authHost = 'http://wormie-4-dev.elasticbeanstalk.com/auth';
const wormieHost = 'http://52.53.249.61';

const urls = {
	wormholes: `${host}/wormholes/`,
	submissions: `${host}/submissions/`,
	users: `${host}/users/`,
  usersByFacebookID: `${host}/users/fb/`,
	accounts: `${host}/accounts/`,
  convertToken: `${authHost}/convert\-token/`,
  discover: `${host}/discover/`,
  filter: `${host}/filter/`,
  sortBy: `${host}/sort_by/`,
  createWormie: `${wormieHost}/wormie/`,
  createHeart: `${wormieHost}/heart/`,
  getWormie: `${wormieHost}/static/`,
  getHeart: `${wormieHost}/static/heart/`,
  getLeftHeart: `${wormieHost}/static/left/`,
  getRightHeart: `${wormieHost}/static/right/`,
}

export default urls;
