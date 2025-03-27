
import { motion } from "framer-motion";
import { useState } from "react";

// Enhanced check icon component with animation and variants
const Check = ({ 
  className = "h-4 w-4", 
  variant = "default" 
}: { 
  className?: string;
  variant?: "default" | "success" | "primary"; 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const getVariantClasses = () => {
    switch (variant) {
      case "success":
        return "text-green-500";
      case "primary":
        return "text-brand-blue";
      default:
        return "text-current";
    }
  };

  const pathVariants = {
    initial: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { 
        duration: 0.5,
        ease: "easeInOut"
      }
    },
    hover: {
      scale: 1.2,
      transition: { duration: 0.2 }
    }
  };

  const circleVariants = {
    initial: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 0.2,
      transition: { 
        duration: 0.3,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.5,
      opacity: 0.3,
      transition: { duration: 0.2 }
    }
  };

  return (
    <div 
      className="relative inline-flex items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className={`absolute inset-0 ${getVariantClasses().replace('text-', 'bg-')} rounded-full opacity-0`}
        variants={circleVariants}
        initial="initial"
        animate={isHovered ? "hover" : "visible"}
      />
      <motion.svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="none"
        stroke="currentColor" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={`${className} ${getVariantClasses()} relative z-10`}
        initial="initial"
        animate="visible"
        whileHover="hover"
      >
        <motion.polyline 
          points="20 6 9 17 4 12" 
          variants={pathVariants}
        />
      </motion.svg>
    </div>
  );
};

export default Check;
