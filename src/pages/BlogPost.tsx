
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Share2, Clock, Calendar, Copy, Check, ChevronLeft, ChevronRight, Twitter, Facebook, Linkedin, MessageSquare } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { blogPosts } from '@/components/BlogSection';
import { formatDate } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [post, setPost] = useState<typeof blogPosts[0] | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<typeof blogPosts>([]);
  
  // Find the current post and related posts
  useEffect(() => {
    const currentPost = blogPosts.find(post => post.slug === slug);
    
    if (currentPost) {
      setPost(currentPost);
      
      // Find related posts (same category, excluding current post)
      const related = blogPosts
        .filter(p => p.category === currentPost.category && p.id !== currentPost.id)
        .slice(0, 2);
      
      setRelatedPosts(related);
    } else {
      // If post not found, redirect to blog index
      navigate('/blog', { replace: true });
    }
    
    // Scroll to top
    window.scrollTo(0, 0);
  }, [slug, navigate]);
  
  // Handle sharing functionality
  const handleShare = (platform: 'twitter' | 'facebook' | 'linkedin' | 'copy') => {
    if (!post) return;
    
    const url = window.location.href;
    const title = post.title;
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url).then(() => {
          setCopied(true);
          toast({
            title: "Link copied to clipboard",
            description: "You can now share it with others.",
          });
          setTimeout(() => setCopied(false), 2000);
        });
        break;
    }
  };
  
  // Find current post index and prev/next posts
  const currentIndex = post ? blogPosts.findIndex(p => p.id === post.id) : -1;
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;
  
  if (!post) {
    return null; // Loading or not found (will redirect)
  }
  
  return (
    <>
      <Helmet>
        <title>{post.title} - Sampling Labs Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta name="keywords" content={`AI agents, customer support, ${post.category.toLowerCase()}`} />
        <meta property="og:title" content={`${post.title} - Sampling Labs Blog`} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.coverImage} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={post.coverImage} />
        <link rel="canonical" href={`/blog/${post.slug}`} />
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="pt-32 pb-8 md:pt-40 md:pb-12 bg-gradient-to-b from-brand-blue/5 to-transparent">
            <div className="container mx-auto px-4 md:px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-3xl mx-auto"
              >
                <Link to="/blog" className="inline-flex items-center text-sm text-gray-600 hover:text-brand-blue mb-6 transition-colors">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  <span>Back to all articles</span>
                </Link>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-brand-blue/10 rounded-full text-xs font-medium text-brand-blue">
                    {post.category}
                  </span>
                </div>
                
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                  {post.title}
                </h1>
                
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 mb-8 text-sm text-gray-500">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium mr-2">
                      {post.author.charAt(0)}
                    </div>
                    <span>{post.author}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1.5" />
                    <span>{formatDate(post.date)}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1.5" />
                    <span>{post.readTime} min read</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
          
          {/* Featured Image */}
          <section className="py-8">
            <div className="container mx-auto px-4 md:px-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="max-w-4xl mx-auto"
              >
                <div className="rounded-2xl overflow-hidden shadow-lg">
                  <img 
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </section>
          
          {/* Blog Content */}
          <section className="py-12">
            <div className="container mx-auto px-4 md:px-6">
              <div className="max-w-3xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="relative"
                >
                  {/* Article Content */}
                  <article className="prose prose-lg max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                  </article>
                  
                  {/* Share Buttons */}
                  <div className="mt-12 pt-8 border-t border-gray-200">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex items-center">
                        <Share2 className="h-5 w-5 mr-2 text-gray-500" />
                        <span className="font-medium">Share this article</span>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={() => handleShare('twitter')}
                          className="rounded-full h-10 w-10"
                        >
                          <Twitter className="h-4 w-4 text-[#1DA1F2]" />
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={() => handleShare('facebook')}
                          className="rounded-full h-10 w-10"
                        >
                          <Facebook className="h-4 w-4 text-[#4267B2]" />
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={() => handleShare('linkedin')}
                          className="rounded-full h-10 w-10"
                        >
                          <Linkedin className="h-4 w-4 text-[#0A66C2]" />
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={() => handleShare('copy')}
                          className="rounded-full h-10 w-10"
                        >
                          {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Author Bio */}
                  <div className="mt-12 bg-gray-50 rounded-xl p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-bold text-xl flex-shrink-0">
                        {post.author.charAt(0)}
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold mb-2">About {post.author}</h3>
                        <p className="text-gray-600 mb-4">
                          {post.author} is a thought leader in AI and customer experience at Sampling Labs. 
                          With extensive experience in the field, they provide valuable insights on leveraging AI 
                          for business growth and enhanced customer satisfaction.
                        </p>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="rounded-full">
                            <Twitter className="h-3.5 w-3.5 mr-1.5" />
                            <span>Follow</span>
                          </Button>
                          <Button variant="outline" size="sm" className="rounded-full">
                            <MessageSquare className="h-3.5 w-3.5 mr-1.5" />
                            <span>Contact</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Post Navigation */}
                  <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {prevPost && (
                      <Link 
                        to={`/blog/${prevPost.slug}`}
                        className="group flex flex-col p-6 rounded-xl border border-gray-200 hover:border-brand-blue hover:bg-gray-50 transition-all duration-300"
                      >
                        <div className="flex items-center text-sm text-gray-500 mb-2">
                          <ChevronLeft className="h-4 w-4 mr-1 transition-transform duration-300 group-hover:-translate-x-1" />
                          <span>Previous Article</span>
                        </div>
                        <h4 className="font-semibold group-hover:text-brand-blue transition-colors duration-300">
                          {prevPost.title}
                        </h4>
                      </Link>
                    )}
                    
                    {nextPost && (
                      <Link 
                        to={`/blog/${nextPost.slug}`}
                        className="group flex flex-col p-6 rounded-xl border border-gray-200 hover:border-brand-blue hover:bg-gray-50 transition-all duration-300 md:text-right"
                      >
                        <div className="flex items-center justify-end text-sm text-gray-500 mb-2">
                          <span>Next Article</span>
                          <ChevronRight className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                        </div>
                        <h4 className="font-semibold group-hover:text-brand-blue transition-colors duration-300">
                          {nextPost.title}
                        </h4>
                      </Link>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
          
          {/* Related Articles */}
          {relatedPosts.length > 0 && (
            <section className="py-16 bg-gray-50">
              <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-6xl mx-auto">
                  <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
                    Related Articles
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {relatedPosts.map((relatedPost, index) => (
                      <motion.article
                        key={relatedPost.id}
                        className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col h-full"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <div className="overflow-hidden h-48">
                          <img 
                            src={relatedPost.coverImage} 
                            alt={relatedPost.title} 
                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                          />
                        </div>
                        
                        <div className="p-6 flex flex-col flex-grow">
                          <div className="flex flex-wrap gap-2 mb-3">
                            <span className="px-3 py-1 bg-brand-blue/10 rounded-full text-xs font-medium text-brand-blue">
                              {relatedPost.category}
                            </span>
                          </div>
                          
                          <h3 className="text-xl font-bold mb-3 line-clamp-2 hover:text-brand-blue transition-colors duration-300">
                            <Link to={`/blog/${relatedPost.slug}`} className="hover:underline">
                              {relatedPost.title}
                            </Link>
                          </h3>
                          
                          <p className="text-gray-600 mb-4 line-clamp-2">
                            {relatedPost.excerpt}
                          </p>
                          
                          <div className="mt-auto pt-4 border-t border-gray-100">
                            <div className="flex justify-between items-center">
                              <div className="text-sm text-gray-500 flex items-center">
                                <Clock className="h-3.5 w-3.5 mr-1" />
                                <span>{relatedPost.readTime} min read</span>
                              </div>
                              
                              <Link 
                                to={`/blog/${relatedPost.slug}`} 
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
                  
                  <div className="text-center mt-12">
                    <Button 
                      asChild
                      className="bg-brand-blue hover:bg-brand-blue/90 group shadow-lg hover:shadow-brand-blue/20"
                    >
                      <Link to="/blog">
                        <span>View all articles</span>
                        <ChevronRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </section>
          )}
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default BlogPost;
