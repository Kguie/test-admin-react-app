/**
 * Gestion des tests de la page login
 **/
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import { fireEvent, screen, } from '@testing-library/react'
import { render } from '../../utils/test'
import Login from './'

describe('Login tests', () => {

    let mock = new MockAdapter(axios);
    const data = {
        response: {
            message: "requête reçue"
        }
    };
    mock.onPost('http://localhost:8000/users/reset-password').reply(201, data);

    beforeAll(() => {
        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        mock.reset();
    });


    it('Should fail if no email is added', async () => {
        render(<Login />)

        const emailError = screen.queryByText(/Veuillez rentrer une adresse émail et un mot de passe valide/i)
        const submitButton = screen.getAllByRole('button')[1]

        expect(submitButton).toBeTruthy()
        expect(emailError).toBeNull()

        //On appuie sur le bouton se connecter
        fireEvent.click(submitButton)

        //L'erreur apparaît 
        expect(screen.getByText(/Veuillez rentrer une adresse émail et un mot de passe valide/i)).toBeInTheDocument()
    })

    it('Should fail if the email is not valid', async () => {
        render(<Login />)


        const emailInput = (screen.queryAllByRole('textbox'))[0]

        const emailError = screen.queryByText(/Vous n'avez pas entré d'adresse mail/i)

        expect(emailInput).toBeTruthy()
        expect(emailError).toBeNull()

        fireEvent.change((emailInput), { target: { value: 'chocolat' } })

        //Erreur
        expect(screen.getByText(/Veuillez vérifier que votre adresse mail est valide et au bon format adresse@mail.com/i)).toBeInTheDocument()
    })

    it('Should fail if the password input is empty', async () => {
        render(<Login />)

        const emailInput = (screen.queryAllByRole('textbox'))[0]
        const submitButton = screen.getAllByRole('button')[1]

        fireEvent.change((emailInput), { target: { value: 'adresse@mail.com' } })

        //Erreur
        expect(screen.queryByText(/Veuillez vérifier que votre adresse mail est valide et au bon format adresse@mail.com/i)).toBeNull()
        expect(screen.queryByText(/Veuillez entrer votre mot de passe/i)).toBeNull()

        //On appuie sur le bouton se connecter
        fireEvent.click(submitButton)

        //Apparition du message d'erreur
        expect(screen.getByText(/Veuillez rentrer une adresse émail et un mot de passe valide/i)).toBeInTheDocument()

    })

    it('Should display a text if you click on the reset button', async () => {
        render(<Login />)

        const emailInput = (screen.queryAllByRole('textbox'))[0]

        fireEvent.change((emailInput), { target: { value: 'adresse@mail.com' } })

        //Erreur
        expect(screen.queryByText(/Veuillez vérifier que votre adresse mail est valide et au bon format adresse@mail.com/i)).toBeNull()
        expect(screen.queryByText(/Veuillez entrer votre mot de passe/i)).toBeNull()

    })
})