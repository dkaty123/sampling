
import { Check, ChevronLeft } from 'lucide-react';

const SolutionSection = () => {
  const steps = [
    {
      number: '01.',
      title: 'Build & deploy your agent',
      description: 'Train an agent on your business data, configure the actions it can take, then deploy it for your customers.'
    },
    {
      number: '02.',
      title: 'Agent solves your customers\' problems',
      description: 'Your AI agent handles customer inquiries efficiently and professionally.'
    },
    {
      number: '03.',
      title: 'Refine & optimize',
      description: 'Continuously improve your agent based on customer interactions and feedback.'
    },
    {
      number: '04.',
      title: 'Route complex issues to a human',
      description: 'When necessary, the agent seamlessly escalates to human support agents.'
    },
    {
      number: '05.',
      title: 'Review analytics & insights',
      description: 'Gain valuable insights from customer interactions to improve your product and service.'
    }
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">
              An end-to-end solution for conversational AI
            </h2>
            
            <div className="space-y-8">
              {steps.map((step, index) => (
                <div key={index} className={`flex ${index === 0 ? 'text-brand-blue' : 'text-gray-400'}`}>
                  <div className="w-16 flex-shrink-0 font-semibold">
                    {step.number}
                  </div>
                  <div className={`${index === 0 ? 'text-black' : 'text-gray-400'}`}>
                    <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                    {index === 0 && (
                      <p className="text-muted-foreground">{step.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative animate-fade-in animation-delay-300">
            <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="mb-4">
                <p className="text-gray-800">With Sampling Labs, your customers can effortlessly find answers, resolve issues, and take meaningful actions through seamless and engaging AI-driven conversations.</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg flex items-center gap-3 mb-4">
                <div className="w-5 h-5 rounded-full bg-gray-200 flex-shrink-0"></div>
                <p className="text-sm">Can I book a meeting with Sales?</p>
                <div className="w-6 h-6 rounded-full overflow-hidden ml-auto">
                  <div className="w-full h-full bg-gray-300"></div>
                </div>
              </div>
              
              <div className="w-full bg-gradient-to-r from-brand-cyan to-brand-pink h-1.5 rounded-full mb-6"></div>
              
              <div className="absolute right-4 bottom-4">
                <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <ChevronLeft className="h-5 w-5 text-gray-500" />
                </button>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-5 -right-5 w-16 h-16 bg-brand-cyan/10 rounded-full animate-float"></div>
            <div className="absolute -bottom-5 -left-5 w-12 h-12 bg-brand-pink/10 rounded-full animate-float animation-delay-300"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
