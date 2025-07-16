import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ArticleProvider } from './context/ArticleContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import UploadPage from './pages/UploadPage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <ArticleProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/*" element={
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/upload" element={<UploadPage />} />
                <Route path="/about" element={<AboutPage />} />
              </Routes>
            </Layout>
          } />
        </Routes>
      </Router>
    </ArticleProvider>
  );
}

export default App;