import axios from 'axios';
import jwtDecode from 'jwt-decode';

export const LOGIN = 'LOGIN';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const SET_CURRENT_PIC = 'SET_CURRENT_PIC';
export const SAVE_CURRENT_PICS = 'SAVE_CURRENT_PICS';

const BASE_URL = 'http://localhost:3000'

export function login(state) {
  return () => {
  return axios.post(`${BASE_URL}/api/auth/login`, {
       username: state.username,
       password: state.password
    })
  }
}

export function logout() {
  return dispatch => {
    localStorage.removeItem('token');
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}))
  }
}

export function setAuthorizationToken(token) {
  return dispatch => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      dispatch(setCurrentUser(jwtDecode(token)));
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }
}

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

export function populateMemes() {
  return dispatch => {
    return axios.get(`${BASE_URL}/memes`)
  }
}

export function getPictures() {
  return dispatch => {
    return axios.get(`${BASE_URL}/memes/options`)
  }
}

export function savePictures(pics) {
  return {
    type: SAVE_CURRENT_PICS,
    pics
  }
}

export function saveTemp(tempPic) {
  return {
    type: SET_CURRENT_PIC,
    tempPic
  };
}

export function postMeme(url, list, template) {
  return dispatch => {
    let meme = list.filter(pic => pic.url === url);
    console.log('post request to imgflip');
    let id = localStorage.getItem('id');
    debugger;
    return axios.post(`${BASE_URL}/api/users/${id}/memes`,
      {
        top: template.top,
        bottom: template.bottom,
        template_id: meme[0].id
      })
  }
}

// export function saveNewMeme(meme) {
//   return {
//     type: SAVE_NEW_MEME,
//     meme
//   }
// }