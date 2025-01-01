import {createSlice} from '@reduxjs/toolkit';
const initialState: UserSlice = {
  userData: {},
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const {setUserData} = userSlice.actions;
export default userSlice.reducer;
