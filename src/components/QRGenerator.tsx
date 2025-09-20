import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { QrCode, Download, Share, Package, Hash } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface BatchData {
  batchId: string;
  productName: string;
  manufacturer: string;
  manufacturingDate: string;
  expiryDate: string;
  blockchainHash: string;
}

const QRGenerator = () => {
  const [batchData, setBatchData] = useState<BatchData>({
    batchId: '',
    productName: '',
    manufacturer: '',
    manufacturingDate: '',
    expiryDate: '',
    blockchainHash: ''
  });
  
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Generate random blockchain hash for demo
  const generateHash = () => {
    const chars = '0123456789abcdef';
    let hash = '0x';
    for (let i = 0; i < 64; i++) {
      hash += chars[Math.floor(Math.random() * chars.length)];
    }
    setBatchData(prev => ({ ...prev, blockchainHash: hash }));
  };

  // Generate QR Code using HTML5 Canvas
  const generateQRCode = () => {
    if (!batchData.batchId || !batchData.productName) {
      toast({
        title: "Missing Information",
        description: "Please fill in Batch ID and Product Name at minimum.",
        variant: "destructive"
      });
      return;
    }

    // Create QR data object
    const qrData = {
      batchId: batchData.batchId,
      productName: batchData.productName,
      manufacturer: batchData.manufacturer,
      manufacturingDate: batchData.manufacturingDate,
      expiryDate: batchData.expiryDate,
      blockchainHash: batchData.blockchainHash,
      scanUrl: `${window.location.origin}/scan/${batchData.batchId}`,
      timestamp: new Date().toISOString()
    };

    // For demo purposes, we'll create a visual QR code representation
    drawQRCodeDemo(JSON.stringify(qrData));
    
    toast({
      title: "QR Code Generated",
      description: "QR code has been created for this batch.",
      variant: "default"
    });
  };

  // Draw a demo QR code pattern
  const drawQRCodeDemo = (data: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = 200;
    const moduleSize = 4;
    const modules = size / moduleSize;

    canvas.width = size;
    canvas.height = size;

    // Clear canvas
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, size, size);

    // Generate pseudo-random pattern based on data
    const hash = data.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    
    // Draw QR-like pattern
    ctx.fillStyle = 'black';
    
    for (let x = 0; x < modules; x++) {
      for (let y = 0; y < modules; y++) {
        const shouldFill = (x + y + hash) % 3 === 0 || 
                          (x * y + hash) % 7 === 0 ||
                          (x === 0 || x === modules - 1 || y === 0 || y === modules - 1);
        
        if (shouldFill) {
          ctx.fillRect(x * moduleSize, y * moduleSize, moduleSize, moduleSize);
        }
      }
    }

    // Add positioning squares (corners)
    const drawPositionSquare = (x: number, y: number) => {
      ctx.fillStyle = 'black';
      ctx.fillRect(x, y, moduleSize * 7, moduleSize * 7);
      ctx.fillStyle = 'white';
      ctx.fillRect(x + moduleSize, y + moduleSize, moduleSize * 5, moduleSize * 5);
      ctx.fillStyle = 'black';
      ctx.fillRect(x + moduleSize * 2, y + moduleSize * 2, moduleSize * 3, moduleSize * 3);
    };

    drawPositionSquare(0, 0);
    drawPositionSquare(size - moduleSize * 7, 0);
    drawPositionSquare(0, size - moduleSize * 7);

    // Convert to data URL
    setQrDataUrl(canvas.toDataURL());
  };

  const downloadQR = () => {
    if (!qrDataUrl) return;
    
    const link = document.createElement('a');
    link.href = qrDataUrl;
    link.download = `qr-${batchData.batchId}.png`;
    link.click();
  };

  const shareQR = async () => {
    if (!qrDataUrl) return;

    try {
      // Convert data URL to blob
      const response = await fetch(qrDataUrl);
      const blob = await response.blob();
      const file = new File([blob], `qr-${batchData.batchId}.png`, { type: 'image/png' });

      if (navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: `QR Code for ${batchData.productName}`,
          text: `Ayurvedic product traceability QR code`,
          files: [file]
        });
      } else {
        // Fallback to copying URL
        await navigator.clipboard.writeText(`${window.location.origin}/scan/${batchData.batchId}`);
        toast({
          title: "Link Copied",
          description: "QR code link copied to clipboard.",
        });
      }
    } catch (error) {
      console.error('Error sharing:', error);
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
            <span className="bg-earth-gradient bg-clip-text text-transparent">
              QR Code Generator
            </span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Generate unique QR codes for finished Ayurvedic products that link to 
            complete traceability records on the blockchain
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          
          {/* Input Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="shadow-card">
              <CardHeader className="bg-earth-gradient text-accent-foreground">
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-6 h-6" />
                  Batch Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="batch-id">Batch ID *</Label>
                    <Input
                      id="batch-id"
                      value={batchData.batchId}
                      onChange={(e) => setBatchData(prev => ({ ...prev, batchId: e.target.value }))}
                      placeholder="e.g., ASH-2024-001"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="product-name">Product Name *</Label>
                    <Input
                      id="product-name"
                      value={batchData.productName}
                      onChange={(e) => setBatchData(prev => ({ ...prev, productName: e.target.value }))}
                      placeholder="e.g., Ashwagandha Root Powder"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="manufacturer">Manufacturer</Label>
                    <Input
                      id="manufacturer"
                      value={batchData.manufacturer}
                      onChange={(e) => setBatchData(prev => ({ ...prev, manufacturer: e.target.value }))}
                      placeholder="e.g., Himalaya Herbal Solutions"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="mfg-date">Manufacturing Date</Label>
                      <Input
                        id="mfg-date"
                        type="date"
                        value={batchData.manufacturingDate}
                        onChange={(e) => setBatchData(prev => ({ ...prev, manufacturingDate: e.target.value }))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="exp-date">Expiry Date</Label>
                      <Input
                        id="exp-date"
                        type="date"
                        value={batchData.expiryDate}
                        onChange={(e) => setBatchData(prev => ({ ...prev, expiryDate: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="blockchain-hash">Blockchain Hash</Label>
                    <div className="flex gap-2">
                      <Input
                        id="blockchain-hash"
                        value={batchData.blockchainHash}
                        onChange={(e) => setBatchData(prev => ({ ...prev, blockchainHash: e.target.value }))}
                        placeholder="0x..."
                        className="font-mono text-sm"
                      />
                      <Button type="button" variant="outline" onClick={generateHash}>
                        <Hash className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={generateQRCode}
                  variant="herb"
                  size="lg"
                  className="w-full"
                >
                  <QrCode className="w-5 h-5 mr-2" />
                  Generate QR Code
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* QR Code Display */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <QrCode className="w-6 h-6" />
                  Generated QR Code
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                
                {/* QR Code Display */}
                <div className="text-center mb-6">
                  <div className="inline-block p-6 bg-white rounded-lg shadow-natural">
                    {qrDataUrl ? (
                      <img 
                        src={qrDataUrl} 
                        alt="Generated QR Code" 
                        className="w-48 h-48 mx-auto"
                      />
                    ) : (
                      <div className="w-48 h-48 bg-muted flex items-center justify-center rounded-lg">
                        <QrCode className="w-16 h-16 text-muted-foreground" />
                      </div>
                    )}
                    <canvas ref={canvasRef} className="hidden" />
                  </div>
                </div>

                {/* Action Buttons */}
                {qrDataUrl && (
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" onClick={downloadQR}>
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    <Button variant="outline" onClick={shareQR}>
                      <Share className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>
                )}

                {/* Batch Info Preview */}
                {batchData.batchId && (
                  <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-semibold mb-2">Batch Summary</h4>
                    <div className="text-sm space-y-1 text-muted-foreground">
                      <p><span className="font-medium">ID:</span> {batchData.batchId}</p>
                      <p><span className="font-medium">Product:</span> {batchData.productName}</p>
                      {batchData.manufacturer && (
                        <p><span className="font-medium">Manufacturer:</span> {batchData.manufacturer}</p>
                      )}
                      {batchData.manufacturingDate && (
                        <p><span className="font-medium">Mfg Date:</span> {batchData.manufacturingDate}</p>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default QRGenerator;