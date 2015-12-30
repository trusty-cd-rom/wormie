const host = 'http://wormie-4-dev.elasticbeanstalk.com/api';
const authHost = 'http://wormie-4-dev.elasticbeanstalk.com/auth';
// const host = 'http://127.0.0.1:8000/api';
// const authHost = 'http://127.0.0.1:8000/auth';


// const host = 'http://localhost:8000/api';
// const authHost = 'http://localhost:8000/auth';

const urls = {
	wormholes: `${host}/wormholes/`,
	submissions: `${host}/submissions/`,
	users: `${host}/users/`,
  // FIX(python) 
  usersByFacebookID: `${host}/users/fb/`,
  // usersByFacebookID: `${host}/users/fb`,
	accounts: `${host}/accounts/`,
  convertToken: `${authHost}/convert\-token/`,
  discover: `${host}/discover/`,
  filter: `${host}/filter/`,
  sortBy: `${host}/sort_by/`,
}

export default urls;
