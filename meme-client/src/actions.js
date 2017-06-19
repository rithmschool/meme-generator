import axios from 'axios';
import jwtDecode from 'jwt-decode';

export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const SET_IMAGE = 'SET_IMAGE';

const BASE_URL = 'http://localhost:5000'

export function setAuthorizationToken(token) {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
}

export function signup(userData) {
  return dispatch => {
    return axios.post(`${BASE_URL}/api/auth/signup`, userData);
  }
}

export function logout() {
  return dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  }
}

export function login(data) {
  return dispatch => {
    return axios.post(`${BASE_URL}/api/auth/login`, data).then(res => {
      const token = res.data.token;
      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      dispatch(setCurrentUser(jwtDecode(token)));
    });
  }
}

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

export function getRecentMemes() {
  return () => {
    return axios.get(`${BASE_URL}/memes`);
  }
}

export function memeCreationImages() {
  return () => {
    return axios.get(`${BASE_URL}/memes/options`);
  }
}

export function imageClick(imgLink, template_id){
  return {
    type: SET_IMAGE,
    imgLink,
    template_id
  }
}

export function postMeme(memeData) {
  return () => {
    let config = {
      headers: {'Authorization': "Bearer " + localStorage.getItem('jwtToken')}
    };
    return axios.post(`${BASE_URL}/api/users/${memeData.user_id}/memes`, memeData, config)
  }
}

// export function showUserMemes(user) {
//    return () => {
//     let config = {
//       headers: {'Authorization': "Bearer " + localStorage.getItem('jwtToken')}
//     };
//     return axios.get(`${BASE_URL}/api/users/${user}/memes`, user, config)
//   }
// }