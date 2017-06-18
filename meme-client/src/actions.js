import axios from 'axios';
import jwtDecode from 'jwt-decode';

export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const SET_MEME_PHOTOS = 'SET_MEME_PHOTOS';
export const ADD_MEME = 'ADD_MEME';
export const SET_MEME = 'SET_MEME';
export const UPDATE_MEME = 'UPDATE_MEME';
export const DELETE_MEME = 'DELETE_MEME';
export const SHOW_NEW_MEME_FORM = 'SHOW_NEW_MEME_FORM';
// export const SET_MEMES = 'SET_MEMES';

export const BASE_URL = 'http://localhost:3000';

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
    return axios.get(`${BASE_URL}/memes/options`).then(res => {
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

export function showNewMemeForm(photo) {
  console.log(photo);
  return {
    type: SHOW_NEW_MEME_FORM,
    photo
  }
}

export function addMeme(user, id, topText, bottomText, name) {
  return dispatch => {
    return axios.post(`${BASE_URL}/api/users/${user.user_id}/memes`, {
      template_id: id,
      top: topText,
      bottom: bottomText
    }).then(res => {
      dispatch(setMeme(res.data.url, name));
    }).catch(err => {
      debugger
    })
  }
}

export function setMeme(url, name) {
  return {
    type: ADD_MEME,
    meme: {
      url: url,
      name: name
    }
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
