import { SET_CURRENT_USER, SET_IMAGE } from './actions';

const DEFAULT_STATE = {
  isAuthenticated: false,
  user: {},
};

export default function (state = DEFAULT_STATE, action){
  switch(action.type) {
    case SET_CURRENT_USER:
      return {
        isAuthenticated: !!(Object.keys(action.user).length),
        user: action.user
      };
    case SET_IMAGE:
      return {
        ...state,
        url: action.imgLink,
        template_id: action.template_id
      };
    default: return state;
  }
}