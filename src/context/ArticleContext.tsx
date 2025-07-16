import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Article {
  id: string;
  title: string;
  content: string;
  author: string;
  tags: string[];
  image?: string;
  createdAt: Date;
  excerpt: string;
}

interface ArticleContextType {
  articles: Article[];
  addArticle: (article: Omit<Article, 'id' | 'createdAt' | 'tags'>) => void;
  getArticleById: (id: string) => Article | undefined;
  generateTags: (content: string) => string[];
}

const ArticleContext = createContext<ArticleContextType | undefined>(undefined);

export const useArticles = () => {
  const context = useContext(ArticleContext);
  if (!context) {
    throw new Error('useArticles must be used within an ArticleProvider');
  }
  return context;
};

const STORAGE_KEY = 'articlehub_articles';

export const ArticleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [articles, setArticles] = useState<Article[]>([]);

  // Load articles from localStorage on mount
  useEffect(() => {
    const savedArticles = localStorage.getItem(STORAGE_KEY);
    if (savedArticles) {
      try {
        const parsedArticles = JSON.parse(savedArticles).map((article: any) => ({
          ...article,
          createdAt: new Date(article.createdAt)
        }));
        setArticles(parsedArticles);
      } catch (error) {
        console.error('Error loading articles from localStorage:', error);
        // Set default articles if localStorage is empty or corrupted
        setDefaultArticles();
      }
    } else {
      setDefaultArticles();
    }
  }, []);

  // Save articles to localStorage whenever articles change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
  }, [articles]);

  const setDefaultArticles = () => {
    const defaultArticles = [
      {
        id: '1',
        title: 'The Future of Artificial Intelligence',
        content: 'Artificial intelligence is revolutionizing the way we work and live. From **machine learning algorithms** to *neural networks*, AI is becoming increasingly sophisticated and integrated into our daily lives. This comprehensive exploration looks at the current state of AI technology and its potential future applications.\n\n### Current AI Applications\n\nToday\'s AI systems are already transforming industries:\n\n- Healthcare diagnosis and treatment\n- Autonomous vehicles\n- Natural language processing\n- Computer vision\n- Predictive analytics\n\n### The Road Ahead\n\nAs we look toward the future, AI will continue to evolve, potentially achieving artificial general intelligence (AGI) within the next few decades. This advancement will bring both opportunities and challenges that society must prepare for.',
        author: 'Dr. Sarah Chen',
        tags: ['ai', 'technology', 'future'],
        image: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=800',
        createdAt: new Date('2024-01-15'),
        excerpt: 'Exploring the transformative impact of AI on modern society and future possibilities.'
      },
      {
        id: '2',
        title: 'Virtual Reality and the Metaverse Revolution',
        content: 'Extended reality (XR) technologies are creating new **immersive experiences** that blur the line between digital and physical worlds. Virtual reality, augmented reality, and the emerging metaverse represent the next frontier in human-computer interaction.\n\n### Key Technologies\n\n- **Virtual Reality (VR)**: Complete immersion in digital environments\n- **Augmented Reality (AR)**: Overlaying digital information on the real world\n- **Mixed Reality (MR)**: Seamless integration of digital and physical objects\n\n### Applications and Impact\n\nXR technologies are being adopted across various sectors:\n\n- Gaming and entertainment\n- Education and training\n- Healthcare and therapy\n- Remote collaboration\n- Social interaction\n\nThe metaverse promises to create persistent, shared virtual spaces where people can work, play, and socialize in entirely new ways.',
        author: 'Mike Johnson',
        tags: ['xr', 'vr', 'metaverse', 'technology'],
        image: 'https://images.pexels.com/photos/7561328/pexels-photo-7561328.jpeg?auto=compress&cs=tinysrgb&w=800',
        createdAt: new Date('2024-01-10'),
        excerpt: 'How XR technologies are shaping the future of digital interaction and virtual experiences.'
      },
      {
        id: '3',
        title: 'Quantum Computing: The Next Technological Leap',
        content: 'Quantum computing represents a fundamental shift in computational power, promising to solve problems that are intractable for classical computers. By leveraging **quantum mechanics** principles like *superposition* and *entanglement*, quantum computers could revolutionize various fields.\n\n### Quantum Fundamentals\n\nQuantum computing relies on several key principles:\n\n- **Qubits**: Quantum bits that can exist in multiple states simultaneously\n- **Superposition**: The ability to be in multiple states at once\n- **Entanglement**: Quantum particles that remain connected regardless of distance\n- **Quantum interference**: Manipulating probability amplitudes\n\n### Potential Applications\n\n- Cryptography and security\n- Drug discovery and molecular modeling\n- Financial modeling and optimization\n- Weather prediction and climate modeling\n- Machine learning and AI enhancement\n\nWhile still in early stages, quantum computing could solve certain problems exponentially faster than classical computers.',
        author: 'Dr. Elena Rodriguez',
        tags: ['quantum', 'technology', 'science', 'future'],
        image: 'https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=800',
        createdAt: new Date('2024-01-05'),
        excerpt: 'Understanding the revolutionary potential of quantum computing and its future applications.'
      }
    ];
    setArticles(defaultArticles);
  };

  const generateTags = (content: string): string[] => {
    const keywords = {
      ai: ['artificial intelligence', 'machine learning', 'neural network', 'deep learning', 'algorithm', 'agi'],
      xr: ['virtual reality', 'extended reality', 'metaverse', 'augmented reality', 'immersive', 'vr', 'ar', 'mr'],
      quantum: ['quantum computing', 'quantum mechanics', 'qubit', 'superposition', 'entanglement', 'quantum'],
      blockchain: ['blockchain', 'cryptocurrency', 'bitcoin', 'smart contract', 'decentralized', 'crypto'],
      technology: ['technology', 'innovation', 'digital', 'software', 'hardware', 'tech'],
      science: ['research', 'study', 'experiment', 'discovery', 'scientific', 'analysis'],
      future: ['future', 'tomorrow', 'next generation', 'emerging', 'revolutionary', 'advancement']
    };

    const contentLower = content.toLowerCase();
    const tags: string[] = [];

    Object.entries(keywords).forEach(([tag, words]) => {
      if (words.some(word => contentLower.includes(word))) {
        tags.push(tag);
      }
    });

    return tags.length > 0 ? tags : ['general'];
  };

  const addArticle = (articleData: Omit<Article, 'id' | 'createdAt' | 'tags'>) => {
    const newArticle: Article = {
      ...articleData,
      id: Date.now().toString(),
      createdAt: new Date(),
      tags: generateTags(articleData.content),
      excerpt: articleData.content.replace(/[*#]/g, '').substring(0, 150) + '...'
    };
    setArticles(prev => [newArticle, ...prev]);
  };

  const getArticleById = (id: string) => {
    return articles.find(article => article.id === id);
  };

  return (
    <ArticleContext.Provider value={{ articles, addArticle, getArticleById, generateTags }}>
      {children}
    </ArticleContext.Provider>
  );
};