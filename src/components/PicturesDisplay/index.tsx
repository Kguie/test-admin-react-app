/**
 * Gestion du component PicturesDisplay
 **/

import React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { Button, Dialog, Grid, MobileStepper, Paper, Typography, useTheme } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { useSwipeable } from 'react-swipeable';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { Dispatch } from '@reduxjs/toolkit';

import { selectUserInfo } from '../../utils/selectors';
import CancelButton from '../CancelButton';
import DeleteButton from '../DeleteButton';
import { updateFormData } from '../../utils/api';
import { error, reset } from '../../features/alertSnackbar';




type Props = {
    orderData: any,
    category: string,
}

const StyledPicture = styled.img({
    maxHeight: '450px',
    objectFit: 'contain'
});



/**
 * Affiche les images à partir d'une liste, en s'adaptant à la taille de l'écran
 * @param {object} orderData - Données de la commande
 * @param {string} category - Catégorie à laquelle appartient la liste actuelle,start ou end
 */
export default function PicturesDisplay({ orderData, category }: Props) {
    const theme = useTheme();

    const navigate: NavigateFunction = useNavigate();

    const dispatch: Dispatch = useDispatch();

    //Récupération des données de l'utilisateur dans le store avec son id et son token
    const userInfo: any = useSelector(selectUserInfo)

    //State d'ouverture de la fenêtre de dialogue d'ajout de la photo
    const [openManagePictureDialog, setOpenManagePictureDialog] = React.useState<boolean>(false)

    //State de l'image sélectionnée
    const [selectedImage, setSelectedImage] = React.useState<string | null>(null)

    //State de la photo active
    const [activeStep, setActiveStep] = React.useState(0);


    const pictures: Array<string> = getList()

    //Nombre total de photos
    const maxSteps = pictures.length;


    //Mise en place du swipe de la version mobile
    const handlers = useSwipeable({
        onSwipedLeft: (event) => handleBack(),
        onSwipedRight: (event) => handleNext(),
    });

    /**
     * Récupération de la liste de photos en fonction de la catégorie
     */
    function getList() {
        if (category === "start") {
            const list = orderData && orderData.pictures && (orderData.pictures.start && orderData.pictures.start.length > 0) ? orderData.pictures.start : []
            return list
        } if (category === "end") {
            const list = orderData && orderData.pictures && (orderData.pictures.end && orderData.pictures.end.length > 0) ? orderData.pictures.end : []
            return list
        }
    }

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep === (maxSteps - 1) ? 0 : (prevActiveStep + 1));
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep === 0 ? (maxSteps - 1) : (prevActiveStep - 1));
    };

    /**
     * Fonction qui permet de supprimer une photo de la liste à laquelle elle appartenait en entrant son nom
     */
    function handleDelete() {
        dispatch(reset())

        //Vérifications
        if (!selectedImage) {
            dispatch(error("Aucune image sélectionnée"))
            return
        }

        //Constitution de l'objet FormData
        const formData = new FormData()
        formData.append('url', selectedImage)
        formData.append('category', category)

        const url = `${process.env.REACT_APP_API_ORDERS_URL}/orders/${orderData._id}/photos`
        updateFormData(formData, url, userInfo, dispatch, navigate)

        setSelectedImage(null)
        setOpenManagePictureDialog(false)
    }


    return (
        <Grid>
            {(!pictures || pictures.length === 0) ?
                <Typography
                    marginTop={"10px"}
                    color={"text.secondary"}
                    sx={{ fontSize: { xs: 17, md: 20 } }}
                >
                    Pas de photo disponible
                </Typography> :
                <Grid>
                    {/* Affichage des photos sous forme de liste à partir de la taille d'écran md */}
                    <ImageList sx={{ width: "100%", maxHeight: 600, display: { xs: 'none', sm: 'block' } }} rowHeight={200}>
                        {pictures.map((picture: any, index: number) => (
                            <ImageListItem
                                key={'list-picture-' + index + ' / ' + pictures.length}
                                onClick={() => {
                                    setSelectedImage(picture)
                                    setOpenManagePictureDialog(true)
                                }}
                                sx={{ cursor: 'pointer', overflow: 'hidden' }}
                            >
                                <StyledPicture
                                    src={picture}
                                    alt={(index + 1) + '/' + pictures.length}
                                    loading="lazy"
                                />
                                <ImageListItemBar
                                    title={(index + 1) + '/' + pictures.length}
                                />
                            </ImageListItem>
                        ))}
                    </ImageList>

                    {/* Affiche des photos sous forme de carousel pour une taille d'écran inférieur à sm */}
                    <Grid sx={{ maxWidth: 360, flexGrow: 1, display: { xs: 'block', sm: 'none' } }}>
                        <Paper
                            square
                            elevation={0}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                height: 50,
                                pl: 2,
                                bgcolor: 'background.default',
                            }}
                        >
                            <Typography>{(activeStep + 1) + "/" + pictures.length}</Typography>
                        </Paper>
                        <Grid {...handlers} alignSelf={'center'}>

                            <Grid >
                                <Grid
                                    onClick={() => {
                                        setSelectedImage(pictures[activeStep])
                                        setOpenManagePictureDialog(true)
                                    }}
                                    component="img"
                                    sx={{
                                        height: 255,
                                        display: 'block',
                                        maxWidth: 400,
                                        overflow: 'hidden',
                                        width: '100%',
                                        objectFit: 'contain',
                                        cursor: 'pointer'
                                    }}
                                    src={pictures[activeStep]}
                                    alt={(activeStep + 1) + "/" + pictures.length}
                                />

                            </Grid>

                        </Grid>

                        <MobileStepper
                            steps={maxSteps}
                            position="static"
                            activeStep={activeStep}
                            nextButton={
                                <Button
                                    size="small"
                                    onClick={handleNext}
                                    disabled={activeStep === maxSteps - 1}
                                >
                                    Suivant
                                    {theme.direction === 'rtl' ? (
                                        <KeyboardArrowLeft />
                                    ) : (
                                        <KeyboardArrowRight />
                                    )}
                                </Button>
                            }
                            backButton={
                                <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                                    {theme.direction === 'rtl' ? (
                                        <KeyboardArrowRight />
                                    ) : (
                                        <KeyboardArrowLeft />
                                    )}
                                    Précédent
                                </Button>
                            }
                        />
                    </Grid>
                </Grid>}
            {selectedImage &&
                <Dialog onClose={() => setOpenManagePictureDialog(false)} open={openManagePictureDialog}>
                    <Grid padding={'20px'} display={'flex'} justifyContent={'space-around'}>
                        <img src={selectedImage} alt="Ajout" />
                    </Grid>
                    {/* Section boutons */}
                    <Grid display={'flex'} justifyContent={'space-around'}>
                        <CancelButton
                            handleCancel={() => {
                                setOpenManagePictureDialog(false)
                                setSelectedImage(null)
                            }}
                        />
                        <DeleteButton
                            handleDelete={handleDelete}
                        />
                    </Grid>
                </Dialog>}
        </Grid>
    );
}

