const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Create uploads directory if it doesn't exist
const fs = require('fs');
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/articleplatform', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
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
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    // Check file type
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

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

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ message: 'Backend is running!', timestamp: new Date().toISOString() });
});

// Get all articles
app.get('/api/articles', async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.json(articles);
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({ message: 'Error fetching articles', error: error.message });
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
    console.error('Error fetching article:', error);
    res.status(500).json({ message: 'Error fetching article', error: error.message });
  }
});

// Create new article
app.post('/api/articles', upload.single('image'), async (req, res) => {
  try {
    const { title, content, author } = req.body;
    
    if (!title || !content || !author) {
      return res.status(400).json({ message: 'Title, content, and author are required' });
    }
    
    const tags = generateTags(content);
    const excerpt = content.replace(/[*#]/g, '').substring(0, 150) + '...';
    
    const article = new Article({
      title: title.trim(),
      content: content.trim(),
      author: author.trim(),
      tags,
      excerpt,
      image: req.file ? `/uploads/${req.file.filename}` : undefined
    });

    const savedArticle = await article.save();
    console.log('Article created:', savedArticle._id);
    res.status(201).json(savedArticle);
  } catch (error) {
    console.error('Error creating article:', error);
    res.status(400).json({ message: 'Error creating article', error: error.message });
  }
});

// Update article
app.put('/api/articles/:id', upload.single('image'), async (req, res) => {
  try {
    const { title, content, author } = req.body;
    
    const updateData = {
      title: title.trim(),
      content: content.trim(),
      author: author.trim(),
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

    console.log('Article updated:', article._id);
    res.json(article);
  } catch (error) {
    console.error('Error updating article:', error);
    res.status(400).json({ message: 'Error updating article', error: error.message });
  }
});

// Delete article
app.delete('/api/articles/:id', async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    
    // Delete associated image file if exists
    if (article.image) {
      const imagePath = path.join(__dirname, article.image);
      fs.unlink(imagePath, (err) => {
        if (err) console.error('Error deleting image file:', err);
      });
    }
    
    console.log('Article deleted:', req.params.id);
    res.json({ message: 'Article deleted successfully' });
  } catch (error) {
    console.error('Error deleting article:', error);
    res.status(500).json({ message: 'Error deleting article', error: error.message });
  }
});

// User registration
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }
    
    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = new User({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword
    });

    await user.save();
    console.log('User registered:', user.email);
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(400).json({ message: 'Error creating user', error: error.message });
  }
});

// User login
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    
    // Find user
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    console.log('User logged in:', user.email);
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
});

// Get user profile (protected route)
app.get('/api/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Error fetching profile', error: error.message });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'File too large. Maximum size is 5MB.' });
    }
  }
  
  console.error('Unhandled error:', error);
  res.status(500).json({ message: 'Internal server error', error: error.message });
});

// Handle 404 routes
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`📝 Articles API: http://localhost:${PORT}/api/articles`);
});