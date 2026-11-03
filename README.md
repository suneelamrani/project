# Application de Règlement par Virement Bancaire SEPA

Application web moderne, réactive et sécurisée développée en **React 19**, **Vite**, **Tailwind CSS v4** et **Lucide React**.

---

## 1. Fonctionnalités et Workflow en 3 Étapes

Le parcours utilisateur se déroule en trois étapes avec validation stricte et préservation de l'état :

1. **Étape 1 – Informations du redevable (`InformationPage.jsx`)**
   - **Numéro de dossier & Montant forfaitaire fixés par l'administration** : Le numéro de dossier (`reference`) et le montant (`amount`) ne sont pas modifiables par le client qui consulte la page. Ils sont fixés par l'administration dans [`organizationConfig.dossier`](file:///c:/Users/Suneel%20Developer/Downloads/project/src/config/organization.js) ou via paramètres URL (`?ref=DOS-XXXXX&amount=135`).
   - **Saisie du redevable** : Saisie et validation du Nom/Prénom, de l'adresse e-mail et du numéro de téléphone.
   - Suppression du champ de date redondant.
   - Respect strict de la vie privée (aucune donnée de carte bancaire, mot de passe ou code OTP).

2. **Étape 2 – Conditions Générales – Format Document Administratif (`TermsPage.jsx`)**
   - Présentation sobre et officielle sous forme de document administratif (aucun style blog ou encadré décoratif superflu).
   - Affichage intégral des deux clauses réglementaires en français exact :
     - *1. Modalités de règlement par virement bancaire*
     - *2. Conditions générales et acceptation*
   - Case à cocher obligatoire : **« J'ai lu et j'accepte les conditions générales »** (initialement décochée).
   - Bouton de poursuite désactivé tant que la case n'est pas cochée.
   - Bouton de retour permettant de modifier les coordonnées de l'Étape 1.

3. **Étape 3 – Bordereau d'Instructions de Virement / Facture (`InvoicePage.jsx`)**
   - Logo officiel du client à gauche, insigne de sécurité à droite.
   - **Bénéficiaire et Responsable Désigné strictement identiques ("SAME NAME")** : Le nom du titulaire du compte est rigoureusement aligné sur celui du responsable désigné (`M. Jean-Marc Delorme`).
   - **Coordonnées bancaires épurées** : Suppression des blocs superflus Nom de banque et BIC/SWIFT afin de focaliser sur l'IBAN vérifié et le motif obligatoire.
   - Encart d'avertissement obligatoire reproduisant fidèlement le texte légal français (*« Attention : Lors de l'exécution du virement... »*).
   - Boutons de copie rapide avec retours visuels interactifs (*« Copié ! »*).
   - Fonction d'impression et d'export PDF optimisée pour le format A4 (`@media print`).

---

## 2. Configuration Centralisée (`src/config/organization.js`)

Pour configurer ou modifier le numéro de dossier et le montant officiel :

```javascript
// src/config/organization.js
export const organizationConfig = {
  designatedRepresentative: {
    fullName: "M. Jean-Marc Delorme",
    title: "Responsable du Service de Règlement et Recouvrement",
    department: "Direction des Services Financiers",
  },
  bankDetails: {
    // Aligné sur le responsable ("SAME NAME")
    accountHolder: "M. Jean-Marc Delorme",
    iban: "FR76 3000 4012 3400 0123 4567 890",
    ibanFormatted: "FR76 3000 4012 3400 0123 4567 890",
    paymentType: "Virement bancaire SEPA",
  },
  // Numéro de dossier et montant décidés par l'administrateur
  dossier: {
    reference: "DOS-2026-78492",
    amount: "135.00",
    currency: "€",
    infractionType: "Amende forfaitaire de stationnement",
  },
  // ...
};
```

> **Astuce de diffusion directe :** Vous pouvez également générer des liens personnalisés pour vos usagers avec les paramètres d'URL, par exemple :  
> `http://localhost:5173/?ref=DOS-2026-99881&amount=135.00`

---

## 3. Commandes du Projet

```bash
# Lancer en développement
npm run dev

# Lancer la suite de tests automatisés (Vitest)
npm test

# Lancer le linter
npm run lint

# Compiler pour la production
npm run build
```
