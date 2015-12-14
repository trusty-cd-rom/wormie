const host = 'http://wormie-4-dev.elasticbeanstalk.com/api';
const authHost = 'http://wormie-4-dev.elasticbeanstalk.com/auth';

const urls = {
	wormholes: `${host}/wormholes/`,
	submissions: `${host}/submissions/`,
	users: `${host}/users/`,
  usersByEmail: `${host}/users/email/`,
	accounts: `${host}/accounts/`,
  convertToken: `${authHost}/convert\-token/`,
}

export default urls;
