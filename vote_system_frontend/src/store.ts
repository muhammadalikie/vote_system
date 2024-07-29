import {configureStore} from '@reduxjs/toolkit';
import {authReducer, voteReducer, studentReducer, representativeReducer} from "../src/features"

const store = configureStore({
  reducer: {
    auth: authReducer,
    vote: voteReducer,
    student: studentReducer,
    representative: representativeReducer
  },
});

export type RootState = ReturnType<typeof store.getState>

export default store;