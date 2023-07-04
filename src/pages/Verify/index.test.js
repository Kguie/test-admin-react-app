/**
 * Gestion des tests de la page login
 **/

import { screen } from '@testing-library/react'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import { render } from '../../utils/test'
import Verify from './'

//Valeur de isLoading
let mockLoad = true
//Valeur du status de la réponse du hook
let mockStatus = 200

jest.mock("../../utils/hooks", () => ({
    useGetData: () => ({ isLoading: mockLoad, data: { data: "compte vérifié", status: mockStatus } })
}))

describe('Login tests', () => {

    let mock = new MockAdapter(axios);
    const data = {
        response: {
            message: "requête reçue"
        }
    };
    mock.onGet('http://localhost:8000/users/verify/myd1234/123456').reply(200, data);

    beforeAll(() => {
        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        mock.reset();
    });


    it('Should render the loader without the text and the button', () => {
        render(<Verify />)

        const loader = screen.queryByTestId('loader')
        const homeButton = screen.queryByRole('button')
        const text = screen.queryByText(/Vous pouvez revenir sur la page de connexion en cliquant sur le lien suivant pour pouvoir obtenir un nouveau lien de vérification/i)

        expect(loader).toBeInTheDocument()
        expect(homeButton).not.toBeInTheDocument()
        expect(text).not.toBeInTheDocument()
    })

    it('Should render the success content after the loading', async () => {
        mockLoad = false
        render(<Verify />)

        const homeButton = screen.queryByRole('button')
        const successText = screen.queryByText(/La création de votre compte/i)

        expect(screen.queryByTestId('loader')).not.toBeInTheDocument()
        expect(homeButton).toBeInTheDocument()
        expect(successText).toBeInTheDocument()
    })

    it('Should render the fail content after the loading', async () => {
        mockLoad = false
        mockStatus = 500
        render(<Verify />)

        const homeButton = screen.queryByRole('button')
        const text = screen.queryByText(/Vous pouvez revenir sur la page de connexion en cliquant sur le lien suivant pour pouvoir obtenir un nouveau lien de vérification/i)

        expect(screen.queryByTestId('loader')).not.toBeInTheDocument()
        expect(homeButton).toBeInTheDocument()
        expect(text).toBeInTheDocument()
    })

})