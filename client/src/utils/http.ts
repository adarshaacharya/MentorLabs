import Axios from 'axios';
import config from 'constants/config';

const http = Axios.create({
  baseURL: config.baseURI,
});
