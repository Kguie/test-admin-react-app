# TEST-App Admin-app #

Ce projet est une application réalisée sous React, ayant pour but la gestion administrative d'une patisserie (mais adaptable à un autre domaine).


## Principales options disponibles

La version actuelle prend en compte:

    ● La gestion des utilisateurs pouvant se connecter à l'application

    ● La gestion des clients

    ● La gestion des commandes avec la création de devis et l'ajout de photos


### Backend

Le backend Orders permettant la gestion des utilisateurs, des clients, et des commandes est en place.  [Le repository se trouve ici](https://github.com/Kguie/TEST-app-back-order-ts.git)

### Front-end installation 

Cloner ce repository et lancer `yarn install` pour installer les dépendances.
Le dossier .env doit contenir:
    ● REACT_APP_API_URL: Url de l'application react ("http://localhost:3000" par défaut)
    ● REACT_APP_CHIEF_ADMIN_EMAIL: émail de l'admin de l'application        

### Front-end utilisation 

Utiliser  `yarn start` pour lancer l'application
Ouvrir [http://localhost:3000](http://localhost:3000) pour le  voir dans le navigateur.

Veuillez créer un premier utilisateur en cliquant sur le lien correspondant sur la page de connexion. Vous pourrez rajouter l'émail utilisée à .env dans REACT_APP_CHIEF_ADMIN_EMAIL
    



