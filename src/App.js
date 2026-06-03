import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from './components/ui/toaster';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import DonorList from './pages/DonorList';
import Profile from './pages/Profile';
import BecomeDonor from './pages/BecomeDonor';
import Stories from './pages/Stories';
import Awareness from './pages/Awareness';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <div className="App">
            <BrowserRouter>
              <AppContent />
            </BrowserRouter>
          </div>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

function AppContent() {
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar onAuthClick={() => setShowAuthModal(true)} />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/donors" element={<DonorList />} />
          <Route 
            path="/profile" 
            element={user ? <Profile /> : <Navigate to="/" />} 
          />
          <Route path="/become-donor" element={<BecomeDonor />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/awareness" element={<Awareness />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={user?.isAdmin ? <Admin /> : <Navigate to="/" />} />
        </Routes>
      </main>
      <Footer />
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
      <Toaster />
    </div>
  );
}

export default App;