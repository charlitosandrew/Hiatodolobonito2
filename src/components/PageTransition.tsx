import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PageTransitionProps {
  children: React.ReactNode;
  pageName: string;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children, pageName }) => {
  const [isTransitionComplete, setIsTransitionComplete] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const slideVariants = {
    initial: { x: '100%' },
    animate: { 
      x: '0%',
      transition: {
        duration: 0.8,
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    },
    exit: { 
      x: '-100%',
      transition: {
        duration: 0.8,
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  };

  const contentVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { duration: 0.5 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  const handleTransitionComplete = () => {
    setTimeout(() => {
      setIsTransitionComplete(true);
      setTimeout(() => {
        setShowContent(true);
      }, 100);
    }, 800);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {!isTransitionComplete && (
          <motion.div
            key="transition"
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            onAnimationComplete={handleTransitionComplete}
            className="fixed inset-0 z-50 bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{
                delay: 0.4,
                duration: 0.3,
                type: "spring",
                stiffness: 200
              }}
              className="text-center"
            >
              <motion.span 
                className="text-6xl font-bold text-white block"
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{
                  delay: 0.5,
                  type: "spring",
                  stiffness: 200
                }}
              >
                {pageName}
              </motion.span>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{
                  delay: 0.6,
                  duration: 0.4,
                  ease: "easeOut"
                }}
                className="h-1 bg-white/50 mt-4 mx-auto"
                style={{ maxWidth: '200px' }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        variants={contentVariants}
        initial="initial"
        animate={showContent ? "animate" : "initial"}
        exit="exit"
      >
        {children}
      </motion.div>
    </>
  );
};

export default PageTransition;