
import React, { useState } from 'react';
import { ChevronUp, MessageCircle, Phone, Mail, X } from 'lucide-react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const fabVariants = cva(
  "flex items-center justify-center rounded-full shadow-lg transition-all duration-300 cursor-pointer",
  {
    variants: {
      size: {
        sm: "h-10 w-10",
        default: "h-14 w-14",
        lg: "h-16 w-16",
      },
      variant: {
        primary: "bg-brand-blue text-white hover:bg-brand-blue/90",
        secondary: "bg-brand-purple text-white hover:bg-brand-purple/90",
        tertiary: "bg-brand-pink text-white hover:bg-brand-pink/90",
        outline: "bg-white border-2 border-gray-200 text-gray-700 hover:border-gray-300",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "primary",
    },
  }
);

type ActionItem = {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
};

interface FloatingActionButtonProps {
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  actions?: ActionItem[];
  mainIcon?: React.ReactNode;
  size?: "sm" | "default" | "lg";
  variant?: "primary" | "secondary" | "tertiary" | "outline";
  className?: string;
}

const positionClasses = {
  "bottom-right": "right-6 bottom-6",
  "bottom-left": "left-6 bottom-6",
  "top-right": "right-6 top-24",
  "top-left": "left-6 top-24",
};

const FloatingActionButton = ({
  position = "bottom-right",
  actions = [],
  mainIcon = <MessageCircle className="h-6 w-6" />,
  size = "default",
  variant = "primary",
  className,
}: FloatingActionButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`fixed ${positionClasses[position]} z-50 flex flex-col-reverse items-center gap-4`}>
      {isOpen && actions.length > 0 && (
        <div className="flex flex-col-reverse gap-3 mb-3 items-center animate-fade-in">
          {actions.map((action, index) => (
            <div key={index} className="flex items-center group">
              <div className="opacity-0 group-hover:opacity-100 mr-2 bg-white px-2 py-1 rounded shadow text-sm font-medium transition-opacity">
                {action.label}
              </div>
              <div
                className={fabVariants({ size: "sm", variant })}
                onClick={action.onClick}
              >
                {action.icon}
              </div>
            </div>
          ))}
        </div>
      )}
      
      <button
        onClick={toggleOpen}
        className={cn(
          fabVariants({ size, variant }),
          "relative z-20",
          isOpen ? "rotate-45" : "rotate-0",
          className
        )}
      >
        {isOpen ? <X className="h-6 w-6" /> : mainIcon}
        
        {/* Ripple effect */}
        <span className="absolute inset-0 rounded-full animate-ping bg-current opacity-30 duration-1000"></span>
      </button>
    </div>
  );
};

export default FloatingActionButton;
