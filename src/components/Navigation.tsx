import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Leaf, Menu, X, Users, QrCode, Camera, Database, Home } from 'lucide-react';

interface NavigationProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, onViewChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'farmer', label: 'Farmer Dashboard', icon: Users },
    { id: 'qr-generator', label: 'QR Generator', icon: QrCode },
    { id: 'scanner', label: 'Scanner', icon: Camera },
    { id: 'blockchain', label: 'Blockchain', icon: Database },
  ];

  const handleNavClick = (viewId: string) => {
    onViewChange(viewId);
    setIsOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <motion.div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => handleNavClick('home')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-8 h-8 bg-herb-gradient rounded-full flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-herb-gradient bg-clip-text text-transparent">
                Ayur Trace
              </span>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                
                return (
                  <Button
                    key={item.id}
                    variant={isActive ? "herb" : "ghost"}
                    size="sm"
                    onClick={() => handleNavClick(item.id)}
                    className="transition-all duration-200"
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </Button>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Mobile Menu */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-16 right-0 bottom-0 w-80 bg-card border-l border-border z-50 md:hidden"
            >
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-6 text-center">Navigation</h3>
                
                <div className="space-y-3">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentView === item.id;
                    
                    return (
                      <Button
                        key={item.id}
                        variant={isActive ? "herb" : "ghost"}
                        size="lg"
                        onClick={() => handleNavClick(item.id)}
                        className="w-full justify-start text-left"
                      >
                        <Icon className="w-5 h-5 mr-3" />
                        {item.label}
                      </Button>
                    );
                  })}
                </div>

                {/* Mobile Menu Footer */}
                <div className="mt-12 pt-6 border-t border-border text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="w-6 h-6 bg-herb-gradient rounded-full flex items-center justify-center">
                      <Leaf className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-semibold">HerbTrace</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Blockchain-powered herb traceability
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer to prevent content overlap */}
      <div className="h-16" />
    </>
  );
};

export default Navigation;