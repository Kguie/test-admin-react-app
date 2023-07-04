/**
 * Gestion du component LogBook
 **/
import { Grid } from '@mui/material';
import { GridColDef, GridRowModel } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import { useState } from 'react';

import DataTable from '../../components/DataTable';
import { formatFullDate } from '../../utils/utils';
import { selectUserInfo } from '../../utils/selectors';
import { UseGetLogInData } from '../../utils/hooks';
import LogDialog from '../../components/LodDialog';

type Props = {
    data: any,
    isLoading: boolean
}

type LogObject = {
    user: string,
    location: string,
    date: string,
    id: string
}

/**
 * Extrait les données des commandes nécessaires à la création du tableau de logs
 * @param {Object} data récupéré par api
 * @returns {Object} data formaté de type logData
 */
function createLogsDataArray(data: any) {
    const dataArray: any = []

    for (let i = 0; i < data.length; i++) {
        const logData: GridRowModel = {
            date: data[i].createdAt && formatFullDate(data[i].createdAt),
            id: data[i]._id,
            user: data[i].userId,
            location: data[i].userIp,
        }
        dataArray.push(logData)
    }
    return dataArray
}

//Entêtes des cellules du tableau
const columns: GridColDef[] = [
    { field: 'date', headerName: 'Date', flex: 1, minWidth: 100, },
    { field: 'user', headerName: "Id de l'utilisateur", flex: 1, minWidth: 100 },
    { field: 'location', headerName: "Id de l'utilisateur", flex: 1, minWidth: 150 },
]

/**
 * Affiche le LogBook qui permet De voir qui les connexions des utilisateurs
 */
function LogBook() {
    //Récupération des données de l'utilisateur dans le store avec son id et son token
    const userInfo: any = useSelector(selectUserInfo);

    const url: string = `${process.env.REACT_APP_API_ORDERS_URL}/logs/`;

    const { data, isLoading }: Props = UseGetLogInData(url, userInfo);

    //State de l'objet d'un seul log
    const [logObject, setLogObject] = useState<LogObject | null>(null);

    //State du dialog affichant l'objet sur lequel on clique
    const [openLogDialog, setOpenLogDialog] = useState<boolean>(false);

    /**
     * Fonction qui récupère l'objet de la ligne sur laquelle on clique
     */
    function onRowClickCollect(row: any) {
        setLogObject(row);
        setOpenLogDialog(true);
    }

    return (
        <Grid >
            <DataTable onRowClickSet={onRowClickCollect} title={"Journal de connexions"} subTitle='Liste des connexions des utilisateurs' columns={columns} rows={createLogsDataArray(data)} isLoading={isLoading} />
            {logObject &&
                <LogDialog
                    userId={logObject.user}
                    userIp={logObject.location}
                    createdAt={logObject.date}
                    openLogDialog={openLogDialog}
                    setOpenLogDialog={setOpenLogDialog}
                />}
        </Grid>
    )
}

export default LogBook