import React from 'react';
import { Select } from '@/components/ui/Select';

export default function FilterBlock({ filters, onFilterChange }) {
  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'Singer', label: 'Singers' },
    { value: 'Dancer', label: 'Dancers' },
    { value: 'Speaker', label: 'Speakers' },
    { value: 'DJ', label: 'DJs' },
    { value: 'Musician', label: 'Musicians' },
  ];
  
  const locations = [
    { value: '', label: 'All Locations' },
    { value: 'New York', label: 'New York' },
    { value: 'Los Angeles', label: 'Los Angeles' },
    { value: 'Chicago', label: 'Chicago' },
    { value: 'Miami', label: 'Miami' },
    { value: 'London', label: 'London' },
    { value: 'Toronto', label: 'Toronto' },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Filters</h3>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <select 
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            value={filters.category}
            onChange={(e) => onFilterChange('category', e.target.value)}
          >
            {categories.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
          <select 
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            value={filters.location}
            onChange={(e) => onFilterChange('location', e.target.value)}
          >
            {locations.map(location => (
              <option key={location.value} value={location.value}>
                {location.label}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Min Price ($)</label>
              <input
                type="number"
                min="0"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={filters.minPrice}
                onChange={(e) => onFilterChange('minPrice', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Max Price ($)</label>
              <input
                type="number"
                min="0"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={filters.maxPrice}
                onChange={(e) => onFilterChange('maxPrice', e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}