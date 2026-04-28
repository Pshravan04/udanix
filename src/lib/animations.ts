import { Variants } from 'framer-motion';

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.6, 
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number]
    } 
  },
};

export const fadeUpStagger: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({ 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.5, 
      delay: i * 0.08,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number]
    } 
  }),
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { 
      staggerChildren: 0.1, 
      delayChildren: 0.2 
    } 
  } 
};
