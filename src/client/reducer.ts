import { combineReducers } from '@reduxjs/toolkit';
import AllocateUserSlice from './slices/AllocateUserSlice';
import AuthSlice from './slices/AuthSlice';
import AvailableUserSlice from './slices/AvailableUserSlice';
import DataMigrationSlice from './slices/DataMigrationSlice';
import DeviceSlice from './slices/DeviceSlice';
import FetchSlice from './slices/FetchSlice';
import InitSlice from './slices/InitSlice';
import LayoutSlice from './slices/LayoutSlice';
import ProjectSlice from './slices/ProjectSlice';
import SpaceSlice from './slices/SpaceSlice';
import UserSlice from './slices/UserSlice';

// TODO move reducers to default module
export const RootReducer = combineReducers({
    fetch: FetchSlice.reducer,
    // global slices
    init: InitSlice.reducer,
    layout: LayoutSlice.reducer,
    auth: AuthSlice.reducer,
    // user maintain
    user: UserSlice.reducer,
    // project maintain
    project: ProjectSlice.reducer,
    // common action
    available_users: AvailableUserSlice.reducer,
    allocate_users: AllocateUserSlice.reducer,
    // space maintain
    space: SpaceSlice.reducer,
    // device maintain
    device: DeviceSlice.reducer,
    // data migration
    migration: DataMigrationSlice.reducer,
});

export type RootState = ReturnType<typeof RootReducer>;
