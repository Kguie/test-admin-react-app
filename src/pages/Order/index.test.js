/**
 * Tests de la page Order
 **/
import { screen } from '@testing-library/react'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import { render } from '../../utils/test'
import Order from './index.tsx'

//Valeur de isLoading
let mockLoad = true




const mockedData = {
    _id:
        "648b0dsdsd7a109427"
    ,
    data: {
        contact: {
            time: {
                date: "2023-06-15T12:59:18.592Z"
            },
            userId: "63d99fe6d905ecc37dc3af40"
        },
        update: {
            time: {
                date: "2023-06-15T18:40:15.425Z"
            },
            userId: "63d99fe6d905ecc37dc3af40"
        }
    },
    customer: {
        id: "644bazff972d0b8",
        name: "John Doe",
        request: [
            {
                pastryDescription: "Cannelés",
                size: 1,
                quantity: 30,
                services: null,
                _id: "648b0bvsfsf1a7a109428"

            }
        ],
        contactUsed: "téléphone",
        event: "fête des pères"
    },
    delivery: {
        time: {
            date: "2023-06-18T13:15:00.123Z"
        },
        service: true,
        location: "Goyave",
        comments: "Pour Jane"
    },
    paymentInfo: {
        payback: {
            wanted: false
        },
        status: "en attente"
    },
    orderStatus: "devis demandé",
    shopping: {
        list: []
    },
    pictures: {
        start: [],
        end: []
    },
}

jest.mock("../../utils/hooks", () => ({
    UseGetLogInData: () => ({ isLoading: mockLoad, data: mockedData })
}))

describe('Order tests', () => {

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

    it('Should render the stepper list and step 1 content', () => {
        mockLoad = true
        render(<Order />)

        expect(screen.getByText(/général/i)).toBeInTheDocument()
        expect(screen.getByText(/contenu/i)).toBeInTheDocument()
        expect(screen.getByText(/livraison/i)).toBeInTheDocument()
        expect(screen.getByText(/paiement/i)).toBeInTheDocument()


    })

    // //Difficultés lors des tests sur les panels
    // it('Should render whiteout the skeletons', () => {
    //     mockLoad = false
    //     render(<Order />)

    //     screen.debug()


    // })




});