/**
 * Test du component Footer
 **/
import { screen } from '@testing-library/react'

import Footer from './'
import { render } from '../../utils/test'

describe('Footer', () => {

    it('Should render with the expected text', () => {
        render(<Footer />)

        const expectedText = screen.getByText(/Copyright/i)
        expect(expectedText).toBeInTheDocument()

    })
})
