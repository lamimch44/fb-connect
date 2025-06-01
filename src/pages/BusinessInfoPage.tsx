import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useOnboarding } from '../context/OnboardingContext';
import PageContainer from '../components/layout/PageContainer';
import BusinessInfoForm from '../components/business/BusinessInfoForm';

const BusinessInfoPage: React.FC = () => {
  const { selectedPage } = useAuth();
  const { setStep } = useOnboarding();
  
  // Redirect if no page is selected
  React.useEffect(() => {
    if (!selectedPage) {
      setStep('connect');
    }
  }, [selectedPage, setStep]);
  
  return (
    <PageContainer
      title="Configure Your AI Assistant"
      subtitle="Create a custom AI assistant to handle interactions on your Facebook page"
    >
      <BusinessInfoForm />
    </PageContainer>
  );
};

export default BusinessInfoPage;