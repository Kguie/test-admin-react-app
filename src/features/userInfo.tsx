/**
 * Gestion du slice des informations de l'utilisateur connecté
 * */

import { createSlice } from '@reduxjs/toolkit';
import { produce } from 'immer';

type Props = {
    userId: String | null;
    token: String | null;
}

const initialState: Props = {
    // Id de l'utilisateur connecté
    userId: null,

    // Token
    token: null,
}

export const userInfoSlice = createSlice({
    // le nom du slice
    name: 'userInfo',
    // le state initial
    initialState: initialState,
    // reducers permet de définir les actions et le reducer
    reducers: {
        logOut: (state) => {
            return produce(state, (draft) => {
                draft.userId = null
                draft.token = null
            })
        },
        logIn: (state, action) => {
            return produce(state, (draft) => {

                draft.userId = action.payload.userId
                draft.token = action.payload.token
            })
        },
    }
})

export const { logOut, logIn } = userInfoSlice.actions;

export default userInfoSlice.reducer;