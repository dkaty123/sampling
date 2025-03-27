
import { FileLock, Database, Package } from 'lucide-react';

const SecuritySection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Enterprise-grade<br />security & privacy
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8">
              We take security and compliance seriously. Sampling Labs is SOC 2 Type II and GDPR compliant, trusted by thousands of businesses to build secure and compliant AI Agents.
            </p>
            
            <div className="flex items-center gap-8 mb-6">
              <div className="w-16 h-16 rounded-full border border-gray-200 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <line x1="9" y1="9" x2="15" y2="9" />
                  <line x1="9" y1="12" x2="15" y2="12" />
                  <line x1="9" y1="15" x2="15" y2="15" />
                </svg>
              </div>
              
              <div className="w-16 h-16 rounded-full border border-gray-200 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                </svg>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span className="text-sm text-muted-foreground">Sampling Labs is committed to safeguarding your data.</span>
              <a href="#" className="text-sm font-medium inline-flex items-center">
                Learn more
                <svg className="h-4 w-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
          
          <div className="space-y-8 animate-fade-in animation-delay-300">
            {/* Security Feature 1 */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-brand-blue flex-shrink-0">
                <Database className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Your data stays yours</h3>
                <p className="text-muted-foreground">
                  Your data is only accessible to your AI agent and is never used to train models.
                </p>
              </div>
            </div>
            
            {/* Security Feature 2 */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-brand-blue flex-shrink-0">
                <FileLock className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Data encryption</h3>
                <p className="text-muted-foreground">
                  All data is encrypted at rest and in transit. We use industry-standard encryption algorithms.
                </p>
              </div>
            </div>
            
            {/* Security Feature 3 */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-brand-blue flex-shrink-0">
                <Package className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Secure integrations</h3>
                <p className="text-muted-foreground">
                  We use verified variables to ensure users can access only their own data in your systems.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecuritySection;
