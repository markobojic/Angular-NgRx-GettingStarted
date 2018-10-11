import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from './../user';

// State for this feature (User)
export interface UserState {
  maskUserName: boolean;
  curentUser: User;
}

const initialState: UserState = {
  maskUserName: false,
  curentUser: null
};

// Selector functions
const getUserFeatureState = createFeatureSelector<UserState>('users');

export const getMaskUserName = createSelector(
  getUserFeatureState,
  state => state.maskUserName
);

export const getCurentUser = createSelector(
  getUserFeatureState,
  state => state.curentUser
);

export function reducer(state = initialState, action) {
  switch (action.type) {
    case 'MASK_USER_NAME':
      return {
        ...state,
        maskUserName: action.payload
      }
    default:
      return state;
  }
}
