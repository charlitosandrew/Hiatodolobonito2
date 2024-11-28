import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Facebook, Mail, MessageCircle, Heart } from 'lucide-react';

const Contact = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  const socialLinks = [
    {
      name: 'WhatsApp',
      icon: <MessageCircle className="w-8 h-8" />,
      url: 'https://wa.me/636886561',
      color: 'from-green-400 to-green-600',
      hoverColor: 'from-green-500 to-green-700'
    },
    {
      name: 'Instagram',
      icon: <Instagram className="w-8 h-8" />,
      url: 'https://www.instagram.com/hola__a_todo_lo_bonito/',
      color: 'from-pink-500 via-purple-500 to-indigo-500',
      hoverColor: 'from-pink-600 via-purple-600 to-indigo-600'
    },
    {
      name: 'Facebook',
      icon: <Facebook className="w-8 h-8" />,
      url: 'https://www.facebook.com/profile.php?id=61555802647524&locale=es_ES',
      color: 'from-blue-500 to-blue-600',
      hoverColor: 'from-blue-600 to-blue-700'
    },
    {
      name: 'Email',
      icon: <Mail className="w-8 h-8" />,
      url: 'mailto:hiatodolobonito@gmail.com',
      color: 'from-red-400 to-red-600',
      hoverColor: 'from-red-500 to-red-700'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const handleHeartClick = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-600 via-purple-500 to-fuchsia-500 animate-gradient pt-24">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-4xl mx-auto px-4 py-16"
      >
        <motion.h1
          variants={itemVariants}
          className="text-5xl font-bold text-white text-center mb-16"
        >
          Contáctanos
        </motion.h1>

        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto"
        >
          {socialLinks.map((social) => (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                block p-6 rounded-xl bg-gradient-to-r ${social.color}
                hover:${social.hoverColor} transform transition-all duration-300
                shadow-lg hover:shadow-2xl
              `}
            >
              <motion.div
                className="flex items-center justify-between"
                initial={{ x: 0 }}
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <span className="text-xl font-semibold text-white">
                  {social.name}
                </span>
                <motion.div
                  whileHover={{ rotate: 15 }}
                  className="text-white"
                >
                  {social.icon}
                </motion.div>
              </motion.div>
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="text-center mt-16 relative"
          onClick={handleHeartClick}
        >
          <motion.div
            className="inline-block cursor-pointer relative"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence>
              {isAnimating && (
                <>
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ 
                        scale: 0,
                        opacity: 1,
                        x: 0,
                        y: 0
                      }}
                      animate={{
                        scale: [0, 1, 0.5],
                        opacity: [1, 1, 0],
                        x: [0, (Math.random() - 0.5) * 200],
                        y: [0, -150 - Math.random() * 100]
                      }}
                      transition={{
                        duration: 1.5,
                        delay: i * 0.1,
                        ease: "easeOut"
                      }}
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                    >
                      <Heart className="w-6 h-6 text-white fill-white" />
                    </motion.div>
                  ))}
                </>
              )}
            </AnimatePresence>
            
            <motion.div
              animate={isAnimating ? {
                scale: [1, 1.2, 1],
                rotate: [0, -10, 10, 0],
              } : {}}
              transition={{ duration: 0.5 }}
            >
              <Heart className="w-12 h-12 text-white fill-white" />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Contact;