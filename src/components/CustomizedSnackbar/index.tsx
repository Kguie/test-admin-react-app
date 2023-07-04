/**
 * Component CustomizedSnackBar
 **/

import { Alert, Snackbar } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"

import { selectAlertMessage, selectErrorStatus, selectSuccessStatus } from "../../utils/selectors"
import { reset } from '../../features/alertSnackbar';

/**
 * Fait apparaître un snack bar en bas à droite contenant un message d'erreur ou de succès
 **/
export default function CustomizedSnackBar() {

    //Status général à l'ouverture d'une page
    const errorStatus = useSelector(selectErrorStatus)
    const successStatus = useSelector(selectSuccessStatus)
    const alertMessage = useSelector(selectAlertMessage)

    const dispatch = useDispatch()

    return (<Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={(errorStatus || successStatus) ? true : false}
        onClose={() => {
            dispatch(reset())
        }}
        autoHideDuration={6000}
    >
        <Alert
            onClose={() => {
                dispatch(reset())
            }} severity={errorStatus ? "error" : "success"}>
            {alertMessage}</Alert>

    </Snackbar>)
}