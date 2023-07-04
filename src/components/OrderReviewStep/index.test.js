/**
 * Test du component OrderReviewStep
 **/

import { screen } from '@testing-library/react'

import OrderReviewStep from '.'
import { render } from '../../utils/test'


describe('OrderReviewStep', () => {
    it('Should render with the expected texts and buttons', () => {
        render(<OrderReviewStep requestList={[]} />)

        const buttons = screen.queryAllByRole("button")
        const inputs = screen.queryAllByRole("textbox")

        //Pas de boutons ni de champ de saisi de texte
        expect(buttons.length).toEqual(0)
        expect(inputs.length).toEqual(0)

        //Affichage de toutes les catégories
        expect(screen.getByText(/Résumé de la commande/i)).toBeInTheDocument()
        expect(screen.getByText(/Requêtes/i)).toBeInTheDocument()
        expect(screen.getByText(/Parts/i)).toBeInTheDocument()
        expect(screen.getByText(/Quantité/i)).toBeInTheDocument()
        expect(screen.getByText(/Patisseries/i)).toBeInTheDocument()
        expect(screen.getByText(/Moyen de contact utilisé/i)).toBeInTheDocument()
        expect(screen.getByText(/À retirer/i)).toBeInTheDocument()
        expect(screen.getByText(/Horaire/i)).toBeInTheDocument()
    })

    it('Should render with the expected props', () => {
        const requestList = [
            {
                pastryDescription: 'tarte citron',
                size: 22,
                quantity: 1,
                services: null,
            },
            {
                pastryDescription: "macaron mangue",
                size: 1,
                quantity: 100,
                services: "coloris orange"
            }
        ]

        const customer = {
            name: {
                firstName: 'John',
                lastName: 'Doe',
            }
        }

        render(<OrderReviewStep
            requestList={requestList}
            customer={customer}
            contactWay={'whatsapp'}
            deliveryLocation={'Lieu de travail'}
            deliveryService={false}
            deliveryTime={Date.now()}
        />)

        //Affichage de toutes les catégories
        expect(screen.getByText(/Résumé de la commande/i)).toBeInTheDocument()
        expect(screen.getByText(/macaron mangue/i)).toBeInTheDocument()
        expect(screen.getByText(/Doe John/i)).toBeInTheDocument()
        expect(screen.getByText(/whatsapp/i)).toBeInTheDocument()
        expect(screen.getByText(/Patisseries/i)).toBeInTheDocument()

        //Ne devrait pas être dans le document car la livraison est sur faux
        expect(screen.queryByText(/Lieu de travail/i)).not.toBeInTheDocument()
    })
})