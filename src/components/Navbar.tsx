import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  const location = useLocation();
  
  const links = [
    { path: '/', label: 'Inicio' },
    { path: '/conocenos', label: 'Conócenos' },
    { path: '/productos', label: 'Productos' },
    { path: '/contacto', label: 'Contacto' }
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="bg-slate-800/90 backdrop-blur-sm fixed w-full z-50"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 10 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10"
            >
              <img 
                src="/hi-logo.png" 
                alt="Hi! Logo" 
                className="w-full h-full object-contain"
              />
            </motion.div>
          </Link>
          
          <div className="flex space-x-3 sm:space-x-8">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="relative"
              >
                <motion.span
                  className={`text-sm sm:text-base text-white hover:text-cyan-300 transition-colors ${
                    location.pathname === link.path ? 'text-cyan-300' : ''
                  }`}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  {link.label}
                </motion.span>
                {location.pathname === link.path && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-cyan-300"
                    layoutId="underline"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;