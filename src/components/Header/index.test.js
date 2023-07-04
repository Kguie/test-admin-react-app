/**
 * Test du component Header
 **/
import { screen } from '@testing-library/react'

import Header from './'
import { render } from '../../utils/test'

describe('Header', () => {

    it('Should render with the expected text', () => {
        render(<Header />)

        const expectedText = screen.getByText(/GC/i)
        expect(expectedText).toBeInTheDocument()

    })
})
