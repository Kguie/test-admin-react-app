/**
 * Test du component CustomerChoiceStep
 **/

import { screen, fireEvent } from '@testing-library/react'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import CustomerChoiceStep from '.'
import { render } from '../../utils/test'

//Valeur de isLoading
let mockLoad = true

const mockedData = [
    {
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
    },
    {
        userId: 'myId4321',
        category: "superAdmin",
        name: {
            firstName: 'Jane',
            lastName: 'Doe',
        },
        email: "myemail@hotmail.com",
        lastConnect: Date.now(),
        verified: true,
        data: {
            joinDate: Date.now(),
        }
    }
]

jest.mock("../../utils/hooks", () => ({
    UseGetLogInData: () => ({ isLoading: mockLoad, data: mockedData })
}))

describe('CustomerChoiceStep', () => {

    let mock = new MockAdapter(axios);

    mock.onGet(`${process.env.REACT_APP_API_ORDERS_URL}`).reply(200, mockedData);

    beforeAll(() => {
        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        mock.reset();
    });

    it('Should render with the expected text and button', () => {
        mockLoad = true
        render(<CustomerChoiceStep />)

        expect(screen.getByText(/Sélection du client/i)).toBeTruthy()
        expect(screen.getAllByRole("button").length).toEqual(1)

        //Action
        fireEvent.click(screen.getAllByRole("button")[0])

        //Apparition de la partie pour ajouter un client
        expect(screen.getAllByRole("button").length).toEqual(4)
        expect(screen.getByTestId('firstName')).toBeInTheDocument()
        expect(screen.getByTestId('lastName')).toBeInTheDocument()

        //Vérification des inputs
        const inputs = screen.getAllByRole("textbox")
        const lastName = inputs[1]
        const phone = inputs[2]

        const phoneError = screen.queryByText(/Le numéro de téléphone doit contenir entre 10 et 16 caractères/i)
        const lastNameError = screen.queryByText(/Seules les lettres sont autorisées ainsi que/i)

        expect(lastNameError).toBeNull()
        expect(phoneError).toBeNull()

        fireEvent.change((phone), { target: { value: '0123' } })
        fireEvent.change((lastName), { target: { value: '1234' } })

        //Erreur
        expect(screen.getByText(/Le numéro de téléphone doit contenir entre 10 et 16 caractères/i)).toBeInTheDocument()
        expect(screen.getByText(/Seules les lettres sont autorisées ainsi que/i)).toBeInTheDocument()
    })



    it('Should render with the expected customers names and the new button', () => {
        mockLoad = false
        render(<CustomerChoiceStep />)

        expect(screen.getByText(/Sélection du client/i)).toBeTruthy()
        expect(screen.getAllByRole("button").length).toEqual(2)

        //Action
        fireEvent.click(screen.getAllByRole("button")[0])

        //Affichage des clients mockés
        expect(screen.getByText(/Smith John/i)).toBeTruthy()
        expect(screen.getByText(/Doe Jane/i)).toBeTruthy()
    })

})