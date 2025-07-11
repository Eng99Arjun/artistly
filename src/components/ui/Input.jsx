import React from 'react';

export default function Input({ 
  label, 
  id, 
  error, 
  icon, 
  className = '', 
  ...props 
}) {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          id={id}
          className={`block w-full rounded-md border ${
            error ? 'border-red-500' : 'border-gray-300'
          } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
            icon ? 'pl-10' : 'pl-3'
          } pr-3 py-2`}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error.message}</p>
      )}
    </div>
  );
}