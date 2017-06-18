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
  memes: [], // objects with url and name
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

    // case SET_MEMES:
    //   return {...state, memes: action.memes}

    case ADD_MEME:
      action.meme.id = ++state.memeId
      // console.log("add_meme_state", {...state, memes: [...state.memes, action.meme]})
      // debugger - this looks okay
      return {...state, memes: [...state.memes, action.meme]}

    case UPDATE_MEME:
      let updatedMeme = state.memes.map(meme => {
        if (meme.id === action.meme.id) {
          meme = action.meme
        }
        return meme;
      })
      return {...state, memes: [...state.memes, action.meme]}

    case DELETE_MEME:
      let removedMeme = state.memes.filter(meme => meme.id !== action.id);
      return {...state, memes: [...state.memes, action.meme]}

    case SHOW_NEW_MEME_FORM:
      return {...state, selectedPhoto: action.photo}

    default: return state;
  }
}
