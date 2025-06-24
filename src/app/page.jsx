import Link from 'next/link';
import  Button  from '@/components/ui/Button';

export default function Home() {
  const categories = [
    { id: 1, name: 'Singers', icon: '🎤', count: 120 },
    { id: 2, name: 'Dancers', icon: '💃', count: 85 },
    { id: 3, name: 'Speakers', icon: '🎙️', count: 65 },
    { id: 4, name: 'DJs', icon: '🎧', count: 95 },
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Event Planner, TechCon',
      text: 'Found the perfect keynote speaker for our conference in just 2 days!',
    },
    {
      id: 2,
      name: 'Michael Rodriguez',
      role: 'Wedding Planner',
      text: 'The live band made our wedding unforgettable. Easy booking process!',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Book Top Performing Artists
          </h1>
          <p className="text-xl mb-10 max-w-2xl mx-auto">
            Connect with the perfect talent for your next event. Thousands of artists ready to perform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild variant="secondary" size="lg">
              <Link href="/artists">Browse Artists</Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/onboard">List Your Talent</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">How Artistly Works</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Simple steps to find and book the perfect performers for your event
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Browse Artists</h3>
              <p className="text-gray-600">
                Search our diverse catalog of performers by category, location, and price range.
              </p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Request Booking</h3>
              <p className="text-gray-600">
                Send inquiries directly to artists or their managers with your event details.
              </p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Confirm & Enjoy</h3>
              <p className="text-gray-600">
                Finalize details, sign contracts, and enjoy an amazing performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Popular Categories</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Find the perfect performer for your event type
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link 
                key={category.id}
                href={`/artists?category=${category.name}`}
                className="bg-white rounded-xl shadow-md p-8 text-center hover:shadow-lg transition-all duration-300"
              >
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                <p className="text-gray-500">{category.count} artists available</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Clients Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-gray-50 p-6 rounded-xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Find Your Performer?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of event planners booking talent through Artistly
          </p>
          <Button asChild variant="secondary" size="lg">
            <Link href="/signup">Get Started Free</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}