/**
 * Gestion des tests de la page NewCustomer
 **/

import { screen, fireEvent } from '@testing-library/react'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import { render } from '../../utils/test'
import NewCustomer from '.'



describe('NewCustomer tests', () => {

    let mock = new MockAdapter(axios);
    const data = {
        message: "requête reçue"
    };

    mock.onPost('http://localhost:8000/customers/new-customer').reply(200, data);

    beforeAll(() => {
        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        mock.reset();
    });

    it('Should render with the correct content', () => {
        render(<NewCustomer />)

        expect(screen.getAllByLabelText(/nom/i)).toBeTruthy()
        expect(screen.getAllByLabelText(/Prénom/i)).toBeTruthy()
        expect(screen.getAllByLabelText(/email/i)).toBeTruthy()
        expect(screen.getAllByRole("button")).toBeTruthy()
        expect(screen.getAllByRole("textbox")).toBeTruthy()
    })

    it('Should load an error text if you enter a wrong input', () => {
        render(<NewCustomer />)

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

    it("Should display the error alert if you don't enter the required inputs", () => {
        render(<NewCustomer />)

        const validationButton = screen.getByRole("button")
        const errorAlert = screen.queryByText(/Tous les champs requis\* doivent être complétés/i)

        expect(errorAlert).not.toBeInTheDocument(validationButton)

        //Action
        fireEvent.click(validationButton)

        //Apparition de l'erreur
        expect(screen.getByText(/Tous les champs requis\* doivent être complétés/i)).toBeInTheDocument()
    })
})