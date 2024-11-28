import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

const MainButton = () => {
  const navigate = useNavigate();
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    // Check if device supports hover
    const hasHover = window.matchMedia('(hover: hover)').matches;
    setIsMobile(!hasHover);

    // Start automatic animations for mobile
    if (!hasHover) {
      const startMobileAnimations = async () => {
        while (true) {
          await controls.start({
            scale: 1.05,
            transition: { duration: 1.5, ease: "easeInOut" }
          });
          await controls.start({
            scale: 1,
            transition: { duration: 1.5, ease: "easeInOut" }
          });
        }
      };
      startMobileAnimations();
    }
  }, [controls]);

  const sparkleVariants = {
    initial: { opacity: 0, scale: 0 },
    animate: { 
      opacity: [0, 1, 0],
      scale: [0.5, 1.5, 0.5],
      x: [0, (Math.random() - 0.5) * 100],
      y: [0, -50 - Math.random() * 50]
    }
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
      onHoverStart={() => !isMobile && setIsButtonHovered(true)}
      onHoverEnd={() => !isMobile && setIsButtonHovered(false)}
      className="relative"
    >
      <AnimatePresence>
        {(isButtonHovered || isMobile) && (
          <>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: [0.5, 1],
                scale: [0.95, 1.05],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }
              }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur-xl"
            />
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`sparkle-${i}`}
                variants={sparkleVariants}
                initial="initial"
                animate="animate"
                transition={{
                  duration: 1.5,
                  delay: i * 0.2,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                <Sparkles className="w-4 h-4 text-white/80" />
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>
      
      <motion.button
        animate={controls}
        whileHover={!isMobile ? { 
          scale: 1.05,
          transition: { type: "spring", stiffness: 400, damping: 10 }
        } : {}}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate('/conocenos')}
        className="relative bg-gradient-to-r from-[#FF00AA] to-[#FF00FF] text-white px-12 py-4 rounded-full font-semibold shadow-lg transition-all duration-300 hover:shadow-pink-500/50 overflow-hidden group"
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
          animate={isMobile ? {
            y: [-1, 1],
            transition: {
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse"
            }
          } : isButtonHovered ? { y: -2 } : { y: 0 }}
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