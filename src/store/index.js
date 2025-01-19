import {configureStore} from '@reduxjs/toolkit';
import {useDispatch, useSelector} from 'react-redux';
import userSlice from './slice/user.slice';

export const store = configureStore({
  reducer: {
    user: userSlice,
  },
});

export const useAppDispatch = useDispatch.withTypes();
export const useAppSelector = useSelector.withTypes();
