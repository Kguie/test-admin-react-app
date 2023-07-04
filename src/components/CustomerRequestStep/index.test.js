/**
 * Test du component CustomerRequestStep
 **/

import { screen } from '@testing-library/react'

import CustomerRequestStep from '.'
import { render } from '../../utils/test'

let requestList = []

describe('CustomerRequestStep', () => {
    it('Should render with the expected texts and buttons', () => {
        render(<CustomerRequestStep requestList={requestList} />)

        const buttons = screen.getAllByRole("button")
        const inputs = screen.getAllByRole("textbox")

        expect(buttons.length).toEqual(1)
        expect(inputs.length).toEqual(2)

        //The requestList is empty
        expect(screen.getByText(/Veuillez ajouter au moins un article dans le panier/i)).toBeTruthy()
    })

    it('Should render with the expected texts and buttons when you add requests', () => {
        requestList = [
            {
                pastryDescription: 'tarte citron',
                size: 22,
                quantity: 1,
                services: null,
            },
            {
                pastryDescription: "macaron mangue",
                size: 1,
                quantity: 100,
                services: "coloris orange"
            }
        ]
        render(<CustomerRequestStep requestList={requestList} />)

        expect(screen.queryByText(/Veuillez ajouter au moins un article dans le panier/i)).not.toBeTruthy()

        expect(screen.getByText(/tarte citron/i)).toBeInTheDocument()
        expect(screen.getByText(/macaron mangue/i)).toBeInTheDocument()
        expect(screen.getByText(/coloris orange/i)).toBeInTheDocument()
    })
    //Pour l'instant impossible de voir la fenêtre de dialogue qui s'ouvre pour ajouter une requête
})