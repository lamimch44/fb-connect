import React, { TextareaHTMLAttributes } from 'react';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
  fullWidth?: boolean;
}

const TextArea: React.FC<TextAreaProps> = ({
  label,
  helperText,
  error,
  fullWidth = false,
  className = '',
  id,
  rows = 4,
  ...props
}) => {
  const inputId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
  const widthClass = fullWidth ? 'w-full' : '';
  const errorClass = error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500';
  
  return (
    <div className={`mb-4 ${widthClass}`}>
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      
      <textarea
        id={inputId}
        rows={rows}
        className={`
          appearance-none block w-full px-3 py-2 border rounded-md shadow-sm 
          placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-0 
          ${errorClass} 
          ${className}
        `}
        {...props}
      />
      
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
      
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default TextArea;