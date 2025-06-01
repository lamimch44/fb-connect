import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import ProgressBar from './ProgressBar';
import { useOnboarding } from '../../context/OnboardingContext';

interface PageContainerProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  showProgress?: boolean;
}

const PageContainer: React.FC<PageContainerProps> = ({
  children,
  title,
  subtitle,
  showProgress = true,
}) => {
  const { progress, currentStep } = useOnboarding();
  
  // Adjust padding based on login step
  const containerPadding = currentStep === 'login' ? 'pt-0' : 'pt-16';

  return (
    <div className={`min-h-screen bg-gray-50 ${containerPadding}`}>
      <Navbar />
      
      {showProgress && currentStep !== 'login' && (
        <ProgressBar progress={progress} />
      )}
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {(title || subtitle) && (
          <div className="text-center mb-8">
            {title && (
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{title}</h1>
            )}
            {subtitle && (
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
            )}
          </div>
        )}
        
        {children}
      </main>
    </div>
  );
};

export default PageContainer;