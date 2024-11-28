import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface ProductWidgetProps {
  product: {
    id: string;
    icon: React.ReactNode;
    title: string;
    description: string;
    gradient: string;
  };
  onSelect: () => void;
}

const ProductWidget: React.FC<ProductWidgetProps> = ({ product, onSelect }) => {
  return (
    <motion.button
      onClick={onSelect}
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      className={`w-full bg-gradient-to-r ${product.gradient} p-1 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 group`}
    >
      <motion.div 
        className="bg-white/10 backdrop-blur-lg rounded-xl p-8 h-full relative overflow-hidden"
        whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.15)" }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0"
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
        
        <div className="flex flex-col items-center text-white relative z-10">
          <motion.div
            whileHover={{ 
              rotate: 360,
              scale: 1.1,
              transition: { duration: 0.5, type: "spring", stiffness: 200 }
            }}
            className="mb-6 transform-gpu"
          >
            {product.icon}
          </motion.div>
          
          <motion.h3 
            className="text-2xl font-bold mb-4"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {product.title}
          </motion.h3>
          
          <p className="text-lg opacity-90 mb-6 text-center">
            {product.description}
          </p>
          
          <motion.div
            className="flex items-center gap-2 text-lg font-semibold group"
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <span className="group-hover:underline">Personalizar</span>
            <motion.div
              animate={{ x: 0 }}
              whileHover={{ x: 3 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.button>
  );
};

export default ProductWidget;