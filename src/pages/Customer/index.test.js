/**
 * Gestion des tests de la page Customers
 **/

import { screen } from '@testing-library/react'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import { render } from '../../utils/test'
import Customer from '../Customer'

//Valeur de isLoading
let mockLoad = true

const mockedData = {
    _id: '123456789',

    name: {
        firstName: 'John',
        lastName: 'Smith',
    },
    contact: {
        email: "myemail@gmail.com",
        phoneNumber: "0123456789",
        secondPhoneNumber: "123456788",
        address: "01 rue de la paix",
        encounterWay: "friend",
        whatsapp: true,
        instagram: true,
    },
    publications: true,

    data: {
        joining: {
            time: Date.now(),
            author: "212121"
        },
    }
}

jest.mock("../../utils/hooks", () => ({
    UseGetLogInData: () => ({ isLoading: mockLoad, data: mockedData })
}))

describe('Customer tests', () => {

    let mock = new MockAdapter(axios);
    const data = {
        message: "requête reçue"
    };
    mock.onGet('http://localhost:8000/customers/').reply(200, data);

    beforeAll(() => {
        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        mock.reset();
    });

    it('Should render the skeleton without the text and the button', () => {
        mockLoad = true
        render(<Customer />)

        const skeleton = screen.queryByTestId('skeleton')
        const firstName = screen.queryByText(/John/i)

        expect(skeleton).toBeInTheDocument()
        expect(firstName).not.toBeInTheDocument()
    })

    //Fin du chargement

    it('Should render without the skeletons with the text and the buttons after the loading', () => {
        mockLoad = false
        render(<Customer />)

        const skeleton = screen.queryByTestId('skeleton')
        const firstName = screen.queryByText(/John/i)
        const lastName = screen.queryByText(/Smith/i)
        const buttons = screen.getAllByRole("button")

        expect(skeleton).not.toBeInTheDocument()
        expect(firstName).toBeInTheDocument()
        expect(lastName).toBeInTheDocument()
        expect(buttons.length).toEqual(2)
    })

});