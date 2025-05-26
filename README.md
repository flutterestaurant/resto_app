# Resto App

## Contexte & Objectifs

### Présentation du restaurant
Le restaurant "Resto App" propose une expérience culinaire unique, combinant une cuisine raffinée et un cadre chaleureux. Il s'adresse à une clientèle variée, allant des familles aux professionnels en quête d'un lieu convivial pour leurs repas.

### Objectif de l'application
L'application a pour but de simplifier et d'améliorer l'expérience client en permettant :
- La prise et la gestion des réservations.
- La consultation du menu.
- La gestion des disponibilités des tables.

## Cibles & Rôles Utilisateurs

### Client
- Consulter la disponibilité des tables.
- Réserver une table.
- Modifier ou annuler une réservation.

### Hôte/Serveur (Back-office)
- Consulter la liste des réservations.
- Valider ou refuser des réservations.
- Gérer le plan de salle.

### (Éventuellement) Admin
- Gérer les menus.
- Configurer les plages horaires.
- Ajouter ou supprimer des restaurants.

## Fonctionnalités Principales

### Front-end Flutter (Mobile)
- Écran d’accueil avec menu du restaurant.
- Recherche de date/heure pour réservation.
- Formulaire de réservation (nom, téléphone, nombre de couverts).
- Confirmation et rappel via notifications push ou e-mail.
- (Optionnel) Système de création de compte/connexion avant réservation (email/mot de passe).

### API
- Endpoints CRUD pour les réservations (GET /reservations, POST /reservations, etc.).
- Gestion de la disponibilité des créneaux.
- (Optionnel) Endpoint pour connexion et création de compte.

### (Optionnel) Web/App
- Interface responsive avec les mêmes fonctionnalités que l’application mobile.

## Contraintes Techniques & Choix de Stack

- **Mobile** : Flutter (Dart, version ≥ 3.0).
- **API** : Node.js/Express ou PHP (ou équivalent).
- **Base de données** : MySQL (ou équivalent).
- **Authentification** : Simple token (JWT) (ou équivalent).
