# TP – API de Gestion de Cours en Ligne

[![Tests](https://img.shields.io/badge/tests-passing-brightgreen)](https://github.com/Thib454/tp-courses-api)  
[![Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen)](https://github.com/Thib454/tp-courses-api)

---

## 📝 Description

API REST pour gérer une plateforme de cours en ligne :  
- Gestion des **cours** et **catégories**  
- Authentification **JWT** avec rôles (`instructor`, `admin`)  
- Validation des données avec **express-validator**  
- Documentation Swagger disponible sur `/api-docs`  

---

## ⚡ Fonctionnalités principales

- Authentification : `register`, `login`  
- CRUD **cours** (création/modification réservée aux rôles)  
- CRUD **catégories** (admin uniquement)  
- Recherche et filtrage (bonus)  
- Statistiques (bonus)  

---

## 🧪 Tests

- Tests unitaires avec **Jest** dans `__tests__`  
- Tests couvrent les services (`courseService`, `categoryService`)  
- Lancer les tests :
    npm test
    Rapport de couverture :
    npx jest --coverage
    npm run test:coverage

---

## 💻 Installation & lancement

git clone git@github.com:Thib454/tp-courses-api.git
cd tp-courses-api
npm install

Lancer l’API :
npm start
Swagger : http://localhost:3000/api-docs

---

## 📌 Routes disponibles

### Authentification

| Méthode | Endpoint        | Description                          | Accès  |
|---------|----------------|--------------------------------------|--------|
| POST    | /auth/register | Inscription d’un nouvel utilisateur | Public |
| POST    | /auth/login    | Connexion et génération du JWT       | Public |

### Cours (Course)

| Méthode | Endpoint                | Description                          | Accès            |
|---------|------------------------|--------------------------------------|----------------|
| GET     | /courses               | Récupérer tous les cours publiés     | Public         |
| GET     | /courses/:id           | Récupérer un cours par son ID       | Public         |
| POST    | /courses               | Créer un cours                       | Instructor/Admin |
| PUT     | /courses/:id           | Modifier un cours                    | Instructor/Admin |
| DELETE  | /courses/:id           | Supprimer un cours                   | Admin          |

### Catégories (Category)

| Méthode | Endpoint           | Description                           | Accès |
|---------|------------------|---------------------------------------|-------|
| GET     | /categories       | Récupérer toutes les catégories      | Public |
| GET     | /categories/:id   | Récupérer une catégorie avec ses cours | Public |
| POST    | /categories       | Créer une nouvelle catégorie         | Admin  |

### Utilisateurs (User)

| Méthode | Endpoint | Description                    | Accès |
|---------|---------|--------------------------------|-------|
| GET     | /users  | Récupérer tous les utilisateurs | Admin |