import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useBusiness } from '../context/BusinessContext';
import { useOnboarding } from '../context/OnboardingContext';
import PageContainer from '../components/layout/PageContainer';
import SummaryView from '../components/business/SummaryView';
import Button from '../components/common/Button';

const SummaryPage: React.FC = () => {
  const { selectedPage } = useAuth();
  const { businessInfo } = useBusiness();
  const { setStep } = useOnboarding();
  
  // Redirect if missing required data
  React.useEffect(() => {
    if (!selectedPage) {
      setStep('connect');
    } else if (!businessInfo) {
      setStep('info');
    }
  }, [selectedPage, businessInfo, setStep]);
  
  return (
    <PageContainer
      title="Setup Complete"
      subtitle="Here's a summary of your connected page and business information"
    >
      <SummaryView />
      
      <div className="mt-10 flex justify-center">
        <Button
          variant="primary"
          size="lg"
          onClick={() => alert('Your account is now ready to use!')}
        >
          Go to Dashboard
        </Button>
      </div>
    </PageContainer>
  );
};

export default SummaryPage;