/**
 * Gestion du store pour redux toolkit
 * */

import { configureStore } from "@reduxjs/toolkit";

import storage from 'redux-persist/lib/storage';
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';

import LeftMenuStateReducer from "../features/leftMenuState";
import UserInfoReducer from "../features/userInfo";
import forcedLogOutReducer from "../features/forcedLogOut";
import alertSnackbarReducer from "../features/alertSnackbar";

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

const persistConfig = {
    timeout: 200, //règle la fonction de timeout à 200ms
    key: 'userInfo',
    storage,
}

const PersistedUserInfoReducer = persistReducer(persistConfig, UserInfoReducer)

export const store = configureStore({
    reducer: {
        userInfo: PersistedUserInfoReducer,
        leftMenu: LeftMenuStateReducer,
        forcedLogOut: forcedLogOutReducer,
        alertSnackbar: alertSnackbarReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),

})

