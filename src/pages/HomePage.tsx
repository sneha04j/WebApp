import React from 'react';
import { Link } from 'react-router-dom';
import { PenTool, Zap, Shield, ArrowRight, Sparkles, Users, Globe } from 'lucide-react';
import { useArticles } from '../context/ArticleContext';
import ArticleCard from '../components/ArticleCard';

const HomePage: React.FC = () => {
  const { articles } = useArticles();

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-6">
              <Sparkles className="h-16 w-16 mx-auto mb-4 text-yellow-300" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to ArticleHub
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed">
              A powerful, interactive platform where authors can create, format, and share their articles with beautiful rich text editing, automatic AI-powered tagging, and seamless image integration. Transform your ideas into engaging content.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/upload"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 flex items-center justify-center shadow-lg"
              >
                <PenTool className="h-5 w-5 mr-2" />
                Start Writing Now
              </Link>
              <Link
                to="/about"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
              >
                Learn More
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose ArticleHub?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to create, format, and share professional articles with intelligent features that enhance your writing experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-blue-100 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <PenTool className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Rich Text Editor</h3>
              <p className="text-gray-600 leading-relaxed">Format your articles with bold, italic, headings, lists, and quotes using our intuitive WYSIWYG editor with live preview.</p>
            </div>
            
            <div className="text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-purple-100 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <Zap className="h-10 w-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">AI-Powered Auto-Tagging</h3>
              <p className="text-gray-600 leading-relaxed">Our intelligent system automatically assigns relevant tags like AI, XR, quantum, blockchain, and more based on your content.</p>
            </div>
            
            <div className="text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-green-100 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <Shield className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Seamless Image Integration</h3>
              <p className="text-gray-600 leading-relaxed">Upload and embed images directly into your articles with drag-and-drop functionality for a more engaging experience.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl font-bold text-blue-600 mb-2">{articles.length}+</div>
              <div className="text-gray-600">Articles Published</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-purple-600 mb-2">10+</div>
              <div className="text-gray-600">Smart Tags Available</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-green-600 mb-2">100%</div>
              <div className="text-gray-600">Free to Use</div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Latest Articles
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the latest insights and stories from our community of authors across various topics.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.slice(0, 6).map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
          
          {articles.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <PenTool className="h-16 w-16 mx-auto mb-4" />
              </div>
              <p className="text-xl text-gray-600 mb-6">No articles yet. Be the first to share your story!</p>
              <Link
                to="/upload"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Create Your First Article
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Share Your Story?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of authors who trust ArticleHub to publish their content with professional formatting and intelligent features.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/upload"
              className="bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
            >
              <PenTool className="h-5 w-5 mr-2" />
              Start Writing
            </Link>
            <Link
              to="/login"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
            >
              <Users className="h-5 w-5 mr-2" />
              Join Community
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;