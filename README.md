# OnlineTravel - Plateforme de Réservation de Voyage en Ligne

## Description du Projet
**OnlineTravel** est une plateforme de réservation de voyages en ligne permettant aux utilisateurs de rechercher, réserver et gérer leurs voyages de manière intuitive. Cette application est conçue pour offrir une expérience fluide tant pour les clients que pour les administrateurs gérant les réservations et les statistiques.

## Fonctionnalités Principales
### Côté Utilisateur :
- Recherche et consultation des voyages disponibles
- Réservation et paiement en ligne
- Gestion de l'historique des réservations
- Interface responsive et conviviale

### Côté Administrateur :
- Gestion des voyages et des destinations
- Gestion des utilisateurs et des réservations
- Tableau de bord avec statistiques et suivi des activités
- Interface optimisée pour la gestion facile des données

## Technologies Utilisées
### Frontend :
- **React.js** (Framework JavaScript pour une interface utilisateur dynamique)
- **Material UI** (Bibliothèque de composants pour un design moderne)
- **React Router** (Gestion de la navigation entre les pages)
- **Axios** (Requêtes HTTP pour la communication avec le backend)

### Backend :
- **Node.js & Express.js** (Serveur backend et API REST)
- **MongoDB** (Base de données NoSQL pour stocker les réservations et utilisateurs)
- **Mongoose** (ORM pour interagir avec MongoDB)
- **JWT (JSON Web Token)** (Authentification et sécurisation des utilisateurs)
- **bcrypt.js** (Hachage des mots de passe pour la sécurité)

### Autres Outils :
- **Git & GitHub** (Gestion de version et collaboration)
- **Postman** (Tests des API backend)
- **Vercel / Netlify** (Déploiement du frontend)
- **Railway / Render** (Déploiement du backend)

## Installation et Exécution
### Prérequis :
- **Node.js** installé
- **MongoDB** installé ou une base de données en ligne (MongoDB Atlas)

### Installation :
#### 1. Cloner le dépôt :
```bash
git clone https://github.com/ton-utilisateur/OnlineTravel.git
cd OnlineTravel
```

#### 2. Installation des dépendances :
##### Frontend :
```bash
cd frontend
npm install
```

##### Backend :
```bash
cd backend
npm install
```

### Démarrer le projet :
##### Lancer le backend :
```bash
cd backend
npm start
```

##### Lancer le frontend :
```bash
cd frontend
npm start
```

L'application sera accessible sur `http://localhost:3000/`.

## Structure du Projet
```
OnlineTravel/
│── backend/                # Code serveur (Node.js, Express, MongoDB)
│   ├── models/             # Modèles de données (User, Reservation, Travel)
│   ├── routes/             # Routes API (Auth, Reservation, Travel)
│   ├── controllers/        # Logique des requêtes backend
│   ├── middleware/         # Middlewares (Auth, Validation)
│   ├── config/             # Configuration (Base de données, JWT)
│   ├── server.js           # Point d'entrée du backend
│
│── frontend/               # Code client (React, Material UI)
│   ├── src/
│   │   ├── components/     # Composants réutilisables (Navbar, Footer, Sidebar...)
│   │   ├── pages/          # Pages (Accueil, Statistiques, Réservations...)
│   │   ├── hooks/          # Hooks personnalisés
│   │   ├── services/       # Gestion des requêtes API
│   │   ├── App.js          # Composant principal
│   │   ├── index.js        # Point d'entrée du frontend
│
│── README.md               # Documentation du projet
│── package.json            # Dépendances et scripts
│── .gitignore              # Fichiers à exclure de Git
```

## Améliorations Futures
- Intégration d'un système de paiement en ligne
- Notifications par email pour les confirmations de réservation
- Ajout d'un système de recommandations de voyage
- Version mobile-friendly optimisée

## Auteur
- **Lovasoa Nantenaina** | [LinkedIn](https://linkedin.com/in/LovasoaNantenaina) | [GitHub](https://github.com/LovaxCoding)



