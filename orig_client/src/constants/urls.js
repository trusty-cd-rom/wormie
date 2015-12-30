const host = 'http://wormie-4-dev.elasticbeanstalk.com/api';
const authHost = 'http://wormie-4-dev.elasticbeanstalk.com/auth';
<<<<<<< 7e185d7efc1e42f5780e613469a900f8d19ebd3a
// const host = 'http://127.0.0.1:8000/api';
// const authHost = 'http://127.0.0.1:8000/auth';


// const host = 'http://localhost:8000/api';
// const authHost = 'http://localhost:8000/auth';
const wormieHost = 'http://localhost:7878';
=======
const wormieHost = 'http://52.53.249.61';
>>>>>>> (feat) change gm-server to AWS docker container ip address

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
  createWormie: `${wormieHost}/wormie/`,
  createHeart: `${wormieHost}/heart/`,
  getWormie: `${wormieHost}/static/`,
  getHeart: `${wormieHost}/static/heart/`,
  getLeftHeart: `${wormieHost}/static/left/`,
  getRightHeart: `${wormieHost}/static/right/`,
}

export default urls;
