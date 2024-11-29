import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';

const MainButton = () => {
  const navigate = useNavigate();
  const [isEmittingHearts, setIsEmittingHearts] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsEmittingHearts(true);
      setTimeout(() => setIsEmittingHearts(false), 2000);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getRandomSpread = () => {
    const angle = Math.random() * 2 * Math.PI; // Full circle angle
    const distance = 150 + Math.random() * 200; // Base distance
    const spread = {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance
    };
    
    // Add extra vertical offset to ensure hearts don't cluster near the button
    const verticalOffset = 50;
    spread.y += spread.y > 0 ? verticalOffset : -verticalOffset;
    
    return spread;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        transition: {
          duration: 0.8,
          type: "spring",
          stiffness: 100,
          damping: 15,
          delay: 0.7
        }
      }}
      className="relative"
    >
      <div className="absolute inset-0 overflow-visible pointer-events-none">
        <AnimatePresence>
          {isEmittingHearts && (
            <>
              {[...Array(12)].map((_, i) => {
                const spread = getRandomSpread();
                return (
                  <motion.div
                    key={`heart-${i}`}
                    initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                    animate={{ 
                      opacity: [0, 1, 0],
                      scale: [0.5, 1, 0],
                      x: spread.x,
                      y: spread.y,
                      rotate: [-10, 10]
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.1,
                      ease: "easeOut"
                    }}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
                  >
                    <Heart className="w-4 h-4 text-pink-100 fill-pink-100" />
                  </motion.div>
                );
              })}
            </>
          )}
        </AnimatePresence>
      </div>
      
      <motion.button
        whileHover={{ 
          scale: 1.05,
          transition: { type: "spring", stiffness: 400, damping: 10 }
        }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate('/conocenos')}
        className="relative bg-gradient-to-r from-[#FF00AA] to-[#FF00FF] text-white px-12 py-4 rounded-full font-semibold shadow-lg transition-all duration-300 hover:shadow-pink-500/50 overflow-hidden group z-10"
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: '-100%' }}
          animate={{ 
            x: '100%',
            transition: {
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear"
            }
          }}
        />

        <motion.span
          animate={{
            y: [-1, 1],
            transition: {
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse"
            }
          }}
          className="text-lg relative z-10"
        >
          Saber más
        </motion.span>
        
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-white/30"
          animate={{
            scale: [1, 1.1],
            opacity: [0.3, 0],
            transition: {
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop"
            }
          }}
        />
      </motion.button>
    </motion.div>
  );
};

export default MainButton;
