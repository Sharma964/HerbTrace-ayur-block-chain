import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Leaf, MapPin, ShieldCheck, QrCode, Users, Globe } from 'lucide-react';
import heroImage from '@/assets/hero-herbs-blockchain.jpg';

interface HeroSectionProps {
  onViewChange?: (view: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onViewChange }) => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Hero Background with Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-background/60 backdrop-blur-[1px]" />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute opacity-20"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, 0],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + i * 10}%`,
            }}
          >
            <Leaf className="w-8 h-8 text-primary" />
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          
          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Ayurvedic Herb
              </span>
              <br />
              <span className="text-foreground">
                Traceability System
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Blockchain-powered transparency from farm to formulation. 
              Every herb tells its authentic story.
            </p>
          </motion.div>

          {/* Feature Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid md:grid-cols-3 gap-6 mb-12"
          >
            <Card className="p-6 glass-card hover:shadow-glow transition-all duration-300 group">
              <div className="text-center">
                <div className="w-12 h-12 bg-herb-gradient rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse-glow">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Geo-Tagged Collection</h3>
                <p className="text-sm text-muted-foreground">GPS tracking from harvest point to final product</p>
              </div>
            </Card>

            <Card className="p-6 glass-card hover:shadow-glow transition-all duration-300 group">
              <div className="text-center">
                <div className="w-12 h-12 bg-earth-gradient rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse-glow">
                  <ShieldCheck className="w-6 h-6 text-accent-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Immutable Records</h3>
                <p className="text-sm text-muted-foreground">Blockchain-secured authenticity and quality data</p>
              </div>
            </Card>

            <Card className="p-6 glass-card hover:shadow-glow transition-all duration-300 group">
              <div className="text-center">
                <div className="w-12 h-12 bg-herb-gradient rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse-glow">
                  <QrCode className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Consumer Transparency</h3>
                <p className="text-sm text-muted-foreground">QR codes reveal complete herb journey</p>
              </div>
            </Card>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button 
              variant="herb" 
              size="lg" 
              className="text-lg px-8"
              onClick={() => onViewChange?.('farmer')}
            >
              <Users className="w-5 h-5" />
              Farmer Dashboard
            </Button>
            <Button 
              variant="scanner" 
              size="lg" 
              className="text-lg px-8"
              onClick={() => onViewChange?.('scanner')}
            >
              <QrCode className="w-5 h-5" />
              Scan Product
            </Button>
            <Button 
              variant="earth" 
              size="lg" 
              className="text-lg px-8"
              onClick={() => onViewChange?.('blockchain')}
            >
              <Globe className="w-5 h-5" />
              View Blockchain
            </Button>
          </motion.div>

        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-16">
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-card"
          />
        </svg>
      </div>
    </div>
  );
};

export default HeroSection;