/**
 * Gestion du slice pour la gestion du message d'erreur dans le component CustomizedSnackbar
 * */

import { createSlice } from '@reduxjs/toolkit';
import { produce } from 'immer';

type Props = {
    success: boolean,
    error: boolean,
    message: string | null,
}

const initialState: Props = {
    //Il n'a pas d'alerte
    success: false,
    error: false,
    //Pas de message explicatif
    message: null
}

export const alertSnackbarSlice = createSlice({
    // le nom du slice
    name: 'alertSnackbar',
    // le state initial
    initialState: initialState,
    // reducers permet de définir les actions et le reducer
    reducers: {
        success: (state, action) => {
            return produce(state, (draft) => {
                draft.success = true;
                draft.message = action.payload
            })
        },
        error: (state, action) => {
            return produce(state, (draft) => {
                draft.error = true;
                draft.message = action.payload
            })
        },
        reset: (state) => {
            return produce(state, (draft) => {
                draft.success = false;
                draft.error = false;
                draft.message = null
            })
        },
    }
});

export const { success, error, reset } = alertSnackbarSlice.actions;

export default alertSnackbarSlice.reducer;