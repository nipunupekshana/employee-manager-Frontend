import { configureStore } from '@reduxjs/toolkit'
import {createWrapper} from 'next-redux-wrapper';
import userSlice from './user-slice'


export const makeStore  = () => 
  configureStore({
    reducer: {
      [userSlice.name]: userSlice.reducer
    },
    devTools: true,
  });

export const wrapper = createWrapper(makeStore);