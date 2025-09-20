import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { QrCode, Camera, MapPin, Calendar, User, Leaf, ShieldCheck, AlertTriangle, CheckCircle } from 'lucide-react';

interface TraceabilityRecord {
  batchId: string;
  productName: string;
  manufacturer: string;
  status: 'verified' | 'pending' | 'alert';
  collectionData: {
    farmerName: string;
    location: string;
    coordinates: string;
    harvestDate: string;
    herbType: string;
    quantity: string;
  };
  qualityTests: Array<{
    testType: string;
    result: string;
    status: 'pass' | 'fail';
    date: string;
    lab: string;
  }>;
  processingSteps: Array<{
    step: string;
    date: string;
    facility: string;
    status: 'completed';
  }>;
  certifications: string[];
}

const Scanner = () => {
  const [scanInput, setScanInput] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState<TraceabilityRecord | null>(null);
  const [showCamera, setShowCamera] = useState(false);

  // Demo data for scanning
  const demoData: TraceabilityRecord = {
    batchId: 'ASH-2024-001',
    productName: 'Ashwagandha Root Powder',
    manufacturer: 'Himalaya Herbal Solutions',
    status: 'verified',
    collectionData: {
      farmerName: 'Rajesh Kumar Sharma',
      location: 'Village Rampur, Haridwar, Uttarakhand',
      coordinates: '29.9457, 78.1642',
      harvestDate: '2024-01-15',
      herbType: 'Ashwagandha (Withania somnifera)',
      quantity: '25.5 kg'
    },
    qualityTests: [
      {
        testType: 'Moisture Content',
        result: '8.2%',
        status: 'pass',
        date: '2024-01-16',
        lab: 'Ayush Quality Testing Lab'
      },
      {
        testType: 'Pesticide Residue',
        result: 'Not Detected',
        status: 'pass',
        date: '2024-01-16',
        lab: 'Ayush Quality Testing Lab'
      },
      {
        testType: 'DNA Barcoding',
        result: 'Verified Authentic',
        status: 'pass',
        date: '2024-01-17',
        lab: 'Genomic Verification Center'
      },
      {
        testType: 'Heavy Metals',
        result: 'Within Limits',
        status: 'pass',
        date: '2024-01-17',
        lab: 'Ayush Quality Testing Lab'
      }
    ],
    processingSteps: [
      {
        step: 'Initial Cleaning & Sorting',
        date: '2024-01-18',
        facility: 'Primary Processing Unit, Haridwar',
        status: 'completed'
      },
      {
        step: 'Drying & Moisture Control',
        date: '2024-01-20',
        facility: 'Processing Center, Rishikesh',
        status: 'completed'
      },
      {
        step: 'Grinding & Powder Formation',
        date: '2024-01-22',
        facility: 'Manufacturing Unit, Delhi',
        status: 'completed'
      },
      {
        step: 'Final Packaging',
        date: '2024-01-25',
        facility: 'Packaging Center, Delhi',
        status: 'completed'
      }
    ],
    certifications: ['Organic Certified', 'AYUSH Approved', 'Fair Trade', 'Sustainable Harvest']
  };

  const handleScan = () => {
    setIsScanning(true);
    
    // Simulate scanning process
    setTimeout(() => {
      if (scanInput.includes('ASH-2024-001') || scanInput === '') {
        setScannedData(demoData);
      } else {
        setScannedData(null);
      }
      setIsScanning(false);
    }, 2000);
  };

  const openCamera = () => {
    setShowCamera(true);
    // In a real implementation, this would open the device camera
    setTimeout(() => {
      setShowCamera(false);
      setScanInput('ASH-2024-001');
      handleScan();
    }, 3000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="w-5 h-5 text-success" />;
      case 'pending':
        return <AlertTriangle className="w-5 h-5 text-warning" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'bg-success text-success-foreground';
      case 'pending':
        return 'bg-warning text-warning-foreground';
      case 'pass':
        return 'bg-success text-success-foreground';
      case 'fail':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-natural-gradient py-12">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">
            <span className="bg-herb-gradient bg-clip-text text-transparent">
              Product Scanner
            </span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Scan QR codes on Ayurvedic products to view complete traceability 
            from farm to your hands
          </p>
        </motion.div>

        {/* Scanner Interface */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-md mx-auto mb-12"
        >
          <Card className="shadow-card">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <QrCode className="w-6 h-6" />
                Scan QR Code
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              
              {/* Manual Input */}
              <div className="space-y-2">
                <Input
                  value={scanInput}
                  onChange={(e) => setScanInput(e.target.value)}
                  placeholder="Enter batch ID (e.g., ASH-2024-001)"
                />
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  variant="herb" 
                  onClick={handleScan}
                  disabled={isScanning}
                  className="w-full"
                >
                  {isScanning ? 'Scanning...' : 'Scan Code'}
                </Button>
                <Button 
                  variant="scanner" 
                  onClick={openCamera}
                  disabled={isScanning}
                  className="w-full"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Camera
                </Button>
              </div>

              {/* Camera Modal Simulation */}
              <AnimatePresence>
                {showCamera && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
                  >
                    <div className="bg-card p-8 rounded-lg text-center">
                      <Camera className="w-16 h-16 mx-auto mb-4 text-primary animate-pulse" />
                      <p className="text-lg font-semibold mb-2">Scanning QR Code...</p>
                      <p className="text-muted-foreground">Position the QR code in the camera view</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>

        {/* Scanned Data Display */}
        <AnimatePresence>
          {scannedData && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="max-w-4xl mx-auto space-y-6"
            >
              
              {/* Product Overview */}
              <Card className="shadow-card">
                <CardHeader className="bg-herb-gradient text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl mb-2">{scannedData.productName}</CardTitle>
                      <p className="opacity-90">Batch ID: {scannedData.batchId}</p>
                      <p className="opacity-90">Manufacturer: {scannedData.manufacturer}</p>
                    </div>
                    <div className="text-right">
                      {getStatusIcon(scannedData.status)}
                      <Badge className={`mt-2 ${getStatusColor(scannedData.status)}`}>
                        {scannedData.status.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-4 gap-4">
                    {scannedData.certifications.map((cert) => (
                      <Badge key={cert} variant="outline" className="justify-center py-2">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Collection Data */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Farm Collection Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{scannedData.collectionData.farmerName}</p>
                        <p className="text-sm text-muted-foreground">Farmer</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Leaf className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{scannedData.collectionData.herbType}</p>
                        <p className="text-sm text-muted-foreground">Quantity: {scannedData.collectionData.quantity}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{scannedData.collectionData.location}</p>
                        <p className="text-sm text-muted-foreground font-mono">{scannedData.collectionData.coordinates}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Harvested: {new Date(scannedData.collectionData.harvestDate).toLocaleDateString()}</p>
                        <p className="text-sm text-muted-foreground">Collection Date</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quality Tests */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5" />
                    Quality Test Results
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {scannedData.qualityTests.map((test, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{test.testType}</h4>
                          <Badge className={getStatusColor(test.status)}>
                            {test.status.toUpperCase()}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">Result: {test.result}</p>
                        <p className="text-xs text-muted-foreground">{test.lab} • {new Date(test.date).toLocaleDateString()}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Processing Timeline */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Processing Journey
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {scannedData.processingSteps.map((step, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center text-white text-sm font-bold">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{step.step}</p>
                          <p className="text-sm text-muted-foreground">{step.facility}</p>
                          <p className="text-xs text-muted-foreground">{new Date(step.date).toLocaleDateString()}</p>
                        </div>
                        <Badge className={getStatusColor(step.status)}>
                          {step.status.toUpperCase()}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Demo Instructions */}
        {!scannedData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="max-w-2xl mx-auto text-center"
          >
            <Card className="p-6 glass-card">
              <h3 className="text-lg font-semibold mb-4">Try the Demo</h3>
              <p className="text-muted-foreground mb-4">
                Enter "ASH-2024-001" or leave blank and click "Scan Code" to see a sample traceability record.
              </p>
              <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  GPS Tracked
                </div>
                <div className="flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4" />
                  Quality Verified
                </div>
                <div className="flex items-center gap-1">
                  <Leaf className="w-4 h-4" />
                  Sustainably Sourced
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Scanner;