import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Search, Calendar, Clock, User, ChevronRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { blogPosts } from '@/components/BlogSection';
import { formatDate } from '@/lib/utils';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  
  const categories = Array.from(
    new Set(blogPosts.map(post => post.category))
  );
  
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = searchTerm === '' || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === null || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <>
      <Helmet>
        <title>Blog - Sampling Labs | AI Agents for Customer Support</title>
        <meta name="description" content="Discover the latest insights, guides, and best practices for AI-powered customer support and service automation." />
        <meta name="keywords" content="AI agents, customer support, chatbots, customer service automation, business AI" />
        <meta property="og:title" content="Blog - Sampling Labs | AI Agents for Customer Support" />
        <meta property="og:description" content="Discover the latest insights, guides, and best practices for AI-powered customer support and service automation." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/blog" />
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-grow">
          <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-brand-blue/5 to-transparent">
            <div className="container mx-auto px-4 md:px-6 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Link to="/" className="inline-flex items-center text-sm text-gray-600 hover:text-brand-blue mb-6 transition-colors">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  <span>Back to home</span>
                </Link>
                
                <h1 className="text-3xl md:text-5xl font-bold mb-6">
                  The Sampling Labs Blog
                </h1>
                
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                  Insights, guides, and best practices to help you build exceptional 
                  AI-powered customer experiences.
                </p>
                
                <div className="flex flex-col sm:flex-row w-full max-w-xl mx-auto gap-4">
                  <div className="relative flex-grow">
                    <Input
                      placeholder="Search articles..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pr-10 h-12 rounded-lg"
                    />
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                  
                  <div className="relative">
                    <Button
                      variant="outline"
                      className="h-12 min-w-[160px] flex items-center justify-between"
                      onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                    >
                      <span>{selectedCategory || "All Categories"}</span>
                      <ChevronDown className="h-4 w-4 ml-2" />
                    </Button>
                    
                    {isFiltersOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute z-10 w-full mt-2 bg-white shadow-lg rounded-lg overflow-hidden"
                      >
                        <div className="py-1">
                          <button
                            className={`px-4 py-2 text-sm text-left w-full hover:bg-gray-100 ${
                              selectedCategory === null ? 'bg-gray-100 font-medium' : ''
                            }`}
                            onClick={() => {
                              setSelectedCategory(null);
                              setIsFiltersOpen(false);
                            }}
                          >
                            All Categories
                          </button>
                          
                          {categories.map((category) => (
                            <button
                              key={category}
                              className={`px-4 py-2 text-sm text-left w-full hover:bg-gray-100 ${
                                selectedCategory === category ? 'bg-gray-100 font-medium' : ''
                              }`}
                              onClick={() => {
                                setSelectedCategory(category);
                                setIsFiltersOpen(false);
                              }}
                            >
                              {category}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
          
          <section className="py-12 md:py-16">
            <div className="container mx-auto px-4 md:px-6">
              {filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredPosts.map((post, index) => (
                    <motion.article
                      key={post.id}
                      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col h-full"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="overflow-hidden h-48">
                        <img 
                          src={post.coverImage} 
                          alt={post.title} 
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        />
                      </div>
                      
                      <div className="p-6 flex flex-col flex-grow">
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className="px-3 py-1 bg-brand-blue/10 rounded-full text-xs font-medium text-brand-blue">
                            {post.category}
                          </span>
                        </div>
                        
                        <h2 className="text-xl font-bold mb-3 line-clamp-2 hover:text-brand-blue transition-colors duration-300">
                          <Link to={`/blog/${post.slug}`} className="hover:underline">
                            {post.title}
                          </Link>
                        </h2>
                        
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>
                        
                        <div className="mt-auto pt-4 border-t border-gray-100">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center text-sm text-gray-500 space-x-4">
                              <div className="flex items-center">
                                <Calendar className="h-3.5 w-3.5 mr-1" />
                                <span>{formatDate(post.date)}</span>
                              </div>
                              
                              <div className="flex items-center">
                                <Clock className="h-3.5 w-3.5 mr-1" />
                                <span>{post.readTime} min</span>
                              </div>
                            </div>
                            
                            <Link 
                              to={`/blog/${post.slug}`} 
                              className="text-brand-blue flex items-center text-sm font-medium hover:underline group"
                            >
                              Read 
                              <ChevronRight className="h-4 w-4 ml-0.5 transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="mb-4 text-gray-400">
                    <Search className="h-12 w-12 mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">No articles found</h3>
                  <p className="text-muted-foreground mb-6">
                    We couldn't find any articles matching your search criteria.
                  </p>
                  <Button 
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory(null);
                    }}
                    className="bg-brand-blue hover:bg-brand-blue/90"
                  >
                    Clear filters
                  </Button>
                </div>
              )}
            </div>
          </section>
          
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4 md:px-6 max-w-4xl">
              <motion.div 
                className="bg-gradient-to-r from-brand-blue to-brand-purple rounded-2xl p-8 md:p-12 text-white text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Stay updated with our newsletter
                </h2>
                
                <p className="text-white/80 mb-8 max-w-xl mx-auto">
                  Get the latest insights, tips, and best practices for AI customer support 
                  delivered straight to your inbox.
                </p>
                
                <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                  <Input
                    type="email"
                    placeholder="Your email address"
                    className="flex-grow h-12 rounded-lg border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder:text-white/60"
                  />
                  
                  <Button className="h-12 bg-white text-brand-blue hover:bg-white/90 font-medium">
                    Subscribe
                  </Button>
                </form>
                
                <p className="text-white/60 text-sm mt-4">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </motion.div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Blog;
