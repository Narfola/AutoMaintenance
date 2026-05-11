🚗 AutoMaintenance

AutoMaintenance est une application mobile développée avec React Native (Expo) et Supabase. Elle permet de gérer une flotte de véhicules, d'enregistrer les intervalles d'entretien et de calculer précisément la prochaine révision en fonction du dernier entretien effectué.
✨ Fonctionnalités

    Gestion de flotte : Ajoutez ou supprimez des modèles de véhicules (Marque, Modèle, Intervalle KM).

    Calcul intelligent : Calcule l'échéance de l'entretien basé sur le kilométrage du dernier passage au garage.

    Alertes de retard : Indique le nombre de kilomètres restants ou le dépassement de l'échéance.

    Base de données Cloud : Synchronisation en temps réel avec Supabase.

    Sécurité : Intégration des Row Level Security (RLS) pour protéger les données.

🛠️ Stack Technique

    Framework : React Native avec Expo (Expo Router).

    Backend : Supabase (PostgreSQL & Auth).

    Langage : TypeScript.

    Style : JSS (StyleSheet).

🚀 Installation

    1. Cloner le dépôt
    Bash

    git clone https://github.com/ton-pseudo/auto-maintenance.git
    cd auto-maintenance

    2. Installer les dépendances
    npm install
    ```

3.  **Configurer les variables d'environnement**
    Créez un fichier `.env` à la racine et ajoutez vos identifiants Supabase :
    
```env
    EXPO_PUBLIC_SUPABASE_URL=votre_url_supabase
    EXPO_PUBLIC_SUPABASE_ANON_KEY=votre_cle_anon
    ```

4.  **Lancer l'application**
    
```bash
    npx expo start
    ```
    Appuyez sur `i` pour iOS, `a` pour Android ou scannez le QR code avec l'application **Expo Go**.

## 📊 Structure de la base de données (Supabase)

Pour faire fonctionner l'application, créez une table `modeles_voitures` avec les colonnes suivantes :

| Colonne | Type | Description |
| :--- | :--- | :--- |
| `id` | uuid | Clé primaire (générée automatiquement) |
| `marque` | text | Marque du véhicule |
| `nom_modele` | text | Nom du modèle |
| `intervalle_km` | int4 | Kilométrage entre deux entretiens |
| `intervalle_mois` | int4 | (Optionnel) Durée entre deux entretiens |

## 🔒 Sécurité (RLS)

N'oubliez pas d'activer les **Policies RLS** sur Supabase pour autoriser :
*   `SELECT` : Pour lire les modèles.
*   `INSERT` : Pour ajouter de nouveaux véhicules.
*   `DELETE` : Pour supprimer des véhicules.
