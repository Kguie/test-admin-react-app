/**
 * Test de la page Orders
 **/

import { screen } from '@testing-library/react'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import { render } from '../../utils/test'
import Orders from './'

//Valeur de isLoading
let mockLoad = true
//Valeur du status de la réponse du hook
let mockStatus = 200

//Test à compléter, difficultés avec le composant mui x-data-grid
// const response = [
//     {
//         _id: "a1234",
//         data: {
//             contact: {
//                 time: "2023-05-31T18:08:02.923Z",
//                 userId: "sd59a3218"
//             }
//         }
//         ,
//         delivery: {
//             time: "2023-05-31T18:08:02.923Z"
//         },
//         paymentInfo: {
//             status: "en attente",
//             totalToPay: 201
//         },
//         customer: {
//             name: "John Doe"
//         },
//         orderStatus: "devis validé",
//     },
//     {
//         _id: "a1234",
//         data: {
//             contact: {
//                 time: "2023-05-31T18:08:02.923Z",
//                 userId: "sd59sdsd3218"
//             }
//         }
//         ,
//         delivery: {
//             time: "2023-05-31T18:08:02.923Z"
//         },
//         paymentInfo: {
//             status: "en attente",
//             totalToPay: 201
//         },
//         customer: {
//             name: "Jane Smith"
//         },
//         orderStatus: "devis demandé",
//     }
// ]

jest.mock("../../utils/hooks", () => ({
    UseGetLogInData: () => ({ isLoading: mockLoad, data: { data: [], status: mockStatus } })
}))

describe('Orders tests', () => {

    let mock = new MockAdapter(axios);
    const data = {
        response: {

        }
    };
    mock.onGet('http://localhost:8000/orders').reply(200, data);

    beforeAll(() => {
        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        mock.reset();
    });


    it('Should render the skeletons without the text', () => {
        render(<Orders />)

        const skeleton = screen.queryByTestId('skeleton')

        expect(skeleton).toBeInTheDocument()
        expect(screen.getAllByRole('button').length).toEqual(1)

        expect(screen.queryByText(/Pas de résultats/i)).not.toBeInTheDocument()
    })

    it('Should render the success content after the loading', () => {
        mockLoad = false
        render(<Orders />)

        expect(screen.queryByTestId('skeleton')).not.toBeInTheDocument()

        expect(screen.getByText(/Pas de résultats/i)).toBeInTheDocument()
        // expect(screen.getByText("25/05/2023")).toBeInTheDocument()
        // expect(screen.getByText("sd59sdsd3218")).toBeInTheDocument()
        // expect(screen.getByText("devis validé")).toBeInTheDocument()

    })
})