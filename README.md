# Application de Règlement par Virement Bancaire SEPA

Application web moderne, réactive et sécurisée développée en **React 19**, **Vite**, **Tailwind CSS v4** et **Lucide React**.

Cette application remplace l'ancien projet obsolète par une architecture propre, conforme aux standards actuels du web et axée sur la transparence financière et la sécurité des usagers.

---

## 1. Fonctionnalités et Workflow en 3 Étapes

Le parcours utilisateur se déroule en trois étapes fluides avec validation en temps réel et préservation de l'état :

1. **Étape 1 – Informations du dossier (`InformationPage.jsx`)**
   - Saisie et validation du numéro de référence du dossier (`reference`), du nom du redevable et de l'e-mail de contact.
   - Validation stricte des données avant d'autoriser le passage à l'étape suivante.
   - Préservation des données saisies lors des allers-retours.
   - Respect strict de la vie privée (aucune donnée bancaire sensible, ni numéro de carte, ni mot de passe collecté).

2. **Étape 2 – Conditions Générales (`TermsPage.jsx`)**
   - Affichage intégral des deux clauses réglementaires en français exact :
     - *1. Modalités de règlement par virement bancaire*
     - *2. Conditions générales et acceptation*
   - Case à cocher obligatoire : **« J'ai lu et j'accepte les conditions générales »** (initialement décochée).
   - Bouton de poursuite désactivé tant que la case n'est pas cochée.
   - Bouton de retour permettant de modifier les informations de l'Étape 1.

3. **Étape 3 – Bordereau d'Instructions de Virement / Facture (`InvoicePage.jsx`)**
   - Mise en page financière professionnelle façon document officiel / bordereau d'émission.
   - Encart d'avertissement obligatoire reproduisant fidèlement le texte légal français :
     - *« Attention : Lors de l'exécution du virement, vous devez impérativement indiquer le numéro de référence de votre dossier d'amende... »*
   - Mise en valeur visuelle de la **Référence du dossier** avec bouton de copie en un clic.
   - Coordonnées bancaires officielles et vérifiées de l'organisme (**IBAN SEPA**, **BIC/SWIFT**, Nom du titulaire, Établissement bancaire).
   - Boutons de copie rapide avec retours visuels interactifs (*« Copié ! »*).
   - Fonction d'impression et d'export PDF optimisée pour le format A4 (`@media print`).
   - Raccourci direct pour modifier les informations initiales.

---

## 2. Configuration Centralisée (`src/config/organization.js`)

Toutes les coordonnées de l'organisme, du responsable désigné et les paramètres bancaires sont regroupés dans un fichier unique :

```javascript
// src/config/organization.js
export const organizationConfig = {
  legalName: "SERVICE DE RECOUVREMENT & GESTION DES DOSSIERS",
  designatedRepresentative: {
    fullName: "M. Jean-Marc Delorme",
    title: "Responsable du Service de Règlement et Recouvrement",
    department: "Direction des Services Financiers",
  },
  bankDetails: {
    bankName: "Banque Européenne de Recouvrement - Agence Centrale Paris",
    iban: "FR76 3000 4012 3400 0123 4567 890",
    ibanFormatted: "FR76 3000 4012 3400 0123 4567 890",
    bicSwift: "BERCFRPPXXX",
    accountHolder: "SERVICE RECOUVREMENT DOSSIERS SEPA",
    paymentType: "Virement bancaire SEPA",
    settlementDelay: "24 à 48 heures ouvrées",
  },
  contact: {
    addressLine1: "14 Boulevard Haussmann",
    postalCode: "75009",
    city: "Paris",
    phone: "+33 (0)1 89 20 45 00",
    email: "contact-reglement@service-recouvrement.fr",
  },
  // ...
};
```

Pour déployer en production, mettez simplement à jour ces valeurs avec les coordonnées vérifiées fournies par le client.

---

## 3. Structure du Projet

```text
src/
├── assets/                  # Logos et illustrations SVG
├── components/
│   ├── CopyButton.jsx       # Bouton de copie avec confirmation visuelle
│   ├── Footer.jsx           # Pied de page avec mentions légales et RGPD
│   ├── FormInput.jsx        # Composant réutilisable pour champs de formulaire
│   ├── Header.jsx           # En-tête sécurisé avec logo et support
│   ├── NoticeBanner.jsx     # Bandeaux d'information et d'alerte
│   ├── OrganizationLogo.jsx # Logo officiel vectoriel
│   └── StepIndicator.jsx    # Indicateur de progression 3 étapes
├── config/
│   └── organization.js      # Configuration centralisée de l'organisme
├── context/
│   └── FormContext.jsx      # Gestion d'état React Context et validation
├── pages/
│   ├── InformationPage.jsx  # Étape 1 : Formulaire d'identification
│   ├── TermsPage.jsx        # Étape 2 : Conditions générales obligatoires
│   └── InvoicePage.jsx      # Étape 3 : Bordereau de virement et IBAN
├── test/
│   └── setup.js             # Configuration de test Vitest
├── App.jsx                  # Composant racine
├── App.test.jsx             # Tests automatisés
├── index.css                # Directives Tailwind CSS v4 & styles d'impression
└── main.jsx                 # Point d'entrée React
```

---

## 4. Démarrage et Commandes

### Installation des dépendances
```bash
npm install
```

### Lancer le serveur de développement local
```bash
npm run dev
```

### Lancer la suite de tests automatisés (Vitest)
```bash
npm test
```

### Contrôle de qualité et linter
```bash
npm run lint
```

### Compiler pour la production
```bash
npm run build
```

---

## 5. Sécurité et Conformité

- **Aucune collecte illicite :** Pas de formulaire de saisie de numéro de carte de crédit, cryptogramme CVV, mot de passe ou code OTP.
- **Transparence totale :** Le redevable effectue le virement bancaire de manière autonome depuis sa propre application bancaire vers l'IBAN officiel vérifié.
- **Sanitisation & Validation :** Validation stricte côté client des champs obligatoires (référence, e-mail, nom).
- **Protection RGPD :** Mention claire de la finalité exclusive du traitement des données.
