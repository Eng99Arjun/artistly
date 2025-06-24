import Link from 'next/link';
import  Button  from '@/components/ui/Button';

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-indigo-600 mb-4 md:mb-0">
          Artistly
        </Link>
        
        <nav className="flex flex-wrap justify-center gap-4">
          <Link href="/" className="text-gray-600 hover:text-gray-900 font-medium">
            Home
          </Link>
          <Link href="/artists" className="text-gray-600 hover:text-gray-900 font-medium">
            Artists
          </Link>
          <Link href="/onboard" className="text-gray-600 hover:text-gray-900 font-medium">
            Onboard Artist
          </Link>
          <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 font-medium">
            Dashboard
          </Link>
        </nav>
        
        <div className="mt-4 md:mt-0 flex gap-3">
          <Button asChild variant="outline">
            <Link href="/login">Log In</Link>
          </Button>
          <Button asChild variant="primary">
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}