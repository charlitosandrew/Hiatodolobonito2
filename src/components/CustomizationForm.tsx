import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Send } from 'lucide-react';
import SuccessPopup from './SuccessPopup';

interface CustomizationFormProps {
  product: {
    id: string;
    title: string;
    formTitle: string;
    options: {
      [key: string]: string[] | boolean;
    };
    gradient: string;
  };
  onBack: () => void;
}

const CustomizationForm: React.FC<CustomizationFormProps> = ({ product, onBack }) => {
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [email, setEmail] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const mailtoLink = `mailto:hiatodolobonito@gmail.com?subject=Nueva solicitud de ${product.title}&body=${encodeURIComponent(`
Detalles del pedido:

Producto: ${product.title}
Email del cliente: ${email}
${Object.entries(formData)
  .map(([key, value]) => `${key}: ${value}`)
  .join('\n')}
    `)}`;

    window.location.href = mailtoLink;
    setShowSuccess(true);
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    onBack();
  };

  const formVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    },
    exit: {
      opacity: 0,
      x: -50,
      transition: {
        duration: 0.2
      }
    }
  };

  const inputVariants = {
    focused: {
      scale: 1.02,
      boxShadow: "0 0 20px rgba(255, 255, 255, 0.3)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
    unfocused: {
      scale: 1,
      boxShadow: "0 0 0px rgba(255, 255, 255, 0)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  const optionsToShow = Object.entries(product.options).filter(([key]) => key !== 'customization');

  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={formVariants}
        className="max-w-2xl mx-auto"
      >
        <motion.button
          onClick={onBack}
          whileHover={{ x: -5 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 text-white mb-8 hover:opacity-80 transition-opacity group"
        >
          <motion.div
            animate={{ x: 0 }}
            whileHover={{ x: -3 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <ArrowLeft className="w-5 h-5" />
          </motion.div>
          <span className="group-hover:underline">Volver a productos</span>
        </motion.button>

        <div className={`bg-gradient-to-r ${product.gradient} p-1 rounded-2xl shadow-lg`}>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8">
            <motion.h2
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-3xl font-bold text-white mb-8 text-center"
            >
              Personaliza tu {product.formTitle}
            </motion.h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <motion.label
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="block text-white text-lg"
                >
                  Tu correo electrónico:
                </motion.label>
                <motion.input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  variants={inputVariants}
                  animate={focusedField === 'email' ? 'focused' : 'unfocused'}
                  className="w-full px-4 py-3 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none transition-all duration-300"
                  placeholder="ejemplo@correo.com"
                  required
                />
              </div>

              {optionsToShow.map(([key, values]) => (
                <div key={key} className="space-y-2">
                  <motion.label
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="block text-white text-lg capitalize"
                  >
                    {key}:
                  </motion.label>
                  <motion.select
                    value={formData[key] || ''}
                    onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                    onFocus={() => setFocusedField(key)}
                    onBlur={() => setFocusedField(null)}
                    variants={inputVariants}
                    animate={focusedField === key ? 'focused' : 'unfocused'}
                    className="w-full px-4 py-3 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none transition-all duration-300"
                    required
                  >
                    <option value="" disabled className="text-gray-400">Selecciona una opción</option>
                    {(values as string[]).map((option) => (
                      <option key={option} value={option} className="text-black bg-white">
                        {option}
                      </option>
                    ))}
                  </motion.select>
                </div>
              ))}

              <div className="space-y-2">
                <motion.label
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="block text-white text-lg"
                >
                  ¿Cómo quieres personalizarlo?
                </motion.label>
                <motion.textarea
                  value={formData.customization || ''}
                  onChange={(e) => setFormData({ ...formData, customization: e.target.value })}
                  onFocus={() => setFocusedField('customization')}
                  onBlur={() => setFocusedField(null)}
                  variants={inputVariants}
                  animate={focusedField === 'customization' ? 'focused' : 'unfocused'}
                  className="w-full px-4 py-3 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none transition-all duration-300 min-h-[120px] resize-y"
                  placeholder="Describe cómo quieres personalizar tu producto..."
                  required
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-white/20 hover:bg-white/30 text-white py-4 rounded-lg flex items-center justify-center gap-3 transition-colors shadow-lg"
              >
                <Send className="w-5 h-5" />
                <span className="text-lg font-semibold">Enviar solicitud</span>
              </motion.button>
            </form>
          </div>
        </div>
      </motion.div>

      <SuccessPopup isOpen={showSuccess} onClose={handleSuccessClose} />
    </>
  );
};

export default CustomizationForm;