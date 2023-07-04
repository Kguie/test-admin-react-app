/**
 * Fonctions utilitaires faisant appel aux API
 **/
import axios from "axios";
import { Dispatch } from "@reduxjs/toolkit";
import { NavigateFunction } from "react-router-dom";
import { error } from "../features/alertSnackbar";

/**
 * Fonction qui permet la réinitialisation du mot de passe par l'envoi d'un mail
 * @param {Object} emailObject-Objet contenant l'email
 * @param {string} url - pour le fetch
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setSuccessStatus - State action pour définir le status de succès
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setErrorStatus - State action pour définir le status d'erreur
 * @param {React.Dispatch<React.SetStateAction<string>>} setErrorMessage - State action pour définir le message d'erreur
 */
export async function resetPassword(emailObject: { email: string }, url: string, setSuccessStatus: React.Dispatch<React.SetStateAction<boolean>>, setErrorStatus: React.Dispatch<React.SetStateAction<boolean>>, setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>,) {
    try {
        const response: any = await axios.post(url, emailObject);
        if (response.status === 201 || 202 || 203) {

            setSuccessStatus(true)
        }
    } catch (err) {
        setErrorMessage("Une erreur s'est produite, veuillez réessayer ultérieurement ou nous contacter si cette erreur persiste")
        setErrorStatus(true)
        return
    }
}

/**
 * Gère l'envoi des données pour l'update des information de l'utilisateur vers l'api
 * @param {Object} body - Contenu du post
 * @param {string} url - Url 
 * @param {object} userInfo  - Données de l'utilisateur pour le fetch 
 * @param {Dispatch} dispatch - Action pour définir le status de l'erreur  et lui attribuer un message
 * @param {NavigateFunction} navigate - Hook pour changer de page 
 */
export async function updateData(body: any, url: string, userInfo: any, dispatch: Dispatch, navigate: NavigateFunction) {
    const token: string = userInfo.token

    //Définition de config
    let config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    try {
        const response: any = await axios.put(url, body, config);
        console.log(response)
        if (response.status === 200 || 201) {
            //Refresh de la page
            navigate(0)
        }

    } catch (err) {
        dispatch(error("Désolé, nous avons rencontré une erreur, veuillez réessayer ultérieurement ou nous contacter si cette erreur persiste"))
        return
    }
}

/**
 * Gère l'envoi des données pour l'update des information de l'utilisateur vers l'api avec envoi d'un fichier
 * @param {FormData} formData - Contenu du post avec un fichier
 * @param {string} url - Url 
 * @param {object} userInfo - Données de l'utilisateur pour le fetch 
 * @param {Dispatch} dispatch - Action pour définir le status de l'erreur  et lui attribuer un message
 * @param {NavigateFunction} navigate - Hook pour changer de page 
 */
export async function updateFormData(formData: FormData, url: string, userInfo: any, dispatch: Dispatch, navigate: NavigateFunction) {
    const token: string = userInfo.token

    //Définition de config
    let config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
        }
    };

    try {
        const response: any = await axios.put(url, formData, config);
        console.log(response)
        if (response.status === 200 || 201) {
            //Refresh de la page
            navigate(0)
        }

    } catch (err) {
        dispatch(error("Désolé, nous avons rencontré une erreur, veuillez réessayer ultérieurement ou nous contacter si cette erreur persiste"))
        return
    }
}

/**
 * Gère l'effacement des données  
 * @param {string} url - Url 
 * @param {object} userInfo - Données de l'utilisateur pour le fetch 
 * @param {Dispatch} dispatch - Action pour définir le status de l'erreur  et lui attribuer un message
 * @param {NavigateFunction} navigate - Hook pour changer de page 
 */
export async function deleteData(url: string, userInfo: any, dispatch: Dispatch, navigate: NavigateFunction) {
    const token: string = userInfo.token

    //Définition du header
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    try {
        const response: any = await axios.delete(url, config);
        console.log(response)
        if (response.status === 200) {
            //Refresh de la page
            navigate(-1)
        }

    } catch (err) {
        dispatch(error("Désolé, nous avons rencontré une erreur, veuillez réessayer ultérieurement ou nous contacter si cette erreur persiste"))
        return
    }
}

/**
 * Permet de récupérer un nom complet  à partir d'un id 
 * @param {string} url - Url  
 * @param {object} userInfo - Données de l'utilisateur pour le fetch 
 * @param {React.Dispatch<React.SetStateAction<string | null>>} setDataFullName - State action pour récupérer le nom complet
 * @param {Dispatch} dispatch - Action pour déclarer l'erreur et attribuer un message
 */
export async function getFullName(url: string, userInfo: any, setDataFullName: React.Dispatch<React.SetStateAction<string | null>>, dispatch: Dispatch) {

    const token: string = userInfo.token

    //Définition du header
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    try {
        const response: any = await axios.get(url, config);
        response ? setDataFullName(response.data) : setDataFullName(null)

    } catch (err) {
        dispatch(error("Désolé, nous avons rencontré une erreur dans la récupération du nom , veuillez réessayer ultérieurement ou nous contacter si cette erreur persiste"))
        return
    }
}