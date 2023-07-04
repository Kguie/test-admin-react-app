/**
 *Gestion des listes secondaires de type accordion 
 **/

import React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
    AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { ListItemButton, ListItemIcon, ListItemText, Popover, } from '@mui/material';
import Typography from '@mui/material/Typography';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
// import BarChartIcon from '@mui/icons-material/BarChart';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

import { selectLeftMenuState } from '../../utils/selectors';

//Personnalisation CSS des accordions
const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(() => ({
    paddingLeft: 20,
    gap: 30,
    display: 'flex',
    backgroundColor: "#ffffff",
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: 0,
        paddingLeft: 0,
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(() => ({
    padding: "16px 0px 16px",
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

//Titre des listes qui ne s'affichent que quand le menu est ouvert
const StyledAccordionTitle = styled((props: any) => (
    <Typography
        fontSize={"0.875rem"}
        color={"rgba(0, 0, 0, 0.6)"}
        {...props}
    />
))(({ open }) => ({
    display: open ? "block" : "none",
}));



/**
 * Affiche le component AccordionLists 
 */
export default function AccordionLists({ category }: any) {
    const navigate = useNavigate()

    //State de l'état d'ouverture des accordions permet l'ouverture d'un seul accordion à la fois 
    const [expandedAccordionList, setExpandedAccordionList] = React.useState<string | false>(false);

    const openMenu = (useSelector(selectLeftMenuState))

    const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
        setExpandedAccordionList(newExpanded ? panel : false);
    };

    //Gestion des fenêtres de type popover des notifications
    const [anchorEl1, setAnchorEl1] = React.useState<HTMLElement | null>(null);
    // const [anchorEl2, setAnchorEl2] = React.useState<HTMLElement | null>(null);

    //Gestion de l'ouverture des fenêtres de type popover
    const handlePopoverOpen1 = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl1(event.currentTarget)
    };
    // const handlePopoverOpen2 = (event: React.MouseEvent<HTMLElement>) => {
    //     setAnchorEl2(event.currentTarget)
    // };


    //Gestion de la fermeture des fenêtres de type popover
    const handlePopoverClose1 = () => {
        setAnchorEl1(null)
    };
    // const handlePopoverClose2 = () => {
    //     setAnchorEl2(null)
    // };


    const openPopover1 = Boolean(anchorEl1);
    // const openPopover2 = Boolean(anchorEl2);

    return (
        // ajuster l'accordion pour que l’icône prenne la place visible quand le menu est fermé
        <div>
            {(category === "superAdmin") && <Accordion expanded={expandedAccordionList === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary
                    aria-controls="panel1d-content"
                    id="panel1d-header"
                    aria-owns={openPopover1 ? "mouse-over-popover" : undefined}
                    aria-haspopup="true"
                    onMouseEnter={handlePopoverOpen1}
                    onMouseLeave={handlePopoverClose1}
                >
                    <StyledAccordionTitle open={openMenu} >Gestion de l'application</StyledAccordionTitle>
                </AccordionSummary>
                {!openMenu && <Popover
                    id="mouse-over-popover"
                    sx={{
                        pointerEvents: 'none',
                    }}
                    open={openPopover1}
                    anchorEl={anchorEl1}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    onClose={handlePopoverClose1}
                    disableRestoreFocus
                >
                    <Typography sx={{ p: 1 }}>Gestion de l'application</Typography>
                </Popover>}
                <AccordionDetails>
                    <ListItemButton onClick={() => navigate('/home/users')}>
                        <ListItemIcon>
                            <PeopleOutlineIcon />
                        </ListItemIcon>
                        <ListItemText primary="Utilisateurs" />
                    </ListItemButton>
                    <ListItemButton onClick={() => navigate('/home/logs')}>

                        <ListItemIcon>
                            <MenuBookIcon />
                        </ListItemIcon>
                        <ListItemText primary="Logs" />
                    </ListItemButton>
                </AccordionDetails>
            </Accordion>}

            {/* Partie à ajouter ultérieurement */}
            {/* {(category === "superAdmin" || category === "admin") && <Accordion expanded={expandedAccordionList === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary
                    aria-controls="panel2d-content"
                    id="panel2d-header"
                    aria-owns={openPopover2 ? 'mouse-over-popover' : undefined}
                    aria-haspopup="true"
                    onMouseEnter={handlePopoverOpen2}
                    onMouseLeave={handlePopoverClose2}
                >
                    <StyledAccordionTitle open={openMenu} >Gestion comptable</StyledAccordionTitle>
                </AccordionSummary>
                {!openMenu && <Popover
                    id="mouse-over-popover"
                    sx={{
                        pointerEvents: 'none',
                    }}
                    open={openPopover2}
                    anchorEl={anchorEl2}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    onClose={handlePopoverClose2}
                    disableRestoreFocus
                >
                    <Typography sx={{ p: 1 }}>Gestion comptable</Typography>
                </Popover>}
                <AccordionDetails>
                    <ListItemButton>
                        <ListItemIcon>
                            <BarChartIcon />
                        </ListItemIcon>
                        <ListItemText primary="Rapports" />
                    </ListItemButton>
                </AccordionDetails>
            </Accordion>} */}
        </div>
    );
}

//Tests du mock à réaliser sur le dashboard