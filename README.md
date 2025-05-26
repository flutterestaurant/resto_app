# Resto App

## Contexte & Objectifs

### Présentation du restaurant

Le restaurant "Le gourmet Francais" propose une expérience culinaire unique, combinant une cuisine raffinée et un cadre
chaleureux. Il s'adresse à une clientèle variée, allant des familles aux professionnels en quête d'un lieu convivial
pour leurs repas.

### Objectif de l'application

L'application a pour but de simplifier et d'améliorer l'expérience client en permettant :

- La prise et la gestion des réservations.
- La consultation du menu.

### Fonctionnalités Principales

- Consulter la disponibilité des tables.
- Réserver une table.
- Modifier ou annuler une réservation.

### Front-end Flutter

- Écran d’accueil avec menu du restaurant.
- Recherche de date/heure pour réservation.
- Formulaire de réservation (nom, téléphone, nombre de couverts).
- Système de création de compte/connexion avant réservation (email/mot de passe).

### API

- Endpoints CRUD pour les entites
- Endpoint pour connexion et création de compte.

## Contraintes Techniques & Choix de Stack

- **Mobile** : Flutter
- **API** : Node.js/Express
- **Base de données** : MySQL
- **Authentification** : JWT

## Installation et Configuration

### backend

- ajouter un fichier `.env` dans le dossier `backend` avec les variables d'environnement nécessaires :
    - `JWT_SECRET`
      Vous pouvez par exemple utiliser `pouetpouetpouet` pour clé secrète.
- Installer les dépendances :
  ```bash
  npm install
  ```
- Lancer le serveur :
```bash
  npm run dev
```

### frontend
- Setup Flutter normalement et lancer l'application
