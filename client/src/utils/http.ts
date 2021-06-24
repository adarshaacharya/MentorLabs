import Axios from 'axios';
import config from 'config';

const http = Axios.create({
  baseURL: config.baseURI,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default http;
