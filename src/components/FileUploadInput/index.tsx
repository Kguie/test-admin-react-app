/**
 * Component FileUploadInput
 **/

import React from 'react';
import { Dialog, DialogTitle, Grid, IconButton, Input, Tooltip, Typography } from "@mui/material"
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'
import { useSelector } from 'react-redux';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { Dispatch } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"

import { selectUserInfo } from '../../utils/selectors';
import { updateFormData } from '../../utils/api';
import CancelButton from '../CancelButton';
import SubmitButton from '../SubmitButton';
import { error, reset } from '../../features/alertSnackbar';

type Props = {
    orderDataId: string,
    category: string,
}

/**
 * Gestion du choix et de l'upload de la photo
 * @param {string} orderDataId id de la commande
 * @param {string} category catégorie des photo, start ou end  
 */
export default function FileUploadInput({ orderDataId, category }: Props) {

    const navigate: NavigateFunction = useNavigate()
    const dispatch: Dispatch = useDispatch()

    //Récupération des données de l'utilisateur dans le store avec son id et son token
    const userInfo: any = useSelector(selectUserInfo)

    //State de la photo envoyée
    const [picture, setPicture] = React.useState<any>(null)

    //State de l'url de la photo sélectionnée
    const [urlPicture, setUrlPicture] = React.useState<string | null>(null)

    //State de validité de la photo choisie
    const [validPicture, setValidPicture] = React.useState(false);

    //State d'ouverture de la fenêtre de dialogue d'ajout de la photo
    const [openAddPictureDialog, setOpenAddPictureDialog] = React.useState<boolean>(false)

    /**
     * Vérifie la validité de la photo en fonction de sa taille et de son type
     * @param  {File}picture image à vérifier
     */
    function checkPicture(picture: File) {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        const maxSizeInBytes = (1024 * 1024) * 2; // 2MB
        if (allowedTypes.includes(picture.type)) {
            if (picture.size < maxSizeInBytes) {
                setValidPicture(true);
            } else {
                dispatch(error('Votre image doit peser moins de 2 MB '));
                setValidPicture(false);
                setPicture(null);
            }
        } else {
            dispatch(error('Votre image doit être de type jpeg, jpg, ou png '));
            setValidPicture(false);
            setPicture(null);
        }
    };

    /**
     * Gère l'envoie du formulaire 
     */
    const handleSubmit = () => {
        dispatch(reset());
        //Vérifications
        if (!picture) {
            dispatch(error('Votre image doit être de type jpeg, jpg, ou png '))
            return
        } else {
            if (!validPicture) {
                return
            }

            //Constitution de l'objet FormData
            const formData = new FormData()
            formData.append('image', picture)
            formData.append('category', category)

            const url = `${process.env.REACT_APP_API_ORDERS_URL}/orders/${orderDataId}/photos`
            updateFormData(formData, url, userInfo, dispatch, navigate)
            setValidPicture(false)
            setPicture(null)
            setUrlPicture(null)
            setOpenAddPictureDialog(false)

            return
        }
    };

    return (<Grid>

        <Tooltip title={'Ajouter une photo'} sx={{ marginTop: '10px' }}>
            <IconButton
                component="label"
                aria-label="Ajouter une photo">
                <AddAPhotoIcon />
                <Input sx={{ display: 'none' }} type="file" onChange={(event: any) => {
                    const file = event.target.files[0]
                    checkPicture(file)
                    setPicture(file)
                    file && setUrlPicture(URL.createObjectURL(file));
                    setOpenAddPictureDialog(true)
                }} />
            </IconButton>
        </Tooltip>
        <Dialog onClose={() => setOpenAddPictureDialog(false)} open={openAddPictureDialog}>
            <DialogTitle textAlign={'center'}>Confirmer ajout</DialogTitle>
            {urlPicture && validPicture ?
                <Grid display={'flex'} justifyContent={'space-around'}><img width={'250px'} src={urlPicture} alt="Ajout" /></Grid> :
                <Typography marginTop={"10px"}
                    color={"text.secondary"}
                    sx={{ fontSize: { xs: 17, md: 20 } }}>
                    Photo non valide
                </Typography>
            }

            {/* Section boutons */}
            <Grid marginTop={'20px'} display={'flex'} justifyContent={'space-around'}>
                <CancelButton
                    handleCancel={() => {
                        setOpenAddPictureDialog(false)
                        setPicture(null)
                        setUrlPicture(null)
                        setValidPicture(false)
                    }} />
                <SubmitButton disabled={!validPicture} handleClick={() => handleSubmit()} />
            </Grid>
        </Dialog>
    </Grid >
    );
};

