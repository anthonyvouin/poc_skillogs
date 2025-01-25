# Skillogs - Chatbot de Questions/Réponses

Une application web moderne permettant de gérer une base de connaissances sous forme de questions/réponses, avec une interface d'administration sécurisée et un chatbot pour les utilisateurs.

## 🎯 Fonctionnalités Détaillées

### 🤖 Chatbot
- Interface de chat intuitive pour les utilisateurs
- Réponses instantanées basées sur la base de connaissances

### 👥 Espace Public
- Page d'accueil avec le chatbot intégré
- Pas besoin de compte pour poser des questions
- Accès rapide aux informations recherchées

### 🔐 Authentification Admin
- Système de connexion sécurisé avec JWT
- Gestion des sessions avec cookies

### 📊 Panel Administrateur
1. **Gestion des Questions**
   - Création de nouvelles questions avec :
     * Titre de la question
     * Réponse détaillée
     * Catégorie
     * Mots-clés associés
   - Modification des questions existantes
   - Suppression de questions
   - Vue en temps réel des modifications

2. **Organisation du Contenu**
   - Filtrage des questions par catégorie
   - Système de catégorisation flexible
   - Gestion des mots-clés pour améliorer la recherche
   - Interface de liste claire et organisée

3. **Interface Utilisateur Admin**
   - Design moderne en noir et blanc
   - Navigation intuitive
   - Formulaires de saisie optimisés

4. **Fonctionnalités de la Liste des Questions**
   - Tri par date de création/modification
   - Recherche rapide
   - Filtres par catégorie
   - Actions rapides (éditer/supprimer)

5. **Gestion des Questions**
   - Modal de création/édition avec :
     * Validation des champs requis
     * Prévisualisation
     * Gestion des mots-clés


### Lancer le projet


2.Récupérer le projet :
```bash
git clone [url_du_repo]
cd skillogs
```

2. Installer les dépendances :
```bash
npm install
```

3. Configurer les variables d'environnement :
```bash
cp .env.example .env
```

4. Remplir le fichier `.env` avec :
```
DATABASE_URL="postgresql://..."
JWT_SECRET="votre_secret_jwt"
```

5. Initialiser la base de données :
```bash
npx prisma migrate dev
npx prisma db seed
```

6. Lancer l'application :
```bash
npm run dev
```

