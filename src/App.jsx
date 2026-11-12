import { FormProvider, useFormContext } from './context/FormContext';
import Header from './components/Header';
import Footer from './components/Footer';
import StepIndicator from './components/StepIndicator';
import InformationPage from './pages/InformationPage';
import TermsPage from './pages/TermsPage';
import InvoicePage from './pages/InvoicePage';
import { CheckCircle2 } from 'lucide-react';

function AppContent() {
  const { currentStep, toastMessage } = useFormContext();

  return (
    <div className="flex flex-col min-h-screen text-slate-800 antialiased font-sans">
      <Header />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <StepIndicator />

        <div className="transition-all duration-300 ease-in-out">
          {currentStep === 1 && <InformationPage />}
          {currentStep === 2 && <TermsPage />}
          {currentStep === 3 && <InvoicePage />}
        </div>
      </main>

      <Footer />

      {/* Floating Toast Notification in Institutional Navy Blue */}
      {toastMessage && (
        <aside
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-[#002a40] text-white px-4 py-3 rounded-lg shadow-xl border border-blue-800 text-xs sm:text-sm font-medium animate-bounce no-print"
        >
          <CheckCircle2 className="w-4 h-4 text-blue-300 flex-shrink-0" />
          <span>{toastMessage}</span>
        </aside>
      )}
    </div>
  );
}

export default function App() {
  return (
    <FormProvider>
      <AppContent />
    </FormProvider>
  );
}
