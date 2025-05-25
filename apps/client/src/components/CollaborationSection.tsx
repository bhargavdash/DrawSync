const CollaborationSection = () => {
  return (
    <section id="collaboration" className="py-24 bg-gray-800 relative overflow-hidden">
      {/* Background gradient elements */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-900/30 rounded-full filter blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-pink-900/20 rounded-full filter blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Collaborate Like Never Before
          </h2>
          <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
            Experience the power of real-time collaboration with multiple users working simultaneously.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h3 className="text-2xl font-bold text-white mb-6">
              See changes in real-time
            </h3>
            <ul className="space-y-4">
              {[
                'Watch as teammates add new elements to the canvas',
                'Multiple cursors show who is working where',
                'Changes sync instantly across all connected devices',
                'No refresh needed - everything updates automatically',
                'Conflict resolution ensures smooth collaboration'
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="ml-3 text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="order-1 lg:order-2 relative">
            <div className="aspect-w-16 aspect-h-9 bg-gray-900 rounded-xl overflow-hidden border border-gray-700 shadow-2xl">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-full bg-gray-900 p-4">
                  <div className="w-full h-full border-2 border-dashed border-gray-700 rounded-lg flex items-center justify-center">
                    <div className="text-gray-500 text-center">
                      <p className="text-lg">Collaboration Demo</p>
                      <p className="text-sm mt-2">Multiple cursors working together</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Cursor animations */}
              <div className="absolute w-5 h-5 rounded-full border-2 border-blue-500 animate-ping" style={{ top: '30%', left: '40%', animationDuration: '2s', animationDelay: '0.5s' }}></div>
              <div className="absolute w-5 h-5 rounded-full border-2 border-green-500 animate-ping" style={{ top: '50%', left: '60%', animationDuration: '2.5s' }}></div>
              <div className="absolute w-5 h-5 rounded-full border-2 border-yellow-500 animate-ping" style={{ top: '70%', left: '30%', animationDuration: '3s', animationDelay: '1s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollaborationSection;