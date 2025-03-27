
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const neumorphicButtonVariants = cva(
  "inline-flex items-center justify-center font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default: "bg-white text-foreground",
        dark: "bg-gray-900 text-white",
        blue: "bg-brand-blue text-white",
        outline: "border border-input bg-transparent",
      },
      size: {
        sm: "h-9 px-3 text-xs",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-6 text-base",
        xl: "h-14 px-8 text-lg",
      },
      rounded: {
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full",
      },
      depth: {
        none: "",
        light: "shadow-sm hover:shadow",
        medium: "shadow-md hover:shadow-lg",
        strong: "shadow-lg hover:shadow-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      rounded: "md",
      depth: "medium",
    },
  }
);

export interface NeumorphicButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof neumorphicButtonVariants> {
  asChild?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

const NeumorphicButton = React.forwardRef<HTMLButtonElement, NeumorphicButtonProps>(
  (
    {
      className,
      variant,
      size,
      rounded,
      depth,
      asChild = false,
      icon,
      iconPosition = "left",
      children,
      ...props
    },
    ref
  ) => {
    const buttonVariants = {
      initial: { 
        y: 0,
        boxShadow: variant === 'dark' 
          ? "0px 4px 8px rgba(0, 0, 0, 0.2), inset 0px 1px 1px rgba(255, 255, 255, 0.1)"
          : "0px 4px 8px rgba(0, 0, 0, 0.1), inset 0px 1px 1px rgba(255, 255, 255, 0.5)"
      },
      hover: { 
        y: -2,
        boxShadow: variant === 'dark'
          ? "0px 8px 15px rgba(0, 0, 0, 0.3), inset 0px 1px 1px rgba(255, 255, 255, 0.15)"
          : "0px 8px 15px rgba(0, 0, 0, 0.15), inset 0px 1px 1px rgba(255, 255, 255, 0.7)"
      },
      tap: { 
        y: 1,
        boxShadow: variant === 'dark'
          ? "0px 2px 4px rgba(0, 0, 0, 0.25), inset 0px 1px 1px rgba(255, 255, 255, 0.05)"
          : "0px 2px 4px rgba(0, 0, 0, 0.1), inset 0px 1px 1px rgba(255, 255, 255, 0.4)"
      }
    };

    return (
      <motion.button
        ref={ref}
        className={cn(neumorphicButtonVariants({ variant, size, rounded, depth, className }))}
        variants={buttonVariants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        transition={{ duration: 0.2 }}
        {...props}
      >
        {icon && iconPosition === "left" && <span className="mr-2">{icon}</span>}
        {children}
        {icon && iconPosition === "right" && <span className="ml-2">{icon}</span>}
      </motion.button>
    );
  }
);

NeumorphicButton.displayName = "NeumorphicButton";

export default NeumorphicButton;
