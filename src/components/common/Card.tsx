import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
  selected?: boolean;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  onClick, 
  hoverable = false, 
  selected = false 
}) => {
  const baseClasses = 'bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all duration-200';
  const hoverClasses = hoverable ? 'cursor-pointer hover:shadow-md hover:border-blue-200 transform hover:-translate-y-1' : '';
  const selectedClasses = selected ? 'border-blue-500 ring-2 ring-blue-200' : '';
  
  return (
    <div 
      className={`${baseClasses} ${hoverClasses} ${selectedClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{ children: ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <div className={`px-6 py-4 border-b border-gray-100 ${className}`}>
      {children}
    </div>
  );
};

export const CardBody: React.FC<{ children: ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <div className={`px-6 py-4 ${className}`}>
      {children}
    </div>
  );
};

export const CardFooter: React.FC<{ children: ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <div className={`px-6 py-4 border-t border-gray-100 ${className}`}>
      {children}
    </div>
  );
};

export default Card;