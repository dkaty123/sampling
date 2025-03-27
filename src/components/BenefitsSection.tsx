
import { User, Clock, MessageSquare, ArrowUpRight, Check } from 'lucide-react';

const BenefitsSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 animate-fade-in">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-brand-pink/10 text-brand-pink text-xs font-medium mb-4">
            <span>Benefits</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Works like the best customer service agents
            </h2>
            <p className="text-lg text-muted-foreground">
              Sampling Labs is designed to work with your existing tools and workflows.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-5 animate-fade-in animation-delay-100">
            <div className="bg-white rounded-2xl border border-red-100 overflow-hidden p-6 shadow-sm hover:shadow-md transition-all duration-300">
              <h3 className="text-xl font-semibold mb-6">Plan details</h3>
              
              <div className="space-y-4 mb-8">
                <div className="h-4 bg-gray-100 rounded-full w-full"></div>
                <div className="h-4 bg-gray-100 rounded-full w-3/4"></div>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <div className="text-sm text-gray-600">Renew date:</div>
                <div className="text-sm font-medium">23 Jan, 2025</div>
              </div>
              
              <div className="flex justify-between items-center py-3">
                <div className="text-sm text-gray-600">Status:</div>
                <div className="text-sm font-medium text-red-500">Expired</div>
              </div>
              
              <button className="mt-6 w-full py-3 bg-black text-white rounded-lg flex items-center justify-center gap-2 text-sm">
                <Check className="h-4 w-4" />
                <span>Checking plan details...</span>
              </button>
            </div>
          </div>
          
          <div className="md:col-span-7 space-y-8">
            {/* Benefit 1 */}
            <div className="flex items-start gap-4 animate-fade-in animation-delay-200">
              <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center text-brand-pink flex-shrink-0">
                <User className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Personalized answers</h3>
                <p className="text-muted-foreground">
                  Your agent knows the logged in user and can retrieve their information to provide personalized answers.
                </p>
              </div>
            </div>
            
            {/* Benefit 2 */}
            <div className="flex items-start gap-4 animate-fade-in animation-delay-300">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-700 flex-shrink-0">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Instant actions</h3>
                <p className="text-muted-foreground">
                  Actions are performed in real-time, allowing customers to get immediate assistance without waiting.
                </p>
              </div>
            </div>
            
            {/* Benefit 3 */}
            <div className="flex items-start gap-4 animate-fade-in animation-delay-400">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-700 flex-shrink-0">
                <MessageSquare className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Empathetic & on-brand</h3>
                <p className="text-muted-foreground">
                  Your agent maintains your brand voice and responds with empathy to create a positive customer experience.
                </p>
              </div>
            </div>
            
            {/* Benefit 4 */}
            <div className="flex items-start gap-4 animate-fade-in animation-delay-500">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-700 flex-shrink-0">
                <ArrowUpRight className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Smart escalations</h3>
                <p className="text-muted-foreground">
                  When needed, your agent knows when to escalate complex issues to human agents seamlessly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
