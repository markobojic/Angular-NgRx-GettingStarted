import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUser from './user.reducer';

// Selector functions
const getUserFeatureState = createFeatureSelector<fromUser.UserState>('users');

export const getMaskUserName = createSelector(
  getUserFeatureState,
  state => state.maskUserName
);

export const getCurentUser = createSelector(
  getUserFeatureState,
  state => state.curentUser
);
