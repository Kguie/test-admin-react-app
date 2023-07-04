/**
 * Gestion des hooks custom
 **/

import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useDispatch } from 'react-redux';

import { disconnect } from '../../features/forcedLogOut';
import { logOut } from '../../features/userInfo';

/**
 * Récupère les données à partir de l'url donnée
 * @param {String} url de l'api utilisé
 * @returns {object|error} les données provenant de l'api,ainsi que le statut du chargement ou redirection vers la page erreur
 */
export function useGetData(url: string) {
    const [data, setData] = useState({} || [])
    const [isLoading, setLoading] = useState(true)
    const navigate = useNavigate();

    useEffect(() => {
        if (!url) return
        setLoading(true)
        async function getData() {
            try {
                const response = await axios.get(url);
                if (!response) {
                    navigate("/error")
                }
                else {
                    setData(response)
                }

            } catch (error) {


                console.log(error);
            }
            finally {
                setLoading(false)
            }
        }
        getData()
    }, [navigate, url])
    return { isLoading, data }
}

/**
 * Récupère les données à partir de l'url donnée et du token
 * @param {String} url de l'api utilisé
 * @param {String}token reçu lors de la connexion
 * @returns {object|error} les données provenant de l'api,ainsi que le statut du chargement ou redirection vers la page erreur
 */
export function UseGetLogInData(url: string, userInfo: any) {
    const [data, setData] = useState({} || [])
    const [isLoading, setLoading] = useState(true)

    const navigate = useNavigate();
    const dispatch = useDispatch()

    useEffect(() => {
        if (!userInfo.userId || !userInfo.token) {
            dispatch(disconnect('Vous avez été redirigé vers cette page, veuillez vous connecter afin de pouvoir continuer'))
            navigate("/")
            return
        }
        const token: string = userInfo.token

        //Définition du header
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        if (!url) return
        setLoading(true)
        async function getData() {
            try {
                const response = await axios.get(url, config);
                if (!response) {
                    navigate("/error")
                }
                else {
                    setData(response.data)
                }

            } catch (error) {
                //Effacement des données de l'utilisateur dans le store et déconnexion forcée avec retour sur la page de logIn
                dispatch(logOut())
                dispatch(disconnect("Vous avez été déconnecté, veuillez vous reconnecter pour pouvoir continuer d'utiliser l'application"))
                navigate("/")
                console.error(error);
            }
            finally {
                setLoading(false)
            }
        }
        getData()
    }, [navigate, url, userInfo, dispatch])
    return { isLoading, data }
}

/**
 * Envoie des données vers l'url donné 
 * @param {String} url de l'api utilisé
 * @returns {object|error} les données de tous les logements ou redirection vers la page erreur
 */
export function usePostData(url: string) {
    const [data, setData] = useState({} || [])
    const [isLoading, setLoading] = useState(true)
    const navigate = useNavigate();

    useEffect(() => {
        if (!url) return
        setLoading(true)
        async function postData() {
            try {
                const response = await axios.post(url);
                if (!response) {
                    navigate("/error")
                }
                else {
                    setData(response.data)
                }

            } catch (error) {
                console.error(error);
                navigate("/error")
            }
            finally {
                setLoading(false)
            }
        }
        postData()
    }, [navigate, url])
    return { isLoading, data }
}



