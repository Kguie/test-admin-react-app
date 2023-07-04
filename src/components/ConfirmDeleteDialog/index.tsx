/**
 * Component ConfirmDeleteDialog
 */

import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"

import CancelButton from "../CancelButton"
import SubmitButton from "../SubmitButton"

type Props = {
    label: string,
    handleDelete: Function,
    openDialogDelete: boolean,
    setOpenDialogDelete: React.Dispatch<React.SetStateAction<boolean>>
};

/**
 * Ouvre un dialog qui demande une confirmation de suppression et lance celle-ci
 * @param {string} label - libelle du dialog
 * @param {Function} handleDelete - Function qui va gérer la suppression
 * @param {boolean} openDialogDelete - Status duu dialog 
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setOpenDialogDelete - State action qui définit openDialogDelete
 */
export default function ConfirmDeleteDialog({ label, handleDelete, openDialogDelete, setOpenDialogDelete }: Props) {
    return (
        <Dialog onClose={() => setOpenDialogDelete(false)} open={openDialogDelete}>
            <DialogTitle fontWeight={"bold"}>Suppression définitive {label} </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Êtes-vous sûr de vouloir confirmer cette suppression?
                </DialogContentText>
                <DialogActions sx={{ display: 'flex', justifyContent: 'space-around' }}>
                    <CancelButton
                        handleCancel={() => setOpenDialogDelete(false)}
                    />
                    <SubmitButton
                        handleClick={handleDelete}
                        disabled={false}
                    />
                </DialogActions>
            </DialogContent>
        </Dialog>
    )
};