import React from 'react';

export default function Checkbox({ 
  label, 
  checked, 
  onChange, 
  className = '' 
}) {
  return (
    <div className={`flex items-center ${className}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
      />
      <label className="ml-2 block text-sm text-gray-700">
        {label}
      </label>
    </div>
  );
}