/**
 * Application wide configuration.
 */
const config = {
  baseURI: '/api', // http://localhost:5000/api since we config proxy = 5000
  endpoints: {
    auth: {
      login: '/users/login',
      createAccount: '/users/create-account',
      logout: '/users/logout',
      me: '/users/me',
    },
  },
};

export default config;
