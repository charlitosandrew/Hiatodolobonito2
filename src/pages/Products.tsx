import React from 'react';
import { motion } from 'framer-motion';
import ProductWidget from '../components/ProductWidget';
import { Gift, Clock, Palette, Sparkles } from 'lucide-react';
import CustomizationForm from '../components/CustomizationForm';

const Products = () => {
  const [selectedProduct, setSelectedProduct] = React.useState<string | null>(null);

  const products = [
    {
      id: 'velas',
      icon: <Gift className="w-12 h-12" />,
      title: "Velas Personalizadas",
      formTitle: "vela",
      description: "Para iluminar momentos y rinconcitos especiales.",
      options: {
        tamaño: ['Pequeña', 'Mediana', 'Grande'],
        customization: true
      },
      gradient: 'from-amber-400 to-orange-500'
    },
    {
      id: 'espejos',
      icon: <Palette className="w-12 h-12" />,
      title: "Espejos",
      formTitle: "espejo",
      description: "Refleja tu esencia con diseños únicos.",
      options: {
        forma: ['Circular', 'Rectangular', 'Otros'],
        customization: true
      },
      gradient: 'from-blue-400 to-indigo-500'
    },
    {
      id: 'relojes',
      icon: <Clock className="w-12 h-12" />,
      title: "Relojes Únicos",
      formTitle: "reloj",
      description: "Ponle estilo a un recurso valioso...Tu tiempo!",
      options: {
        customization: true
      },
      gradient: 'from-purple-400 to-pink-500'
    },
    {
      id: 'papeleria',
      icon: <Sparkles className="w-12 h-12" />,
      title: "Papelería Creativa",
      formTitle: "Papelería Creativa",
      description: "Detalles bonitos para momentos especiales",
      options: {
        tipo: ['Invitaciones', 'Felicitaciones'],
        customization: true
      },
      gradient: 'from-green-400 to-teal-500'
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-600 via-purple-500 to-fuchsia-500 animate-gradient pt-24">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-6xl mx-auto px-4 py-16"
      >
        {!selectedProduct ? (
          <>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-bold text-white text-center mb-16"
            >
              Nuestros Productos
            </motion.h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {products.map((product) => (
                <ProductWidget
                  key={product.id}
                  product={product}
                  onSelect={() => setSelectedProduct(product.id)}
                />
              ))}
            </div>
          </>
        ) : (
          <CustomizationForm
            product={products.find(p => p.id === selectedProduct)!}
            onBack={() => setSelectedProduct(null)}
          />
        )}
      </motion.div>
    </div>
  );
};

export default Products;