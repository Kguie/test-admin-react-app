/**
 * Gestion du slice des pour la déconnexion forcée d'un utilisateur
 * */

import { createSlice } from '@reduxjs/toolkit';
import { produce } from 'immer';

type Props = {
    isLogOut: boolean,
    message: string | null,
}

const initialState: Props = {
    //L'utilisateur n'a pas été déconnecté
    isLogOut: false,

    //Pas de message explicatif
    message: null
}

export const forcedLogOutSlice = createSlice({
    // le nom du slice
    name: 'forcedLogOut',
    // le state initial
    initialState: initialState,
    // reducers permet de définir les actions et le reducer
    reducers: {
        disconnect: (state, action) => {
            return produce(state, (draft) => {
                draft.isLogOut = true;
                draft.message = action.payload
            })
        },
        reset: (state) => {
            return produce(state, (draft) => {
                draft.isLogOut = false;
                draft.message = null
            })
        },
    }
})

export const { disconnect, reset } = forcedLogOutSlice.actions;

export default forcedLogOutSlice.reducer;