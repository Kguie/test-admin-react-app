/**
 * Gestion des tests de la page NewUser
 **/

import { screen, fireEvent } from '@testing-library/react'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import { render } from '../../utils/test'
import NewUser from '.'



describe('NewUser tests', () => {

    let mock = new MockAdapter(axios);
    const data = {
        message: "requête reçue"
    };

    mock.onPost('http://localhost:8000/users/new').reply(200, data);

    beforeAll(() => {
        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        mock.reset();
    });

    it('Should render with the correct content', () => {
        render(<NewUser />)

        expect(screen.getAllByLabelText(/nom/i)).toBeTruthy()
        expect(screen.getAllByLabelText(/Prénom/i)).toBeTruthy()
        expect(screen.getAllByLabelText(/email/i)).toBeTruthy()
        expect(screen.getAllByRole("button")).toBeTruthy()
        expect(screen.getAllByRole("textbox")).toBeTruthy()
    })

    it('Should load an error text if you enter a wrong input', () => {
        render(<NewUser />)

        const inputs = screen.getAllByRole("textbox")
        const lastName = inputs[1]
        const email = inputs[2]

        const emailError = screen.queryByText(/Vous n'avez pas entré d'adresse mail/i)
        const lastNameError = screen.queryByText(/Seules les lettres sont autorisées ainsi que/i)

        expect(lastNameError).toBeNull()
        expect(emailError).toBeNull()

        fireEvent.change((email), { target: { value: 'chocolat' } })
        fireEvent.change((lastName), { target: { value: '1234' } })

        //Erreur
        expect(screen.getByText(/Veuillez vérifier que votre adresse mail est valide et au bon format adresse@mail.com/i)).toBeInTheDocument()
        expect(screen.getByText(/Seules les lettres sont autorisées ainsi que/i)).toBeInTheDocument()
    })

    it("Should display the error alert if you don't enter the required inputs", () => {
        render(<NewUser />)

        const validationButton = screen.getAllByRole("button")[2]
        const errorAlert = screen.queryByText(/Tous les champs doivent être complétés afin de finaliser la création du compte/i)

        expect(errorAlert).not.toBeInTheDocument()

        //Action
        fireEvent.click(validationButton)

        //Apparition de l'erreur
        expect(screen.getByText(/Tous les champs doivent être complétés afin de finaliser la création du compte/i)).toBeInTheDocument()
    })
})