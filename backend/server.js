const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/articleplatform', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Article Schema
const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  tags: [String],
  image: String,
  excerpt: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Article = mongoose.model('Article', articleSchema);

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// File upload configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Auto-tagging function
const generateTags = (content) => {
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
  const tags = [];

  Object.entries(keywords).forEach(([tag, words]) => {
    if (words.some(word => contentLower.includes(word))) {
      tags.push(tag);
    }
  });

  return tags.length > 0 ? tags : ['general'];
};

// Routes

// Get all articles
app.get('/api/articles', async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single article
app.get('/api/articles/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new article
app.post('/api/articles', upload.single('image'), async (req, res) => {
  try {
    const { title, content, author } = req.body;
    
    const tags = generateTags(content);
    const excerpt = content.replace(/[*#]/g, '').substring(0, 150) + '...';
    
    const article = new Article({
      title,
      content,
      author,
      tags,
      excerpt,
      image: req.file ? `/uploads/${req.file.filename}` : undefined
    });

    const savedArticle = await article.save();
    res.status(201).json(savedArticle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update article
app.put('/api/articles/:id', upload.single('image'), async (req, res) => {
  try {
    const { title, content, author } = req.body;
    
    const updateData = {
      title,
      content,
      author,
      tags: generateTags(content),
      excerpt: content.replace(/[*#]/g, '').substring(0, 150) + '...',
      updatedAt: new Date()
    };

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const article = await Article.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    res.json(article);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete article
app.delete('/api/articles/:id', async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.json({ message: 'Article deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// User registration
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const bcrypt = require('bcryptjs');
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// User login
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const bcrypt = require('bcryptjs');
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const jwt = require('jsonwebtoken');
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});