/**
 * Component LogDialog
 **/

import { Dialog, DialogContent, DialogTitle, Skeleton, Typography } from "@mui/material"
import { useSelector } from "react-redux"

import { selectUserInfo } from "../../utils/selectors"
import { UseGetLogInData } from "../../utils/hooks"

type OrderDialogProps = {
    userId: string,
    userIp: string,
    createdAt: string,
    openLogDialog: boolean,
    setOpenLogDialog: React.Dispatch<React.SetStateAction<boolean>>
}

type Props = {
    data: any,
    isLoading: boolean
}

/**
 * Affiche les détails de connexion déchiffrés
 * @param {string} userId - Id de l'utilisateur
 * @param {string} userIp - Ip de l'utilisateur
 * @param {string} createdAt - Date de connexion de l'utilisateur
 * @param {boolean} openLogDialog - Status d'ouverture du dialog
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setOpenLogDialog - State action de openDialog 
 */
export default function LogDialog({ userId, userIp, createdAt, openLogDialog, setOpenLogDialog }: OrderDialogProps) {
    //Récupération des données de l'utilisateur dans le store avec son id et son token
    const userInfo: any = useSelector(selectUserInfo)

    const url: string = `${process.env.REACT_APP_API_ORDERS_URL}/users/${userId}`

    const { data, isLoading }: Props = UseGetLogInData(url, userInfo);

    //Nom complet de l'utilisateur
    const fullName: string = data && data.name && (data.name.lastName + " " + data.name.firstName);



    return (
        <Dialog open={openLogDialog} onClose={() => setOpenLogDialog(false)}>
            <DialogTitle>Détail de la connexion</DialogTitle>
            {!isLoading ? <DialogContent sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <Typography>Nom de l'utilisateur : {fullName}</Typography>
                <Typography>Moment de la connexion : {createdAt}</Typography>
                <Typography>Ip de connexion : {userIp}</Typography>
            </DialogContent> :
                <Skeleton variant='rectangular' width={"95%"} height={"5vh"} />
            }
        </Dialog>
    )
}