import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import CollaborationSection from '@/components/CollaborationSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

export default function Home() {

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <CollaborationSection />
      <CTASection />
      <Footer />
    </main>
  );
}