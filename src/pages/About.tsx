import React from 'react';
import { motion } from 'framer-motion';
import { Gift, Clock, Palette, Sparkles } from 'lucide-react';
import FeatureCard from '../components/FeatureCard';

const About = () => {
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
      opacity: 1
    }
  };

  const features = [
    {
      icon: <Gift className="w-12 h-12" />,
      title: "Velas Personalizadas",
      description: "Para iluminar momentos y rinconcitos especiales."
    },
    {
      icon: <Palette className="w-12 h-12" />,
      title: "Espejos",
      description: "Refleja tu esencia con diseños únicos."
    },
    {
      icon: <Clock className="w-12 h-12" />,
      title: "Relojes",
      description: "Ponle estilo a un recurso valioso... Tu tiempo!"
    },
    {
      icon: <Sparkles className="w-12 h-12" />,
      title: "Papelería creativa",
      description: "Detalles bonitos para momentos especiales"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 animate-gradient"
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="pt-24 px-4 max-w-6xl mx-auto"
      >
        <motion.div
          variants={itemVariants}
          className="w-48 h-48 mx-auto mb-8"
        >
          <img 
            src="/hi-logo.png" 
            alt="Hi! Logo" 
            className="w-full h-full object-contain"
          />
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-5xl font-bold text-white text-center mb-8"
        >
          Conócenos
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-xl text-white text-center mb-12 max-w-2xl mx-auto"
        >
          Somos una familia de tres, dispuestos a ayudarte a transformar tus ideas en una realidad.                     


Esta vida es corta, pero se vuelve más hermosa cuando saludamos a todo lo bonito que nos rodea.

¡Anímate a decir hola a todo lo bonito! 
        </motion.p>

        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
        >
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="text-center pb-12"
        >
          <motion.h2
            animate={{ 
              scale: [1, 1.05, 1],
              transition: { 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }
            }}
            className="text-3xl font-bold text-white mb-4"
          >
            ¡Anímate a dar vida a tus ideas con nosotros!
          </motion.h2>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default About;