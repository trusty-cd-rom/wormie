const host = 'http://wormie-3-dev.elasticbeanstalk.com/api';
const authHost = 'http://wormie-3-dev.elasticbeanstalk.com/auth';

const urls = {
	wormholes: `${host}/wormholes/`,
	submissions: `${host}/submissions/`,
	users: `${host}/users/`,
	accounts: `${host}/accounts/`,
  convertToken: `${authHost}/convert\-token/`,
}

export default urls;
