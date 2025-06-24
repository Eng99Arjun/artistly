'use client';
import { useState, useEffect } from 'react';
import ArtistCard from '@/components/ui/ArtistCard';
import FilterBlock from '@/components/ui/FilterBlock';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';

export default function ArtistListing() {
  const [artists, setArtists] = useState([]);
  const [filteredArtists, setFilteredArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    location: '',
    minPrice: '',
    maxPrice: '',
    search: '',
  });

  // Fetch artists data from local JSON
  useEffect(() => {
    const fetchArtists = async () => {
      try {
        setLoading(true);
        const response = await fetch('/data/artists.json');
        if (!response.ok) throw new Error('Failed to fetch artists data');
        const data = await response.json();
        setArtists(data);
        setFilteredArtists(data);
      } catch (error) {
        console.error('Error fetching artists:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchArtists();
  }, []);

  // Apply filters when they change
  useEffect(() => {
    applyFilters();
  }, [filters, artists]);

  // Filtering logic
  const applyFilters = () => {
    let result = [...artists];
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      result = result.filter(artist => 
        artist.name.toLowerCase().includes(searchTerm) ||
        artist.category.toLowerCase().includes(searchTerm) ||
        artist.location.toLowerCase().includes(searchTerm) ||
        (artist.bio && artist.bio.toLowerCase().includes(searchTerm))
      );
    }
    if (filters.category) {
      result = result.filter(artist => 
        artist.category.toLowerCase() === filters.category.toLowerCase()
      );
    }
    if (filters.location) {
      result = result.filter(artist => 
        artist.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    if (filters.minPrice || filters.maxPrice) {
      const minPrice = filters.minPrice ? parseInt(filters.minPrice) : 0;
      const maxPrice = filters.maxPrice ? parseInt(filters.maxPrice) : Number.MAX_SAFE_INTEGER;
      result = result.filter(artist => 
        artist.minPrice <= maxPrice && artist.maxPrice >= minPrice
      );
    }
    setFilteredArtists(result);
  };

  // Handlers
  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      location: '',
      minPrice: '',
      maxPrice: '',
      search: '',
    });
  };

  const priceRanges = [
    { value: '', label: 'Any Price' },
    { value: '0-500', label: 'Under $500' },
    { value: '500-1000', label: '$500 - $1,000' },
    { value: '1000-2500', label: '$1,000 - $2,500' },
    { value: '2500-5000', label: '$2,500 - $5,000' },
    { value: '5000', label: 'Over $5,000' },
  ];

  const handlePriceRangeChange = (value) => {
    if (value === '') {
      setFilters(prev => ({ ...prev, minPrice: '', maxPrice: '' }));
    } else if (value === '5000') {
      setFilters(prev => ({ ...prev, minPrice: '5000', maxPrice: '' }));
    } else {
      const [min, max] = value.split('-');
      setFilters(prev => ({ ...prev, minPrice: min, maxPrice: max }));
    }
  };

  const currentPriceRange = filters.minPrice && filters.maxPrice 
    ? `${filters.minPrice}-${filters.maxPrice}`
    : filters.minPrice && !filters.maxPrice
      ? '5000'
      : '';

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Find Performers</h1>
        <p className="text-gray-600">
          Browse our curated selection of talented performers
        </p>
      </div>
      
      {/* Search Bar */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
          <div className="md:col-span-2">
            <Input
              label="Search Artists"
              id="search"
              placeholder="Name, category, location..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
            />
          </div>
          <div>
            <Select
              label="Category"
              id="category"
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              options={[
                { value: '', label: 'All Categories' },
                { value: 'Singer', label: 'Singers' },
                { value: 'Dancer', label: 'Dancers' },
                { value: 'Speaker', label: 'Speakers' },
                { value: 'DJ', label: 'DJs' },
                { value: 'Musician', label: 'Musicians' },
                { value: 'Comedian', label: 'Comedians' },
              ]}
            />
          </div>
          <div>
            <Select
              label="Price Range"
              id="priceRange"
              value={currentPriceRange}
              onChange={(e) => handlePriceRangeChange(e.target.value)}
              options={priceRanges}
            />
          </div>
          <div>
            <Button 
              variant="outline" 
              onClick={clearFilters}
              className="w-full"
            >
              Clear Filters
            </Button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <FilterBlock filters={filters} onFilterChange={handleFilterChange} />
        </div>
        {/* Artist Results */}
        <div className="lg:col-span-3">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <p className="text-gray-600">
                  Showing {filteredArtists.length} of {artists.length} artists
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Sort: Recommended
                  </Button>
                </div>
              </div>
              {filteredArtists.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredArtists.map(artist => (
                    <ArtistCard key={artist.id} artist={artist} />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow p-12 text-center">
                  <h3 className="text-xl font-semibold mb-2">No artists found</h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your filters or search terms
                  </p>
                  <Button variant="outline" onClick={clearFilters}>
                    Clear all filters
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}