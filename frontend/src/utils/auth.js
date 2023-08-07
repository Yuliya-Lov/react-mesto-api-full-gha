import authRequest from './authRequest.js';
export const BASE_URL = "http://localhost:4000";

export const register = (email, password) => {
  return authRequest(
    `${BASE_URL}/signup`,
    {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      credentials: 'include',
      body: JSON.stringify({
        'email': email,
        'password': password
      })
    }
  )
    .catch(res => Promise.reject(res))
}

export const login = (email, password) => {
  return authRequest(
    `${BASE_URL}/signin`,
    {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      credentials: 'include',
      body: JSON.stringify({
        'email': email,
        'password': password
      })
    }
  )
    .catch(res => Promise.reject(res))
}
export const logout = () => {
  return authRequest(
    `${BASE_URL}/signout`,
    {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      credentials: 'include',
    }
  )
    .catch(res => Promise.reject(res))
}

export const checkToken = () => {
  return authRequest(
    `${BASE_URL}/users/me`,
    {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      },
      credentials: 'include',
    }
  )
    .catch(res => Promise.reject(res))
}
