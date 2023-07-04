/**
 * Gestion des sélectors
 **/
import { RootState } from "./store"


/**
 * Sélecteur de l'état d'ouverture du menu gauche qi est ouvert ou fermé
 * @param {RootState} state 
 * @returns {Boolean}
 */
export const selectLeftMenuState = (state: RootState) => state.leftMenu.menuState

/**
 * Sélecteur  des informations au sujet de l'utilisateur connecté contenant son id et son token de connexion
 * @param {RootState} state 
 * @returns {obect}
 */
export const selectUserInfo = (state: RootState) => state.userInfo

/**
 * Sélecteur de l'état de déconnexion forcée, qui dit si l'utilisateur a été déconnecté de force ou non
 * @param {RootState} state 
 * @returns {booloan}
 */
export const selectLogOutStatus = (state: RootState) => state.forcedLogOut.isLogOut

/**
 * Sélecteur qui définit le message explicatif de la déconnexion forcée
 * @param {RootState} state 
 * @returns {String}
 */
export const selectLogOutMessage = (state: RootState) => state.forcedLogOut.message

/**
 * Sélecteur du status de error dans alertSnackbar
 */
export const selectErrorStatus = (state: RootState) => state.alertSnackbar.error

/**
 * Sélecteur du status de error dans alertSnackbar
 */
export const selectSuccessStatus = (state: RootState) => state.alertSnackbar.success

/**
 * Sélecteur du message dans alertSnackbar
 */
export const selectAlertMessage = (state: RootState) => state.alertSnackbar.message




