import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Book, ArrowRight, Clock, Calendar, ChevronRight, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatDate, truncateText, calculateReadTime } from '@/lib/utils';
import { Link } from 'react-router-dom';

const blogPosts = [
  {
    id: 1,
    title: 'How AI is Revolutionizing Customer Support',
    slug: 'how-ai-is-revolutionizing-customer-support',
    excerpt: 'Discover how AI-powered agents are transforming customer support operations, reducing response times, and improving customer satisfaction.',
    coverImage: 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    category: 'AI Technology',
    date: '2023-09-15',
    author: 'Alex Johnson',
    readTime: 5,
    content: `<p>In today's digital-first business environment, exceptional customer support is not just a nice-to-have—it's critical for survival. Companies that excel at customer service outperform their competitors across nearly every metric that matters: retention, satisfaction, lifetime value, and revenue growth.</p>
    <p>But delivering outstanding support at scale has traditionally been challenging. As businesses grow, they often struggle to maintain quality while handling increasing volumes of customer inquiries. This is where AI is making a revolutionary impact.</p>
    <h2>The Evolution of Customer Support</h2>
    <p>Customer support has evolved dramatically over the years:</p>
    <ul>
      <li><strong>Traditional call centers:</strong> Phone-based support with long wait times</li>
      <li><strong>Multi-channel support:</strong> Addition of email, chat, and social media</li>
      <li><strong>Self-service tools:</strong> FAQs, knowledge bases, and forums</li>
      <li><strong>Basic chatbots:</strong> Script-based automated responses</li>
      <li><strong>AI-powered agents:</strong> Intelligent, context-aware virtual assistants</li>
    </ul>
    <p>The latest evolution—AI-powered support agents—represents a quantum leap forward in capabilities. Unlike their predecessors, today's AI agents can understand context, learn from interactions, personalize responses, and seamlessly handle complex issues.</p>
    <h2>Key Benefits of AI in Customer Support</h2>
    <p>The implementation of AI in customer support brings numerous advantages:</p>
    <h3>1. 24/7 Availability</h3>
    <p>AI never sleeps. With AI agents, businesses can offer round-the-clock support without the costs associated with staffing multiple shifts or international teams.</p>
    <h3>2. Instant Response Times</h3>
    <p>Customers hate waiting. AI eliminates the wait, with response times measured in milliseconds rather than minutes or hours.</p>
    <h3>3. Consistent Quality</h3>
    <p>Human agents have bad days; AI doesn't. This consistency ensures every customer receives the same high-quality support experience.</p>
    <h3>4. Scalability</h3>
    <p>AI systems can handle virtually unlimited concurrent conversations, allowing businesses to scale support operations without proportionally scaling costs.</p>
    <h3>5. Data-Driven Insights</h3>
    <p>Every interaction generates valuable data that businesses can analyze to improve products, services, and the overall customer experience.</p>
    <h2>Real-World Success Stories</h2>
    <p>Companies across industries are already reaping the benefits of AI-powered customer support:</p>
    <ul>
      <li><strong>E-commerce giant:</strong> Reduced support costs by 25% while improving customer satisfaction scores by 15%</li>
      <li><strong>SaaS provider:</strong> Decreased average resolution time from 2 hours to 10 minutes</li>
      <li><strong>Financial services firm:</strong> Handled 80% of routine inquiries through AI, freeing human agents to focus on complex cases</li>
    </ul>
    <h2>The Future of AI in Customer Support</h2>
    <p>As language models continue to improve and technologies like voice recognition advance, we can expect AI to handle increasingly sophisticated interactions. The next frontier includes:</p>
    <ul>
      <li>Emotionally intelligent AI that can detect and respond appropriately to customer sentiment</li>
      <li>Predictive support that identifies and resolves potential issues before customers even notice them</li>
      <li>Hyper-personalized experiences based on comprehensive customer data</li>
    </ul>
    <p>While AI will never completely replace the human touch in customer support, it's dramatically expanding what's possible in the field. Organizations that embrace these technologies now will be well-positioned to deliver exceptional customer experiences at scale—a competitive advantage that will only grow in importance in the years ahead.</p>`
  },
  {
    id: 2,
    title: 'Building Effective AI Agents: A Complete Guide',
    slug: 'building-effective-ai-agents-complete-guide',
    excerpt: 'Learn the step-by-step process of creating AI agents that deliver exceptional customer experiences while driving business growth.',
    coverImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    category: 'Development',
    date: '2023-10-02',
    author: 'Maria Chen',
    readTime: 8,
    content: `<p>Creating an effective AI agent is much more than just implementing a chatbot on your website. It requires careful planning, development, and ongoing optimization to ensure it delivers value to both your customers and your business. This comprehensive guide walks through the essential steps to build an AI agent that truly transforms your customer support operations.</p>
    <h2>1. Define Your Objectives</h2>
    <p>Before diving into development, clearly define what you want your AI agent to achieve:</p>
    <ul>
      <li>Reduce support ticket volume</li>
      <li>Decrease average resolution time</li>
      <li>Improve customer satisfaction scores</li>
      <li>Increase conversion rates</li>
      <li>Generate qualified leads</li>
    </ul>
    <p>Having specific, measurable goals will help you design an agent with the right capabilities and evaluate its performance effectively.</p>
    <h2>2. Understand Your Users</h2>
    <p>Successful AI agents are built with a deep understanding of the users they'll serve:</p>
    <ul>
      <li>What are their most common questions and issues?</li>
      <li>What channels do they prefer for communication?</li>
      <li>What is their level of technical sophistication?</li>
      <li>What tone and style of communication do they respond to best?</li>
    </ul>
    <p>Use customer interviews, support ticket analysis, and user research to develop detailed personas that will guide your agent's design.</p>
    <h2>3. Map the Customer Journey</h2>
    <p>Identify all the touchpoints where an AI agent could provide value across the customer journey:</p>
    <ul>
      <li><strong>Awareness:</strong> Answering product questions, providing educational content</li>
      <li><strong>Consideration:</strong> Guiding product selection, offering comparisons</li>
      <li><strong>Purchase:</strong> Assisting with checkout, answering payment questions</li>
      <li><strong>Onboarding:</strong> Providing setup help, explaining features</li>
      <li><strong>Ongoing Support:</strong> Troubleshooting issues, processing returns</li>
    </ul>
    <p>This mapping helps ensure your agent can support customers at every stage of their relationship with your business.</p>
    <h2>4. Choose the Right Technology</h2>
    <p>Several factors should influence your choice of AI platform:</p>
    <ul>
      <li>Required natural language understanding capabilities</li>
      <li>Integration needs with existing systems (CRM, help desk, etc.)</li>
      <li>Deployment channels (web, mobile, messaging platforms)</li>
      <li>Security and compliance requirements</li>
      <li>Budget and technical resources</li>
    </ul>
    <p>Options range from building custom solutions using large language models to implementing comprehensive platforms that provide end-to-end capabilities.</p>
    <h2>5. Design Conversational Flows</h2>
    <p>Map out the conversations your agent will have with users:</p>
    <ul>
      <li>Create dialogue trees for common scenarios</li>
      <li>Define fallback responses for when the agent doesn't understand</li>
      <li>Establish escalation paths to human agents</li>
      <li>Design proactive messaging for relevant situations</li>
    </ul>
    <p>The best conversational flows feel natural while efficiently guiding users toward resolution.</p>
    <h2>6. Develop Knowledge Base & Integrations</h2>
    <p>Your AI agent is only as good as the information available to it:</p>
    <ul>
      <li>Create comprehensive documentation of products, policies, and procedures</li>
      <li>Integrate with backend systems to access customer data and perform actions</li>
      <li>Connect with e-commerce platforms for order information</li>
      <li>Link to content management systems for dynamic information</li>
    </ul>
    <p>These connections allow your agent to provide personalized assistance and take meaningful actions on behalf of customers.</p>
    <h2>7. Test Extensively</h2>
    <p>Rigorous testing is essential before launching your AI agent:</p>
    <ul>
      <li>Internal testing with support team members</li>
      <li>Controlled beta testing with real customers</li>
      <li>A/B testing of different conversational approaches</li>
      <li>Load testing to ensure performance at scale</li>
    </ul>
    <p>Identify and fix issues before they impact your broader customer base.</p>
    <h2>8. Deploy Strategically</h2>
    <p>Consider a phased rollout approach:</p>
    <ul>
      <li>Start with a limited scope of topics the agent can handle</li>
      <li>Begin with lower-traffic channels or times</li>
      <li>Gradually expand capabilities as performance proves successful</li>
    </ul>
    <p>This approach minimizes risk while allowing your team to learn and adapt.</p>
    <h2>9. Monitor & Optimize</h2>
    <p>Ongoing improvement is critical for long-term success:</p>
    <ul>
      <li>Track key performance metrics (resolution rate, CSAT, etc.)</li>
      <li>Analyze conversation logs to identify common failure points</li>
      <li>Regularly review and update knowledge base content</li>
      <li>Continuously retrain the AI model with new data</li>
    </ul>
    <p>The most effective AI agents evolve based on real-world interactions and feedback.</p>
    <h2>10. Balance Automation & Human Touch</h2>
    <p>Even the best AI needs human backup:</p>
    <ul>
      <li>Establish clear handoff protocols between AI and human agents</li>
      <li>Ensure smooth conversation transitions with full context preservation</li>
      <li>Regularly review AI-human collaboration to identify improvement opportunities</li>
    </ul>
    <p>The goal isn't to replace humans but to create a symbiotic relationship where each handles what they do best.</p>
    <h2>Conclusion</h2>
    <p>Building an effective AI agent is a journey that requires thoughtful planning, execution, and continuous refinement. When done right, the results can be transformative—delighted customers, empowered support teams, and significant business impact.</p>
    <p>By following this guide, you'll be well on your way to creating an AI agent that not only meets customer expectations but exceeds them, setting your business apart in an increasingly competitive landscape.</p>`
  },
  {
    id: 3,
    title: 'Measuring the ROI of AI-Powered Support',
    slug: 'measuring-roi-ai-powered-support',
    excerpt: 'Explore the key metrics and methodologies for calculating the true return on investment of implementing AI agents in your customer support operations.',
    coverImage: 'https://images.unsplash.com/photo-1543286386-713bdd548da4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    category: 'Business Strategy',
    date: '2023-10-18',
    author: 'Robert Williams',
    readTime: 6,
    content: `<p>While the benefits of AI-powered support are compelling, business leaders often need hard numbers to justify the investment. Measuring the return on investment (ROI) of AI implementations requires looking beyond traditional metrics to capture the full range of impacts on your business. This article provides a framework for comprehensively evaluating the financial returns of AI support systems.</p>
    <h2>Direct Cost Savings</h2>
    <p>The most straightforward ROI component comes from operational efficiencies:</p>
    <h3>1. Agent Time Savings</h3>
    <p>Calculate the reduction in human agent hours by comparing:</p>
    <ul>
      <li>Number of conversations fully handled by AI (no human intervention)</li>
      <li>Average time saved on conversations where AI handles initial triage</li>
      <li>Reduction in training time required for new human agents</li>
    </ul>
    <p>Multiply these hours by your fully-loaded hourly cost per agent to quantify savings.</p>
    <h3>2. Reduced Cost per Interaction</h3>
    <p>Track the change in your average cost metrics:</p>
    <ul>
      <li>Cost per ticket/conversation before AI implementation</li>
      <li>Cost per ticket/conversation after AI implementation</li>
      <li>Percentage of inquiries diverted to lower-cost self-service channels</li>
    </ul>
    <p>This analysis often reveals 30-70% savings on AI-handled interactions compared to exclusively human-handled ones.</p>
    <h3>3. Staffing Optimization</h3>
    <p>Many organizations realize significant savings through:</p>
    <ul>
      <li>Reduced need to expand support staff as business grows</li>
      <li>Lower overtime costs during peak periods</li>
      <li>Decreased need for outsourced support services</li>
    </ul>
    <p>These savings should be calculated based on your specific staffing model and growth projections.</p>
    <h2>Revenue Impact</h2>
    <p>Beyond cost reduction, AI support often positively affects revenue:</p>
    <h3>1. Improved Conversion Rates</h3>
    <p>Measure changes in:</p>
    <ul>
      <li>Conversion rate for visitors who interact with AI vs. those who don't</li>
      <li>Cart abandonment rate before and after AI implementation</li>
      <li>Average order value when AI assists with purchases</li>
    </ul>
    <p>Studies show that responsive pre-purchase support can increase conversion rates by 10-30%.</p>
    <h3>2. Enhanced Customer Retention</h3>
    <p>Calculate the value of improved retention:</p>
    <ul>
      <li>Churn rate before and after AI implementation</li>
      <li>Customer lifetime value (CLV) preserved through better support</li>
      <li>Increase in renewal rates for subscription businesses</li>
    </ul>
    <p>Given that acquiring a new customer typically costs 5-25 times more than retaining an existing one, retention improvements can significantly impact ROI.</p>
    <h3>3. Upsell and Cross-sell Opportunities</h3>
    <p>Track additional revenue generated when AI proactively identifies opportunities:</p>
    <ul>
      <li>Upsell success rate through AI-driven recommendations</li>
      <li>Incremental revenue from cross-sell suggestions</li>
      <li>Expansion revenue in account-based business models</li>
    </ul>
    <p>AI often excels at identifying the right moment and context for relevant offers.</p>
    <h2>Operational Benefits</h2>
    <p>Many AI advantages translate to financial impact less directly:</p>
    <h3>1. Improved Response Time</h3>
    <p>Quantify the value of faster service:</p>
    <ul>
      <li>Reduction in average response time</li>
      <li>Correlation between response time and customer satisfaction/loyalty</li>
      <li>Value of freeing human agents to focus on complex, high-value interactions</li>
    </ul>
    <p>Research consistently shows that faster resolutions correlate with higher satisfaction and retention rates.</p>
    <h3>2. 24/7 Coverage Value</h3>
    <p>Assess the impact of round-the-clock support:</p>
    <ul>
      <li>Percentage of inquiries handled outside business hours</li>
      <li>Cost comparison against alternative 24/7 coverage options</li>
      <li>Revenue protected by resolving urgent issues immediately</li>
    </ul>
    <p>For global businesses, this often represents significant value that would be prohibitively expensive to achieve with human-only teams.</p>
    <h3>3. Scalability Benefits</h3>
    <p>Calculate the value of handling volume spikes:</p>
    <ul>
      <li>Cost avoidance during seasonal peaks</li>
      <li>Ability to maintain service levels during unexpected surges</li>
      <li>Growth accommodation without proportional support cost increases</li>
    </ul>
    <p>This flexibility offers both financial and competitive advantages.</p>
    <h2>Implementation Costs</h2>
    <p>For an accurate ROI calculation, account for all implementation costs:</p>
    <h3>1. Direct Costs</h3>
    <ul>
      <li>Technology platform licensing or development expenses</li>
      <li>Integration costs with existing systems</li>
      <li>Training data preparation and knowledge base development</li>
      <li>Ongoing maintenance and updates</li>
    </ul>
    <h3>2. Indirect Costs</h3>
    <ul>
      <li>Staff time for implementation and management</li>
      <li>Change management and training expenses</li>
      <li>Potential short-term productivity impacts during transition</li>
    </ul>
    <h2>ROI Calculation Framework</h2>
    <p>A comprehensive ROI model should include:</p>
    <ol>
      <li>Total cost of ownership (TCO) over a defined period (typically 3-5 years)</li>
      <li>All quantifiable benefits (direct savings, revenue impacts, operational efficiencies)</li>
      <li>ROI ratio: (Total Benefits - Total Costs) / Total Costs</li>
      <li>Payback period: Time required to recover the initial investment</li>
    </ol>
    <p>Additionally, track qualitative benefits that may be difficult to quantify but still valuable, such as improved brand perception, enhanced competitive positioning, and better employee satisfaction (as agents focus on more rewarding work).</p>
    <h2>Measurement Best Practices</h2>
    <p>To ensure accurate ROI assessment:</p>
    <ul>
      <li>Establish baseline metrics before implementation</li>
      <li>Use control groups when possible to isolate AI impact</li>
      <li>Incorporate both leading indicators (e.g., CSAT) and lagging indicators (e.g., retention)</li>
      <li>Regularly reassess as the AI system matures and capabilities expand</li>
      <li>Consider conservative and optimistic scenarios in your calculations</li>
    </ul>
    <h2>Conclusion</h2>
    <p>When properly measured, the ROI of AI-powered support typically exceeds expectations. Organizations frequently report payback periods of 6-18 months, with ROI ranging from 100-400% over three years. However, the most successful implementations are those that look beyond immediate cost savings to leverage AI's full potential for enhancing the customer experience and driving business growth.</p>
    <p>By developing a comprehensive measurement framework that captures all relevant impacts, you can not only justify your initial investment but also identify opportunities to maximize returns through expanded capabilities and use cases.</p>`
  },
  {
    id: 4,
    title: "AI Support Agents vs. Traditional Chatbots: What's the Difference?",
    slug: 'ai-support-agents-vs-traditional-chatbots',
    excerpt: 'Understand the key distinctions between modern AI agents and legacy chatbots, and why these differences matter for customer experience.',
    coverImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    category: 'Technology',
    date: '2023-11-05',
    author: 'Sophia Lee',
    readTime: 4,
    content: `<p>When businesses consider implementing automated support solutions, they often encounter confusing terminology. "Chatbot," "virtual assistant," and "AI agent" are sometimes used interchangeably, despite representing fundamentally different technologies with vastly different capabilities. This article clarifies the distinctions between traditional chatbots and modern AI support agents to help you make informed decisions about which technology best serves your needs.</p>
    <h2>Traditional Chatbots: The Rule-Based Approach</h2>
    <p>Traditional chatbots, which have been around for decades, operate on predefined rules and decision trees:</p>
    <h3>Key Characteristics:</h3>
    <ul>
      <li><strong>Script-driven:</strong> Responses are entirely predetermined</li>
      <li><strong>Keyword matching:</strong> Recognition based on specific terms rather than meaning</li>
      <li><strong>Linear conversations:</strong> Follow fixed paths with limited branching</li>
      <li><strong>Limited memory:</strong> Minimal ability to reference earlier parts of a conversation</li>
      <li><strong>Rule-based logic:</strong> If-then structures determine responses</li>
    </ul>
    <h3>Appropriate Use Cases:</h3>
    <ul>
      <li>Simple, predictable interactions (e.g., store hours, return policy)</li>
      <li>Basic form-filling and data collection</li>
      <li>Navigational assistance on websites</li>
      <li>Environments with very limited query variation</li>
    </ul>
    <h3>Limitations:</h3>
    <ul>
      <li>Struggle with unexpected questions or phrasing</li>
      <li>Cannot understand context or nuance</li>
      <li>Require extensive manual programming of responses</li>
      <li>Frustrate users when they fall outside predefined paths</li>
      <li>Need constant updating as products and policies change</li>
    </ul>
    <p>Traditional chatbots are like elaborate FAQ systems with a conversational interface. They can handle known questions with known answers but break down quickly when faced with complexity or novelty.</p>
    <h2>AI Support Agents: The Intelligence-Driven Approach</h2>
    <p>Modern AI support agents, powered by large language models and machine learning, represent a fundamentally different approach:</p>
    <h3>Key Characteristics:</h3>
    <ul>
      <li><strong>Natural language understanding:</strong> Comprehend intent regardless of exact wording</li>
      <li><strong>Contextual awareness:</strong> Maintain the thread of conversation naturally</li>
      <li><strong>Generative responses:</strong> Create unique, appropriate replies rather than selecting from prewritten options</li>
      <li><strong>Learning capability:</strong> Improve from interactions and feedback</li>
      <li><strong>Integration with systems:</strong> Can pull data from and push actions to other business systems</li>
      <li><strong>Sentiment recognition:</strong> Detect and respond to emotional cues</li>
    </ul>
    <h3>Appropriate Use Cases:</h3>
    <ul>
      <li>Complex customer support scenarios</li>
      <li>Personalized shopping assistance</li>
      <li>Technical troubleshooting</li>
      <li>Multi-turn interactions requiring memory</li>
      <li>Cases requiring emotional intelligence</li>
    </ul>
    <h3>Advantages:</h3>
    <ul>
      <li>Handle unexpected questions and variations in language</li>
      <li>Maintain natural conversational flow</li>
      <li>Require less manual programming and maintenance</li>
      <li>Deliver more satisfying user experiences</li>
      <li>Escalate appropriately when human assistance is needed</li>
    </ul>
    <p>AI support agents are more like intelligent assistants than scripted responders. They understand what users mean, not just what they say, and can adapt to a wide range of scenarios without explicit programming for each one.</p>
    <h2>Key Differences in Practice</h2>
    <p>To illustrate these differences, consider how each technology might handle the same customer interactions:</p>
    <h3>Scenario 1: Ambiguous Query</h3>
    <p><strong>Customer:</strong> "I have an issue with my order."</p>
    <p><strong>Traditional Chatbot:</strong> "I'm sorry to hear that. Please provide your order number." (The same response for any order-related issue mention, regardless of context)</p>
    <p><strong>AI Agent:</strong> "I'm sorry to hear you're having trouble. Could you tell me more about what's happening with your order? Is it related to shipping, product quality, or something else? If you have your order number handy, that would also help me look into this for you."</p>
    <h3>Scenario 2: Multiple Questions</h3>
    <p><strong>Customer:</strong> "When will my order arrive? Also, can I add another item to it?"</p>
    <p><strong>Traditional Chatbot:</strong> "To check your order status, please enter your order number." (Only recognizes and responds to the first question, ignoring the second)</p>
    <p><strong>AI Agent:</strong> "I'd be happy to check on your delivery date and see if we can add an item to your order. For delivery information, could you please provide your order number or email address? Regarding adding items, it may be possible if your order hasn't shipped yet, but I'll need to confirm that for you."</p>
    <h3>Scenario 3: Follow-up Context</h3>
    <p><strong>Customer:</strong> "What's your return policy?"<br>[After receiving response]<br>"What about for sale items?"</p>
    <p><strong>Traditional Chatbot:</strong> "I'm sorry, I don't understand. Please rephrase your question." (Fails to connect "sale items" to the previous question about return policies)</p>
    <p><strong>AI Agent:</strong> "For items purchased on sale, our return policy is slightly different. Sale merchandise can be returned within 14 days instead of our standard 30-day window, and returns will be issued as store credit rather than refunded to the original payment method. All other return requirements, such as having the original tags attached, still apply."</p>
    <h2>Implementation Considerations</h2>
    <p>When deciding between technologies, consider:</p>
    <h3>Resource Requirements</h3>
    <ul>
      <li><strong>Traditional chatbots:</strong> Lower initial technology cost but higher ongoing maintenance; requires extensive content creation and scenario mapping</li>
      <li><strong>AI agents:</strong> Higher technology investment but lower maintenance burden; focuses on knowledge base quality rather than exhaustive dialogue mapping</li>
    </ul>
    <h3>Development Approach</h3>
    <ul>
      <li><strong>Traditional chatbots:</strong> Flow-chart design, script writing, extensive testing of each path</li>
      <li><strong>AI agents:</strong> Knowledge base development, guardrail configuration, continuous learning from real interactions</li>
    </ul>
    <h3>Risk Profile</h3>
    <ul>
      <li><strong>Traditional chatbots:</strong> More predictable but limited; will only say what you program</li>
      <li><strong>AI agents:</strong> More powerful but require proper guardrails; need monitoring especially in early deployment</li>
    </ul>
    <h2>Conclusion: The Right Tool for Your Needs</h2>
    <p>Traditional chatbots and AI support agents each have their place in the customer service ecosystem:</p>
    <ul>
      <li>Traditional chatbots excel at simple, transaction-oriented tasks with highly predictable inputs and outputs</li>
      <li>AI agents excel at complex, conversational interactions where understanding, context, and nuance matter</li>
    </ul>
    <p>For many organizations, the choice isn't binary. Some deploy both technologies, using traditional chatbots for straightforward use cases and AI agents for more complex scenarios that benefit from their advanced capabilities.</p>
    <p>As language models continue to advance, the gap between these technologies will only widen, with AI agents increasingly handling sophisticated interactions that previously required human intervention. Organizations looking to future-proof their customer support infrastructure should consider the long-term trajectory of these technologies when making implementation decisions.</p>`
  }
];

const BlogCard = ({ post, layout = 'grid' }: { post: typeof blogPosts[0], layout?: 'grid' | 'featured' }) => {
  const isGrid = layout === 'grid';
  
  return (
    <motion.div 
      className={`group rounded-xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-500 ${
        isGrid ? 'h-full flex flex-col' : 'md:flex'
      }`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className={`overflow-hidden ${isGrid ? 'h-48' : 'md:w-2/5 h-60 md:h-auto'}`}>
        <img 
          src={post.coverImage} 
          alt={post.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      
      <div className={`flex flex-col p-6 ${isGrid ? 'flex-grow' : 'md:w-3/5'}`}>
        <div className="flex items-center text-xs mb-3 space-x-4">
          <span className="text-brand-blue font-medium">{post.category}</span>
          <div className="flex items-center text-gray-500">
            <Clock className="h-3 w-3 mr-1" />
            <span>{post.readTime} min read</span>
          </div>
        </div>
        
        <h3 className={`font-bold mb-3 group-hover:text-brand-blue transition-colors duration-300 ${
          isGrid ? 'text-xl' : 'text-2xl'
        }`}>
          <Link to={`/blog/${post.slug}`} className="hover:underline">
            {post.title}
          </Link>
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-2">
          {post.excerpt}
        </p>
        
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium mr-2">
              {post.author.charAt(0)}
            </div>
            <div className="text-sm">
              <div className="font-medium">{post.author}</div>
              <div className="text-gray-500 text-xs">{formatDate(post.date)}</div>
            </div>
          </div>
          
          <Link 
            to={`/blog/${post.slug}`} 
            className="text-brand-blue flex items-center text-sm font-medium hover:underline group"
          >
            Read more 
            <ChevronRight className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const BlogSection = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const categories = Array.from(
    new Set(blogPosts.map(post => post.category))
  );
  
  const filteredPosts = selectedCategory
    ? blogPosts.filter(post => post.category === selectedCategory)
    : blogPosts;
  
  return (
    <section id="blog" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-medium mb-4">
            <Book className="h-3.5 w-3.5 mr-1.5" />
            <span>Insights & Resources</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Latest from our blog
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Expert strategies, industry insights, and actionable advice to help you get the most from your AI support agents.
          </p>
        </div>
        
        <div className="mb-8 flex justify-center">
          <div className="flex flex-wrap gap-2 justify-center">
            <Button 
              variant={selectedCategory === null ? "default" : "outline"} 
              size="sm"
              onClick={() => setSelectedCategory(null)}
              className={selectedCategory === null ? "bg-brand-blue hover:bg-brand-blue/90" : ""}
            >
              All
            </Button>
            
            {categories.map(category => (
              <Button 
                key={category} 
                variant={selectedCategory === category ? "default" : "outline"} 
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-brand-blue hover:bg-brand-blue/90" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Featured Post */}
        <div className="mb-12 animate-fade-in">
          <BlogCard post={filteredPosts[0]} layout="featured" />
        </div>
        
        {/* Grid Posts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {filteredPosts.slice(1, 4).map(post => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
        
        <div className="text-center animate-fade-in animation-delay-500">
          <Button 
            asChild
            size="lg" 
            className="bg-brand-blue hover:bg-brand-blue/90 group shadow-lg hover:shadow-brand-blue/20"
          >
            <Link to="/blog">
              <span>View all articles</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
export { blogPosts };
