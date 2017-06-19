import { SET_CURRENT_USER } from './actions';
import { SET_CURRENT_PIC } from './actions';
import { SAVE_CURRENT_PICS } from './actions';

const DEFAULT_STATE = {
  isAuthenticated: false,
  user: {}
};

export default function (state = DEFAULT_STATE, action){
  switch(action.type) {
    case SET_CURRENT_USER:
      return {...state,
        isAuthenticated: !!(Object.keys(action.user).length),
        user: action.user
      };
    case SET_CURRENT_PIC:
      return {...state,
        tempPic: action.tempPic
      };
    case SAVE_CURRENT_PICS:
      return {...state,
        pics: action.pics
      };
    default: return state;
  }
}