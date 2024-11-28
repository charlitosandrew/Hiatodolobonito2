import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const LoadingScreen = () => {
  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { 
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 1.5
      }
    },
    exit: {
      scale: 0,
      rotate: 180,
      transition: {
        duration: 0.5
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5,
        duration: 0.8
      }
    },
    exit: {
      opacity: 0,
      y: -50,
      transition: {
        duration: 0.3
      }
    }
  };

  const bgVariants = {
    hidden: { scale: 1.2 },
    visible: { 
      scale: 1,
      transition: {
        duration: 1.5
      }
    },
    exit: {
      scale: 1.2,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 flex items-center justify-center z-50 overflow-hidden"
    >
      <motion.div
        variants={bgVariants}
        className="absolute inset-0 bg-gradient-to-br from-rose-500 via-fuchsia-500 to-indigo-500"
      />
      
      {/* Animated background circles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              scale: [1, 2, 1],
              opacity: [0.3, 0.1, 0.3],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 8,
              delay: i * 0.4,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute w-full h-full border-[40px] border-white/10 rounded-full"
            style={{
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          variants={iconVariants}
          className="relative mb-8"
        >
          {/* Glowing effect */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 bg-white rounded-full blur-xl"
          />
          <Heart className="w-20 h-20 text-white relative z-10" />
        </motion.div>

        <motion.div
          variants={textVariants}
          className="text-center"
        >
          <motion.h1
            animate={{
              opacity: [1, 0.7, 1]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-4xl font-bold text-white mb-2"
          >
            Hi!
          </motion.h1>
          <motion.div
            animate={{
              opacity: [1, 0.5, 1]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
            className="text-white/80 text-lg"
          >
            Hola a todo lo bonito
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;