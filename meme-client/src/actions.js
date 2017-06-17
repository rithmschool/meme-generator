import axios from 'axios';
import jwtDecode from 'jwt-decode';

export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const SET_MEME_PHOTOS = 'SET_MEME_PHOTOS';
export const ADD_MEME = 'ADD_MEME';
export const UPDATE_MEME = 'UPDATE_MEME';
export const DELETE_MEME = 'DELETE_MEME';

const BASE_URL = 'http://localhost:3000';

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
  console.log("logindata",data);
  return dispatch => {
    return axios.post(`${BASE_URL}/api/auth/login`, data).then(res => {
      console.log("res",res);
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

export function getMemePhotos() {
  return dispatch => {
    return axios.get(`http://localhost:3000/memes/options`).then(res => {
      console.log("meme photos",res.data.data.memes);
      dispatch(setMemePhotos(res.data.data.memes));
    }).catch(err => {
      debugger
    })
  }
}

export function setMemePhotos(memePhotos) {
  return {
    type: SET_MEME_PHOTOS,
    memePhotos
  }
}

export function addMeme(meme) {
  return {
    type: ADD_MEME,
    meme
  }
}

export function updateMeme(meme) {
  return {
    type: UPDATE_MEME,
    meme
  }
}

export function deleteMeme(meme) {
  return {
    type: DELETE_MEME,
    meme
  }
}
