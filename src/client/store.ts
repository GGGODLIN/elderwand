import { RootReducer } from './reducer';
import createSagaMiddleware from 'redux-saga';

import {
    configureStore,
    createSerializableStateInvariantMiddleware,
    isPlain,
} from '@reduxjs/toolkit';

const isIterator = (maybeIterator: any): boolean =>
    maybeIterator && typeof maybeIterator.next === 'function';

const isSerializable = (value: any) => isIterator(value) || isPlain(value);

const getEntries = (value: any) =>
    isIterator(value) ? value.entries() : Object.entries(value);

const serializableMiddleware = createSerializableStateInvariantMiddleware({
    isSerializable,
    getEntries,
});

const sagaMiddleware = createSagaMiddleware();

const RootStore = configureStore({
    reducer: RootReducer,
    middleware: [serializableMiddleware, sagaMiddleware],
});

// TODO
// sagaMiddleware.run(RootSaga);

export default RootStore;
