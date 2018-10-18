import { User } from './../user';
import { UserActions, UserActionTypes } from './user.actions';

// State for this feature (User)
export interface UserState {
  maskUserName: boolean;
  curentUser: User;
}

const initialState: UserState = {
  maskUserName: false,
  curentUser: null
};

export function reducer(state = initialState, action: UserActions) {
  switch (action.type) {
    case UserActionTypes.MaskUserName:
      return {
        ...state,
        maskUserName: action.payload
      }
    default:
      return state;
  }
}
