import React from 'react';
import { BookOpen, Users, Zap, Target, Heart, Globe, Award, Lightbulb } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="mb-6">
            <BookOpen className="h-20 w-20 text-blue-600 mx-auto mb-4" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About ArticleHub
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're on a mission to democratize publishing and make it easier for authors to share their knowledge with the world through beautiful, interactive articles.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <div className="text-center mb-8">
            <Target className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Lightbulb className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Empower Authors</h3>
              <p className="text-gray-600">Provide powerful tools that make writing and publishing accessible to everyone, regardless of technical expertise.</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Zap className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Technology</h3>
              <p className="text-gray-600">Leverage AI and machine learning to automatically enhance content with intelligent tagging and formatting.</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Globe className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Global Community</h3>
              <p className="text-gray-600">Build a worldwide community of writers and readers who share knowledge and inspire each other.</p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">What Makes Us Different</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Rich Text Editor</h3>
                  <p className="text-gray-600">Our intuitive editor supports markdown formatting, making it easy to create beautiful, structured content with bold, italic, headings, and more.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Zap className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">AI-Powered Tagging</h3>
                  <p className="text-gray-600">Our intelligent system automatically analyzes your content and assigns relevant tags like AI, XR, quantum, blockchain, and more.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-start space-x-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Award className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Professional Design</h3>
                  <p className="text-gray-600">Every article is automatically styled with professional typography and layout, ensuring your content looks polished and engaging.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-start space-x-4">
                <div className="bg-orange-100 p-3 rounded-lg">
                  <Users className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Community Driven</h3>
                  <p className="text-gray-600">Join a growing community of writers and readers who share knowledge across technology, science, and innovation.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-12 mb-16">
          <div className="text-center mb-8">
            <Heart className="h-12 w-12 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Accessibility</h3>
              <p className="text-blue-100">We believe everyone should have access to powerful publishing tools, regardless of their technical background.</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Innovation</h3>
              <p className="text-blue-100">We continuously innovate to provide the best writing and publishing experience using cutting-edge technology.</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Quality</h3>
              <p className="text-blue-100">We're committed to maintaining high standards in both our platform and the content published by our community.</p>
            </div>
          </div>
        </div>

        {/* Technology Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Built with Modern Technology</h2>
            <p className="text-xl text-gray-600">ArticleHub is built using cutting-edge web technologies to ensure a fast, reliable, and enjoyable experience.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-4">
              <div className="bg-blue-100 p-3 rounded-lg w-16 h-16 mx-auto mb-2 flex items-center justify-center">
                <span className="text-2xl font-bold text-blue-600">R</span>
              </div>
              <p className="font-semibold">React</p>
            </div>
            <div className="p-4">
              <div className="bg-indigo-100 p-3 rounded-lg w-16 h-16 mx-auto mb-2 flex items-center justify-center">
                <span className="text-2xl font-bold text-indigo-600">TS</span>
              </div>
              <p className="font-semibold">TypeScript</p>
            </div>
            <div className="p-4">
              <div className="bg-cyan-100 p-3 rounded-lg w-16 h-16 mx-auto mb-2 flex items-center justify-center">
                <span className="text-2xl font-bold text-cyan-600">TW</span>
              </div>
              <p className="font-semibold">Tailwind CSS</p>
            </div>
            <div className="p-4">
              <div className="bg-purple-100 p-3 rounded-lg w-16 h-16 mx-auto mb-2 flex items-center justify-center">
                <span className="text-2xl font-bold text-purple-600">AI</span>
              </div>
              <p className="font-semibold">AI Integration</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gray-100 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Start Writing?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of authors who have already discovered the power of ArticleHub. Start sharing your knowledge today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/upload"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Create Your First Article
            </a>
            <a
              href="/login"
              className="bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
            >
              Join Our Community
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;