import authRequest from './authRequest.js';
export const BASE_URL = "https://auth.nomoreparties.co";

export const register = (email, password) => {
  return authRequest(
    `${BASE_URL}/signup`,
    {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
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
      body: JSON.stringify({
        'email': email,
        'password': password
      })
    }
  )
    .catch(res => Promise.reject(res))
}

export const checkToken = (token) => {
  return authRequest(
    `${BASE_URL}/users/me`,
    {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    }
  )
    .catch(res => Promise.reject(res))
}
