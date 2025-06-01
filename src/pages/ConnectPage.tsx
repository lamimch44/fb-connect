import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PageContainer from '../components/layout/PageContainer';
import PageSelector from '../components/business/PageSelector';
import Button from '../components/common/Button';
import { ArrowRight, Facebook } from 'lucide-react';

const ConnectPage: React.FC = () => {
  const { selectedPage, isFacebookConnected, loginWithFacebook, isLoading } = useAuth();
  const navigate = useNavigate();
  
  const handleContinue = () => {
    navigate('/business-info');
  };
  
  if (!isFacebookConnected) {
    return (
      <PageContainer
        title="Connect Your Facebook Account"
        subtitle="First, connect your Facebook account to access your pages"
      >
        <div className="flex justify-center">
          <Button
            variant="primary"
            size="lg"
            onClick={loginWithFacebook}
            isLoading={isLoading}
            icon={<Facebook size={20} />}
          >
            Connect Facebook Account
          </Button>
        </div>
      </PageContainer>
    );
  }
  
  return (
    <PageContainer
      title="Select Your Facebook Page"
      subtitle="Choose a Facebook Page to connect with your AI assistant"
    >
      <PageSelector />
      
      {selectedPage && (
        <div className="mt-8 flex justify-center">
          <Button
            variant="primary"
            size="lg"
            onClick={handleContinue}
            icon={<ArrowRight size={18} />}
            iconPosition="right"
          >
            Continue to Business Info
          </Button>
        </div>
      )}
    </PageContainer>
  );
};

export default ConnectPage;