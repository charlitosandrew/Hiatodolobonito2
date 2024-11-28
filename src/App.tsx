import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Contact from './pages/Contact';
import LoadingScreen from './components/LoadingScreen';
import PageTransition from './components/PageTransition';

function AppRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/conocenos" element={
          <PageTransition pageName="Conócenos">
            <About />
          </PageTransition>
        } />
        <Route path="/productos" element={
          <PageTransition pageName="Productos">
            <Products />
          </PageTransition>
        } />
        <Route path="/contacto" element={
          <PageTransition pageName="Contacto">
            <Contact />
          </PageTransition>
        } />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <LoadingScreen key="loading" />
      ) : (
        <BrowserRouter>
          <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-orange-500 to-pink-500">
            <Navbar />
            <AppRoutes />
          </div>
        </BrowserRouter>
      )}
    </AnimatePresence>
  );
}

export default App;