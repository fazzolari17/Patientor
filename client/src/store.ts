import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import user from './reducers/userReducer';
import patients from './reducers/patientReducer';
import diagnoses from './reducers/diagnosesReducer';

const store = configureStore({
  reducer: {
    user,
    patients,
    diagnoses,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
