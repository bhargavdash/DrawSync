import Link from 'next/link';

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"></div>
      
      {/* Floating elements animation */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-48">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
              <span className="block">Collaborate in real-time</span>
              <span className="block mt-2 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                on your ideas
              </span>
            </h1>
            <p className="mt-6 max-w-lg mx-auto md:mx-0 text-xl text-gray-300 leading-relaxed">
              Create, share, and collaborate on drawings with your team in real-time. 
              Turn your ideas into visual concepts with our powerful and intuitive canvas.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center md:justify-start gap-4">
              <Link 
                href="/signup" 
                className="px-8 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium text-lg shadow-lg hover:shadow-pink-500/20 transition-all duration-300 transform hover:-translate-y-1"
              >
                Get Started
              </Link>
              <Link 
                href="#demo" 
                className="px-8 py-3 rounded-lg border border-gray-600 text-white font-medium text-lg hover:bg-gray-800 transition-all duration-300"
              >
                See Demo
              </Link>
            </div>
          </div>
          <div className="relative mt-12 md:mt-0">
            <div className="aspect-w-16 aspect-h-9 relative bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-700 transform rotate-1 hover:rotate-0 transition-transform duration-500">
              <div className="absolute inset-0 p-4">
                <div className="w-full h-full rounded-lg bg-gray-900 flex items-center justify-center">
                  <div className="text-gray-400 text-center">
                    <div className="mb-2 flex justify-center">
                      <svg viewBox="0 0 24 24" className="w-16 h-16 text-purple-500" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
                      </svg>
                    </div>
                    <p className="text-xl font-medium">Interactive Canvas Preview</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full opacity-50 blur-xl"></div>
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full opacity-50 blur-xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;