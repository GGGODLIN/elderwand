import { combineReducers } from '@reduxjs/toolkit';
import { FetchSlice } from './slices/FetchSlice';
import { InitSlice } from './slices/InitSlice';
import { LayoutSlice } from './slices/LayoutSlice';
import { UserSlice } from './slices/UserSlice';

export const RootReducer = combineReducers({
    init: InitSlice.reducer,
    fetch: FetchSlice.reducer,
    layout: LayoutSlice.reducer,
    user: UserSlice.reducer,
});

export type RootState = ReturnType<typeof RootReducer>;
