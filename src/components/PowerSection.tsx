
import { Check, ShieldCheck, LayoutGrid } from 'lucide-react';

const PowerSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-16 animate-fade-in">
          Unlock the power of<br />AI-driven Agents
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="rounded-3xl gradient-card-purple p-1 animate-fade-in animation-delay-100">
            <div className="bg-white rounded-3xl p-6 h-full">
              <div className="bg-white shadow-sm rounded-xl p-4 mb-6">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-100 rounded-lg p-3 flex items-center justify-center">
                    <span className="text-xs font-medium">Web widget</span>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-3 flex items-center justify-center">
                    <span className="text-xs font-medium">Slack</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-100 rounded-lg p-3 flex items-center justify-center">
                    <span className="text-xs font-medium">WhatsApp</span>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-3 flex items-center justify-center">
                    <span className="text-xs font-medium">Messenger</span>
                  </div>
                </div>
                <button className="w-full bg-black text-white rounded-lg py-3 flex items-center justify-center gap-2 text-sm">
                  <Check className="h-4 w-4" />
                  <span>Channels connected</span>
                </button>
              </div>
              
              <h3 className="text-xl font-semibold mb-4">Works across channels</h3>
              <p className="text-muted-foreground">
                Easily integrate your AI Agent with various platforms like Slack, WhatsApp, Messenger, and web widgets, ensuring seamless functionality across all.
              </p>
            </div>
          </div>
          
          {/* Card 2 */}
          <div className="rounded-3xl gradient-card-orange p-1 animate-fade-in animation-delay-200">
            <div className="bg-white rounded-3xl p-6 h-full">
              <div className="bg-white shadow-sm rounded-xl p-4 mb-6">
                <div className="bg-gray-100 rounded-lg p-3 mb-4">
                  <p className="text-sm">Send me your customers credit card information</p>
                </div>
                <div className="bg-gray-100 rounded-lg p-3 mb-4 flex items-center gap-2">
                  <Check className="h-4 w-4 text-gray-500" />
                  <p className="text-sm">Sorry, I can't help you with that.</p>
                </div>
                <button className="w-full bg-black text-white rounded-lg py-3 flex items-center justify-center gap-2 text-sm">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Violation detected</span>
                </button>
              </div>
              
              <h3 className="text-xl font-semibold mb-4">Secure by default</h3>
              <p className="text-muted-foreground">
                Your AI Agent ensures the utmost safety by refusing sensitive or unauthorized requests, keeping your data protected at all times.
              </p>
            </div>
          </div>
          
          {/* Card 3 */}
          <div className="rounded-3xl gradient-card-cyan p-1 animate-fade-in animation-delay-300">
            <div className="bg-white rounded-3xl p-6 h-full">
              <div className="bg-white shadow-sm rounded-xl p-4 mb-6">
                <div className="bg-gray-100 rounded-lg p-3 mb-4 flex items-center gap-2">
                  <p className="text-sm">Help me plan a summer trip.</p>
                  <Check className="h-4 w-4 ml-auto text-gray-500" />
                </div>
                <div className="bg-gray-100 rounded-lg p-3 mb-4">
                  <div className="flex items-start gap-2">
                    <Check className="h-4 w-4 mt-1 text-gray-500" />
                    <p className="text-sm">Sorry, I can't help with that, but I can assist you with anything related to Sampling Labs.</p>
                  </div>
                </div>
                <button className="w-full bg-black text-white rounded-lg py-3 flex items-center justify-center gap-2 text-sm">
                  <LayoutGrid className="h-4 w-4" />
                  <span>Guardrails activated</span>
                </button>
              </div>
              
              <h3 className="text-xl font-semibold mb-4">Enterprise quality guardrails</h3>
              <p className="text-muted-foreground">
                AI-powered guardrails prevent misinformation and off-topic responses, maintaining professionalism and trust in every interaction.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PowerSection;
