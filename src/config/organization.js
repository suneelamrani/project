/**
 * Centralized Configuration for Organization & Settlement Information
 * 
 * Update these values with your verified organizational information.
 * All values are centralized here so no sensitive or legal details
 * are hardcoded across multiple components.
 */

const REPRESENTATIVE_NAME = "M. Jean-Marc Delorme";

export const organizationConfig = {
  // Legal Organization Identity
  legalName: "SERVICE DE RECOUVREMENT & GESTION DES DOSSIERS",
  shortName: "Service Recouvrement",
  entityType: "Organisme de Recouvrement Agréé",
  siret: "130 025 265 00013",
  tvaIntracommunautaire: "FR 12 130025265",
  
  // Designated Representative
  designatedRepresentative: {
    fullName: REPRESENTATIVE_NAME,
    title: "Responsable du Service de Règlement et Recouvrement",
    department: "Direction des Services Financiers",
  },

  // Banking Details for Transfer (SEPA)
  bankDetails: {
    // Beneficiary MUST match Designated Representative name ("SAME NAME" requirement)
    accountHolder: REPRESENTATIVE_NAME,
    iban: "FR76 3000 4012 3400 0123 4567 890",
    ibanFormatted: "FR76 3000 4012 3400 0123 4567 890",
    paymentType: "Virement bancaire SEPA",
    settlementDelay: "24 à 48 heures ouvrées",
    currency: "EUR (€)",
  },

  // Official Dossier Details decided by administrator (not editable by client)
  dossier: {
    reference: "DOS-2026-78492",
    amount: "135.00",
    currency: "€",
    infractionType: "Amende forfaitaire de stationnement",
  },

  // Contact Information
  contact: {
    addressLine1: "14 Boulevard Haussmann",
    addressLine2: "CS 90214",
    postalCode: "75009",
    city: "Paris",
    country: "France",
    phone: "+33 (0)1 89 20 45 00",
    email: "contact-reglement@service-recouvrement.fr",
    supportHours: "Du lundi au vendredi de 8h30 à 18h00 (CET)",
  },

  // Official texts for Terms & Payment Instructions
  termsAndConditions: {
    section1: {
      title: "1. Modalités de règlement par virement bancaire",
      body: "« Le règlement de l'amende doit être effectué par virement bancaire au profit du service responsable du recouvrement. Il est impératif d'indiquer exactement le numéro de référence du dossier de l'amende dans le champ \"Référence du virement\" ou \"Motif du paiement\". Cette référence doit être reproduite intégralement afin de permettre l'identification du paiement et son affectation au dossier correspondant. »",
    },
    section2: {
      title: "2. Conditions générales et acceptation",
      body: "« En procédant au règlement, je reconnais avoir pris connaissance des modalités de paiement ainsi que des conditions générales applicables. Je certifie l'exactitude des informations communiquées et m'engage à respecter les instructions relatives au règlement de l'amende. Je comprends que toute erreur dans la référence du dossier peut retarder le traitement de mon paiement. »",
    },
    mandatoryCheckboxLabel: "J'ai lu et j'accepte les conditions générales",
  },

  // Mandatory Warning for Step 3 Invoice / Transfer instructions
  transferWarning: {
    label: "Attention :",
    text1: "« Lors de l'exécution du virement, vous devez impérativement indiquer le numéro de référence de votre dossier d'amende, exactement comme il apparaît sur le présent document, dans le champ \"Référence du virement\" ou \"Motif du paiement\".",
    text2: "Cette référence est indispensable pour permettre l'identification et l'affectation correcte de votre règlement. »",
  },

  // Disclaimer notices
  disclaimers: {
    localConsentNote: "Validation préalable requise avant l'affichage des coordonnées bancaires officielles.",
    invoiceDisclaimer: "Le présent document récapitule les coordonnées bancaires officielles et vérifiées du bénéficiaire pour l'exécution d'un virement SEPA. Aucun prélèvement automatique ni débit direct de carte bancaire n'est opéré par ce formulaire.",
    securityNotice: "Plateforme d'instructions de virement sécurisée par protocole TLS 256-bit.",
  },
};
