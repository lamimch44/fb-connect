import React, { createContext, useContext, useState, ReactNode } from 'react';
import { BusinessInfo } from '../types';

interface BusinessContextType {
  businessInfo: BusinessInfo | null;
  saveBusinessInfo: (info: BusinessInfo) => void;
  isSubmitting: boolean;
}

const defaultContext: BusinessContextType = {
  businessInfo: null,
  saveBusinessInfo: () => {},
  isSubmitting: false,
};

const BusinessContext = createContext<BusinessContextType>(defaultContext);

export const useBusiness = () => useContext(BusinessContext);

export const BusinessProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dummy save handler
  const saveBusinessInfo = (info: BusinessInfo) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setBusinessInfo(info);
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <BusinessContext.Provider
      value={{
        businessInfo,
        saveBusinessInfo,
        isSubmitting,
      }}
    >
      {children}
    </BusinessContext.Provider>
  );
};