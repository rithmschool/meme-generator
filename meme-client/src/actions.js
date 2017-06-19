import axios from 'axios';
import jwtDecode from 'jwt-decode';

export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const SET_MEME_PHOTOS = 'SET_MEME_PHOTOS';
export const ADD_MEME = 'ADD_MEME';
export const SET_MEME = 'SET_MEME';
export const UPDATE_MEME = 'UPDATE_MEME';
export const DELETE_MEME = 'DELETE_MEME';
export const SHOW_NEW_MEME_FORM = 'SHOW_NEW_MEME_FORM';
export const SET_MEMES = 'SET_MEMES';

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

function shuffle(array) {
  for (let i = array.length; i; i--) {
      let j = Math.floor(Math.random() * i);
      [array[i - 1], array[j]] = [array[j], array[i - 1]];
  }
}

export function getMemes() {
  // console.log("props memes",this.props.memes, this.props.user); // empty array
  return dispatch => {
    return axios.get(`${BASE_URL}/memes`).then(res => {
      // console.log("memes",res.data);
      let array = res.data;
      shuffle(array);
      let memes = array.filter((val, i) => i <= 30);
      // getUsernames(memes);
      dispatch(setMemes(memes));
    }).catch(err => {
      debugger
    })
  }
}

export function setMemes(memes) {
  return {
    type: SET_MEMES,
    memes
  }
}

export function getUsernames(memes) {
  axios.all(memes.map((meme,i) => {
    return axios.get(`${BASE_URL}/api/users/${meme.user_id}`)
  })).then(res => {
    let usernames = [];
    res.forEach((val, i) => {
      usernames.push(val.data.username);
    })
    this.setState ( {usernames} )
  })
    .catch(err => {
    debugger
  })
}

// export function getMemePhotos() {
//   return dispatch => {
//     return axios.get(`${BASE_URL}/memes/options`).then(res => {
//       console.log("meme photos",res.data.data.memes);
//       dispatch(setMemePhotos(res.data.data.memes));
//     }).catch(err => {
//       debugger
//     })
//   }
// }

// export function setMemePhotos(memePhotos) {
//   return {
//     type: SET_MEME_PHOTOS,
//     memePhotos
//   }
// }

export function deleteAJAXCall(user_id, meme_id) {
  console.log("here", user_id, meme_id)
  // console.log(`${BASE_URL}/api/users/${user.user_id}/memes/${meme_id}`); 

  return dispatch => {
    console.log(`${BASE_URL}/api/users/${user_id}/memes/${meme_id}`)
    let url = `${BASE_URL}/api/users/${user_id}/memes/${meme_id}`;
    // delete is not working
    return axios.delete(url, {
      params: { meme_id: meme_id }
    })
    .then(res => {
      console.log("DELETE",res);
      dispatch(deleteMeme(res.data.id)); // CHECK WHAT RES LOOKS LIKE
    }).catch(err => {
      console.log("ERROR",err);
      debugger
    })
  }
}


export function deleteMeme(id) {
  return {
    type: DELETE_MEME,
    id
  }
}

