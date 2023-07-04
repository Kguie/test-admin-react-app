/**
 * Gestion des tests de la page UpdatePassword
 **/

import { screen } from '@testing-library/react'

import { render } from '../../utils/test'
import UpdatePassword from '.'



describe('Login tests', () => {


    it('Should render  without crash', () => {
        render(<UpdatePassword />)

        expect(screen.getByText(/Entrez votre nouveau/i)).toBeInTheDocument()
        expect(screen.getByText(/page de connexion/i)).toBeInTheDocument()

        expect(screen.getAllByRole('button').length).toEqual(4)
        expect(screen.getAllByTestId('password-input').length).toEqual(2)
    })
})