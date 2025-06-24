'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';
import  Button  from '@/components/ui/Button';
import  Input  from '@/components/ui/Input';
import  Select  from '@/components/ui/Select';
import  Checkbox  from '@/components/ui/Checkbox';
import  Textarea  from '@/components/ui/Textarea';
import Link from 'next/link';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  bio: z.string().min(20, 'Bio must be at least 20 characters'),
  categories: z.array(z.string()).min(1, 'Select at least one category'),
  languages: z.array(z.string()).min(1, 'Select at least one language'),
  feeRange: z.string().min(1, 'Select a fee range'),
  location: z.string().min(2, 'Location is required'),
  profileImage: z.instanceof(File).optional(),
  website: z.string().url('Invalid URL').optional().or(z.literal('')),
  socialMedia: z.string().url('Invalid URL').optional().or(z.literal('')),
});

export default function OnboardingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    setValue,
    watch,
    reset
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categories: [],
      languages: [],
    }
  });

  const categories = ['Singer', 'Dancer', 'Speaker', 'DJ', 'Musician', 'Comedian', 'Actor', 'Magician'];
  const languages = ['English', 'Spanish', 'French', 'German', 'Mandarin', 'Hindi', 'Arabic', 'Portuguese'];
  const feeRanges = [
    { value: '0-500', label: '$0 - $500' },
    { value: '501-1000', label: '$501 - $1,000' },
    { value: '1001-2500', label: '$1,001 - $2,500' },
    { value: '2501-5000', label: '$2,501 - $5,000' },
    { value: '5001-10000', label: '$5,001 - $10,000' },
    { value: '10000+', label: '$10,000+' },
  ];

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In real app: 
      // const response = await fetch('/api/artists', {
      //   method: 'POST',
      //   body: JSON.stringify(data)
      // });
      
      console.log('Form submitted:', data);
      alert('Artist profile submitted successfully!');
      reset();
      setPreviewImage(null);
    } catch (error) {
      console.error('Submission error:', error);
      alert('There was an error submitting your profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCategoryChange = (category) => {
    const currentCategories = watch('categories');
    const newCategories = currentCategories.includes(category)
      ? currentCategories.filter(c => c !== category)
      : [...currentCategories, category];
    
    setValue('categories', newCategories);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue('profileImage', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Onboard New Artist</h1>
        <p className="text-gray-600">
          Create a profile to showcase your talent to event planners worldwide
        </p>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        {/* Profile Section */}
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-6 pb-2 border-b">Profile Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Profile Image</label>
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <div className="w-40 h-40 rounded-full bg-gray-200 border-2 border-dashed flex items-center justify-center overflow-hidden">
                      {previewImage ? (
                        <img 
                          src={previewImage} 
                          alt="Preview" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-gray-400">No image</span>
                      )}
                    </div>
                    <label 
                      htmlFor="profileImage" 
                      className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow cursor-pointer"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                      </svg>
                    </label>
                  </div>
                  <input
                    type="file"
                    id="profileImage"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    JPG, PNG or GIF. Max 5MB
                  </p>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Artist/Band Name"
                  id="name"
                  error={errors.name}
                  {...register('name')}
                  placeholder="Enter artist or band name"
                />
                
                <Input
                  label="Location (City, Country)"
                  id="location"
                  error={errors.location}
                  {...register('location')}
                  placeholder="e.g., New York, USA"
                />
                
                <div className="md:col-span-2">
                  <Textarea
                    label="Artist Bio"
                    id="bio"
                    error={errors.bio}
                    {...register('bio')}
                    placeholder="Tell us about the artist, their style, experience, etc."
                    rows={4}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Performance Details */}
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-6 pb-2 border-b">Performance Details</h2>
          
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              Performance Categories
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {categories.map(category => (
                <Checkbox
                  key={category}
                  label={category}
                  checked={watch('categories')?.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                />
              ))}
            </div>
            {errors.categories && (
              <p className="text-red-500 text-sm mt-1">{errors.categories.message}</p>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Languages Spoken
              </label>
              <select
                multiple
                className="w-full p-3 border border-gray-300 rounded-md min-h-[120px] focus:ring-indigo-500 focus:border-indigo-500"
                {...register('languages')}
              >
                {languages.map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
              {errors.languages && (
                <p className="text-red-500 text-sm mt-1">{errors.languages.message}</p>
              )}
            </div>
            
            <div>
              <Select
                label="Fee Range"
                id="feeRange"
                options={feeRanges}
                error={errors.feeRange}
                {...register('feeRange')}
                placeholder="Select a fee range"
              />
              
              <div className="mt-6">
                <Input
                  label="Website (optional)"
                  id="website"
                  error={errors.website}
                  {...register('website')}
                  placeholder="https://yourwebsite.com"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Social Media */}
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-6 pb-2 border-b">Social Media & Links</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="YouTube Channel (optional)"
              id="youtube"
              {...register('socialMedia')}
              placeholder="https://youtube.com/yourchannel"
              icon={
                <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                </svg>
              }
            />
            
            <Input
              label="Instagram (optional)"
              id="instagram"
              {...register('socialMedia')}
              placeholder="https://instagram.com/yourprofile"
              icon={
                <svg className="h-5 w-5 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              }
            />
          </div>
        </section>
        
        <div className="flex justify-between">
          <Button 
            type="button" 
            variant="outline"
            onClick={() => {
              reset();
              setPreviewImage(null);
            }}
          >
            Clear Form
          </Button>
          <Button 
            type="submit" 
            variant="primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Artist Profile'}
          </Button>
        </div>
      </form>
    </div>
  );
}