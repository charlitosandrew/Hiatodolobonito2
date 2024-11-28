import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="bg-white/10 backdrop-blur-lg rounded-xl p-8 text-center"
    >
      <motion.div
        className="text-white mb-4 flex justify-center"
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {icon}
      </motion.div>
      <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
      <p className="text-cyan-100">{description}</p>
    </motion.div>
  );
};

export default FeatureCard;