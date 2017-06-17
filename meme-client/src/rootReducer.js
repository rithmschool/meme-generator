import { SET_CURRENT_USER, SET_MEME_PHOTOS, ADD_MEME, UPDATE_MEME, DELETE_MEME } from './actions';

const DEFAULT_STATE = {
  isAuthenticated: false,
  user: {},
  memePhotos: [],
  memes: [],
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

    case ADD_MEME:
      action.meme.id = ++state.memeId
      return {...state, memes: [...state.memes, action.meme]}

    case UPDATE_MEME:
      // ADD HERE
      return {...state, memes: [...state.memes, action.meme]}

    case DELETE_MEME:
      // ADD HERE
      return {...state, memes: [...state.memes, action.meme]}

    default: return state;
  }
}
