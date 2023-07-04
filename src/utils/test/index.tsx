/**
 * Gestion des fonctions pour faciliter les tests
 **/

import { render as rtlRender } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from "react-redux";

import { store } from "../store";

type props = {
    children: any
}

/**
 *Wrapper permettant d’utiliser le render qui le suit avec tous les éléments nécessaires au fonctionnement des pages et components   
 */
function Wrapper({ children }: props) {
    return (
        <Provider store={store}>
            <MemoryRouter>
                {children}
            </MemoryRouter>
        </Provider>
    )
}

export function render(ui: any, options: any) {
    rtlRender(ui, { wrapper: Wrapper, ...options })
}

