
import { LucideAlignLeft, LucideShield, LucideSettings } from 'lucide-react';

const FeaturesSection = () => {
  return (
    <section id="features" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-medium mb-4">
            <span>Highlights</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            The complete platform for AI support agents
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Sampling Labs is designed for building AI support agents that solve your customers' hardest problems while improving business outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow animate-fade-in animation-delay-100">
            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-black text-white w-12 h-12 rounded-lg flex items-center justify-center">
                  <span className="text-2xl font-bold">C</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium">AI</span>
                <span className="px-3 py-1 bg-brand-blue/10 rounded-full text-xs font-medium text-brand-blue">
                  <svg className="h-3 w-3 inline mr-1" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="12" r="12" />
                  </svg>
                </span>
                <span className="px-3 py-1 bg-teal-100 rounded-full text-xs font-medium text-teal-700">
                  <svg className="h-3 w-3 inline mr-1" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="12" r="12" />
                  </svg>
                </span>
              </div>
            </div>
            
            <h3 className="text-xl font-semibold mb-4">Purpose-built for LLMs</h3>
            <p className="text-muted-foreground">Language models with reasoning capabilities for effective responses to complex queries.</p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow animate-fade-in animation-delay-200">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="font-bold">B</div>
                <div className="font-bold">I</div>
                <div className="font-bold">U</div>
                <div className="font-bold">S</div>
              </div>
              <div className="flex gap-2 mb-4">
                <div className="w-6 h-6 rounded-full bg-green-500"></div>
                <div className="w-6 h-6 rounded-full bg-yellow-300"></div>
                <div className="w-6 h-6 rounded-full bg-yellow-400"></div>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full mb-4"></div>
              <div className="flex items-center">
                <div className="w-8 h-4 bg-green-200 rounded-full mr-2 relative">
                  <div className="absolute w-3 h-3 bg-green-500 rounded-full left-1 top-0.5"></div>
                </div>
                <span className="text-xs text-gray-500">Reply with AI</span>
              </div>
            </div>
            
            <h3 className="text-xl font-semibold mb-4">Designed for simplicity</h3>
            <p className="text-muted-foreground">Create, manage, and deploy AI Agents easily, even without technical skills.</p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow animate-fade-in animation-delay-300">
            <div className="mb-6">
              <div className="bg-black text-white w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0110 0v4"></path>
                </svg>
              </div>
            </div>
            
            <h3 className="text-xl font-semibold mb-4">Engineered for security</h3>
            <p className="text-muted-foreground">Enjoy peace of mind with robust encryption and strict compliance standards.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
