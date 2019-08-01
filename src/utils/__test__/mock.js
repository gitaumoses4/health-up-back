import request from 'supertest';
import app from '../../app';


const makeApiCall = async (endpoint, method, data, headers = {}) => {
  let apiRequest = request(app)[method](`/api/v1${endpoint}`);
  Object.keys(headers).forEach((header) => {
    apiRequest = apiRequest.set(header, headers[header]);
  });
  return apiRequest.send(data);
};

export const api = {
  get: (endpoint, headers) => makeApiCall(endpoint, 'get', headers),
  post: (endpoint, data, headers) => makeApiCall(endpoint, 'post', data, headers),
  put: (endpoint, data, headers) => makeApiCall(endpoint, 'put', data, headers),
  delete: (endpoint, data, headers) => makeApiCall(endpoint, 'delete', data, headers)
};


export class Browser {
  constructor(user) {
    this.user = user;
  }

  async signup(user = this.user) {
    const { body } = await api.post('/register', user);
    if (body) {
      this.token = body.token;
    }
  }

  async login(user = this.user) {
    await this.signup(user);
    const { body } = await api.post('/login', user);
    if (body) {
      this.token = body.token;
    }
  }

  getAuthorization() {
    if (this.token) {
      return { authorization: `Bearer ${this.token}` };
    }
    return {};
  }

  logout() {
    this.token = null;
  }

  async post(endpoint, data) {
    return api.post(endpoint, data, this.getAuthorization());
  }

  async get(endpoint) {
    return api.get(endpoint, this.getAuthorization());
  }

  async put(endpoint, data) {
    return api.put(endpoint, data, this.getAuthorization());
  }

  async delete(endpoint, data) {
    return api.delete(endpoint, data, this.getAuthorization());
  }
}
