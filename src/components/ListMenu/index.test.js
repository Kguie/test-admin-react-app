/**
 * Test du component ListMenu
 **/

import { screen, fireEvent } from '@testing-library/react'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import { render } from '../../utils/test'
import ListMenu from './'

//Valeur de isLoading
let mockLoad = false

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

describe('ListMenu', () => {

    let mock = new MockAdapter(axios);

    mock.onGet(`${process.env.REACT_APP_API_ORDERS_URL}`).reply(200, mockedData);

    beforeAll(() => {
        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        mock.reset();
    });
    it('Should render with the expected content after the loading', async () => {
        render(<ListMenu />)
        setTimeout(() => {

        }, 500);
        expect(screen.getByText(/bonjour/i)).toBeInTheDocument()

        expect(screen.getByText(/commandes/i)).toBeInTheDocument()
        expect(screen.getByTestId("shopping-bag-icon")).toBeInTheDocument()
        expect(screen.getAllByRole("button").length).toEqual(6)

        //Constitution des initiales de l'avatar à partir du nom et prénom mockés
        expect(screen.getByText(/JS/i)).toBeInTheDocument()
    })

    it('Should render with the expected content when you open and close an accordion', () => {
        render(<ListMenu />)

        const buttons = screen.getAllByRole("button")
        const adminButton = buttons[4]
        expect(screen.getAllByRole("button").length).toEqual(6)

        fireEvent.click(adminButton)
        //Apparition des 2 nouveaux boutons
        expect(screen.getAllByRole("button").length).toEqual(8)
    })

    it('Should call api in ListMenu', () => {
        render(<ListMenu />)

        setTimeout(() => {
            expect(screen.getByText(/john/i)).toBeInTheDocument()
            expect(screen.getByText(/gestion comptable/i)).toBeInTheDocument()
            //Ces parties ne devraient pas être dans le document vu que la catégorie est user
            expect(screen.queryByText(/gestion admin/i)).not.toBeInTheDocument()
        }, 500);
    })
})


