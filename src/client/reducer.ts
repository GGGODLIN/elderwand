import AllocateUserSlice from './slices/AllocateUserSlice';
import AvailableUserSlice from './slices/AvailableUserSlice';
import ProjectSlice from './slices/ProjectSlice';
import { AuthSlice } from './slices/AuthSlice';
import { combineReducers } from '@reduxjs/toolkit';
import { FetchSlice } from './slices/FetchSlice';
import { InitSlice } from './slices/InitSlice';
import { LayoutSlice } from './slices/LayoutSlice';
import { UserSlice } from './slices/UserSlice';

// TODO move reducers to default module
export const RootReducer = combineReducers({
    init: InitSlice.reducer,
    fetch: FetchSlice.reducer,
    layout: LayoutSlice.reducer,
    auth: AuthSlice.reducer,
    user: UserSlice.reducer,
    project: ProjectSlice.reducer,
    available_users: AvailableUserSlice.reducer,
    allocate_users: AllocateUserSlice.reducer,
});

export type RootState = ReturnType<typeof RootReducer>;
