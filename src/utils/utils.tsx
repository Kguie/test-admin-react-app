/**
 * Gestion des fonctions utilitaires et des types
 **/

import { NavigateFunction } from "react-router-dom";

/**
 * Fonction qui vérifie le mail avec des regex et indique en cas d'erreur,quelle erreur est commise
 * @param {string} email- Adresse électronique
 * @return { boolean|string } retourne aussi un message d'erreur qui varie en fonction de l'erreur présente
 */
export function emailIsValid(email: string) {
    //Mise en place de la regex qui autorise 20 caractères par partie du mail ,sans espace et limité à certains caractères
    const mailRegex = /^[a-z0-9!#$%&'*+=?^_`~.-]{1,20}@[a-z0-9-!#$%&'*+=?^_`~-]{1,20}\.[a-z0-9]{1,20}$/gi;

    //Ajout de regex pour détecter les erreurs possibles    
    const emptyInput = /^[\s]+$/g;
    //Détection du nombre de caractères dans chacune des partie du mail
    const PartSizeLine = /^([a-z0-9.!#$%&'*+=?^_`~-]{21,}@[a-z0-9-!#$%&'*+=?^_`~-]{1,20}\.[a-z0-9]{1,20}$)|^[a-z0-9.!#$%&'*+=?^_`~-]{1,20}@[a-z0-9-!#$%&'*+=?^_`~-]{21,}\.[a-z0-9]{1,20}$|^[a-z0-9.!#$%&'*+=?^_`~-]{1,20}@[a-z0-9-!#$%&'*+=?^_`~-]{1,20}\.[a-z0-9]{21,}$/gi;
    const whiteSpace = /[\s]/g;
    const unauthorized = /[^a-z0-9.!#$%&'*+=?^_`~\-@]/gi;
    const oneTimeAuthorized = /(@(.*@)+)/g;
    //Test
    const emailTest = mailRegex.test(email);
    const emptyInputTest = emptyInput.test(email);
    const PartSizeLineTest = PartSizeLine.test(email);
    const unauthorizedTest = unauthorized.test(email);
    const oneTimeAuthorizedTest = oneTimeAuthorized.test(email);
    const whiteSpaceTest = whiteSpace.test(email);

    //Traitement du résultat
    if ((emptyInputTest === true) || (!email)) {

        return "Vous n'avez pas entré d'email";
    } if (whiteSpaceTest === true) {

        return "Veuillez ne pas laisser d'espace vide";
    } if (PartSizeLineTest === true) {

        return "Veuillez entrer au maximum 20 caractères s.v.p. par partie de l'adresse mail ";
    } if (unauthorizedTest === true) {

        return "Les lettres et chiffres sont autorisées ainsi que les caractères spéciaux suivants:! # $ % & ' * + = ? ^ _ ` ~ - @ .";
    } if (oneTimeAuthorizedTest === true) {

        return "Le caractères '@' ne peut être utilisé qu'une seule fois";
    } if (emailTest === true) {
        return true;
    } else {
        return "Veuillez vérifier que votre adresse mail est valide et au bon format adresse@mail.com";
    }
}

/**
 * Fonction qui vérifie le nom présent  avec des regex et indique en cas d'erreur,quelle erreur est commise
 * @param {string} name - Nom
 * @return { boolean|string } retourne aussi un message d'erreur qui varie en fonction de l'erreur présente
 */
export function nameIsValid(name: string) {
    //Mise en place de la regex qui autorise  jusqu'à 50 caractères:les lettres avec et sans accent ainsi que certains caractères spéciaux et l'espace
    const nameRegex = /^[a-zéèçàù\-,'\s]{1,50}$/gi;

    //Ajout de regex pour détecter les erreurs possibles
    const emptyInput = /^[\s]+$/g;
    const sizeLine = /^[a-zéèçàù\-,'\s]{51,}$/gi;
    const unauthorized = /[^a-zéèçàù'-\s]/gi;

    //Test
    const nameTest = nameRegex.test(name);
    const emptyInputTest = emptyInput.test(name);
    const sizeLineTest = sizeLine.test(name);
    const unauthorizedTest = unauthorized.test(name);

    //Traitement du résultat   
    if ((emptyInputTest === true) || (!name)) {
        return "Vous n'avez pas rentré de nom";
    } if (sizeLineTest === true) {
        return "Veuillez entrer au maximum 50 caractères s.v.p.";
    } if (unauthorizedTest === true) {
        return "Seules les lettres sont autorisées ainsi que les caractères spéciaux suivants :é è ç à ù - , '";
    }
    if (nameTest === true) {
        return true;
    } else {
        return "Veuillez vérifier que le prénom rentré respecte les caractéristiques suivantes :Composée de 1 à 30 caractères<br>Seules les lettres sont autorisées ainsi que les caractères spéciaux suivants :  é è ç à ù - , '";
    }
}

/**
 * Fonction qui vérifie le mot de passe  avec des regex et indique en cas d'erreur,quelle erreur est commise
 * @param {string} password - Mot de passe
 * @return { string } retourne aussi un message d'erreur qui varie en fonction de l'erreur présente
 */
export function passwordIsValid(password: string) {
    //Mise en place de la regex qui autorise  de 8 à 30 caractères avec au minimum 1 majuscule, 1 minuscule ,1 chiffre et 1 caractère spéciale
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,30})/g;

    //Pas de caractère spécial
    const mediumPasswordRegex = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,30})/g

    //Ajout de regex pour détecter les erreurs possibles
    const emptyInput = /^[\s]+$/g;
    const sizeLine = /^((.{31,})|(.{0,7}))$/gi;

    //Test
    const strongPasswordTest = strongPasswordRegex.test(password);
    const mediumPasswordTest = mediumPasswordRegex.test(password)
    const emptyInputTest = emptyInput.test(password);
    const sizeLineTest = sizeLine.test(password);

    //Traitement du résultat   
    if ((emptyInputTest === true) || (!password)) {
        return "Vous n'avez pas rentré de mot de passe";
    } if (sizeLineTest === true) {
        return "Veuillez entrer 8 et 30 caractères s.v.p.";
    }
    if (strongPasswordTest === true) {
        return "strong";
    } if (mediumPasswordTest === true) {
        return "medium"
    } else {
        return "weak";
    }
}

/**
 * Formate une date prise au format original pour la transformer au format de notre région
 * @param {Date} date
 * @returns {string} date formatée
 */
export function formatDate(date: Date) {
    const formattedDate = new Date(date);
    return formattedDate.toLocaleDateString()
}

/**
 * Formate une date prise au format original pour la transformer au format de notre région avec l'heure précisée
 * @param {Date} date - Date
 * @returns {string} date formatée avec heure
 */
export function formatFullDate(date: Date) {
    const formattedDate = new Date(date);
    let fullDate = formattedDate.toLocaleString()
    const formattedTime = (fullDate.split(' ')[1]).split(':')[0] + 'H' + (fullDate.split(' ')[1]).split(':')[1]
    const formattedFullDate = fullDate.split(' ')[0] + ' à ' + formattedTime
    return formattedFullDate
}

/**
 * Extrait l'heure et les minute à partie d'une date et les formate
 * @param {Date} date - Date
 * @returns {string} heure formatée sous la forme "HH:mm"
 */
export function formatTime(date: Date) {
    const newDate = new Date(date)
    const hours = newDate.getHours()
    const minutes = newDate.getMinutes()

    const formattedHours = hours.toString().padStart(2, '0')
    const formattedMinutes = minutes.toString().padStart(2, '0')
    const formattedTime = formattedHours + ":" + formattedMinutes

    return formattedTime
}


/**
* Calcule la somme des prix à partir d'une liste
* @param {Array<any>} list - Liste   
* @returns {Number} prix total 
*/
export function calculatePriceAndQuantity(list: Array<any>) {
    let subTotalList: Array<number> = [];
    let quantity: number = 0

    list.forEach(element => {
        //Calcul du sous total pour chaque article
        let subTotalPrice: number = (element.quantity ? element.quantity : 1) * element.price;
        subTotalList.push(subTotalPrice);
        //Ajout de la quantité
        quantity += element.quantity ? element.quantity : 1
    })
    //Addition des valeurs de la liste
    let totalPrice = subTotalList.reduce((previousValue, currentValue) =>
        previousValue + currentValue, 0
    );


    return { price: totalPrice, quantity: quantity }
}


/**
 * Permet de formater un nombre en un prix avec 2 décimales après la virgule et affiche le prix sous forme de string
 * @param {number} number - prix entrée
 * @returns {string } price formaté
 */
export function formatPrice(number: number) {
    const priceString = number.toString();

    const firstPart = priceString.split('.')[0]
    let secondPart = priceString.split('.')[1]

    if (!firstPart && !secondPart) {
        const price = number + ' €'
        return price
    }
    else {
        const price = number.toFixed(2) + '€'
        return price
    }
}

/**
 * Trie les dates de la liste de commandes entrée,par ordre croissant (les plus anciennes en premier)
 * @param {any} a -Objet commande  
 * @param {any} b -Objet commande 
 */
export function sortOrders(a: any, b: any): number {
    if ((a.delivery && a.delivery.time) < (b.delivery && b.delivery.time)) {
        return -1; // a est inférieur, donc a vient avant b
    } else if ((a.delivery && a.delivery.time) > (b.delivery && b.delivery.time)) {
        return 1; // a est supérieur, donc a vient après b
    }
    return 0; // Les dates sont égales, aucun ordre spécifique
}

/***
 * Filtre les commandes pour ne garder que celles dont la date de livraison correspond à la date du jour
 * @param {Array<any>} ordersList - Liste de toutes les commandes
 * @param {number } days - Nombre de jours après la date du jour ,pour le filtre de commande, si égal à 0 le filtre concerne la date du jour
 * @return {Array<any>} Liste des commandes filtrées
 */
export function filterOrdersByDeliveryDate(ordersList: Array<any>, days: number) {
    //Liste des commandes filtrées
    let filteredOrders: Array<any> = [];

    //Déclaration de la date du jour
    const today: Date = new Date();

    ordersList.forEach((order: any) => {

        //Date de livraison
        const deliveryFullDate = order.delivery && order.delivery.time
        const deliveryDate = deliveryFullDate.split('T'[0])

        //Date du jour sans l'heure
        const formattedTodayDate: string = today.toISOString().split('T')[0];

        //Filtre les commandes du jour
        if (days === 0) {
            if (deliveryDate === formattedTodayDate) {
                filteredOrders.push(order)
            }
        }

        //Filtre les commandes selon le nombre rentré
        if (days > 0) {
            //Date du jour limite pour le filtre
            let limitDate: Date = new Date()
            limitDate.setDate(limitDate.getDate() + days);

            const formattedLimitDate: string = limitDate.toISOString().split('T')[0];

            if (deliveryDate >= formattedTodayDate && deliveryDate <= formattedLimitDate) {
                filteredOrders.push(order)
            }
        }
    })
    return filteredOrders
}

/**
 * Ouvre la page de la commande qui correspond à la ligne du tableau sur laquelle on clique
 * @param {any} row - Ligne du tableau
 */
export function onRowClickNavigate(row: any, navigate: NavigateFunction) {
    const id = row.id;
    navigate(`${id}`)
}