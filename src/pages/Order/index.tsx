/**
 * Gestion de la page Order
 **/
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
    Typography,
    Grid,
    Box,
    Container,
    Skeleton,
    Paper
}
    from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useParams } from 'react-router-dom';

import { UseGetLogInData } from '../../utils/hooks';
import { selectUserInfo } from '../../utils/selectors';
import OrderGeneralTab from '../../components/OrderGeneralTab';
import OrderDetailsTab from '../../components/OrderDetailsTab';
import OrderDeliveryTab from '../../components/OrderDeliveryTab';
import OrderPaymentTab from '../../components/OrderPaymentTab';


type Props = {
    data: any,
    isLoading: boolean
}

type TabPanelProps = {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 0 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


/**
 * Affiche le composant Order présentant les données d'une commande, sous la forme de 4 panels, et permettant la modification de ses dernières, 
 */
export default function Order() {
    const { id } = useParams()


    //State de fonctionnement des tabs
    const [value, setValue] = useState(0);

    //Récupération des données de l'utilisateur dans le store avec son id et son token
    const userInfo = useSelector(selectUserInfo)

    const url: string = `${process.env.REACT_APP_API_ORDERS_URL}/orders/${id}`
    const { data, isLoading }: Props = UseGetLogInData(url, userInfo)

    //Permet le changement tab
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    //Titre de la page
    useEffect(() => {
        document.title = ' GCM-Fiche Commande'
    }, [])

    return (
        <Container maxWidth={"md"} >
            <Paper sx={{ marginBottom: "200px" }} >
                <Grid container display='flex' justifyContent='center' padding={0} flexDirection={"column"}   >
                    {isLoading ? <Skeleton data-testid="skeleton" variant="text" width={"15ch"} sx={{ fontSize: '30px' }} /> :
                        <Typography textTransform={"uppercase"} fontFamily={"lemonade"} component='h2' variant='h2' fontSize={22} fontWeight={800} marginTop={1}>
                            Commande:
                        </Typography>}

                    <Grid item xs={12} sx={{ marginTop: 1, borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value}
                            onChange={handleChange}
                            variant="scrollable"
                            scrollButtons
                            allowScrollButtonsMobile
                            aria-label="scrollable auto tabs">
                            <Tab sx={{ flex: 1 }} label="Général" {...a11yProps(0)} />
                            <Tab sx={{ flex: 1 }} label="Contenu" {...a11yProps(1)} />
                            <Tab sx={{ flex: 1 }} label="Livraison & photos" {...a11yProps(2)} />
                            <Tab sx={{ flex: 1 }} label="Paiement" {...a11yProps(3)} />
                        </Tabs>
                    </Grid>

                    {isLoading ? <Skeleton data-testid="skeleton" variant="rectangular" width={"100%"} height={"30vh"} /> :
                        <Grid item xs={12} marginTop={2} >
                            {/* Section générale */}
                            <TabPanel value={value} index={0}>
                                <OrderGeneralTab
                                    orderData={data}
                                />
                            </TabPanel>


                            {/* Section Contenu de la commande */}
                            <TabPanel value={value} index={1}>
                                <OrderDetailsTab
                                    orderData={data}
                                />
                            </TabPanel>

                            {/* Section Livraison de la commande */}
                            <TabPanel value={value} index={2}>
                                <Grid container display={"flex"} sx={{ gap: { xs: 2, md: 0 } }} gap={'20px'} flexDirection={'column'}>
                                    <OrderDeliveryTab
                                        orderData={data}
                                    />
                                </Grid>
                            </TabPanel>

                            {/* Section paiement de la commande */}
                            <TabPanel value={value} index={3}>
                                <OrderPaymentTab
                                    orderData={data}
                                />
                            </TabPanel>
                        </Grid >}
                </Grid>
            </Paper>
        </Container >
    )
}



