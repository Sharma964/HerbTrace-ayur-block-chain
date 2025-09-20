import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Upload, Camera, Leaf, Users, Calendar } from 'lucide-react';

interface FarmData {
  farmerName: string;
  herbType: string;
  quantity: string;
  location: string;
  harvestDate: string;
  qualityNotes: string;
  coordinates: string;
}

const FarmerDashboard = () => {
  const [formData, setFormData] = useState<FarmData>({
    farmerName: '',
    herbType: '',
    quantity: '',
    location: '',
    harvestDate: '',
    qualityNotes: '',
    coordinates: ''
  });

  const [isCollecting, setIsCollecting] = useState(false);

  const herbTypes = [
    'Ashwagandha (Withania somnifera)',
    'Turmeric (Curcuma longa)',
    'Brahmi (Bacopa monnieri)',
    'Neem (Azadirachta indica)',
    'Tulsi (Ocimum sanctum)',
    'Amla (Phyllanthus emblica)',
    'Guduchi (Tinospora cordifolia)',
    'Shankhpushpi (Convolvulus pluricaulis)'
  ];

  const getCurrentLocation = () => {
    setIsCollecting(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = `${position.coords.latitude.toFixed(6)}, ${position.coords.longitude.toFixed(6)}`;
          setFormData(prev => ({ ...prev, coordinates: coords }));
          setIsCollecting(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setIsCollecting(false);
        }
      );
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate blockchain submission
    console.log('Submitting to blockchain:', formData);
    
    // Reset form
    setFormData({
      farmerName: '',
      herbType: '',
      quantity: '',
      location: '',
      harvestDate: '',
      qualityNotes: '',
      coordinates: ''
    });
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
              Farmer Collection Dashboard
            </span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Record your herb collection data to create an immutable blockchain record
            from farm to final product
          </p>
        </motion.div>

        {/* Main Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Card className="shadow-card">
            <CardHeader className="bg-herb-gradient text-white">
              <CardTitle className="flex items-center gap-2">
                <Leaf className="w-6 h-6" />
                Collection Event Registration
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Farmer Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="farmer-name" className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Farmer Name
                    </Label>
                    <Input
                      id="farmer-name"
                      value={formData.farmerName}
                      onChange={(e) => setFormData(prev => ({ ...prev, farmerName: e.target.value }))}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="harvest-date" className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Harvest Date
                    </Label>
                    <Input
                      id="harvest-date"
                      type="date"
                      value={formData.harvestDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, harvestDate: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                {/* Herb Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="herb-type">Herb Species</Label>
                    <Select value={formData.herbType} onValueChange={(value) => setFormData(prev => ({ ...prev, herbType: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select herb species" />
                      </SelectTrigger>
                      <SelectContent>
                        {herbTypes.map((herb) => (
                          <SelectItem key={herb} value={herb}>
                            {herb}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity (kg)</Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={formData.quantity}
                      onChange={(e) => setFormData(prev => ({ ...prev, quantity: e.target.value }))}
                      placeholder="e.g., 25.5"
                      step="0.1"
                      required
                    />
                  </div>
                </div>

                {/* Location Information */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Collection Location</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="e.g., Village Rampur, District Haridwar, Uttarakhand"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="coordinates">GPS Coordinates</Label>
                    <div className="flex gap-2">
                      <Input
                        id="coordinates"
                        value={formData.coordinates}
                        onChange={(e) => setFormData(prev => ({ ...prev, coordinates: e.target.value }))}
                        placeholder="Will be auto-filled when you capture location"
                        readOnly
                      />
                      <Button 
                        type="button"
                        variant="scanner"
                        onClick={getCurrentLocation}
                        disabled={isCollecting}
                      >
                        <MapPin className="w-4 h-4" />
                        {isCollecting ? 'Getting Location...' : 'Capture GPS'}
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Quality Notes */}
                <div className="space-y-2">
                  <Label htmlFor="quality-notes">Quality & Collection Notes</Label>
                  <Textarea
                    id="quality-notes"
                    value={formData.qualityNotes}
                    onChange={(e) => setFormData(prev => ({ ...prev, qualityNotes: e.target.value }))}
                    placeholder="e.g., Collected during early morning hours, plants showed excellent health, no pest damage observed, proper moisture content..."
                    rows={4}
                  />
                </div>

                {/* Photo Upload Section */}
                <div className="space-y-4 p-6 border-2 border-dashed border-border rounded-lg bg-muted/20">
                  <div className="text-center">
                    <Camera className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-4">
                      Upload photos of the herb collection (optional but recommended)
                    </p>
                    <Button type="button" variant="outline">
                      <Upload className="w-4 h-4 mr-2" />
                      Choose Photos
                    </Button>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <Button
                    type="submit"
                    variant="herb"
                    size="lg"
                    className="w-full"
                  >
                    <Leaf className="w-5 h-5 mr-2" />
                    Submit to Blockchain
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid md:grid-cols-3 gap-6 mt-12"
        >
          <Card className="p-6 text-center glass-card">
            <div className="w-12 h-12 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold mb-2">Geo-Verification</h3>
            <p className="text-sm text-muted-foreground">
              GPS coordinates ensure authentic location tracking
            </p>
          </Card>
          
          <Card className="p-6 text-center glass-card">
            <div className="w-12 h-12 bg-warning rounded-full flex items-center justify-center mx-auto mb-4">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold mb-2">Quality Assured</h3>
            <p className="text-sm text-muted-foreground">
              Immutable quality records for consumer trust
            </p>
          </Card>
          
          <Card className="p-6 text-center glass-card">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold mb-2">Fair Trade</h3>
            <p className="text-sm text-muted-foreground">
              Transparent farmer compensation tracking
            </p>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default FarmerDashboard;