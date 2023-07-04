/**
 * Test du component OrderDeliveryStep
 **/

import { screen } from '@testing-library/react'

import OrderDeliveryStep from '.'
import { render } from '../../utils/test'

describe('OrderDeliveryStep', () => {
    it('Should render with the expected texts and buttons', () => {
        render(<OrderDeliveryStep />)

        const buttons = screen.getAllByRole("button")
        const inputs = screen.getAllByRole("textbox")

        expect(buttons.length).toEqual(1)
        expect(inputs.length).toEqual(2)

        expect(screen.getByText(/Informations de livraison/i)).toBeInTheDocument()


    })

    //Difficulté à tester à cause de setDeliveryTime

    // it('Should render with the expected props', () => {        

    //     render(<OrderDeliveryStep deliveryService={true} deliveryLocation={'Lieu de travail'} deliveryComments={'Sonner au 72'} deliveryTime={deliveryTime} setDeliveryTime={setDeliveryTime} />)

    //     let buttons = screen.getAllByRole("button")
    //     let inputs = screen.getAllByRole("textbox")

    //     expect(buttons.length).toEqual(1)
    //     //Apparition de l'input du lieu de livraison
    //     expect(inputs.length).toEqual(3)

    //     const dateInput = inputs[2]

    //     expect(screen.getByText(/Informations de livraison/i)).toBeInTheDocument()
    //     expect(screen.getByText(/Lieu de travail/i)).toBeInTheDocument()
    //     expect(screen.getByText(/Sonner au 72/i)).toBeInTheDocument()

    //     //Ajout d'une date
    //     fireEvent.change((dateInput), { target: { value: "30/06/2023" } })

    //     expect(screen.getByDisplayValue("30/06/2023")).toBeTruthy()
    // })
});