# Skillogs - Lien vers le site

https://poc-skillogs.vercel.app/

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

## 🛠️ Stack Technique & Choix Technologiques

### Stack Actuelle (POC)

#### Next.js
Choisi pour le POC pour plusieurs raisons :
- **Développement Rapide** : Front et back dans le même projet
- **API Routes** : Création rapide d'endpoints sans configuration complexe
- **App Router** : Routing moderne et performant
- **Full-Stack** : Un seul langage (TypeScript) pour tout le projet
- **Déploiement Simplifié** : Déploiement facile sur Vercel
- **Hot Reload** : Développement fluide et rapide

#### PostgreSQL
Base de données choisie pour :
- **Fiabilité** : SGBD mature et stable
- **Performances** : Excellentes performances pour les requêtes complexes
- **JSON natif** : Support natif des données JSON
- **Scalabilité** : Possibilité de monter en charge
- **Hébergement facile** : Nombreuses options d'hébergement (Vercel, Supabase, etc.)

#### Prisma
ORM moderne offrant :
- **Type Safety** : Typage fort avec TypeScript
- **Migrations automatiques** : Gestion facile des schémas
- **Client généré** : Auto-complétion et validation
- **Studio** : Interface de gestion de la base de données

### Stack Recommandée pour Production

Pour une version production, une architecture plus robuste serait recommandée :

#### Backend : NestJS
Avantages pour une application en production :
- **Architecture robuste** : Structure modulaire et organisée
- **Scalabilité** : Meilleure gestion des gros projets
- **Microservices** : Support natif des microservices
- **Dependency Injection** : Architecture plus testable
- **Documentation** : Swagger intégré
- **Sécurité** : Nombreux modules de sécurité intégrés
- **Performances** : Excellentes performances en production
- **WebSockets** : Gestion native des WebSockets
- **Caching** : Système de cache intégré
- **Queue** : Gestion des tâches asynchrones

#### Frontend : Angular
Idéal pour une application enterprise :
- **TypeScript natif** : Typage fort par défaut
- **RxJS** : Gestion avancée des états et événements
- **Modules** : Organisation claire du code
- **Tests** : Environnement de test complet
- **Performances** : Excellent pour les grosses applications
- **Sécurité** : Sécurité renforcée par défaut
- **Maintenance** : Plus facile à maintenir sur le long terme
- **Enterprise Ready** : Parfait pour les applications professionnelles

#### Base de données : PostgreSQL (maintenu)
Avec ajouts :
- **Réplication** : Pour la haute disponibilité
- **Sharding** : Pour la scalabilité horizontale
- **Backup automatisé** : Pour la sécurité des données
- **Monitoring** : Outils de surveillance

#### Infrastructure Additionnelle
Pour une version production :
- **Docker** : Conteneurisation
- **CI/CD** : Pipeline d'intégration continue


### Lancer le projet


1.Récupérer le projet :
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

