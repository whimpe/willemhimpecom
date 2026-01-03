import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation, Variant } from 'framer-motion';

interface RevealProps {
  children: React.ReactNode;
  width?: 'fit-content' | '100%';
  delay?: number;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

export const Reveal: React.FC<RevealProps> = ({ 
  children, 
  width = 'fit-content', 
  delay = 0.25,
  className = "",
  direction = 'up'
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  const getVariants = (): { hidden: Variant; visible: Variant } => {
    const distance = 40;
    const duration = 0.8;
    const ease = [0.25, 0.1, 0.25, 1.0]; // Cubic bezier for Apple feel

    let hidden = { opacity: 0, x: 0, y: 0 };
    
    switch (direction) {
      case 'up': hidden = { opacity: 0, y: distance, x: 0 }; break;
      case 'down': hidden = { opacity: 0, y: -distance, x: 0 }; break;
      case 'left': hidden = { opacity: 0, x: distance, y: 0 }; break;
      case 'right': hidden = { opacity: 0, x: -distance, y: 0 }; break;
      case 'none': hidden = { opacity: 0, x: 0, y: 0 }; break;
    }

    return {
      hidden,
      visible: { 
        opacity: 1, 
        x: 0, 
        y: 0,
        transition: { duration, ease, delay }
      },
    };
  };

  return (
    <div ref={ref} style={{ width }} className={className}>
      <motion.div
        variants={getVariants()}
        initial="hidden"
        animate={mainControls}
      >
        {children}
      </motion.div>
    </div>
  );
};