import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from './App';
import { organizationConfig } from './config/organization';

describe('Website Rebuild - 3-Step Bank Transfer Settlement Workflow', () => {
  it('Step 1: renders client information page and validates required fields', () => {
    render(<App />);

    // Check organization branding & header
    expect(screen.getAllByText(/Service Recouvrement/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Étape 1 sur 3/i)).toBeInTheDocument();
    expect(screen.getByText(/Règlement de votre dossier d'amende/i)).toBeInTheDocument();

    // Check folder reference input
    const refInput = screen.getByLabelText(/Numéro de référence du dossier/i);
    expect(refInput).toBeInTheDocument();

    // Check Name and Email inputs
    const nameInput = screen.getByLabelText(/Nom et Prénom/i);
    const emailInput = screen.getByLabelText(/Adresse e-mail de contact/i);
    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();

    // Try to continue with empty name and email
    const continueBtn = screen.getByRole('button', { name: /Continuer vers les conditions/i });
    fireEvent.click(continueBtn);

    // Validation messages should appear
    expect(screen.getByText(/Le nom et prénom sont obligatoires/i)).toBeInTheDocument();
    expect(screen.getByText(/L’adresse e-mail est obligatoire/i)).toBeInTheDocument();
  });

  it('Step 1: validates format of folder reference', () => {
    render(<App />);

    const refInput = screen.getByLabelText(/Numéro de référence du dossier/i);
    fireEvent.change(refInput, { target: { value: 'AB' } }); // too short

    const continueBtn = screen.getByRole('button', { name: /Continuer vers les conditions/i });
    fireEvent.click(continueBtn);

    expect(screen.getByText(/La référence doit comporter au moins 4 caractères/i)).toBeInTheDocument();
  });

  it('Step Indicator: prevents skipping forward to Step 2 or Step 3 when requirements not met', () => {
    render(<App />);

    // Clear required fields
    fireEvent.change(screen.getByLabelText(/Nom et Prénom/i), { target: { value: '' } });

    // Try clicking step 3 directly
    const step3Btn = screen.getByRole('button', { name: /Étape 3/i });
    fireEvent.click(step3Btn);

    // Should still be on Step 1
    expect(screen.getByText(/Étape 1 sur 3/i)).toBeInTheDocument();
  });

  it('Step 1 to Step 2: fills required client info and navigates to Step 2', () => {
    render(<App />);

    const refInput = screen.getByLabelText(/Numéro de référence du dossier/i);
    const nameInput = screen.getByLabelText(/Nom et Prénom/i);
    const emailInput = screen.getByLabelText(/Adresse e-mail de contact/i);

    // Clear and enter custom reference
    fireEvent.change(refInput, { target: { value: 'DOS-2026-TEST99' } });
    fireEvent.change(nameInput, { target: { value: 'Jean Dupont' } });
    fireEvent.change(emailInput, { target: { value: 'jean.dupont@test.fr' } });

    const continueBtn = screen.getByRole('button', { name: /Continuer vers les conditions/i });
    fireEvent.click(continueBtn);

    // Should now be on Step 2
    expect(screen.getByText(/Étape 2 sur 3/i)).toBeInTheDocument();
    expect(screen.getByText(/Conditions générales de règlement/i)).toBeInTheDocument();
  });

  it('Step 2: displays exact French text and enforces mandatory checkbox before proceeding', () => {
    render(<App />);

    // Fill Step 1
    fireEvent.change(screen.getByLabelText(/Nom et Prénom/i), { target: { value: 'Jean Dupont' } });
    fireEvent.change(screen.getByLabelText(/Adresse e-mail de contact/i), { target: { value: 'jean@dupont.fr' } });
    fireEvent.click(screen.getByRole('button', { name: /Continuer vers les conditions/i }));

    // Verify exact French text for Section 1
    expect(
      screen.getByText(/1\. Modalités de règlement par virement bancaire/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp("Le règlement de l'amende doit être effectué par virement bancaire au profit du service responsable du recouvrement", 'i'))
    ).toBeInTheDocument();

    // Verify exact French text for Section 2
    expect(
      screen.getByText(/2\. Conditions générales et acceptation/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp("En procédant au règlement, je reconnais avoir pris connaissance des modalités de paiement", 'i'))
    ).toBeInTheDocument();

    // Verify mandatory checkbox
    const checkbox = screen.getByLabelText(/J'ai lu et j'accepte les conditions générales/i);
    expect(checkbox).not.toBeChecked();

    const proceedBtn = screen.getByRole('button', { name: /Voir les instructions de virement/i });
    expect(proceedBtn).toBeDisabled();

    // Checking the checkbox enables the button
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(proceedBtn).not.toBeDisabled();
  });

  it('Backward navigation: navigates backward to Step 1 and preserves entered data', () => {
    render(<App />);

    // Custom reference
    const refInput = screen.getByLabelText(/Numéro de référence du dossier/i);
    fireEvent.change(refInput, { target: { value: 'DOS-PERSIST-123' } });
    fireEvent.change(screen.getByLabelText(/Nom et Prénom/i), { target: { value: 'Marie Curie' } });
    fireEvent.change(screen.getByLabelText(/Adresse e-mail de contact/i), { target: { value: 'marie@curie.fr' } });

    // Go to step 2
    fireEvent.click(screen.getByRole('button', { name: /Continuer vers les conditions/i }));
    expect(screen.getByText(/Étape 2 sur 3/i)).toBeInTheDocument();

    // Click back button
    const backBtn = screen.getByRole('button', { name: /Retour aux informations/i });
    fireEvent.click(backBtn);

    // Verify we are back on Step 1 and data is preserved
    expect(screen.getByText(/Étape 1 sur 3/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Numéro de référence du dossier/i)).toHaveValue('DOS-PERSIST-123');
    expect(screen.getByLabelText(/Nom et Prénom/i)).toHaveValue('Marie Curie');
    expect(screen.getByLabelText(/Adresse e-mail de contact/i)).toHaveValue('marie@curie.fr');
  });

  it('Step 3: renders invoice-style layout with exact French attention text, verified IBAN, and folder reference', () => {
    render(<App />);

    // Fill Step 1 with a unique folder reference
    const refInput = screen.getByLabelText(/Numéro de référence du dossier/i);
    fireEvent.change(refInput, { target: { value: 'DOS-FINAL-77889' } });
    fireEvent.change(screen.getByLabelText(/Nom et Prénom/i), { target: { value: 'Albert Camus' } });
    fireEvent.change(screen.getByLabelText(/Adresse e-mail de contact/i), { target: { value: 'albert@camus.fr' } });
    fireEvent.click(screen.getByRole('button', { name: /Continuer vers les conditions/i }));

    // Accept terms on Step 2
    const checkbox = screen.getByLabelText(/J'ai lu et j'accepte les conditions générales/i);
    fireEvent.click(checkbox);
    fireEvent.click(screen.getByRole('button', { name: /Voir les instructions de virement/i }));

    // Verify on Step 3 (Invoice / Bordereau)
    expect(screen.getByText(/BORDEREAU D'INSTRUCTIONS SEPA/i)).toBeInTheDocument();
    expect(screen.getByText(/DOCUMENT OFFICIEL DE RÈGLEMENT/i)).toBeInTheDocument();

    // Verify folder reference is displayed and prominent
    expect(screen.getAllByText('DOS-FINAL-77889').length).toBeGreaterThan(0);
    expect(screen.getByText('Albert Camus')).toBeInTheDocument();

    // Verify verified IBAN and Bank details from config
    expect(screen.getAllByText(organizationConfig.bankDetails.ibanFormatted).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(organizationConfig.bankDetails.bicSwift)).toBeInTheDocument();
    expect(screen.getByText(organizationConfig.bankDetails.bankName)).toBeInTheDocument();
    expect(screen.getAllByText(organizationConfig.designatedRepresentative.fullName).length).toBeGreaterThanOrEqual(1);

    // Verify exact French Attention warning
    expect(screen.getByText(/Attention :/i)).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp("Lors de l'exécution du virement, vous devez impérativement indiquer le numéro de référence de votre dossier d'amende", 'i'))
    ).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp("Cette référence est indispensable pour permettre l'identification et l'affectation correcte de votre règlement", 'i'))
    ).toBeInTheDocument();

    // Verify print button and navigation back
    expect(screen.getByRole('button', { name: /Imprimer \/ Télécharger en PDF/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Retour aux conditions/i })).toBeInTheDocument();
  });

  it('Step 3: triggers window.print when print button is clicked', () => {
    const printSpy = vi.spyOn(window, 'print');
    render(<App />);

    fireEvent.change(screen.getByLabelText(/Nom et Prénom/i), { target: { value: 'Paul Verlaine' } });
    fireEvent.change(screen.getByLabelText(/Adresse e-mail de contact/i), { target: { value: 'paul@verlaine.fr' } });
    fireEvent.click(screen.getByRole('button', { name: /Continuer vers les conditions/i }));

    fireEvent.click(screen.getByLabelText(/J'ai lu et j'accepte les conditions générales/i));
    fireEvent.click(screen.getByRole('button', { name: /Voir les instructions de virement/i }));

    const printBtn = screen.getByRole('button', { name: /Imprimer \/ Télécharger en PDF/i });
    fireEvent.click(printBtn);

    expect(printSpy).toHaveBeenCalled();
    printSpy.mockRestore();
  });

  it('Step 3: provides direct shortcut to modify client info (Step 1)', () => {
    render(<App />);

    fireEvent.change(screen.getByLabelText(/Nom et Prénom/i), { target: { value: 'Paul Verlaine' } });
    fireEvent.change(screen.getByLabelText(/Adresse e-mail de contact/i), { target: { value: 'paul@verlaine.fr' } });
    fireEvent.click(screen.getByRole('button', { name: /Continuer vers les conditions/i }));

    fireEvent.click(screen.getByLabelText(/J'ai lu et j'accepte les conditions générales/i));
    fireEvent.click(screen.getByRole('button', { name: /Voir les instructions de virement/i }));

    // Click "Modifier informations"
    const editBtn = screen.getByRole('button', { name: /Modifier informations/i });
    fireEvent.click(editBtn);

    // Should be back on Step 1
    expect(screen.getByText(/Étape 1 sur 3/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Nom et Prénom/i)).toHaveValue('Paul Verlaine');
  });

  it('Security: verifies no card number, CVV, OTP, or password inputs exist anywhere', () => {
    render(<App />);

    // Test on Step 1
    expect(document.querySelector('input[name="cardNumber"]')).toBeNull();
    expect(document.querySelector('input[name="cvv"]')).toBeNull();
    expect(document.querySelector('input[type="password"]')).toBeNull();

    // Move to Step 2
    fireEvent.change(screen.getByLabelText(/Nom et Prénom/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/Adresse e-mail de contact/i), { target: { value: 'test@user.fr' } });
    fireEvent.click(screen.getByRole('button', { name: /Continuer vers les conditions/i }));

    expect(document.querySelector('input[name="cardNumber"]')).toBeNull();
    expect(document.querySelector('input[name="cvv"]')).toBeNull();

    // Move to Step 3
    fireEvent.click(screen.getByLabelText(/J'ai lu et j'accepte les conditions générales/i));
    fireEvent.click(screen.getByRole('button', { name: /Voir les instructions de virement/i }));

    expect(document.querySelector('input[name="cardNumber"]')).toBeNull();
    expect(document.querySelector('input[name="cvv"]')).toBeNull();
  });
});
