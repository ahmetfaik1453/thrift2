// Framer-motion animation variants
export const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export const scaleIn = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1 }
};

export const slideIn = {
  hidden: { x: -100, opacity: 0 },
  visible: { x: 0, opacity: 1 }
};
