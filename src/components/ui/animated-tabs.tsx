
import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Tab {
  id: string;
  label: React.ReactNode;
  content: React.ReactNode;
  icon?: React.ReactNode;
}

interface AnimatedTabsProps {
  tabs: Tab[];
  defaultTabId?: string;
  variant?: 'underline' | 'pills' | 'contained' | 'minimal';
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
  align?: 'start' | 'center' | 'end';
  className?: string;
  tabClassName?: string;
  contentClassName?: string;
  onChange?: (tabId: string) => void;
}

const variantStyles = {
  underline: {
    tabPanel: 'border-b border-gray-200',
    tab: 'px-4 py-2 text-gray-600 hover:text-gray-900',
    activeTab: 'text-brand-blue',
    indicator: 'bg-brand-blue h-0.5 absolute bottom-0 left-0 right-0',
  },
  pills: {
    tabPanel: 'space-x-2',
    tab: 'px-4 py-2 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100',
    activeTab: 'bg-brand-blue text-white hover:bg-brand-blue hover:text-white',
    indicator: 'hidden',
  },
  contained: {
    tabPanel: 'bg-gray-100 p-1 rounded-lg',
    tab: 'px-4 py-2 rounded-md text-gray-600',
    activeTab: 'bg-white text-gray-900 shadow-sm',
    indicator: 'hidden',
  },
  minimal: {
    tabPanel: '',
    tab: 'px-4 py-2 text-gray-600 hover:text-gray-900',
    activeTab: 'text-gray-900 font-medium',
    indicator: 'hidden',
  },
};

const sizeStyles = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

const AnimatedTabs = ({
  tabs,
  defaultTabId,
  variant = 'underline',
  fullWidth = false,
  size = 'md',
  align = 'start',
  className = '',
  tabClassName = '',
  contentClassName = '',
  onChange,
}: AnimatedTabsProps) => {
  const [activeTab, setActiveTab] = useState(defaultTabId || tabs[0]?.id);
  const [previousTab, setPreviousTab] = useState<string | null>(null);
  const [direction, setDirection] = useState(0);

  const handleTabClick = (tabId: string) => {
    const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
    const newIndex = tabs.findIndex(tab => tab.id === tabId);
    
    setPreviousTab(activeTab);
    setDirection(newIndex > currentIndex ? 1 : -1);
    setActiveTab(tabId);
    
    if (onChange) onChange(tabId);
  };

  const activeTabIndex = tabs.findIndex(tab => tab.id === activeTab);
  const activeTabRef = React.useRef<HTMLButtonElement>(null);
  const styles = variantStyles[variant];

  return (
    <div className={`space-y-4 ${className}`}>
      <div className={`relative flex ${align === 'center' ? 'justify-center' : align === 'end' ? 'justify-end' : 'justify-start'} ${styles.tabPanel}`}>
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              ref={isActive ? activeTabRef : null}
              className={`relative ${styles.tab} ${isActive ? styles.activeTab : ''} ${sizeStyles[size]} ${fullWidth ? 'flex-1' : ''} transition-all duration-200 flex items-center justify-center gap-2 ${tabClassName}`}
              onClick={() => handleTabClick(tab.id)}
            >
              {tab.icon && <span className="flex-shrink-0">{tab.icon}</span>}
              <span>{tab.label}</span>
              
              {isActive && variant === 'underline' && (
                <motion.div
                  className={styles.indicator}
                  layoutId="activeTab"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      <div className={`relative overflow-hidden ${contentClassName}`}>
        {tabs.map((tab) => (
          <motion.div
            key={tab.id}
            initial={{ opacity: 0, x: direction * 20 }}
            animate={{
              opacity: activeTab === tab.id ? 1 : 0,
              x: activeTab === tab.id ? 0 : direction * 20,
              zIndex: activeTab === tab.id ? 1 : 0,
            }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className={`${activeTab === tab.id ? 'block' : 'hidden'}`}
          >
            {tab.content}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedTabs;
