/**
 * Test du component LeftMenu
 **/

import { fireEvent, screen } from '@testing-library/react'
import LeftMenu from './'
import { render } from '../../utils/test'

describe('LeftMenu', () => {

    it('Should render with the expected text and buttons and icons', () => {
        render(<LeftMenu />)

        const IconButton = screen.getAllByRole("button")
        const expectedText = screen.getAllByText(/tableau/i)

        expect(IconButton.length).toBeGreaterThan(1)
        expect(expectedText).toBeTruthy()
        expect(screen.getAllByTestId(/ChevronLeftIcon/i)).toBeTruthy()
    })

    it('Should render with less button when you click on the menu button', () => {
        render(<LeftMenu />)
        const buttons = screen.getAllByRole("button")
        const menuButton = buttons[0]
        expect(menuButton).toBeInTheDocument()


        fireEvent.click(menuButton)
        //Une fois qu'on clique sur le bouton d'ouverture du menu il devrait y avoir moins de boutons
        expect(screen.getAllByRole("button").length < buttons.length).toBeTruthy()

    })
})
