import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import FarmerDashboard from '@/components/FarmerDashboard';
import QRGenerator from '@/components/QRGenerator';
import Scanner from '@/components/Scanner';
import BlockchainDashboard from '@/components/BlockchainDashboard';

const Index = () => {
  const [currentView, setCurrentView] = useState('home');

  const renderCurrentView = () => {
    switch (currentView) {
      case 'farmer':
        return <FarmerDashboard />;
      case 'qr-generator':
        return <QRGenerator />;
      case 'scanner':
        return <Scanner />;
      case 'blockchain':
        return <BlockchainDashboard />;
      default:
        return <HeroSection onViewChange={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation currentView={currentView} onViewChange={setCurrentView} />
      <motion.main
        key={currentView}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        {renderCurrentView()}
      </motion.main>
    </div>
  );
};

export default Index;
