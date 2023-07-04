/**
 * Gestion des tests de la page NewOrder
 **/

import { screen, fireEvent } from '@testing-library/react'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import { render } from '../../utils/test'
import NewOrder from '../NewOrder'

//Valeur de isLoading
let mockLoad = true

const mockedData = [{
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
}]

jest.mock("../../utils/hooks", () => ({
    UseGetLogInData: () => ({ isLoading: mockLoad, data: mockedData })
}))

describe('NewOrder tests', () => {

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

    it('Should render the stepper list and step 1 content and skeleton', () => {
        mockLoad = true
        render(<NewOrder />)

        expect(screen.getByText(/nouvelle commande/i)).toBeInTheDocument()
        expect(screen.getByText(/Sélection du client/i)).toBeInTheDocument()
        expect(screen.getByText(/livraison/i)).toBeInTheDocument()
        expect(screen.getByText(/Requête/i)).toBeInTheDocument()
        expect(screen.getByText(/résumé/i)).toBeInTheDocument()
        expect(screen.getByText(/express/i)).toBeInTheDocument()

        expect(screen.getAllByRole('button').length).toEqual(2)
        expect(screen.getByTestId('skeleton')).toBeInTheDocument()
    })

    //Difficulté avec le composant mui autocomplete pour les tests une fois le chargement fini

    it('Should render with the text error when you click on next', () => {
        mockLoad = true
        render(<NewOrder />)

        const buttons = screen.getAllByRole('button')


        expect(screen.queryByText('Veuillez sélectionner un client')).not.toBeInTheDocument()

        //action
        fireEvent.click(buttons[1])
        expect(screen.getByText('Veuillez sélectionner un client')).toBeInTheDocument()




    })



});