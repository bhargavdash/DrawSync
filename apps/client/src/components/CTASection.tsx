import Link from 'next/link';

const CTASection = () => {
  return (
    <section className="py-24 bg-gray-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-900 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-900 rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-700">
          <div className="px-6 py-12 md:p-12 text-center md:text-left md:flex md:items-center md:justify-between">
            <div>
              <h2 className="text-3xl font-bold text-white md:text-4xl">
                Ready to start collaborating?
              </h2>
              <p className="mt-4 text-xl text-gray-300 max-w-2xl">
                Join thousands of teams already using DrawSync to bring their ideas to life.
              </p>
            </div>
            <div className="mt-8 md:mt-0 md:ml-8 flex flex-col sm:flex-row justify-center md:justify-start gap-4">
              <Link 
                href="/signup" 
                className="px-8 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium text-lg shadow-lg hover:shadow-pink-500/20 transition-all duration-300 transform hover:-translate-y-1"
              >
                Sign Up Free
              </Link>
              <Link 
                href="/signin" 
                className="px-8 py-3 rounded-lg border border-gray-600 text-white font-medium text-lg hover:bg-gray-800 transition-all duration-300"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;