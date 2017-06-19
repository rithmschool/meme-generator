import { SET_CURRENT_USER, 
          SET_MEME_PHOTOS, 
          ADD_MEME, 
          UPDATE_MEME, 
          DELETE_MEME,
          SHOW_NEW_MEME_FORM,
          SET_MEMES } from './actions';

const DEFAULT_STATE = {
  isAuthenticated: false,
  user: {},
  memePhotos: [],
  memes: [], // objects with url and name and id
  memeId: 0
};

export default function (state = DEFAULT_STATE, action) {
  switch(action.type) {
    case SET_CURRENT_USER:
      return {...state, 
        isAuthenticated: !!(Object.keys(action.user).length),
        user: action.user
      };
    
    case SET_MEME_PHOTOS:
      return {...state, memePhotos: action.memePhotos}

    case SET_MEMES:
      return {...state, memes: action.memes}

    case SHOW_NEW_MEME_FORM:
      return {...state, selectedPhoto: action.photo}

    case ADD_MEME:
      // console.log("state",state);
      action.meme.id = ++state.memeId
      // console.log("action.meme", {...state, memes: [...state.memes, action.meme]}); // looks right (url, name, id)
      // seems right so why is state empty when we get to delete meme?
      return {...state, memes: [...state.memes, action.meme]}

    case DELETE_MEME:
      let removedMeme = state.memes.filter(meme => meme._id !== action.id);
      // console.log("state.memes",state.memes)
      // state.memes is EMPTY!! So is state.memePhotos. state.memeId is zero.
      // make AJAX call to server to delete this meme

      return {...state, memes: [...state.memes, action.meme]}

    default: return state;
  }
}
