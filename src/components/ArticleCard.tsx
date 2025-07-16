import React from 'react';
import { Calendar, User, Tag } from 'lucide-react';
import { Article } from '../context/ArticleContext';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTagColor = (tag: string) => {
    const colors = {
      ai: 'bg-blue-100 text-blue-800',
      xr: 'bg-purple-100 text-purple-800',
      quantum: 'bg-green-100 text-green-800',
      blockchain: 'bg-yellow-100 text-yellow-800',
      technology: 'bg-indigo-100 text-indigo-800',
      science: 'bg-pink-100 text-pink-800',
      future: 'bg-orange-100 text-orange-800',
      general: 'bg-gray-100 text-gray-800'
    };
    return colors[tag as keyof typeof colors] || colors.general;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {article.image && (
        <div className="h-48 overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
          {article.title}
        </h3>
        
        <p className="text-gray-600 mb-4 leading-relaxed">
          {article.excerpt}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTagColor(tag)}`}
            >
              <Tag className="h-3 w-3 mr-1" />
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <User className="h-4 w-4 mr-1" />
              {article.author}
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {formatDate(article.createdAt)}
            </div>
          </div>
          <button className="text-blue-600 hover:text-blue-800 font-medium">
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;