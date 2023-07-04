/**
 * Gestion du component Helper
 **/

import { Grid, Typography } from "@mui/material";

import BasicAccordion from "../../components/BasicAccordion";
import { colors } from "../../utils/style/variables";

type ListProps = {
    title: string,
    content: string
}

/**
 * Affiche le component Helper regroupant les informations nécessaires pour utiliser l'application 
 */
export default function Helper() {

    //Liste de l'accordion de la page Login
    const loginList: Array<ListProps> = [
        {
            title: "Se connecter",
            content: "Vous pouvez vous connecter sur cette page en entrant votre adresse émail et votre mot de passe. En cas d'erreur une alerte rouge apparaîtra. Au bout de 3 erreurs vous devrez patienter 15 minutes avant toute nouvelle tentative"
        },
        {
            title: "Retrouver son mot de passe",
            content: "En cas d'oubli, vous pouvez demandez la réinitialisation de votre mot de passe en cliquant sur le lien correspondant seulement après avoir entrer votre adresse émail. Un émail contenant un lien vous sera envoyé"
        }
    ]

    //Liste de l'accordion du menu de navigation
    const navigationMenu: Array<ListProps> = [
        {
            title: "Mon compte",
            content: "Est représenté par un avatar avec vos initiales. Permet d'accéder à vos informations et de modifier certaines d'entre elles."
        },
        {
            title: "Tableau de bord",
            content: "Composant par défaut de la page Home. Affiche de manière brève plusieurs informations comme les commandes proches. Permet grâce au lanceur rapide en bas à droite de lancer l'ajout d'un nouvel utilisateur, d'un nouveau client ou d'une nouvelle commande"
        },
        {
            title: "Commandes",
            content: "Accès au tableau des commandes, qui permet de les consulter ,modifier ou ajouter une commande"
        },
        {
            title: "Clients",
            content: "Accès au tableau des clients, qui permet de les consulter ,modifier ou ajouter un client"
        },
        {
            title: "Utilisateurs",
            content: "Accès au tableau des utilisateurs, qui permet de les consulter ,modifier ou ajouter un utilisateur (si vous êtes un administrateur)"
        },
        {
            title: "Journal de connexion",
            content: "Accès au tableau des connexions, qui permet d'avoir la liste des utilisateurs connectés (si vous êtes un administrateur)"
        }
    ]

    //Liste de l'accordion newOrder
    const newOrderSteps: Array<ListProps> = [
        {
            title: "Choix du client",
            content: "Vous devez sélectionner le client destinataire de la commande. Vous avez le choix entre les clients déjà présents dans le champ de sélection, ou vous pouvez ajouter de manière rapide un client en cliquant sur le bouton correspondant puis en complétant le formulaire."
        },
        {
            title: "Requête du client",
            content: "Vous entrerez une par une les demandes du client en cliquant sur ajouter une pâtisserie, puis en complétant le formulaire. L'onglet service ici correspond à une option spécifique à cette patisserie comme une décoration spéciale. Vous renseignerez ensuite l'évènement célébré par le client et le moyen utilisé pour passer cette commande."
        },
        {
            title: "Livraison",
            content: "Vous entrerez ici les information de livraison. Dans un premier lieu, vous préciserez si la livraison est incluse ou non, si c'est le cas vous devrez entrez l'adresse de livraison. Vous devrez ensuite choisir la date et l'heure de livraison. L'application vous préviendra si vous avez des commandes prévues pour le jour sélectionné, et vous pourrez voir ces dernières dans un tableau et meme plus en détail en cliquant dessus. Vous pourrez ajouter un commentaire si vous en avez besoin. sur la livraison ou si le client a une demande supplémentaire"
        },
        {
            title: "Résumé",
            content: "Vous pourrez voir un résumé de toutes informations de la commande avant de la valider. Vous pouvez revenir aux étapes précédentes en cas d'erreur. Les informations entrées ne seront pas effacées sauf si vous les modifier,supprimer ou si vous quittez la page d'ajout de commande"
        }
    ]

    //Liste de l'accordion du panel général
    const generalPanel: Array<ListProps> = [
        {
            title: "Choix du client",
            content: "Affiche le nom du client, modifiable en cliquant sur l’icône juste à coté du mot 'client'"
        },
        {
            title: "Nombre de requêtes ",
            content: "Juste en dessous du client, on trouve le nombre de requêtes constituant la commande"
        },
        {
            title: "Status de la commande",
            content: "Modifiable en cliquant sur la bouton 'mettre à jour'"
        },
        {
            title: "Moyen de contact",
            content: "Modifiable en cliquant sur la bouton 'mettre à jour'"
        },
        {
            title: "Évènement",
            content: "Modifiable en cliquant sur la bouton 'mettre à jour'"
        },
        {
            title: "Commentaires généraux",
            content: "Modifiable en cliquant sur la bouton 'mettre à jour'"
        },
        {
            title: "Évaluation",
            content: "Modifiable en cliquant sur la bouton 'mettre à jour, mais ajout possible seulement quand le status de la commande est à 'devis validé','commande livrée' ou 'commande annulée'"
        },
        {
            title: "Médium utilisé par le client pour laisser l'évaluation",
            content: "Modifiable en cliquant sur la bouton 'mettre à jour, mais ajout possible seulement quand le status de la commande est à 'devis validé','commande livrée' ou 'commande annulée'"
        },
        {
            title: "Suppression de la commande",
            content: "La commande peut être supprimée ici en cliquant sur le bouton correspondant."
        }
    ]

    //Liste de l'accordion de l'onglet contenu
    const detailsPanel: Array<ListProps> = [
        {
            title: "Requêtes",
            content: "Affiche les requêtes du client, modifiable ou supprimable en cliquant dessus. Il est possible d'ajouter une nouvelle patisserie de la même façon que pour nouvelle commande, en cliquant sur l'onglet correspondant"
        },
        {
            title: "Ajouter un devis ",
            content: "C'est ici que vous constituerez le devis avec le prix proposé au client, sa constitution est détaillé juste après la description des onglets. Vous pourrez supprimer ou valider un devis. Le devis validé apparaîtra en couleur"
        }
    ]

    //Liste de l'onglet livraison et photos
    const deliveryPanel: Array<ListProps> = [
        {
            title: "Horaires",
            content: "Affiche l'heure de retrait de la commande, modifiable en cliquant sur 'mettre à jour'."
        },
        {
            title: "Retrait ",
            content: "Lieu de livraison (à retirer si l'option n'est pas sélectionnée) ainsi que les commentaires sur la livraison, modifiable en cliquant sur 'mettre à jour'."
        },
        {
            title: "Photos ",
            content: "Affiche les photos partagées en 2 catégories:début et fin de projet. Cliquez sur l’icône pour ajouter une photo, et pour la supprimer, appuyer sur la photo puis le bouton correspondant. "
        },

    ]

    //Liste de l'onglet paiement
    const paymentPanel: Array<ListProps> = [
        {
            title: "Status du paiement et montant total du",
            content: "Affiches les données citées qui ne sont pas directement modifiables."
        },
        {
            title: "Mettre à jour le paiement ",
            content: "En cliquant sur le bouton, vous pouvez une somme payée par le client accompagnée de la méthode de paiement utilisée."
        },
        {
            title: "Correction de la somme payée et de la méthode de paiement ",
            content: "En cas d'erreur dans l'entrée du paiement, vous pouvez corriger la somme ou la méthode en cliquant sur 'mettre à jour' puis sur le bouton à coté de montant payé par le client."
        },
        {
            title: "Remboursement ",
            content: "Le remboursement est demandé ici, avec tous les renseignements nécessaires pur sa gestion."
        },

    ]

    //Liste des étapes du devis
    const quotationSteps: Array<ListProps> = [
        {
            title: "Ajout d'une patisserie",
            content: "Ajout répondant à la requête du client, par défaut les cases quantité et taille sont remplies avec les valeurs des requêtes, vous devrez ajouter le prix"
        },
        {
            title: "Services ",
            content: "Option choisies par le client avec leur description et le prix. Si la livraison a été choisie, vous devrez entrer son prix dans cette partie"
        },
        {
            title: "Récapitulatif ",
            content: "Résumé du devis avec possibilité de rajouter une réduction si désirée."
        }
    ]

    //Liste des étapes des clients
    const CustomersList: Array<ListProps> = [
        {
            title: "Ajout d'un client",
            content: "Seuls le nom, le prénom et le numéro de téléphone sont obligatoires."
        },
        {
            title: "Détail d'un client ",
            content: "Informations sur le client avec ses commandes. On peut ouvrir le tableau des commandes du clients où elles seront toutes affichées. La fiche client peut être supprimée "
        },
        {
            title: "Modification ",
            content: "Cliquez sur mettre à jour pour modifier la fiche."
        }
    ]

    //Liste des étapes des utilisateurs
    const UsersList: Array<ListProps> = [
        {
            title: "Ajout d'un utilisateur",
            content: "Seuls le nom, le prénom et le numéro de téléphone sont obligatoires."
        },
        {
            title: "Détail d'un utilisateur ",
            content: "Informations sur l'utilisateur avec ses commandes. La fiche utilisateur peut être supprimée "
        },
        {
            title: "Modification ",
            content: "Cliquez sur mettre à jour pour modifier la fiche."
        }
    ]

    return (
        <Grid container margin={'0 auto'} paddingBottom={"350px"} maxWidth={'md'} display={'flex'} flexDirection={'column'} >
            {/* Titre */}
            <Grid marginTop={'10px'} gap={'20px'}>
                <Typography component={'h2'} fontWeight={900} fontSize={'3rem'}>FAQ</Typography>
                <Typography>Vous trouverez ici la marche à suivre pour pleinement utiliser l'application</Typography>
            </Grid>

            {/* Marche à suivre */}
            <Grid display={'flex'} flexDirection={'column'} gap={"15px"} marginTop={"25px"}>

                {/* Page de connexion */}
                <Grid>
                    <Typography component={'h3'} fontSize={"1.4rem"} fontWeight={900} color={colors.primary}>Page de connexion</Typography>
                    <Grid width={"95%"} margin={"0 auto"}>
                        <Typography marginBottom={"10px"}>Deux actions sont disponibles ici:</Typography>
                        <BasicAccordion
                            name={"login"}
                            list={loginList}
                        />
                    </Grid>
                </Grid>

                {/* Première connexion */}
                <Grid>
                    <Typography component={'h3'} fontSize={"1.4rem"} fontWeight={900} color={colors.primary}>Vérification du mot de passe</Typography>
                    <Grid width={"95%"} margin={"0 auto"}>
                        <Typography>Avant de pouvoir vous connecter, après la création de votre compte par un administrateur qui vous communiquera votre mot de passe, vous recevrez un émail avec un lien de confirmation de votre compte. Veuillez alors suivre les instructions pour accéder à votre compte.</Typography>
                    </Grid>
                </Grid>

                {/* Réinitialisation du mot de passe */}
                <Grid>
                    <Typography component={'h3'} fontSize={"1.4rem"} fontWeight={900} color={colors.primary}>Entrer un nouveau mot de passe</Typography>
                    <Grid width={"95%"} margin={"0 auto"}>
                        <Typography marginBottom={"10px"}>Après avoir demander la réinitialisation du mot de passer et reçu le mail, vous serez diriger vers une page où vous pourrez alors choisir votre nouveau mot de passe.</Typography>
                    </Grid>
                </Grid>

                {/* Page d’accueil */}
                <Grid>
                    <Typography component={'h3'} fontSize={"1.4rem"} fontWeight={900} color={colors.primary}>Page Home</Typography>
                    <Grid width={"95%"} margin={"0 auto"}>
                        <Typography marginBottom={"10px"}>Une fois connecté, vous arriverez sur la page home. Sur la gauche vous trouverez le menu navigation. Si vous êtes administrateur ou plus, vous avez accès à l'onglet "gestion de l'application"</Typography>
                        <BasicAccordion
                            name={"menu"}
                            list={navigationMenu}
                        />
                    </Grid>
                </Grid>

                {/* Page Mon compte */}
                <Grid>
                    <Typography component={'h3'} fontSize={"1.4rem"} fontWeight={900} color={colors.primary}>Page Mon compte</Typography>
                    <Grid width={"95%"} margin={"0 auto"}>
                        <Typography marginBottom={"10px"}>Permet d'accéder à ses informations, et de modifier le prénom et le nom. En cliquant sur modifier votre mot de passe, un émail contenant un lien de réinitialisation sera envoyée à l'adresse renseignée.</Typography>

                    </Grid>
                </Grid>

                {/* Page Commandes */}
                <Grid>
                    <Typography component={'h3'} fontSize={"1.4rem"} fontWeight={900} color={colors.primary}>Page Commandes</Typography>
                    <Grid width={"95%"} margin={"0 auto"}>
                        <Typography marginBottom={"10px"}>Permet d'accéder au tableau des commandes. En cliquant sur une commande vous accéder à la page des détails de cette dernière. En cliquant sur archivés, vous pouvez voir les commandes dont la date de livraison est antérieure à la date du jour. Cliquer sur ajouter en bas à droite pour créer une nouvelle commande.</Typography>
                    </Grid>
                </Grid>

                {/* Page Ajouter une commande */}
                <Typography component={'h3'} fontSize={"1.4rem"} fontWeight={900} color={colors.primary}>Page Nouvelle commande</Typography>
                <Grid width={"95%"} margin={"0 auto"}>
                    <Typography marginBottom={"10px"}>Permet de créer une commande, se déroule en 4 étapes</Typography>
                    <BasicAccordion
                        name={"newOrder"}
                        list={newOrderSteps}
                    />
                </Grid>

                {/* Page Détail d'une commande */}
                <Typography component={'h3'} fontSize={"1.4rem"} fontWeight={900} color={colors.primary}>Page Commande</Typography>
                <Grid width={"95%"} margin={"0 auto"} display={'flex'} flexDirection={'column'} gap={'15px'}>
                    <Typography marginBottom={"10px"}>Affiche les détails d'une commande, et permet leur modification. Elle est articulée en 4 onglets.</Typography>

                    {/* Onglet général */}
                    <Grid width={"95%"} margin={"0 auto"}>
                        <Typography marginBottom={'15px'} component={'h4'} fontSize={"1.2rem"} fontWeight={900} color={colors.primary}>Onglet général</Typography>
                        <BasicAccordion
                            name={"generalPanel"}
                            list={generalPanel}
                        />
                    </Grid>

                    {/* Onglet contenu */}
                    <Grid width={"95%"} margin={"0 auto"}>
                        <Typography marginBottom={'15px'} component={'h4'} fontSize={"1.2rem"} fontWeight={900} color={colors.primary}>Onglet contenu</Typography>
                        <BasicAccordion
                            name={"detailsPanel"}
                            list={detailsPanel}
                        />
                    </Grid>

                    {/* Onglet contenu */}
                    <Grid width={"95%"} margin={"0 auto"}>
                        <Typography marginBottom={'15px'} component={'h4'} fontSize={"1.2rem"} fontWeight={900} color={colors.primary}>Onglet contenu</Typography>
                        <BasicAccordion
                            name={"detailsPanel"}
                            list={detailsPanel}
                        />
                    </Grid>

                    {/* Onglet Livraison & photos */}
                    <Grid width={"95%"} margin={"0 auto"}>
                        <Typography marginBottom={'15px'} component={'h4'} fontSize={"1.2rem"} fontWeight={900} color={colors.primary}>Onglet Livraison et photos</Typography>
                        <BasicAccordion
                            name={"deliveryPanel"}
                            list={deliveryPanel}
                        />
                    </Grid>

                    {/* Onglet Paiement */}
                    <Grid width={"95%"} margin={"0 auto"}>
                        <Typography marginBottom={'15px'} component={'h4'} fontSize={"1.2rem"} fontWeight={900} color={colors.primary}>Onglet Paiement</Typography>
                        <BasicAccordion
                            name={"paymentPanel"}
                            list={paymentPanel}
                        />
                    </Grid>

                    {/*Ajout du devis */}
                    <Grid width={"95%"} margin={"0 auto"}>
                        <Typography marginBottom={'15px'} component={'h4'} fontSize={"1.2rem"} fontWeight={900} color={colors.primary}>Ajouter un devis</Typography>
                        <Grid width={"95%"} margin={"0 auto"}>
                            <Typography marginBottom={'15px'} >Le constructeur de devis se déroule en plusieurs étapes selon le nombre de requêtes, avec un ajout de patisserie par requête.</Typography>
                            <BasicAccordion
                                name={"quotations"}
                                list={quotationSteps}
                            />
                        </Grid>
                    </Grid>
                </Grid>

                {/* Page Clients */}
                <Grid>
                    <Typography component={'h3'} fontSize={"1.4rem"} fontWeight={900} color={colors.primary}>Page Clients</Typography>
                    <Grid width={"95%"} margin={"0 auto"}>
                        <Typography marginBottom={"10px"}>Permet d'accéder au tableau des clients. En cliquant sur un client vous accéder à la page des détails de ce dernier.Vous pouvez ajouter un client en cliquant sur le bouton correspondant.</Typography>
                        <BasicAccordion
                            name={"customers"}
                            list={CustomersList}
                        />
                    </Grid>
                </Grid>

                {/* Page Utilisateurs */}
                <Grid>
                    <Typography component={'h3'} fontSize={"1.4rem"} fontWeight={900} color={colors.primary}>Page Utilisateurs</Typography>
                    <Grid width={"95%"} margin={"0 auto"}>
                        <Typography marginBottom={"10px"}>Permet d'accéder au tableau des utilisateurs si vous êtes un administrateur. En cliquant sur un utilisateur vous accéder à la page des détails de ce dernier.Vous pouvez ajouter un utilisateur en cliquant sur le bouton correspondant.</Typography>
                        <BasicAccordion
                            name={"users"}
                            list={UsersList}
                        />
                    </Grid>
                </Grid>

                {/* Page Journal de connexion */}

            </Grid>

        </Grid>
    )
}