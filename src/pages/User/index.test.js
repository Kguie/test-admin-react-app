/**
 * Gestion des tests de la page Users
 **/

import { screen } from '@testing-library/react'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import { render } from '../../utils/test'
import User from '../User'

//Valeur de isLoading
let mockLoad = true

const mockedData = {
    _id: '123456789',
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

describe('User tests', () => {

    let mock = new MockAdapter(axios);
    const data = {
        message: "requête reçue"
    };
    mock.onGet('http://localhost:8000/users/').reply(200, data);

    beforeAll(() => {
        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        mock.reset();
    });

    it('Should render the skeleton without the text and the button', () => {
        mockLoad = true
        render(<User />)

        const skeleton = screen.queryByTestId('skeleton')
        const firstName = screen.queryByText(/John/i)

        expect(skeleton).toBeInTheDocument()
        expect(firstName).not.toBeInTheDocument()
    })

    //Fin du chargement

    it('Should render without the skeletons with the text and the buttons after the loading', () => {
        mockLoad = false
        render(<User />)

        const skeleton = screen.queryByTestId('skeleton')
        const firstName = screen.queryByText(/John/i)
        const lastName = screen.queryByText(/Smith/i)
        const buttons = screen.getAllByRole("button")

        expect(skeleton).not.toBeInTheDocument()
        expect(firstName).toBeInTheDocument()
        expect(lastName).toBeInTheDocument()
        expect(buttons.length).toEqual(4)
    })

});