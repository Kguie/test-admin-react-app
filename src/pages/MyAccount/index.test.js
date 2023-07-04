/**
 * Gestion des tests de la page MyAccount
 **/

import { screen } from '@testing-library/react'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import { render } from '../../utils/test'
import MyAccount from './'

//Valeur de isLoading
let mockLoad = true

const mockedData = {
    userId: 'myId1234',
    category: "superAdmin",
    name: {
        firstName: 'John',
        lastName: 'Smith',
    },
    email: "myemail@gmail.com",
    lastConnect: Date.now(),
    verified: true,
    data: {
        joinDate: Date.now(),
    }
}


jest.mock("../../utils/hooks", () => ({
    UseGetLogInData: () => ({ isLoading: mockLoad, data: mockedData })
}))

describe('MyAccount tests', () => {

    let mock = new MockAdapter(axios);
    const data = {
        message: "requête reçue"
    };
    mock.onGet('http://localhost:8000/users/verify/myd1234/123456').reply(200, data);

    beforeAll(() => {
        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        mock.reset();
    });

    it('Should render the skeleton without the text and the button', () => {
        mockLoad = true
        render(<MyAccount />)

        const skeleton = screen.queryByTestId('skeleton')
        const button = screen.queryByRole('button')
        const firstName = screen.queryByText(/John/i)

        expect(skeleton).toBeInTheDocument()
        expect(button).not.toBeInTheDocument()
        expect(firstName).not.toBeInTheDocument()
    })

    //Fin du chargement

    it('Should render without the skeletons with the text and the button after the loading', () => {
        mockLoad = false
        render(<MyAccount />)

        const skeleton = screen.queryByTestId('skeleton')
        const buttons = screen.queryAllByRole('button')
        const firstName = screen.queryByText(/John/i)
        const lastName = screen.queryByText(/Smith/i)

        expect(skeleton).not.toBeInTheDocument()
        expect(buttons.length).toEqual(2)
        expect(firstName).toBeInTheDocument()
        expect(lastName).toBeInTheDocument()
    })

});