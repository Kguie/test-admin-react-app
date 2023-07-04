/**
 * Gestion du slice du menu
 **/

import { createSlice } from '@reduxjs/toolkit';
import { produce } from 'immer';

type Props = {
    menuState: boolean
};

const initialState: Props = {
    // Status de la barre de menu
    menuState: false,
}

export const leftMenuStateSlice = createSlice({
    // le nom du slice
    name: 'leftMenu',
    // le state initial
    initialState: initialState,
    // reducers permet de définir les actions et le reducer
    reducers: {
        setMenu: (state) => {
            return produce(state, (draft) => {
                draft.menuState = !state.menuState;
            })
        },
    }
})

export const { setMenu } = leftMenuStateSlice.actions;

export default leftMenuStateSlice.reducer;