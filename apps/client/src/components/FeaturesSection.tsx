import { Lightbulb, Users, Zap, Palette, Lock, Clock } from 'lucide-react';

const features = [
  {
    title: 'Real-time Collaboration',
    description: 'Work together with your team in real-time. See changes as they happen.',
    icon: Users,
  },
  {
    title: 'Intuitive Drawing Tools',
    description: 'Simple yet powerful drawing tools that anyone can master in minutes.',
    icon: Palette,
  },
  {
    title: 'Lightning Fast',
    description: 'Optimized performance ensures smooth drawing experience on any device.',
    icon: Zap,
  },
  {
    title: 'Idea Visualization',
    description: 'Turn abstract concepts into clear visual representations quickly.',
    icon: Lightbulb,
  },
  {
    title: 'Secure Sharing',
    description: 'Control who can view and edit your drawings with granular permissions.',
    icon: Lock,
  },
  {
    title: 'Version History',
    description: 'Track changes and revert to previous versions of your work anytime.',
    icon: Clock,
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Powerful Features for Seamless Collaboration
          </h2>
          <p className="mt-4 text-xl text-gray-400 max-w-3xl mx-auto">
            Everything you need to bring your ideas to life and collaborate effectively with your team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg p-2.5 mb-5 flex items-center justify-center">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;