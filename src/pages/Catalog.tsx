import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X } from 'lucide-react';

const categories = [
  { id: 'all', name: 'Todo' },
  { id: 'velas', name: 'Velas' },
  { id: 'espejos', name: 'Espejos' },
  { id: 'relojes', name: 'Relojes' },
  { id: 'papeleria', name: 'Papelería' }
];

const products = [
  {
    id: 1,
    name: 'Vela Aromática Lavanda',
    category: 'velas',
    price: '19.99€',
    image: 'https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?auto=format&fit=crop&q=80&w=800',
    description: 'Vela aromática artesanal con esencia de lavanda'
  },
  {
    id: 2,
    name: 'Espejo Vintage Dorado',
    category: 'espejos',
    price: '49.99€',
    image: 'https://images.unsplash.com/photo-1622737133809-d95047b9e673?auto=format&fit=crop&q=80&w=800',
    description: 'Espejo decorativo con marco dorado envejecido'
  },
  {
    id: 3,
    name: 'Reloj de Pared Moderno',
    category: 'relojes',
    price: '39.99€',
    image: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&q=80&w=800',
    description: 'Reloj de pared con diseño minimalista'
  },
  {
    id: 4,
    name: 'Set de Papelería Premium',
    category: 'papeleria',
    price: '24.99€',
    image: 'https://images.unsplash.com/photo-1595231712607-a5c68c9a85c8?auto=format&fit=crop&q=80&w=800',
    description: 'Conjunto de papelería artesanal personalizada'
  }
];

const Catalog = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 animate-gradient pt-24">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-white mb-4">Catálogo</h1>
          <p className="text-xl text-white/90">Descubre nuestra colección de productos artesanales</p>
        </motion.div>

        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/20 backdrop-blur-md text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 max-w-full">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-xl backdrop-blur-md border border-white/30 whitespace-nowrap
                  ${selectedCategory === category.id
                    ? 'bg-white/30 text-white'
                    : 'bg-white/10 text-white/80 hover:bg-white/20'
                  }`}
              >
                {category.name}
              </motion.button>
            ))}
          </div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              onClick={() => setSelectedProduct(product.id)}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-2xl">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="aspect-[4/3] relative"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-6 group-hover:translate-y-0 transition-transform">
                  <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
                  <p className="text-white/90 mb-2">{product.description}</p>
                  <p className="text-xl font-semibold">{product.price}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 max-w-2xl w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 text-white/80 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
              
              {selectedProduct && (
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-1">
                    <div className="rounded-xl overflow-hidden">
                      <img
                        src={products.find(p => p.id === selectedProduct)?.image}
                        alt={products.find(p => p.id === selectedProduct)?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex-1 text-white">
                    <h2 className="text-3xl font-bold mb-4">
                      {products.find(p => p.id === selectedProduct)?.name}
                    </h2>
                    <p className="text-xl mb-4">
                      {products.find(p => p.id === selectedProduct)?.description}
                    </p>
                    <p className="text-2xl font-bold mb-6">
                      {products.find(p => p.id === selectedProduct)?.price}
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full bg-white/20 hover:bg-white/30 text-white py-3 px-6 rounded-xl font-semibold transition-colors"
                    >
                      Solicitar información
                    </motion.button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Catalog;