'use client';
import { useState } from 'react';
import DataTable from '@/components/ui/DataTable';
import  Button  from '@/components/ui/Button';
import  Input  from '@/components/ui/Input';
import  Select  from '@/components/ui/Select';
import Link from 'next/link';

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  
  // In real app, this would come from API/localStorage
  const submissions = [
    { 
      id: 1, 
      name: 'John Doe', 
      category: 'Singer', 
      location: 'New York', 
      feeRange: '$501-1000', 
      status: 'Pending',
      date: '2023-06-15'
    },
    { 
      id: 2, 
      name: 'Dance Fusion', 
      category: 'Dancers', 
      location: 'Los Angeles', 
      feeRange: '$1001-2500', 
      status: 'Approved',
      date: '2023-06-10'
    },
    { 
      id: 3, 
      name: 'Tech Talkers', 
      category: 'Speakers', 
      location: 'San Francisco', 
      feeRange: '$2500+', 
      status: 'Rejected',
      date: '2023-06-05'
    },
    { 
      id: 4, 
      name: 'Melody Makers', 
      category: 'Band', 
      location: 'Chicago', 
      feeRange: '$5001-10000', 
      status: 'Pending',
      date: '2023-06-01'
    },
  ];

  const filteredSubmissions = submissions.filter(submission => {
    const matchesSearch = 
      submission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter ? submission.status === statusFilter : true;
    
    return matchesSearch && matchesStatus;
  });

  const columns = [
    { header: 'Artist Name', accessor: 'name' },
    { header: 'Category', accessor: 'category' },
    { header: 'Location', accessor: 'location' },
    { header: 'Fee Range', accessor: 'feeRange' },
    { header: 'Date Added', accessor: 'date' },
    { 
      header: 'Status', 
      accessor: 'status',
      cell: (row) => (
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          row.status === 'Approved' ? 'bg-green-100 text-green-800' :
          row.status === 'Rejected' ? 'bg-red-100 text-red-800' :
          'bg-yellow-100 text-yellow-800'
        }`}>
          {row.status}
        </span>
      )
    },
    {
      header: 'Actions',
      accessor: 'actions',
      cell: (row) => (
        <div className="flex space-x-2">
          <button className="text-indigo-600 hover:text-indigo-900">
            View
          </button>
          <button className="text-gray-600 hover:text-gray-900">
            Edit
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Artist Dashboard</h1>
          <p className="text-gray-600">
            Manage your artists and booking requests
          </p>
        </div>
        
        <Button asChild variant="primary">
          <Link href="/onboard">+ Add New Artist</Link>
        </Button>
      </div>
      
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-6 border-b">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-indigo-50 rounded-lg p-4">
              <div className="text-2xl font-bold">4</div>
              <div className="text-gray-600">Total Artists</div>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4">
              <div className="text-2xl font-bold">12</div>
              <div className="text-gray-600">Booking Requests</div>
            </div>
            
            <div className="bg-yellow-50 rounded-lg p-4">
              <div className="text-2xl font-bold">3</div>
              <div className="text-gray-600">Pending Approvals</div>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h2 className="text-xl font-semibold">Artist Submissions</h2>
            
            <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
              <Input
                placeholder="Search artists..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-64"
              />
              
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                options={[
                  { value: '', label: 'All Statuses' },
                  { value: 'Pending', label: 'Pending' },
                  { value: 'Approved', label: 'Approved' },
                  { value: 'Rejected', label: 'Rejected' },
                ]}
                className="w-full md:w-48"
              />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <DataTable 
              columns={columns} 
              data={filteredSubmissions} 
              emptyMessage="No artist submissions yet"
            />
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-6">Recent Booking Requests</h2>
        
        <div className="space-y-4">
          <div className="border rounded-lg p-4 flex justify-between items-center">
            <div>
              <h3 className="font-medium">Corporate Event - Tech Company</h3>
              <p className="text-gray-600">Requested: Dance Fusion</p>
              <p className="text-sm text-gray-500">Jun 12, 2023</p>
            </div>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              New
            </span>
          </div>
          
          <div className="border rounded-lg p-4 flex justify-between items-center">
            <div>
              <h3 className="font-medium">Wedding Ceremony</h3>
              <p className="text-gray-600">Requested: John Doe</p>
              <p className="text-sm text-gray-500">Jun 8, 2023</p>
            </div>
            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
              Needs Response
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}