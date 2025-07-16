import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Save, Eye, FileText, User, Image as ImageIcon } from 'lucide-react';
import RichTextEditor from '../components/RichTextEditor';
import { useArticles } from '../context/ArticleContext';

const UploadPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [image, setImage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preview, setPreview] = useState(false);
  
  const { addArticle, generateTags } = useArticles();
  const navigate = useNavigate();

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !author.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      addArticle({
        title: title.trim(),
        content: content.trim(),
        author: author.trim(),
        image: image || undefined,
        excerpt: content.replace(/[*#]/g, '').substring(0, 150) + '...'
      });
      
      // Reset form
      setTitle('');
      setContent('');
      setAuthor('');
      setImage('');
      
      // Navigate to home page
      navigate('/');
    } catch (error) {
      console.error('Error submitting article:', error);
      alert('Error submitting article. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderPreview = () => {
    const previewTags = generateTags(content);
    
    return (
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{title || 'Article Title'}</h1>
          <div className="flex items-center text-gray-600 text-sm">
            <User className="h-4 w-4 mr-1" />
            <span>{author || 'Author Name'}</span>
          </div>
        </div>
        
        {image && (
          <div className="mb-6">
            <img src={image} alt="Article" className="w-full h-64 object-cover rounded-lg" />
          </div>
        )}
        
        <div className="prose max-w-none mb-6">
          <div className="whitespace-pre-wrap">{content || 'Article content will appear here...'}</div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {previewTags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Upload Your Article
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Share your knowledge with the world. Use our rich text editor to format your content, and our AI will automatically assign relevant tags.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Editor Section */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">Article Editor</h2>
              <button
                type="button"
                onClick={() => setPreview(!preview)}
                className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Eye className="h-4 w-4 mr-2" />
                {preview ? 'Hide Preview' : 'Show Preview'}
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Article Title *
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter an engaging title for your article"
                  required
                />
              </div>

              <div>
                <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
                  Author Name *
                </label>
                <input
                  type="text"
                  id="author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Article Content *
                </label>
                <RichTextEditor
                  value={content}
                  onChange={setContent}
                  onImageUpload={handleImageUpload}
                />
              </div>

              {image && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Featured Image
                  </label>
                  <div className="relative">
                    <img src={image} alt="Preview" className="w-full h-48 object-cover rounded-lg" />
                    <button
                      type="button"
                      onClick={() => setImage('')}
                      className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Publishing...
                    </>
                  ) : (
                    <>
                      <Save className="h-5 w-5 mr-2" />
                      Publish Article
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Preview Section */}
          <div className="lg:sticky lg:top-8 lg:h-fit">
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Live Preview</h3>
              <p className="text-gray-600 text-sm">See how your article will look when published</p>
            </div>
            {renderPreview()}
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-12 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Formatting Help</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium text-blue-800 mb-2">Text Formatting:</p>
              <ul className="space-y-1 text-blue-700">
                <li><code>**bold text**</code> for <strong>bold</strong></li>
                <li><code>*italic text*</code> for <em>italic</em></li>
                <li><code>### Heading</code> for headings</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-blue-800 mb-2">Auto-Tags:</p>
              <ul className="space-y-1 text-blue-700">
                <li>AI, machine learning → <span className="bg-blue-100 px-2 py-1 rounded">ai</span></li>
                <li>VR, metaverse → <span className="bg-purple-100 px-2 py-1 rounded">xr</span></li>
                <li>Quantum computing → <span className="bg-green-100 px-2 py-1 rounded">quantum</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;