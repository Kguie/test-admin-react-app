/**
 * Test du component Error
 **/

import Error from '.'
import { screen, } from '@testing-library/react'
import { render } from '../../utils/test'

describe('Error', () => {
    it('Should render with the expected text and picture', async () => {
        render(<Error />)
        const expectedText = screen.getByText(/la page que vous recherchez/i)
        const expectedPicture = screen.getByAltText(/erreur/i)
        const homeButton = screen.getByText(/Revenir à la page/i)

        expect(expectedText).toBeInTheDocument()
        expect(expectedPicture).toBeInTheDocument()
        expect(homeButton).toBeInTheDocument()
    })

})
