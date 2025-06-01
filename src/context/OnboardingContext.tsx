import React, { createContext, useContext, useState, ReactNode } from 'react';
import { OnboardingStep } from '../types';

interface OnboardingContextType {
  currentStep: OnboardingStep;
  setStep: (step: OnboardingStep) => void;
  progress: number;
}

const defaultContext: OnboardingContextType = {
  currentStep: 'login',
  setStep: () => {},
  progress: 0,
};

const OnboardingContext = createContext<OnboardingContextType>(defaultContext);

export const useOnboarding = () => useContext(OnboardingContext);

export const OnboardingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('login');
  
  // Calculate progress percentage based on current step
  const getProgressPercentage = (step: OnboardingStep): number => {
    switch (step) {
      case 'login':
        return 0;
      case 'connect':
        return 33;
      case 'info':
        return 66;
      case 'summary':
        return 100;
      default:
        return 0;
    }
  };

  return (
    <OnboardingContext.Provider
      value={{
        currentStep,
        setStep: setCurrentStep,
        progress: getProgressPercentage(currentStep),
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};