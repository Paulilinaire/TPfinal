# **TimeFlow**

## Configuration

Pour lancer le projet il faut avant tout créer un fichier **.env** à la racine du dossier back.

Dans ce dossier vous avez plusieurs variables à indiquer :

- **DATABASE_HOST** qui est l'hébergeur de la base de données
- **DATABASE_PORT** le port de la base de données
- **DATABASE_NAME** le nom de la base de données
- **DATABASE_USERNAME** l'identifiant de la base de données
- **DATABASE_PASS** le mot de passe de la base de données
- **PORT** le port de lancement du serveur

Le serveur utilise **JWT** pour générer les tokens et fonctionne avec une authentification **Bearer**

## Routes

### Routes accessibles

- **_GET/api/job-title_** permet de récupérer toutes les fonctions des employés
- **_GET /api/role_** permet de récupérer une liste des différents rôles
- **_POST /api/auth/user_** permet à un utilisateur de se connecter
  - _email_ : adresse mail
  - _password_ : mot de passe
- **_POST/api/auth/admin_** permet à un administrateur de se connecter
  - _mail_ : adresse mail
  - _password_ : mot de passe

### Routes qui ont besoin d'une connexion

- **_GET /api/user/pointing/start_** permet à un utilisateur de pointer son arrivée
- **_GET /api/user/pointing/end_** permet à un utilisateur de pointer son départ
- **_POST /api/user/pointing/week_** permet à un utilisateur de récupérer ses heures de travail, ses heures supp de la semaine ainsi que ses différents pointages d'un jour
  - _date_ date à laquelle ont veut récupérer les pointages (**format yyyy-MM-dd**)

### Routes pour les administrateurs

- **_POST /api/admin/users_** Création d'un compte

  - _role_ le role du compte
  - _jobTitle_ la fonction de la personne
  - _firstname_ le prénom
  - _lastname_ le nom
  - _email_ l'adresse mail

- **_GET /api/admin/users_** Récupérer la liste des comptes
- **_GET /api/admin/users/:id_** Récupére un compte
  - _id_ l'id du compte
- **_PUT /api/admin/users/:id_** Modifie un compte
  - _id_ l'id du compte
- **_DELETE /api/admin/users/:id_** Supprime un compte
  - _id_ l'id du compte
- **_POST /api/admin/users/pointing/month_** Récupére les pointages du mois précédent et calcul les heure travaillés et les heures supp
  - _date_ date à laquelle ont veut récupérer les pointages (**format yyyy-MM-dd\***)
  - _id_ l'id du compte que l'on veut récupérer les pointages

### Lancement du projet

Au moment du lancement du projet, le serveur va générer 2 comptes si il n'existe ni d'administrateur ni d'utilisateur, le premier est un **admin** qui a pour log:

- email: **admin@mail.fr**
- password: **admin**

Le second est un **utilisateur** :

- email: **user@mail.fr**
- password: **user**

Après avoir créer un utilisateur le serveur va générer des pointages pour celui-ci allant de janvier à mars 2024
