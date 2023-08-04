import checkResponse from './checkResponse.js';

export default function authRequest(url, options) {
  return fetch(url, options).then(checkResponse).catch(res => Promise.reject(res))
}
