
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';

type PricingPlan = 'monthly' | 'annual';

const PricingSection = () => {
  const [billingPeriod, setBillingPeriod] = useState<PricingPlan>('monthly');

  const toggleBillingPeriod = () => {
    setBillingPeriod(billingPeriod === 'monthly' ? 'annual' : 'monthly');
  };

  const pricingPlans = [
    {
      name: 'Starter',
      description: 'Perfect for small businesses and startups',
      monthlyPrice: '$29',
      annualPrice: '$290',
      features: [
        '1,000 AI messages per month',
        'Basic analytics',
        'Web widget integration',
        'Email support',
        '1 team member'
      ],
      featured: false,
      cta: 'Start free trial'
    },
    {
      name: 'Professional',
      description: 'Ideal for growing businesses with advanced needs',
      monthlyPrice: '$99',
      annualPrice: '$990',
      features: [
        '10,000 AI messages per month',
        'Advanced analytics',
        'All integrations',
        'Priority support',
        'Unlimited team members',
        'Custom branding',
        'Advanced guardrails'
      ],
      featured: true,
      cta: 'Start free trial'
    },
    {
      name: 'Enterprise',
      description: 'Custom solutions for large organizations',
      monthlyPrice: 'Custom',
      annualPrice: 'Custom',
      features: [
        'Unlimited AI messages',
        'Enterprise analytics',
        'Custom integrations',
        'Dedicated support',
        'SLA guarantees',
        'Single sign-on (SSO)',
        'Advanced security features',
        'Custom model training'
      ],
      featured: false,
      cta: 'Contact sales'
    }
  ];

  return (
    <section id="pricing" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Choose the plan that's right for your business. All plans include a 14-day free trial.
          </p>
          
          <div className="flex items-center justify-center">
            <span className={`mr-3 text-sm ${billingPeriod === 'monthly' ? 'font-medium' : 'text-muted-foreground'}`}>Monthly</span>
            <div 
              className="relative w-14 h-7 bg-gray-200 rounded-full cursor-pointer"
              onClick={toggleBillingPeriod}
            >
              <div 
                className={`absolute top-1 w-5 h-5 rounded-full bg-brand-blue transition-transform ${
                  billingPeriod === 'annual' ? 'translate-x-8' : 'translate-x-1'
                }`} 
              />
            </div>
            <div className="ml-3 flex flex-col items-start">
              <span className={`text-sm ${billingPeriod === 'annual' ? 'font-medium' : 'text-muted-foreground'}`}>Annual</span>
              <span className="text-xs text-brand-pink font-medium">Save 20%</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <div 
              key={index}
              className={`rounded-2xl overflow-hidden animate-fade-in ${
                plan.featured 
                  ? 'bg-gradient-to-b from-brand-blue to-brand-blue/80 text-white transform scale-105 shadow-xl z-10 border-0' 
                  : 'bg-white border border-gray-200'
              }`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className={`${plan.featured ? 'text-white/80' : 'text-muted-foreground'} mb-6`}>
                  {plan.description}
                </p>
                
                <div className="mb-6">
                  <div className="text-4xl font-bold">
                    {billingPeriod === 'monthly' ? plan.monthlyPrice : plan.annualPrice}
                    {plan.monthlyPrice !== 'Custom' && (
                      <span className={`text-lg ml-1 ${plan.featured ? 'text-white/80' : 'text-muted-foreground'}`}>
                        /{billingPeriod === 'monthly' ? 'mo' : 'year'}
                      </span>
                    )}
                  </div>
                  {billingPeriod === 'annual' && plan.monthlyPrice !== 'Custom' && (
                    <p className={`text-sm mt-2 ${plan.featured ? 'text-white/80' : 'text-muted-foreground'}`}>
                      Billed annually ({plan.monthlyPrice}/month value)
                    </p>
                  )}
                </div>
                
                <Button 
                  className={`w-full mb-8 ${
                    plan.featured 
                      ? 'bg-white text-brand-blue hover:bg-white/90' 
                      : 'bg-brand-blue text-white hover:bg-brand-blue/90'
                  }`}
                >
                  {plan.cta}
                </Button>
                
                <div className="space-y-4">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start">
                      <CheckCircle2 className={`h-5 w-5 mr-3 flex-shrink-0 ${plan.featured ? 'text-white' : 'text-brand-blue'}`} />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16 animate-fade-in animation-delay-500">
          <p className="text-muted-foreground mb-4">
            Need a custom plan? We can create a tailored solution for your specific needs.
          </p>
          <Button variant="outline">Contact our sales team</Button>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
