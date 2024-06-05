import React, { useEffect } from 'react';

import Portal from './Portal';
import { motion } from 'framer-motion';

interface OverlayModalProps {
  children: React.ReactNode;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

const OverlayModal: React.FC<OverlayModalProps> = ({ children, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  return (
    <Portal>
      <motion.div
        className="h-screen w-full bg-black/50 fixed top-0 left-0 z-20 overflow-x-hidden backdrop-blur-sm"
        onClick={() => onClose(false)}
        key={'overlay-modal'}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.3 } }}
      />
      <form className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50  w-[90vw] md:w-[40vw] bg-custom-primary_bg dark:bg-custom-dark_primary_bg">
        {children}
      </form>
    </Portal>
  );
};

export default OverlayModal;
